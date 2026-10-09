"""
Curriculum & Syllabus Integration API Routes
Supports Automatic University, Scheme, Branch, Semester, Subject, Module & Topic Loading
With Administrative Syllabus Import for Unconfigured Courses.
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from ..data.vtu_syllabus_2025_sem3 import VTU_2025_SEM3_CSE_SYLLABUS, NCERT_GRADE7_SCIENCE_SYLLABUS

router = APIRouter(prefix="/api/curriculum", tags=["Curriculum & Syllabus"])

# Dynamic Repository of Syllabi
CURRICULUM_REPOSITORY = {
    "VTU_2025_CSE_SEM3": VTU_2025_SEM3_CSE_SYLLABUS,
    "NCERT_2026_GEN_G7": NCERT_GRADE7_SCIENCE_SYLLABUS
}

class ImportSyllabusRequest(BaseModel):
    university: str
    scheme: str
    branch: str
    semester: str
    subject_code: str
    subject_title: str
    credits: int = 3
    modules: List[Dict[str, Any]]
    textbooks: Optional[List[str]] = []
    reference_books: Optional[List[str]] = []

@router.get("/universities")
def list_universities():
    return {
        "status": "SUCCESS",
        "universities": [
            {
                "id": "vtu",
                "name": "Visvesvaraya Technological University (VTU)",
                "schemes": ["2025 Scheme", "2022 Scheme"],
                "branches": [
                    "Computer Science and Engineering",
                    "Artificial Intelligence & Data Science",
                    "Electronics & Communication Engineering",
                    "Mechanical Engineering"
                ]
            },
            {
                "id": "ncert",
                "name": "NCERT / CBSE",
                "schemes": ["2026 Revised"],
                "branches": ["General Science"]
            }
        ]
    }

@router.get("/syllabus")
def get_syllabus(
    university: str = Query(..., description="University Name"),
    scheme: str = Query("2025 Scheme", description="Academic Scheme"),
    branch: str = Query("Computer Science and Engineering", description="Engineering Branch"),
    semester: str = Query("3rd Semester", description="Semester or Grade"),
    subject: str = Query(..., description="Subject Code or Title")
):
    """
    Automatically loads corresponding syllabus, modules, and topics from curriculum data layer.
    Strictly refrains from substituting generic NCERT content if VTU is requested.
    Returns 404 with import prompt if syllabus is unavailable.
    """
    uni_norm = university.strip().lower()
    sem_norm = semester.strip().lower()
    subject_norm = subject.strip().lower()

    # Search in VTU repository
    if "visvesvaraya" in uni_norm or "vtu" in uni_norm:
        if "3" in sem_norm and ("computer science" in branch.lower() or "cse" in branch.lower()):
            for s in VTU_2025_SEM3_CSE_SYLLABUS["subjects"]:
                if s["code"].lower() in subject_norm or s["title"].lower() in subject_norm or subject_norm in s["code"].lower() or subject_norm in s["title"].lower():
                    return {
                        "status": "SUCCESS",
                        "available": True,
                        "university": VTU_2025_SEM3_CSE_SYLLABUS["university"],
                        "scheme": VTU_2025_SEM3_CSE_SYLLABUS["scheme"],
                        "branch": VTU_2025_SEM3_CSE_SYLLABUS["branch"],
                        "semester": VTU_2025_SEM3_CSE_SYLLABUS["semester"],
                        "subject": s
                    }
            # Subject not found in preloaded VTU Sem 3
            return {
                "status": "UNAVAILABLE",
                "available": False,
                "message": f"Syllabus for subject '{subject}' under VTU {scheme} {branch} {semester} is not pre-configured in the repository.",
                "action": "Use the Administrative Syllabus Import tool below to upload the official syllabus document."
            }
        else:
            return {
                "status": "UNAVAILABLE",
                "available": False,
                "message": f"Syllabus for VTU {branch} ({semester}) is not yet pre-configured.",
                "action": "Please upload the official syllabus using the Administrative Import option."
            }

    # Search in NCERT repository
    if "ncert" in uni_norm or "cbse" in uni_norm:
        for s in NCERT_GRADE7_SCIENCE_SYLLABUS["subjects"]:
            if s["code"].lower() in subject_norm or s["title"].lower() in subject_norm or "science" in subject_norm or "biology" in subject_norm:
                return {
                    "status": "SUCCESS",
                    "available": True,
                    "university": NCERT_GRADE7_SCIENCE_SYLLABUS["university"],
                    "scheme": NCERT_GRADE7_SCIENCE_SYLLABUS["scheme"],
                    "branch": NCERT_GRADE7_SCIENCE_SYLLABUS["branch"],
                    "semester": NCERT_GRADE7_SCIENCE_SYLLABUS["semester"],
                    "subject": s
                }

    # Custom Imported Syllabi
    key = f"{university}_{scheme}_{branch}_{semester}".replace(" ", "_")
    if key in CURRICULUM_REPOSITORY:
        custom_syllabus = CURRICULUM_REPOSITORY[key]
        for s in custom_syllabus.get("subjects", []):
            if s["code"].lower() in subject_norm or s["title"].lower() in subject_norm:
                return {
                    "status": "SUCCESS",
                    "available": True,
                    "university": custom_syllabus["university"],
                    "scheme": custom_syllabus["scheme"],
                    "branch": custom_syllabus["branch"],
                    "semester": custom_syllabus["semester"],
                    "subject": s
                }

    return {
        "status": "UNAVAILABLE",
        "available": False,
        "message": f"No official syllabus found for '{subject}' under {university} ({scheme}, {branch}, {semester}).",
        "action": "Upload the official syllabus PDF/JSON file via Administrative Syllabus Import."
    }

@router.post("/import")
def import_syllabus(body: ImportSyllabusRequest):
    """
    Administrative syllabus import/upload mechanism.
    """
    key = f"{body.university}_{body.scheme}_{body.branch}_{body.semester}".replace(" ", "_")
    new_subject = {
        "code": body.subject_code,
        "title": body.subject_title,
        "credits": body.credits,
        "type": "PCC",
        "modules": body.modules,
        "textbooks": body.textbooks,
        "reference_books": body.reference_books
    }

    if key in CURRICULUM_REPOSITORY:
        CURRICULUM_REPOSITORY[key]["subjects"].append(new_subject)
    else:
        CURRICULUM_REPOSITORY[key] = {
            "university": body.university,
            "scheme": body.scheme,
            "branch": body.branch,
            "semester": body.semester,
            "subjects": [new_subject]
        }

    return {
        "status": "SUCCESS",
        "message": f"Successfully imported syllabus for {body.subject_code} - {body.subject_title}.",
        "key": key
    }
