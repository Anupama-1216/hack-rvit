import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Filter, 
  Eye, 
  Upload, 
  Award, 
  BookOpen, 
  ChevronRight,
  ExternalLink,
  Edit,
  Sliders
} from 'lucide-react';
import { CourseContext, TrustMapMetrics, TrustMapNode, TopicEvidence, EvidenceStatus, DocumentSource } from '../types';
import { trustMapService } from '../services/trustMapService';

interface InteractiveTrustMapViewProps {
  currentContext: CourseContext;
  documents: DocumentSource[];
  onUploadResourceClick?: () => void;
}

export const InteractiveTrustMapView: React.FC<InteractiveTrustMapViewProps> = ({
  currentContext,
  documents,
  onUploadResourceClick
}) => {
  const [metrics, setMetrics] = useState<TrustMapMetrics | null>(null);
  const [nodes, setNodes] = useState<TrustMapNode[]>([]);
  const [evidenceMap, setEvidenceMap] = useState<TopicEvidence[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicEvidence | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | EvidenceStatus>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [remapNotes, setRemapNotes] = useState<string>('');
  const [isRemapModalOpen, setIsRemapModalOpen] = useState<boolean>(false);

  const fetchTrustMapData = async () => {
    setIsLoading(true);
    const data = await trustMapService.getTrustMap(currentContext);
    setMetrics(data.metrics);
    setNodes(data.nodes);
    setEvidenceMap(data.evidenceMap);
    if (data.evidenceMap.length > 0) {
      setSelectedTopic(data.evidenceMap[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTrustMapData();
  }, [currentContext, documents]);

  const handleTeacherOverride = async (newStatus: EvidenceStatus) => {
    if (!selectedTopic) return;
    await trustMapService.remapTopic(
      selectedTopic.topic,
      selectedTopic.matched_sources[0]?.document_id || 'doc-manual',
      'teacher_verification',
      newStatus,
      remapNotes || 'Verified by faculty subject matter expert'
    );
    setIsRemapModalOpen(false);
    setRemapNotes('');
    fetchTrustMapData();
  };

  const filteredTopics = evidenceMap.filter(e => {
    if (activeFilter === 'all') return true;
    return e.status === activeFilter;
  });

  const getStatusBadge = (status: EvidenceStatus) => {
    switch (status) {
      case 'supported':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supported</span>
          </span>
        );
      case 'partially_supported':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Partially Supported</span>
          </span>
        );
      case 'conflicting':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
            <RefreshCw className="w-3.5 h-3.5 text-purple-600" />
            <span>Conflicting Evidence</span>
          </span>
        );
      case 'missing_coverage':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Missing Coverage</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header & Metrics Dashboard */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
                <span>Automatic Curriculum Trust Map</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                  {currentContext.subjectCode}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Correlates uploaded faculty notes and textbooks with prescribed {currentContext.university} syllabus.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchTrustMapData}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              title="Recalculate Trust Map"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            {onUploadResourceClick && (
              <button
                onClick={onUploadResourceClick}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Lecture Material</span>
              </button>
            )}
          </div>
        </div>

        {/* Summary Metrics Bar */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-bold">Total Syllabus Topics</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">{metrics.total_topics}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 font-bold">Supported (Verified)</span>
              <p className="text-xl font-black text-emerald-700 mt-0.5">{metrics.supported}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center">
              <span className="text-xs text-amber-800 font-bold">Partially Supported</span>
              <p className="text-xl font-black text-amber-700 mt-0.5">{metrics.partially_supported}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-center">
              <span className="text-xs text-rose-800 font-bold">Missing Coverage</span>
              <p className="text-xl font-black text-rose-700 mt-0.5">{metrics.missing_coverage}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-center col-span-2 sm:col-span-1">
              <span className="text-xs text-purple-800 font-bold">Conflicting / Review</span>
              <p className="text-xl font-black text-purple-700 mt-0.5">{metrics.conflicting}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigable Hierarchy Breadcrumb Pipeline */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white overflow-x-auto shadow-md">
        <div className="flex items-center space-x-2 text-xs font-mono min-w-max">
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-sky-400 font-bold">
            {currentContext.university}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-purple-400 font-bold">
            {currentContext.scheme}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-indigo-400 font-bold">
            {currentContext.branch} ({currentContext.semester})
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-emerald-400 font-bold">
            {currentContext.subjectCode}: {currentContext.subjectTitle}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {metrics?.overall_trust_percentage}% Syllabus Ground Truth Confidence
          </span>
        </div>
      </div>

      {/* Main Grid: Topic Hierarchy Left, Source Traceability Rationale Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Topics List with Filter Tabs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs space-y-3">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 mr-1 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Topics ({evidenceMap.length})
              </button>
              <button
                onClick={() => setActiveFilter('supported')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'supported' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Supported
              </button>
              <button
                onClick={() => setActiveFilter('partially_supported')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'partially_supported' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Partial
              </button>
              <button
                onClick={() => setActiveFilter('missing_coverage')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'missing_coverage' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Missing
              </button>
              <button
                onClick={() => setActiveFilter('conflicting')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === 'conflicting' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                Conflicting
              </button>
            </div>

            {/* Topics Items */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredTopics.map((item, idx) => {
                const isSelected = selectedTopic?.topic === item.topic;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTopic(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {item.module}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {item.topic}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.rationale}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {getStatusBadge(item.status)}
                      <span className="text-[11px] font-mono font-bold text-slate-600">
                        {Math.round(item.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column (5 cols): Selected Topic Source Traceability & Teacher Review */}
        <div className="lg:col-span-5 space-y-4">
          {selectedTopic ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
              
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedTopic.module}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {selectedTopic.topic}
                  </h3>
                </div>
                {getStatusBadge(selectedTopic.status)}
              </div>

              {/* Confidence Method Breakdown */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Evidence Confidence Score:</span>
                  <span className="font-mono font-black text-purple-700">{Math.round(selectedTopic.confidence * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all"
                    style={{ width: `${selectedTopic.confidence * 100}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  {selectedTopic.rationale}
                </p>
              </div>

              {/* Mapped Supporting Resources / Citations */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Supporting Faculty Resources ({selectedTopic.matched_sources.length})</span>
                </h4>

                {selectedTopic.matched_sources.length > 0 ? (
                  selectedTopic.matched_sources.map((source, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 truncate">{source.title}</span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          Page {source.page_number}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200">
                        "{source.snippet}"
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 text-xs text-rose-800 space-y-1">
                    <p className="font-bold">No Supporting Material Ingested</p>
                    <p className="text-[11px] text-rose-700">
                      Upload relevant textbook chapters or lecture notes for "{selectedTopic.topic}" to mark this topic as supported.
                    </p>
                  </div>
                )}
              </div>

              {/* Teacher Review & Correction Mechanism */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsRemapModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5 text-purple-400" />
                  <span>Review & Correct Topic Mapping</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
              Select a syllabus topic from the list to view supporting resource evidence.
            </div>
          )}
        </div>

      </div>

      {/* Teacher Remap Modal */}
      {isRemapModalOpen && selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Faculty Review & Topic Re-Mapping
            </h3>
            <p className="text-xs text-slate-600">
              Override automatically computed status for: <strong className="text-slate-900">{selectedTopic.topic}</strong>
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Select Correct Coverage Status:</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleTeacherOverride('supported')}
                  className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-center cursor-pointer"
                >
                  ✓ Mark Supported
                </button>
                <button
                  type="button"
                  onClick={() => handleTeacherOverride('partially_supported')}
                  className="p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 text-center cursor-pointer"
                >
                  ⚠ Mark Partial
                </button>
                <button
                  type="button"
                  onClick={() => handleTeacherOverride('missing_coverage')}
                  className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 hover:bg-rose-100 text-center cursor-pointer"
                >
                  ✗ Mark Missing
                </button>
                <button
                  type="button"
                  onClick={() => handleTeacherOverride('conflicting')}
                  className="p-2.5 rounded-xl border border-purple-300 bg-purple-50 text-purple-800 hover:bg-purple-100 text-center cursor-pointer"
                >
                  ↺ Mark Conflicting
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Faculty Verification Rationale:</label>
              <input
                type="text"
                placeholder="e.g. Verified from VTU 2025 prescribed textbook Chapter 3"
                value={remapNotes}
                onChange={e => setRemapNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsRemapModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
