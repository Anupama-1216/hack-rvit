import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  FileText, 
  Users, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Languages, 
  Activity,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  UserCheck,
  Lock,
  Cpu,
  Network,
  Menu,
  Calendar as CalendarIcon,
  Layers
} from 'lucide-react';
import { LessonPlan } from '../types';
import { AuthUser } from '../services/authService';

interface NavbarProps {
  currentPersona: 'teacher' | 'student';
  setCurrentPersona: (persona: 'teacher' | 'student') => void;
  activeTeacherTab: 'lesson' | 'curriculum' | 'calendar' | 'sources' | 'students' | 'graph' | 'trustmap' | 'voicevisual';
  setActiveTeacherTab: (tab: 'lesson' | 'curriculum' | 'calendar' | 'sources' | 'students' | 'graph' | 'trustmap' | 'voicevisual') => void;
  lessonPlan: LessonPlan;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onOpenAuditTrail: () => void;
  onOpenAgnesConfig: () => void;
  onOpenBhashiniConfig?: () => void;
  selectedLanguage: 'English' | 'Hindi' | 'Kannada' | 'Bilingual';
  setSelectedLanguage: (lang: 'English' | 'Hindi' | 'Kannada' | 'Bilingual') => void;
  isTeacherAuthenticated: boolean;
  onRequestTeacherAccess: () => void;
  onLockTeacherAccess: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
  onOpenMobileDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPersona,
  setCurrentPersona,
  activeTeacherTab,
  setActiveTeacherTab,
  lessonPlan,
  isSpeaking,
  onToggleSpeech,
  onOpenAuditTrail,
  onOpenAgnesConfig,
  onOpenBhashiniConfig,
  selectedLanguage,
  setSelectedLanguage,
  isTeacherAuthenticated,
  onRequestTeacherAccess,
  onLockTeacherAccess,
  currentUser,
  onLogout,
  onOpenMobileDrawer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      
      {/* 1. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-teal-500 text-white shadow-sm p-0.5">
              <div className="w-full h-full bg-white rounded-[8px] sm:rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 animate-pulse" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                  MINDMESH<span className="text-sky-600">-NEXUS</span>
                </span>
                <span className="hidden md:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-bold tracking-wide">
                  AGENTIC VOICE AI
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden sm:block">
                Grade {lessonPlan.grade} {lessonPlan.subject} • NCERT Curriculum
              </p>
            </div>
          </div>

          {/* Center: Desktop Role Switcher (Hidden on Mobile, handled in Mobile Bottom Nav & Drawer) */}
          <div className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setCurrentPersona('teacher')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPersona === 'teacher'
                  ? 'bg-sky-600 text-white shadow-sm font-black ring-1 ring-sky-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>👩‍🏫 Switch to Teacher View</span>
            </button>

            <button
              onClick={() => setCurrentPersona('student')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPersona === 'student'
                  ? 'bg-indigo-600 text-white shadow-sm font-black ring-1 ring-indigo-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>👨‍🎓 Switch to Learner View</span>
            </button>
          </div>

          {/* Right: Consolidated Action Toolbar & Profile */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Multilingual Switcher (EN | HI | KN | ALL) */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs">
              <Languages className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5 hidden sm:inline" />
              <button
                onClick={() => setSelectedLanguage('English')}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedLanguage === 'English' ? 'bg-white text-sky-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English Curriculum"
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('Hindi')}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedLanguage === 'Hindi' ? 'bg-white text-sky-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hindi (हिंदी)"
              >
                HI
              </button>
              <button
                onClick={() => setSelectedLanguage('Kannada')}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedLanguage === 'Kannada' ? 'bg-white text-sky-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Kannada (ಕನ್ನಡ)"
              >
                KN
              </button>
              <button
                onClick={() => setSelectedLanguage('Bilingual')}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedLanguage === 'Bilingual' ? 'bg-sky-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Multilingual All"
              >
                ALL
              </button>
            </div>

            {/* TTS Audio Toggle */}
            <button
              onClick={onToggleSpeech}
              title={isSpeaking ? "Mute Voice Audio" : "Play Voice Explanation"}
              className={`p-1.5 sm:p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer shadow-xs ${
                isSpeaking 
                  ? 'bg-sky-100 border-sky-400 text-sky-700 animate-pulse ring-2 ring-sky-300'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Agnes 3.0 Model Specs (Desktop) */}
            <button
              onClick={onOpenAgnesConfig}
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Agnes 3.0 Flash 512K & 10 RPM Token Bucket Gateway"
            >
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              <span>Agnes 3.0</span>
            </button>

            {/* Bhashini Indic Voice AI (Desktop) */}
            {onOpenBhashiniConfig && (
              <button
                onClick={onOpenBhashiniConfig}
                className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Digital India Bhashini Indic ASR & TTS Gateway"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>🇮🇳 Bhashini AI</span>
              </button>
            )}

            {/* Audit Trail Modal Trigger (Desktop) */}
            <button
              onClick={onOpenAuditTrail}
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Autonomous Decision Chain-of-Thought Audit"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Audit</span>
            </button>

            {/* Authenticated User Chip & Sign Out (Desktop) */}
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-1.5 pl-2 border-l border-slate-200">
                <div className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-slate-900 leading-none truncate max-w-[80px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                      {currentUser.role === 'teacher' ? 'Educator' : 'Student'}
                    </span>
                  </div>
                </div>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Sign Out of Session"
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 transition-colors cursor-pointer shadow-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Quick Drawer Menu Button */}
            {onOpenMobileDrawer && (
              <button
                onClick={onOpenMobileDrawer}
                className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Open Mobile Quick Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

          </div>

        </div>
      </div>

      {/* 2. Secondary Teacher Sub-Navigation Bar (Desktop/Tablet) */}
      {currentPersona === 'teacher' && (
        <div className="hidden md:block w-full bg-slate-50 border-t border-slate-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 overflow-x-auto">
            
            {/* Teacher Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
              <button
                onClick={() => setActiveTeacherTab('lesson')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'lesson'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lesson Studio</span>
                {lessonPlan.isReplanned && (
                  <span className={`ml-1 px-1.5 py-0.2 text-[9px] rounded font-bold ${
                    activeTeacherTab === 'lesson' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                  }`}>
                    20m
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTeacherTab('curriculum')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'curriculum'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Curriculum Map</span>
              </button>

              <button
                onClick={() => setActiveTeacherTab('calendar')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'calendar'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>Planner & Calendar</span>
              </button>

              <button
                onClick={() => setActiveTeacherTab('sources')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'sources'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Knowledge Base</span>
                {lessonPlan.ignoredSources.length > 0 && (
                  <span className={`ml-1 px-1.5 py-0.2 text-[9px] rounded font-bold ${
                    activeTeacherTab === 'sources' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
                  }`}>
                    1 Excluded
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTeacherTab('students')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'students'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Student Analytics</span>
                <span className={`ml-1 px-1.5 py-0.2 text-[9px] rounded font-bold ${
                  activeTeacherTab === 'students' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                }`}>
                  {lessonPlan.predictedGapsCount} At Risk
                </span>
              </button>

              <button
                onClick={() => setActiveTeacherTab('trustmap')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'trustmap'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                <span>Visual Trust Map</span>
              </button>

              <button
                onClick={() => setActiveTeacherTab('voicevisual')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'voicevisual'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Voice-to-Visual Studio</span>
              </button>

              <button
                onClick={() => setActiveTeacherTab('graph')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTeacherTab === 'graph'
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Network className="w-3.5 h-3.5 text-sky-400" />
                <span>Knowledge Graph</span>
                <span className="ml-1 px-1.5 py-0.2 text-[9px] rounded font-bold bg-sky-100 text-sky-800">
                  Agnes 3.0
                </span>
              </button>
            </div>

            {/* Right: Lock Teacher Studio & Status Badge */}
            <div className="flex items-center space-x-2.5">
              
              {/* Approval State Badge */}
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 border shadow-xs ${
                lessonPlan.approvalState === 'approved' 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : lessonPlan.approvalState === 'reviewing'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-blue-50 text-blue-800 border-blue-300'
              }`}>
                {lessonPlan.approvalState === 'approved' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                )}
                <span className="capitalize">{lessonPlan.approvalState}</span>
              </div>

              {/* Lock Controls Button */}
              <button
                onClick={onLockTeacherAccess}
                className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-xs text-slate-600 hover:text-rose-700 transition-all cursor-pointer font-semibold shadow-xs"
                title="Lock Teacher Controls & Switch to Student Mode"
              >
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Lock Studio</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
