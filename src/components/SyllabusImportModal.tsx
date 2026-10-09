import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { CourseContext } from '../types';
import { curriculumService } from '../services/curriculumService';

interface SyllabusImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: CourseContext;
  onImportSuccess: () => void;
}

export const SyllabusImportModal: React.FC<SyllabusImportModalProps> = ({
  isOpen,
  onClose,
  currentContext,
  onImportSuccess
}) => {
  const [subjectCode, setSubjectCode] = useState<string>('');
  const [subjectTitle, setSubjectTitle] = useState<string>('');
  const [rawText, setRawText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string>('');

  if (!isOpen) return null;

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectCode.trim() || !subjectTitle.trim()) return;

    setIsProcessing(true);
    setImportStatus('Extracting modules, topics, and subtopics from syllabus text...');

    // Auto-parse raw text lines into modules and topics
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const modules: any[] = [];
    let currentModule = { module_number: 1, title: 'Module 1: General Topics', topics: [] as string[] };

    lines.forEach(line => {
      if (line.toLowerCase().startsWith('module') || line.toLowerCase().startsWith('unit') || line.toLowerCase().startsWith('chapter')) {
        if (currentModule.topics.length > 0) {
          modules.push(currentModule);
        }
        currentModule = {
          module_number: modules.length + 1,
          title: line,
          topics: []
        };
      } else if (line.length > 5) {
        currentModule.topics.push(line);
      }
    });

    if (currentModule.topics.length > 0) {
      modules.push(currentModule);
    }

    if (modules.length === 0) {
      modules.push({
        module_number: 1,
        title: 'Module 1: Course Fundamentals',
        topics: [subjectTitle, 'Foundational Concepts', 'Applications & Implementations']
      });
    }

    await curriculumService.importSyllabus(subjectCode, subjectTitle, modules);

    setIsProcessing(false);
    setImportStatus('Syllabus successfully ingested into curriculum repository!');
    setTimeout(() => {
      onImportSuccess();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white">
            <Upload className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold">Administrative Syllabus Import</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleImportSubmit} className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Official Syllabus Upload Required</p>
              <p className="mt-0.5 text-amber-800">
                Syllabus for {currentContext.university} ({currentContext.scheme}, {currentContext.branch}, {currentContext.semester}) is not pre-configured. Paste or upload official syllabus details below. We strictly avoid substituting generic content.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. 1BCS402"
                value={subjectCode}
                onChange={e => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Database Management Systems"
                value={subjectTitle}
                onChange={e => setSubjectTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Raw Syllabus Text or Paste Official PDF Syllabus Contents
            </label>
            <textarea
              rows={6}
              placeholder="Module 1: Database System Concepts and Architecture...&#10;Module 2: Relational Data Model and SQL...&#10;Module 3: Normalization (1NF, 2NF, 3NF, BCNF)..."
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {importStatus && (
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-medium flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-all disabled:opacity-50 flex items-center space-x-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Ingesting...' : 'Ingest Official Syllabus'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
