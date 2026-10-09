import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, CheckCircle2, AlertCircle, Upload, ChevronRight, Layers } from 'lucide-react';
import { CourseContext } from '../types';
import { curriculumService } from '../services/curriculumService';
import { VTU_2025_SEM3_CSE } from '../data/curriculumRepository';

interface CourseSelectorBarProps {
  onContextChange?: (context: CourseContext, isAvailable: boolean) => void;
  onOpenSyllabusImport?: () => void;
}

export const CourseSelectorBar: React.FC<CourseSelectorBarProps> = ({
  onContextChange,
  onOpenSyllabusImport
}) => {
  const [context, setContext] = useState<CourseContext>(() => curriculumService.getActiveContext());
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handleUniversityChange = (uni: string) => {
    if (uni.includes('VTU')) {
      const updated: CourseContext = {
        university: 'Visvesvaraya Technological University (VTU)',
        scheme: '2025 Scheme',
        branch: 'Computer Science and Engineering',
        semester: '3rd Semester',
        subjectCode: '1BCS305',
        subjectTitle: 'Data Structures and Applications'
      };
      setContext(updated);
      curriculumService.setCourseContext(updated).then(res => {
        setIsAvailable(res.available);
        if (onContextChange) onContextChange(updated, res.available);
      });
    } else {
      const updated: CourseContext = {
        university: 'NCERT / CBSE',
        scheme: '2026 Revised',
        branch: 'General Science',
        semester: 'Grade 7',
        subjectCode: 'NCERT-SCI-7',
        subjectTitle: 'Science / Biology'
      };
      setContext(updated);
      curriculumService.setCourseContext(updated).then(res => {
        setIsAvailable(res.available);
        if (onContextChange) onContextChange(updated, res.available);
      });
    }
  };

  const handleSubjectChange = (code: string) => {
    const subObj = VTU_2025_SEM3_CSE.subjects.find(s => s.code === code);
    const updated: CourseContext = {
      ...context,
      subjectCode: code,
      subjectTitle: subObj ? subObj.title : code
    };
    setContext(updated);
    curriculumService.setCourseContext(updated).then(res => {
      setIsAvailable(res.available);
      if (onContextChange) onContextChange(updated, res.available);
    });
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-2.5 px-3 sm:px-6 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Course Selection Selectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* University */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <GraduationCap className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <select
              value={context.university.includes('VTU') ? 'VTU' : 'NCERT'}
              onChange={(e) => handleUniversityChange(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="VTU" className="bg-slate-900 text-white">VTU Belagavi</option>
              <option value="NCERT" className="bg-slate-900 text-white">NCERT / CBSE</option>
            </select>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />

          {/* Scheme */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <span className="text-slate-400 font-medium">Scheme:</span>
            <select
              value={context.scheme}
              onChange={(e) => {
                const updated = { ...context, scheme: e.target.value };
                setContext(updated);
                curriculumService.setCourseContext(updated).then(res => {
                  setIsAvailable(res.available);
                  if (onContextChange) onContextChange(updated, res.available);
                });
              }}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              {context.university.includes('VTU') ? (
                <>
                  <option value="2025 Scheme" className="bg-slate-900 text-white">2025 Scheme (Active)</option>
                  <option value="2022 Scheme" className="bg-slate-900 text-white">2022 Scheme</option>
                </>
              ) : (
                <option value="2026 Revised" className="bg-slate-900 text-white">2026 Revised</option>
              )}
            </select>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />

          {/* Branch & Semester */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="font-bold text-slate-200">
              {context.university.includes('VTU') ? 'CSE Sem 3' : 'Grade 7'}
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />

          {/* Subject */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <select
              value={context.subjectCode}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              {context.university.includes('VTU') ? (
                VTU_2025_SEM3_CSE.subjects.map(s => (
                  <option key={s.code} value={s.code} className="bg-slate-900 text-white">
                    {s.code} - {s.title}
                  </option>
                ))
              ) : (
                <option value="NCERT-SCI-7" className="bg-slate-900 text-white">NCERT Grade 7 Science</option>
              )}
            </select>
          </div>

        </div>

        {/* Status Badge & Administrative Import */}
        <div className="flex items-center space-x-2 justify-end">
          {isAvailable ? (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Syllabus Loaded</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Syllabus Unavailable</span>
              </div>
              {onOpenSyllabusImport && (
                <button
                  onClick={onOpenSyllabusImport}
                  className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center space-x-1 transition-all shadow-xs cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Import Syllabus</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
