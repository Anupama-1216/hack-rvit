import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Plus, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
  Users
} from 'lucide-react';
import { CalendarEvent } from '../types';
import { sharedState } from '../services/sharedStateManager';
import { curriculumService } from '../services/curriculumService';

interface CalendarViewProps {
  currentPersona: 'teacher' | 'student';
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onOpenLesson?: (topicId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentPersona,
  events,
  onSelectEvent,
  onOpenLesson,
}) => {
  // Calendar View Mode: 'month' (default) | 'week' | 'timeline'
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'timeline'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(events[0] || null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 12)); // Oct 2026

  // Scheduling Modal State (for Teachers)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newModule, setNewModule] = useState<string>('Module 1: Linear Data Structures');
  const [newDate, setNewDate] = useState<string>('2026-10-16');
  const [newTime, setNewTime] = useState<string>('10:00 AM - 10:45 AM');
  const [newType, setNewType] = useState<'lesson' | 'intervention' | 'assessment'>('lesson');
  const [newObjectives, setNewObjectives] = useState<string>('Master foundational concept\nAnalyze time complexity');
  const [newPrerequisites, setNewPrerequisites] = useState<string>('Arrays & Dynamic Memory');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate Month Matrix (October 2026 starts on Thursday = index 4, 31 days)
  const monthDays = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - 3; // 4th cell is Oct 1st
    return dayNumber > 0 && dayNumber <= 31 ? dayNumber : null;
  });

  const getEventsForDay = (day: number) => {
    const formatted = `2026-10-${day < 10 ? '0' + day : day}`;
    return events.filter((e) => e.date === formatted);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = sharedState.scheduleEvent({
      title: newTitle,
      topicId: 'ds-mod1-top1',
      module: newModule,
      date: newDate,
      time: newTime,
      type: newType,
      status: 'scheduled',
      objectives: newObjectives.split('\n').filter((o) => o.trim()),
      prerequisites: newPrerequisites.split(',').map((p) => p.trim()),
      prerequisiteCompleted: true,
      resources: [
        {
          title: 'Curriculum Visual Notes',
          type: 'diagram',
          url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
          notes: 'Teacher attached reference notes.'
        }
      ]
    });

    setSelectedEvent(created);
    setIsScheduleModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      
      {/* 1. Header Toolbar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span>Shared Academic Calendar</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                Synced Across Portals
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              {currentPersona === 'teacher'
                ? 'Schedule lessons, plan interventions, and publish timeline events for learners.'
                : 'Browse scheduled curriculum lessons, inspect prerequisites, and access attached resources.'}
            </p>
          </div>
        </div>

        {/* View Mode Switcher: Month | Week | Timeline */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'month' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'week' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'timeline' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Timeline
            </button>
          </div>

          {currentPersona === 'teacher' && (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Lesson</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Calendar Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Calendar View (Month / Week / Timeline) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Month Header Navigation */}
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold text-slate-900">October 2026</span>
              <span className="text-xs text-slate-500 font-medium font-mono">
                {curriculumService.getActiveContext().university?.includes('VTU') || curriculumService.getActiveContext().university?.includes('Visvesvaraya') || curriculumService.getActiveContext().subjectCode?.includes('1BCS')
                  ? `${curriculumService.getActiveContext().university} • ${curriculumService.getActiveContext().subjectCode}`
                  : 'NCERT / CBSE Grade 7 Science'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                Today
              </button>
              <button className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VIEW 1: MONTH VIEW (Default) */}
          {viewMode === 'month' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-3 sm:p-4 shadow-xs overflow-hidden">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-500 pb-2 border-b border-slate-100">
                {daysOfWeek.map((d) => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1 pt-2">
                {monthDays.map((day, idx) => {
                  const dayEvents = day ? getEventsForDay(day) : [];
                  const isToday = day === 12;

                  return (
                    <div
                      key={idx}
                      className={`min-h-[85px] sm:min-h-[105px] p-1.5 rounded-xl border transition-all flex flex-col justify-between ${
                        !day
                          ? 'bg-slate-50/50 border-transparent'
                          : isToday
                          ? 'bg-sky-50/40 border-sky-300 ring-1 ring-sky-200'
                          : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isToday ? 'w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]' : 'text-slate-700'}`}>
                              {day}
                            </span>
                            {dayEvents.length > 0 && (
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            )}
                          </div>

                          <div className="space-y-1 my-1 overflow-y-auto max-h-[65px]">
                            {dayEvents.map((evt) => (
                              <button
                                key={evt.id}
                                onClick={() => setSelectedEvent(evt)}
                                className={`w-full text-left p-1 rounded text-[10px] font-semibold truncate transition-all cursor-pointer block border ${
                                  selectedEvent?.id === evt.id
                                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                                    : evt.type === 'intervention'
                                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50 hover:text-sky-900'
                                }`}
                              >
                                {evt.type === 'intervention' ? '🎯 ' : '📖 '}
                                {evt.title}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: WEEK VIEW */}
          {viewMode === 'week' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Week of Oct 11 – Oct 17, 2026
              </div>
              <div className="space-y-2">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      selectedEvent?.id === evt.id
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          evt.type === 'intervention' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sky-100 text-sky-800'
                        }`}>
                          {evt.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{evt.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center space-x-2">
                        <span>{evt.module}</span>
                        <span>•</span>
                        <span className="font-mono">{evt.date}</span>
                        <span>•</span>
                        <span>{evt.time}</span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(evt);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: TIMELINE VIEW */}
          {viewMode === 'timeline' && (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sequential Learning Path Timeline
              </div>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {events.map((evt, idx) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="relative cursor-pointer group"
                  >
                    <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 bg-white ${
                      selectedEvent?.id === evt.id ? 'border-sky-600 bg-sky-600' : 'border-slate-400 group-hover:border-sky-500'
                    }`} />
                    <div className={`p-3.5 rounded-xl border transition-all ${
                      selectedEvent?.id === evt.id ? 'bg-sky-50 border-sky-300 shadow-xs' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-sky-700">{evt.date} • {evt.time}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{evt.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{evt.title}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{evt.module}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Topic & Event Detail Panel */}
        <div className="lg:col-span-4 space-y-4">
          {selectedEvent ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    selectedEvent.type === 'intervention'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-sky-50 text-sky-800 border border-sky-200'
                  }`}>
                    {selectedEvent.type}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">{selectedEvent.time}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{selectedEvent.module}</p>
              </div>

              {/* Objectives */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Objectives:</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedEvent.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span className="leading-tight">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites & Review Button */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Prerequisites:</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {selectedEvent.prerequisiteCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.prerequisites.map((p, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      {p}
                    </span>
                  ))}
                </div>

                {onOpenLesson && (
                  <button
                    onClick={() => onOpenLesson(selectedEvent.topicId)}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span>Review Lesson & Prerequisites</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                  </button>
                )}
              </div>

              {/* Attached Teacher Resources (Diagrams & Videos) */}
              {selectedEvent.resources && selectedEvent.resources.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Attached Resources ({selectedEvent.resources.length})</span>
                    <span className="text-[10px] text-sky-600">Teacher Grounded</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedEvent.resources.map((res, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                            {res.type === 'video' ? <Video className="w-3.5 h-3.5 text-rose-500" /> : <ImageIcon className="w-3.5 h-3.5 text-purple-500" />}
                            <span>{res.title}</span>
                          </span>
                          {res.url && res.url !== '#' && (
                            <a href={res.url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {res.notes && <p className="text-[11px] text-slate-600 leading-tight">{res.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Replan Notes */}
              {selectedEvent.replanNotes && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <span className="font-bold">Intervention Note:</span>
                  <p className="text-[11px] leading-relaxed">{selectedEvent.replanNotes}</p>
                </div>
              )}

            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-xs text-slate-500 shadow-xs">
              Select an event on the calendar to inspect details, prerequisites, and resources.
            </div>
          )}
        </div>

      </div>

      {/* 3. Schedule Lesson / Intervention Modal (Teacher) */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-sky-600" />
                <span>Schedule Lesson on Shared Calendar</span>
              </h3>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lesson / Event Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Graph BFS Traversal & Shortest Path"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-sky-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Curriculum Module</label>
                  <select
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="Module 1: Linear Data Structures">Module 1: Linear Data Structures</option>
                    <option value="Module 2: Trees & Hierarchical Graphs">Module 2: Trees & Hierarchical Graphs</option>
                    <option value="Module 3: Transport Layer & TCP Flow">Module 3: Transport Layer & TCP Flow</option>
                    <option value="NCERT Grade 7 Science">NCERT Grade 7 Science</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Event Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="lesson">Regular Lesson</option>
                    <option value="intervention">Targeted Intervention</option>
                    <option value="assessment">Assessment Check</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Window</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM - 10:45 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Objectives (one per line)</label>
                <textarea
                  rows={2}
                  value={newObjectives}
                  onChange={(e) => setNewObjectives(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Prerequisites (comma-separated)</label>
                <input
                  type="text"
                  value={newPrerequisites}
                  onChange={(e) => setNewPrerequisites(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
                >
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
