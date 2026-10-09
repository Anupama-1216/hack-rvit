import React, { useState } from 'react';
import { 
  Layers, 
  BookOpen, 
  Lock, 
  Unlock, 
  Plus, 
  Video, 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Upload,
  Calendar,
  Zap
} from 'lucide-react';
import { CurriculumTopic } from '../types';
import { sharedState } from '../services/sharedStateManager';

interface CurriculumMapViewProps {
  currentPersona: 'teacher' | 'student';
  topics: CurriculumTopic[];
  onOpenLesson?: (topicId: string) => void;
  onScheduleTopic?: (topic: CurriculumTopic) => void;
}

export const CurriculumMapView: React.FC<CurriculumMapViewProps> = ({
  currentPersona,
  topics,
  onOpenLesson,
  onScheduleTopic,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic>(topics[0]);
  
  // Attach Diagram / Note Modal
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteImageUrl, setNoteImageUrl] = useState<string>('');

  // Attach Video Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<string>('15 min');

  // Group topics by Module
  const groupedModules = topics.reduce((acc, topic) => {
    if (!acc[topic.module]) acc[topic.module] = [];
    acc[topic.module].push(topic);
    return acc;
  }, {} as Record<string, CurriculumTopic[]>);

  const handleAttachNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    sharedState.attachDiagramNote(selectedTopic.id, {
      title: noteTitle,
      note: noteContent,
      imageUrl: noteImageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'
    });

    setIsNoteModalOpen(false);
    setNoteTitle('');
    setNoteContent('');
    setNoteImageUrl('');
  };

  const handleAttachVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim() || !videoUrl.trim()) return;

    sharedState.attachVideoLink(selectedTopic.id, {
      title: videoTitle,
      url: videoUrl,
      duration: videoDuration
    });

    setIsVideoModalOpen(false);
    setVideoTitle('');
    setVideoUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span>Curriculum Map & Resource Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                Data Structures & Science
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Structured modules and topics with attached diagram notes and educational video links.
            </p>
          </div>
        </div>

        {currentPersona === 'teacher' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
              <span>Attach Diagram Note</span>
            </button>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Attach Video Link</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Modules & Topics on Left, Selected Topic Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Modules Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {Object.entries(groupedModules).map(([moduleName, moduleTopics], modIdx) => (
            <div key={modIdx} className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>{moduleName}</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-bold font-mono">
                  {moduleTopics.length} Topics
                </span>
              </div>

              <div className="space-y-2">
                {moduleTopics.map((topic) => {
                  const isSelected = selectedTopic.id === topic.id;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 shadow-xs'
                          : topic.isUnlocked
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          topic.isUnlocked ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {topic.isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 truncate flex items-center space-x-1.5">
                            <span>{topic.title}</span>
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{topic.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {topic.masteryScore > 0 && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            topic.masteryScore >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {topic.masteryScore}% Mastery
                          </span>
                        )}

                        {topic.diagramNotes && topic.diagramNotes.length > 0 && (
                          <span className="p-1 rounded bg-purple-50 text-purple-700" title="Diagram Notes attached">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </span>
                        )}

                        {topic.videoLinks && topic.videoLinks.length > 0 && (
                          <span className="p-1 rounded bg-rose-50 text-rose-700" title="Video links attached">
                            <Video className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected Topic Resources & Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4 sticky top-20">
            
            {/* Topic Header */}
            <div className="border-b border-slate-100 pb-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
                  {selectedTopic.module}
                </span>
                <span className={`text-xs font-bold flex items-center space-x-1 ${
                  selectedTopic.isUnlocked ? 'text-emerald-600' : 'text-slate-400'
                }`}>
                  {selectedTopic.isUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  <span>{selectedTopic.isUnlocked ? 'Unlocked in Learning Path' : 'Locked (Requires Mastery)'}</span>
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 pt-1 leading-snug">
                {selectedTopic.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedTopic.description}</p>
            </div>

            {/* Prerequisites */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Prerequisite Concepts:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTopic.prerequisites.map((prereq, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>

            {/* Attached Diagram Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                  <span>Diagram Notes ({selectedTopic.diagramNotes?.length || 0})</span>
                </h4>
                {currentPersona === 'teacher' && (
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="text-[11px] text-sky-600 hover:underline font-bold"
                  >
                    + Add
                  </button>
                )}
              </div>

              {selectedTopic.diagramNotes && selectedTopic.diagramNotes.length > 0 ? (
                <div className="space-y-2">
                  {selectedTopic.diagramNotes.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{note.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{note.note}</p>
                      {note.imageUrl && (
                        <img
                          src={note.imageUrl}
                          alt={note.title}
                          className="w-full h-28 object-cover rounded-lg border border-slate-200"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No diagram notes attached yet.</p>
              )}
            </div>

            {/* Attached Educational Video Links */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <Video className="w-3.5 h-3.5 text-rose-600" />
                  <span>Educational Video Links ({selectedTopic.videoLinks?.length || 0})</span>
                </h4>
                {currentPersona === 'teacher' && (
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="text-[11px] text-sky-600 hover:underline font-bold"
                  >
                    + Add
                  </button>
                )}
              </div>

              {selectedTopic.videoLinks && selectedTopic.videoLinks.length > 0 ? (
                <div className="space-y-2">
                  {selectedTopic.videoLinks.map((vid, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{vid.title}</div>
                        <div className="text-[10px] text-slate-500">Duration: {vid.duration || '15 min'}</div>
                      </div>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-sky-700 text-xs font-bold flex items-center space-x-1"
                      >
                        <span>Watch</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No video links attached yet.</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {onOpenLesson && (
                <button
                  onClick={() => onOpenLesson(selectedTopic.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open in Lesson Studio</span>
                </button>
              )}

              {currentPersona === 'teacher' && onScheduleTopic && (
                <button
                  onClick={() => onScheduleTopic(selectedTopic)}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Schedule in Calendar</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Attach Diagram Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Attach Diagram Note to {selectedTopic.title}</h3>
            <form onSubmit={handleAttachNoteSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. Memory Layout & Index Calculation"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Key Conceptual Explanation</label>
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Describe memory pointers, cache locality, and algorithmic invariant..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Diagram Image URL (Optional)</label>
                <input
                  type="url"
                  value={noteImageUrl}
                  onChange={(e) => setNoteImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attach Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Attach Educational Video Link</h3>
            <form onSubmit={handleAttachVideoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. MIT 6.006: Dynamic Arrays & Amortization"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Video URL (YouTube / Video Hub)</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration</label>
                <input
                  type="text"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(e.target.value)}
                  placeholder="e.g. 18 min"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
                >
                  Attach Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
