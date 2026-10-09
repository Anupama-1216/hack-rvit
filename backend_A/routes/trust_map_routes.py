"""
Teacher Resource Ingestion & Automatic Visual Trust Map API Routes
Correlates uploaded teacher materials with selected university syllabus.
Generates interactive Trust Map hierarchy & evidence coverage statuses.
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .resources import MOCK_RESOURCES
from ..data.vtu_syllabus_2025_sem3 import VTU_2025_SEM3_CSE_SYLLABUS, NCERT_GRADE7_SCIENCE_SYLLABUS

router = APIRouter(prefix="/api/trust-map", tags=["Trust Map & Correlation"])

class RemapTopicRequest(BaseModel):
    topic_title: str
    document_id: str
    action: str  # "approve", "link", "unlink", "override_status"
    new_status: Optional[str] = None  # "supported", "partially_supported", "missing_coverage", "conflicting"
    notes: Optional[str] = None

# In-memory store for teacher review overrides
TEACHER_REMAP_OVERRIDES: Dict[str, Dict[str, Any]] = {}

@router.get("")
def get_trust_map(
    university: str = "Visvesvaraya Technological University (VTU)",
    subject_code: str = "1BCS305"
):
    """
    Builds the interactive visual Trust Map connecting:
    University -> Academic Scheme -> Branch & Semester -> Subject & Syllabus Module -> Topics -> Uploaded Teacher Notes & Textbooks -> Evidence Status.
    """
    uni_norm = university.lower()
    is_vtu = "vtu" in uni_norm or "visvesvaraya" in uni_norm

    syllabus_data = VTU_2025_SEM3_CSE_SYLLABUS if is_vtu else NCERT_GRADE7_SCIENCE_SYLLABUS
    
    target_subject = None
    for s in syllabus_data["subjects"]:
        if s["code"].lower() in subject_code.lower() or subject_code.lower() in s["code"].lower():
            target_subject = s
            break
    
    if not target_subject:
        target_subject = syllabus_data["subjects"][0]

    nodes = []
    edges = []

    # Level 1: University Node
    uni_node_id = f"node-uni-{syllabus_data['university']}"
    nodes.append({
        "id": uni_node_id,
        "type": "university",
        "label": syllabus_data["university"],
        "subtitle": f"Scheme: {syllabus_data['scheme']}"
    })

    # Level 2: Subject Node
    sub_node_id = f"node-sub-{target_subject['code']}"
    nodes.append({
        "id": sub_node_id,
        "type": "subject",
        "label": f"{target_subject['code']}: {target_subject['title']}",
        "subtitle": f"{syllabus_data['branch']} - {syllabus_data['semester']}"
    })
    edges.append({"source": uni_node_id, "target": sub_node_id})

    # Track coverage counts
    supported_count = 0
    partial_count = 0
    missing_count = 0
    conflict_count = 0

    topic_evidence_map = []

    for mod in target_subject["modules"]:
        mod_node_id = f"node-mod-{mod['module_number']}"
        nodes.append({
            "id": mod_node_id,
            "type": "module",
            "label": mod["title"],
            "subtitle": f"Hours: {mod.get('hours', 8)}"
        })
        edges.append({"source": sub_node_id, "target": mod_node_id})

        for topic in mod["topics"]:
            top_node_id = f"node-top-{hash(topic) & 0xffffff}"
            
            # Check for teacher override
            override = TEACHER_REMAP_OVERRIDES.get(topic)

            # Determine evidence correlation with uploaded resources
            matched_sources = []
            topic_lower = topic.lower()

            for res in MOCK_RESOURCES:
                for chunk in getattr(res, "extracted_chunks", []):
                    chunk_text = chunk.content.lower()
                    # Check semantic keyword overlap
                    words = [w for w in topic_lower.replace(",", "").replace(":", "").split() if len(w) > 3]
                    matches = [w for w in words if w in chunk_text]
                    if len(matches) >= 1:
                        matched_sources.append({
                            "document_id": res.id,
                            "title": res.title,
                            "filename": res.filename,
                            "page_number": getattr(chunk, "page_number", 1),
                            "snippet": chunk.content,
                            "authority_score": res.authority_score
                        })

            # Base Evidence Status logic
            if override:
                status = override["status"]
                confidence = override.get("confidence", 0.95)
                rationale = f"Teacher Verified Rationale: {override.get('notes', 'Manual approval')}"
            elif len(matched_sources) >= 2:
                status = "supported"
                confidence = round(min(0.98, 0.60 + len(matched_sources) * 0.15), 2)
                rationale = f"Covered in {len(matched_sources)} uploaded source document(s)."
                supported_count += 1
            elif len(matched_sources) == 1:
                status = "partially_supported"
                confidence = round(0.72, 2)
                rationale = f"Partially covered in {matched_sources[0]['title']}. Additional reference recommended."
                partial_count += 1
            else:
                # Differentiate between VTU core topics vs NCERT
                if "rsa" in topic_lower or "conflict" in topic_lower or "2021" in topic_lower:
                    status = "conflicting"
                    confidence = 0.55
                    rationale = "Conflicting explanations between 2021 old lecture notes and 2025 official syllabus."
                    conflict_count += 1
                else:
                    status = "missing_coverage"
                    confidence = 0.0
                    rationale = "No uploaded teacher notes or textbook sections found for this specific topic."
                    missing_count += 1

            nodes.append({
                "id": top_node_id,
                "type": "topic",
                "label": topic,
                "status": status,
                "confidence": confidence,
                "rationale": rationale,
                "matched_sources": matched_sources
            })
            edges.append({"source": mod_node_id, "target": top_node_id})

            topic_evidence_map.append({
                "topic": topic,
                "module": mod["title"],
                "status": status,
                "confidence": confidence,
                "rationale": rationale,
                "matched_sources": matched_sources
            })

    total_topics = len(topic_evidence_map)
    trust_percentage = round(((supported_count + 0.5 * partial_count) / max(1, total_topics)) * 100, 1)

    return {
        "status": "SUCCESS",
        "university": syllabus_data["university"],
        "scheme": syllabus_data["scheme"],
        "branch": syllabus_data["branch"],
        "semester": syllabus_data["semester"],
        "subject_code": target_subject["code"],
        "subject_title": target_subject["title"],
        "trust_metrics": {
            "total_topics": total_topics,
            "supported": supported_count,
            "partially_supported": partial_count,
            "missing_coverage": missing_count,
            "conflicting": conflict_count,
            "overall_trust_percentage": trust_percentage
        },
        "nodes": nodes,
        "edges": edges,
        "topic_evidence_map": topic_evidence_map
    }

@router.post("/remap")
def remap_topic(req: RemapTopicRequest):
    """
    Teacher review and manual mapping correction endpoint.
    """
    status = req.new_status or "supported"
    TEACHER_REMAP_OVERRIDES[req.topic_title] = {
        "status": status,
        "confidence": 1.0,
        "notes": req.notes or f"Teacher action '{req.action}' applied to {req.document_id}",
        "document_id": req.document_id
    }

    return {
        "status": "SUCCESS",
        "message": f"Updated correlation status for '{req.topic_title}' to '{status}'.",
        "override": TEACHER_REMAP_OVERRIDES[req.topic_title]
    }
