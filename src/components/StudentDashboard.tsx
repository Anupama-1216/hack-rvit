import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Languages, 
  Brain, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Eye, 
  Ear, 
  FileText, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  Flame,
  Award,
  Calendar,
  FileCheck,
  Target,
  ExternalLink,
  Video,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonPlan, Student, StudentIntervention, StudentAssessmentRecord, CalendarEvent } from '../types';
import { sharedState } from '../services/sharedStateManager';
import { curriculumService } from '../services/curriculumService';
import { CalendarView } from './CalendarView';
import { DynamicConceptVisualizer } from './DynamicConceptVisualizer';

interface StudentDashboardProps {
  lessonPlan: LessonPlan;
  students: Student[];
  onUpdateStudentScore: (studentId: string, quizScore: number) => void;
  onSpeakText: (text: string, lang?: string) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onSwitchToTeacher: () => void;
  selectedLanguage?: 'English' | 'Hindi' | 'Kannada' | 'Bilingual';
  onLanguageChange?: (lang: 'English' | 'Hindi' | 'Kannada' | 'Bilingual') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lessonPlan,
  students,
  onUpdateStudentScore,
  onSpeakText,
  isSpeaking,
  onToggleSpeech,
  onSwitchToTeacher,
  selectedLanguage = 'English',
  onLanguageChange,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0].id);
  const [studentLanguage, setStudentLanguage] = useState<'English' | 'Hindi' | 'Kannada'>(
    selectedLanguage === 'Hindi' ? 'Hindi' : (selectedLanguage === 'Kannada' ? 'Kannada' : 'English')
  );
  const [studentNavTab, setStudentNavTab] = useState<'learning' | 'calendar' | 'assessments'>('learning');
  
  // Learning Mode: 'visual' | 'text' | 'voice' | 'quiz'
  const [activeLearningMode, setActiveLearningMode] = useState<'visual' | 'text' | 'voice' | 'quiz'>('visual');
  const [explanationTier, setExplanationTier] = useState<'beginner' | 'standard' | 'advanced'>('beginner');
  
  // Voice Interaction Hub State
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [studentSpokenInput, setStudentSpokenInput] = useState<string>('');
  const [voiceMessages, setVoiceMessages] = useState<Array<{ sender: 'ai' | 'student'; text: string; timestamp: string }>>(() => {
    const activeCtx = curriculumService.getActiveContext();
    const isVTU = activeCtx.university?.includes('VTU') || activeCtx.university?.includes('Visvesvaraya') || activeCtx.subjectCode?.includes('1BCS');
    const greeting = isVTU
      ? `Namaste! Welcome to ${activeCtx.subjectCode} (${activeCtx.subjectTitle}) study session. Tap the mic anytime to ask about concepts, code, or memory structures!`
      : 'Namaste! Today we are exploring how leaves make food like a busy solar kitchen (ಸಸ್ಯದ ಅಡುಗೆಮನೆ). Tap the mic anytime to speak or ask me anything!';
    return [{ sender: 'ai', text: greeting, timestamp: 'Just now' }];
  });

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

  // Interventions State
  const [interventions, setInterventions] = useState<StudentIntervention[]>(() => sharedState.getInterventions());
  const [assessments, setAssessments] = useState<StudentAssessmentRecord[]>(() => sharedState.getAssessments());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => sharedState.getCalendarEvents());
  const [isReassessmentOpen, setIsReassessmentOpen] = useState<boolean>(false);
  const [activeIntervention, setActiveIntervention] = useState<StudentIntervention | null>(null);

  // Reassessment Quiz State
  const [reassessmentQIndex, setReassessmentQIndex] = useState<number>(0);
  const [reassessmentAnswers, setReassessmentAnswers] = useState<Record<number, number>>({});
  const [isReassessmentSubmitted, setIsReassessmentSubmitted] = useState<boolean>(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const questions = lessonPlan.formativeQuiz;
  const currentQ = questions[currentQIndex];

  // Subscribe to shared browser state updates
  useEffect(() => {
    const unsub = sharedState.subscribe(() => {
      setInterventions(sharedState.getInterventions());
      setAssessments(sharedState.getAssessments());
      setCalendarEvents(sharedState.getCalendarEvents());
    });
    return unsub;
  }, []);

  // Check active intervention for current student
  const studentActiveIntervention = interventions.find(
    (i) => (i.studentId === currentStudent.id || i.studentName.toLowerCase().includes(currentStudent.name.toLowerCase())) && i.status === 'assigned'
  );

  // Synchronize language when selectedLanguage prop changes
  useEffect(() => {
    if (selectedLanguage === 'Hindi') {
      setStudentLanguage('Hindi');
    } else if (selectedLanguage === 'Kannada') {
      setStudentLanguage('Kannada');
    } else if (selectedLanguage === 'English') {
      setStudentLanguage('English');
    }
  }, [selectedLanguage]);

  // Auto-set explanation tier & language based on student profile if no global override
  useEffect(() => {
    if (!selectedLanguage || selectedLanguage === 'Bilingual') {
      if (currentStudent.preferredLanguage === 'Kannada') {
        setStudentLanguage('Kannada');
      } else if (currentStudent.preferredLanguage === 'Hindi') {
        setStudentLanguage('Hindi');
      }
    }

    if (currentStudent.riskScore >= 70) {
      setExplanationTier('beginner');
    } else {
      setExplanationTier('standard');
    }
  }, [currentStudent, selectedLanguage]);

  const handleSetStudentLanguage = (lang: 'English' | 'Hindi' | 'Kannada') => {
    setStudentLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const handleSendVoiceQuestion = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { sender: 'student' as const, text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setVoiceMessages(prev => [...prev, userMsg]);
    setStudentSpokenInput('');

    // Simulated Socratic sub-800ms AI Voice response
    setTimeout(() => {
      let aiReply = '';
      const lower = text.toLowerCase();
      if (lower.includes('stomata') || lower.includes('gate') || lower.includes('pore') || lower.includes('ಪತ್ರರಂಧ್ರ')) {
        if (studentLanguage === 'Kannada') {
          aiReply = `ಖಂಡಿತ ${currentStudent.name}! ಪತ್ರರಂಧ್ರಗಳು (Stomata) ಎಲೆಗಳ ಸೂಕ್ಷ್ಮ ಬಾಗಿಲುಗಳು, ಇವು CO2 ಅನ್ನು ಒಳಗೆ ತಂದು O2 ಅನ್ನು ಹೊರಬಿಡುತ್ತವೆ.`;
        } else if (studentLanguage === 'Hindi') {
          aiReply = `बिल्कुल सही ${currentStudent.name}! स्टोमेटा पत्तियों के छोटे दरवाजे हैं जो CO2 को अंदर लेते हैं और O2 छोड़ते हैं।`;
        } else {
          aiReply = `Spot on ${currentStudent.name}! Stomata act like microscopic automatic gates that open to let CO2 in and release Oxygen out.`;
        }
      } else if (lower.includes('slow start') || lower.includes('cwnd') || lower.includes('window') || lower.includes('tcp')) {
        aiReply = `Great question ${currentStudent.name}! In Slow Start, cwnd doubles every RTT (*2 exponential growth) until ssthresh is reached. Think of it like a funnel doubling its water flow!`;
      } else if (lower.includes('kitchen') || lower.includes('cook') || lower.includes('food') || lower.includes('ಅಡುಗೆ')) {
        if (studentLanguage === 'Kannada') {
          aiReply = `ಅದ್ಭುತ! ಕ್ಲೋರೋಪ್ಲಾಸ್ಟ್ ಸಸ್ಯದ ಅಡುಗೆಮನೆ, ಅಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು CO2 ಸೇರಿ ಗ್ಲೂಕೋಸ್ ತಯಾರಾಗುತ್ತವೆ.`;
        } else if (studentLanguage === 'Hindi') {
          aiReply = `शाबाश! क्लोरोप्लास्ट पौधे की रसोई है, जहाँ धूप, पानी और CO2 मिलकर ग्लूकोज बनाते हैं।`;
        } else {
          aiReply = `Awesome intuition! Chloroplasts are the solar chef stations cooking up Glucose food.`;
        }
      } else {
        const activeCtx = curriculumService.getActiveContext();
        const isVTU = activeCtx.university?.includes('VTU') || activeCtx.university?.includes('Visvesvaraya') || activeCtx.subjectCode?.includes('1BCS');
        if (isVTU) {
          if (studentLanguage === 'Kannada') {
            aiReply = `ಉತ್ತಮ ಪ್ರಶ್ನೆ ${currentStudent.name}! ${activeCtx.subjectCode} ${activeCtx.subjectTitle} ಪಠ್ಯಕ್ರಮದ ವಿಷಯಗಳ ಮೇಲೆ ಗಮನ ಹರಿಸೋಣ.`;
          } else if (studentLanguage === 'Hindi') {
            aiReply = `बहुत बढ़िया सवाल ${currentStudent.name}! हम ${activeCtx.subjectCode} (${activeCtx.subjectTitle}) पाठ्यक्रम का अध्ययन कर रहे हैं।`;
          } else {
            aiReply = `Great question ${currentStudent.name}! We are exploring concepts from ${activeCtx.subjectCode} (${activeCtx.subjectTitle}) VTU syllabus.`;
          }
        } else {
          if (studentLanguage === 'Kannada') {
            aiReply = `ತುಂಬಾ ಉತ್ತಮ ಪ್ರಶ್ನೆ! ಸೂರ್ಯನ ಬೆಳಕು ಎಲೆಯ ಮೇಲೆ ಬಿದ್ದಾಗ, ಕ್ಲೋರೋಫಿಲ್ ಆ ಶಕ್ತಿಯನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತದೆ. ಕತ್ತಲೆಯಲ್ಲಿ ಸಸ್ಯಗಳು ಆಹಾರ ತಯಾರಿಸಲು ಸಾಧ್ಯವೇ?`;
          } else if (studentLanguage === 'Hindi') {
            aiReply = `बहुत बढ़िया सवाल! जब धूप पत्ती पर पड़ती है, तो क्लोरोफिल ऊर्जा को पकड़ता है। क्या अंधेरे में यह प्रक्रिया संभव है?`;
          } else {
            aiReply = `Great question! When sunlight hits the leaf, chlorophyll traps radiant photons. Do you think plants can do this in the dark without light?`;
          }
        }
      }

      const aiMsg = { sender: 'ai' as const, text: aiReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setVoiceMessages(prev => [...prev, aiMsg]);
      onSpeakText(aiReply);
    }, 600);
  };

  const handleSelectOption = (optIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const handleNextQuiz = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswerIndex) {
          correct += 1;
        }
      });
      setIsQuizSubmitted(true);
      onUpdateStudentScore(currentStudent.id, correct);

      if (correct === questions.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsQuizSubmitted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correct += 1;
      }
    });
    return correct;
  };

  const isVtuActive = curriculumService.getActiveContext().university.toLowerCase().includes('vtu') || curriculumService.getActiveContext().university.toLowerCase().includes('visvesvaraya');

  // Reassessment questions for targeted remedial intervention
  const REASSESSMENT_QUESTIONS = isVtuActive ? [
    {
      question: 'What is the time complexity of inserting a new node at the head of a Singly Linked List?',
      options: ['O(1) Constant Time', 'O(N) Linear Time', 'O(log N) Logarithmic', 'O(N^2) Quadratic'],
      correctAnswerIndex: 0,
      explanation: 'Head insertion only reassigns the new node next pointer to head, taking O(1) constant time without shifting array elements.'
    },
    {
      question: 'In C programming, which function is used to allocate dynamic memory on the heap for a structure node?',
      options: ['malloc()', 'calloc() only', 'realloc()', 'free()'],
      correctAnswerIndex: 0,
      explanation: 'malloc(sizeof(Node)) allocates a contiguous memory block on the heap and returns a pointer to the address.'
    },
    {
      question: 'In OS CPU Scheduling, which algorithm yields the minimum average waiting time for a given set of processes?',
      options: ['SJF (Shortest Job First / Preemptive SRTF)', 'FCFS (First Come First Served)', 'Round Robin (Quantum = 2)', 'Priority Scheduling'],
      correctAnswerIndex: 0,
      explanation: 'SJF is provably optimal for minimizing average process waiting time.'
    }
  ] : [
    {
      question: 'In TCP Slow Start, if cwnd is 4 MSS and 4 ACKs arrive in 1 RTT, what is the new cwnd?',
      options: ['5 MSS (+1 linear)', '8 MSS (*2 exponential doubling)', '16 MSS', '4 MSS (unchanged)'],
      correctAnswerIndex: 1,
      explanation: 'Slow Start doubles cwnd every RTT upon arrival of ACKs: 4 MSS * 2 = 8 MSS.'
    },
    {
      question: 'What triggers TCP to transition from Slow Start to Congestion Avoidance?',
      options: ['Reaching the Slow Start Threshold (ssthresh)', 'Receiver Buffer Zero Window', 'Three Duplicate ACKs', 'Router Queue Timeout'],
      correctAnswerIndex: 0,
      explanation: 'When cwnd reaches ssthresh, TCP switches to AIMD linear growth (cwnd += 1 per RTT).'
    },
    {
      question: 'Which raw materials are converted into Glucose during Photosynthesis?',
      options: ['Carbon Dioxide (CO2) + Water (H2O) + Sunlight', 'Oxygen (O2) + Nitrogen (N2)', 'Glucose + Starch', 'Carbon Dioxide + Oxygen'],
      correctAnswerIndex: 0,
      explanation: '6CO2 + 6H2O + Light -> C6H12O6 + 6O2.'
    }
  ];

  const handleReassessmentSubmit = () => {
    let correct = 0;
    REASSESSMENT_QUESTIONS.forEach((q, i) => {
      if (reassessmentAnswers[i] === q.correctAnswerIndex) correct += 1;
    });

    setIsReassessmentSubmitted(true);

    if (activeIntervention) {
      sharedState.completeIntervention(activeIntervention.id, correct);
      sharedState.updateStudentMarks(currentStudent.id, activeIntervention.concept, correct, REASSESSMENT_QUESTIONS.length, 'Intervention Reassessment');
    }

    if (correct >= 2) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      
      {/* 1. Top Banner: Learner Header + Tab Switcher */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-emerald-300 shadow-xs"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
                <span>{currentStudent.name}</span>
              </h2>
              <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                Student Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject: <strong className="text-slate-900">{lessonPlan.subject}</strong> • Topic: <strong className="text-emerald-700">
                {studentLanguage === 'Kannada' ? (lessonPlan.topicKannada || lessonPlan.topic) : (studentLanguage === 'Hindi' ? lessonPlan.topicHindi : lessonPlan.topic)}
              </strong>
            </p>
          </div>
        </div>

        {/* Student Nav Tabs: My Learning | Calendar & Prerequisites | Assessments */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setStudentNavTab('learning')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                studentNavTab === 'learning' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Learning</span>
            </button>

            <button
              onClick={() => setStudentNavTab('calendar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                studentNavTab === 'calendar' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendar & Path</span>
            </button>

            <button
              onClick={() => setStudentNavTab('assessments')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                studentNavTab === 'assessments' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Assessments ({assessments.filter(a => a.studentId === currentStudent.id).length})</span>
            </button>
          </div>

          <button
            onClick={onSwitchToTeacher}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1 transition-all shadow-xs cursor-pointer"
          >
            <span>👩‍🏫 Teacher View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* 2. Assigned Intervention Alert Banner (Student Workflow Item 7) */}
      {studentActiveIntervention && (
        <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-400 p-4 sm:p-5 shadow-sm space-y-2 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-wider">
                🎯 Assigned Review & Reassessment: {studentActiveIntervention.concept}
              </h3>
            </div>
            <button
              onClick={() => {
                setActiveIntervention(studentActiveIntervention);
                setIsReassessmentOpen(true);
                setReassessmentAnswers({});
                setReassessmentQIndex(0);
                setIsReassessmentSubmitted(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all cursor-pointer self-start sm:self-auto"
            >
              <span>Proceed to Reassessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-amber-950 font-medium leading-relaxed">
            <strong>Teacher Remedial Instructions:</strong> {studentActiveIntervention.reviewNotes}
          </p>
        </div>
      )}

      {/* TAB 1: MY LEARNING (Text, Voice, Visual, and Quiz Modes) */}
      {studentNavTab === 'learning' && (
        <div className="space-y-5">
          
          {/* Mode Switcher Bar: Visual | Text | Voice | Quiz + Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-600 mr-1">Learning Modality:</span>
              <button
                onClick={() => setActiveLearningMode('visual')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeLearningMode === 'visual' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual Mode</span>
              </button>

              <button
                onClick={() => setActiveLearningMode('text')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeLearningMode === 'text' ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Text Mode</span>
              </button>

              <button
                onClick={() => setActiveLearningMode('voice')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeLearningMode === 'voice' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Q&A</span>
              </button>

              <button
                onClick={() => setActiveLearningMode('quiz')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeLearningMode === 'quiz' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Quiz Check</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
                <Languages className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5" />
                <button
                  onClick={() => handleSetStudentLanguage('English')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    studentLanguage === 'English' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleSetStudentLanguage('Hindi')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    studentLanguage === 'Hindi' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => handleSetStudentLanguage('Kannada')}
                  className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    studentLanguage === 'Kannada' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ಕನ್ನಡ
                </button>
              </div>

              {/* Explanation Tier Switcher */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs border border-slate-200">
                <button
                  onClick={() => setExplanationTier('beginner')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    explanationTier === 'beginner' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {studentLanguage === 'Kannada' ? 'ಸಸ್ಯದ ಅಡುಗೆಮನೆ' : 'Tier 1 (Analogy)'}
                </button>
                <button
                  onClick={() => setExplanationTier('standard')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    explanationTier === 'standard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tier 2 (Core)
                </button>
                <button
                  onClick={() => setExplanationTier('advanced')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    explanationTier === 'advanced' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tier 3 (Deep)
                </button>
              </div>
            </div>
          </div>

          {/* Main Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Col (7 cols): Multimodal Canvas & Teacher Attached Resources */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
                
                {/* Visual Diagram Mode */}
                {(activeLearningMode === 'visual' || activeLearningMode === 'text') && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                    <DynamicConceptVisualizer
                      visualResult={{
                        id: 'vis-student-current',
                        teacher_request: lessonPlan.topic,
                        transcript: lessonPlan.topic,
                        university: curriculumService.getActiveContext().university,
                        subject: `${curriculumService.getActiveContext().subjectCode} - ${curriculumService.getActiveContext().subjectTitle}`,
                        topic: lessonPlan.topic,
                        visual_type: '3d_interactive',
                        generation_status: 'SUCCESS',
                        grounding_sources: [
                          { title: `${curriculumService.getActiveContext().subjectCode} Syllabus Ground Truth`, page: 'Module 1-5' }
                        ],
                        asset_url: lessonPlan.visualDiagram?.imageUrl,
                        interactive_data: lessonPlan.topic.toLowerCase().includes('linked list') || lessonPlan.topic.toLowerCase().includes('data structure') ? {
                          type: 'linked_list_insertion',
                          title: 'Singly Linked List Pointer Operations',
                          pointerSteps: [
                            { step: 1, action: 'Allocate memory for New Node in RAM heap.', code: 'Node* newNode = (Node*)malloc(sizeof(Node));' },
                            { step: 2, action: 'Assign node data and set next pointer to target node.', code: 'newNode->data = 15; newNode->next = prevNode->next;' },
                            { step: 3, action: 'Update previous node pointer to new node.', code: 'prevNode->next = newNode;' },
                            { step: 4, action: 'O(1) insertion completed cleanly.', code: '// Verified curriculum execution' }
                          ]
                        } : undefined,
                        created_at: new Date().toISOString(),
                        is_exploratory: false,
                        teacher_notes: `Grounded in official ${curriculumService.getActiveContext().university} ${curriculumService.getActiveContext().subjectCode} curriculum.`
                      }}
                    />
                  </div>
                )}

                {/* Text Explanation Mode */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800 uppercase">
                      {explanationTier === 'beginner' && '👶 Tier 1: Concrete Analogy'}
                      {explanationTier === 'standard' && '📘 Tier 2: Standard NCERT Curriculum'}
                      {explanationTier === 'advanced' && '🚀 Tier 3: Extension Deep Dive'}
                    </span>
                    <span className="text-[10px] text-slate-500">NCERT Grounded</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {explanationTier === 'beginner' && (studentLanguage === 'Kannada' ? (lessonPlan.beginnerExplanation.summaryKannada || lessonPlan.beginnerExplanation.summary) : (studentLanguage === 'Hindi' ? lessonPlan.beginnerExplanation.summaryHindi : lessonPlan.beginnerExplanation.summary))}
                    {explanationTier === 'standard' && (studentLanguage === 'Kannada' ? (lessonPlan.standardLesson.sections[0]?.teacherTalkingPointsKannada?.[0] || lessonPlan.standardLesson.sections[0]?.teacherTalkingPoints[0]) : (studentLanguage === 'Hindi' ? (lessonPlan.standardLesson.sections[0]?.teacherTalkingPointsHindi?.[0] || lessonPlan.standardLesson.sections[0]?.teacherTalkingPoints[0]) : lessonPlan.standardLesson.sections[0]?.teacherTalkingPoints[0]))}
                    {explanationTier === 'advanced' && (studentLanguage === 'Kannada' ? (lessonPlan.advancedActivity.inquiryChallengeKannada || lessonPlan.advancedActivity.inquiryChallenge) : (studentLanguage === 'Hindi' ? lessonPlan.advancedActivity.inquiryChallengeHindi : lessonPlan.advancedActivity.inquiryChallenge))}
                  </p>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <strong className="text-emerald-800">Analogy: </strong>
                    {explanationTier === 'beginner' && (studentLanguage === 'Kannada' ? (lessonPlan.beginnerExplanation.keyAnalogyKannada || lessonPlan.beginnerExplanation.keyAnalogy) : (studentLanguage === 'Hindi' ? lessonPlan.beginnerExplanation.keyAnalogyHindi : lessonPlan.beginnerExplanation.keyAnalogy))}
                    {explanationTier === 'standard' && "Conservation of Mass: 6CO2 + 6H2O with Light Energy produces 1 Glucose (C6H12O6) + 6 Oxygen."}
                    {explanationTier === 'advanced' && (lessonPlan.advancedActivity.inquiryChallenge)}
                  </div>
                </div>

                {/* Teacher-Added Attached Resources (Diagram Notes & Video Links) */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>Teacher-Attached Lesson Resources</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">2 Materials</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center space-x-1">
                          <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                          <span>
                            {curriculumService.getActiveContext().university?.includes('VTU') || curriculumService.getActiveContext().subjectCode?.includes('1BCS')
                              ? 'VTU 1BCS305 Pointer Memory Layout Note'
                              : 'Chloroplast Vector Note'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">Diagram Notes</div>
                      </div>
                      <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        Viewed
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center space-x-1">
                          <Video className="w-3.5 h-3.5 text-rose-600" />
                          <span>
                            {curriculumService.getActiveContext().university?.includes('VTU') || curriculumService.getActiveContext().subjectCode?.includes('1BCS')
                              ? 'Horowitz-Sahni Linked List Animation'
                              : 'Molecular Animation'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {curriculumService.getActiveContext().university?.includes('VTU') || curriculumService.getActiveContext().subjectCode?.includes('1BCS')
                            ? '18 min video'
                            : '12 min video'}
                        </div>
                      </div>
                      <a
                        href={curriculumService.getActiveContext().university?.includes('VTU') || curriculumService.getActiveContext().subjectCode?.includes('1BCS')
                          ? 'https://www.youtube.com/watch?v=njTh_OwMljA'
                          : 'https://www.youtube.com/watch?v=LE2Xl5P4w3E'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200 flex items-center space-x-1"
                      >
                        <span>Watch</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Col (5 cols): AI Socratic Voice Tutor & Formative Quiz Check */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* AI Socratic Tutor Box */}
              <div id="student-voice-chat" className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 space-y-3.5 shadow-xs flex flex-col h-[360px]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      AI Socratic Voice Tutor
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Sub-800ms STT/TTS
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                  {voiceMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl ${
                          msg.sender === 'student'
                            ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-br-none'
                            : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 text-[9px] text-slate-500 font-semibold">
                          <span>{msg.sender === 'student' ? currentStudent.name : 'MINDMESH AI Tutor'}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={studentSpokenInput}
                      onChange={(e) => setStudentSpokenInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendVoiceQuestion(studentSpokenInput)}
                      placeholder="Ask anything or tap mic..."
                      className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
                    />
                    <button
                      onClick={() => handleSendVoiceQuestion(studentSpokenInput || "Tell me about stomata")}
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsVoiceActive(!isVoiceActive);
                        if (!isVoiceActive) handleSendVoiceQuestion("Explain the plant kitchen recipe");
                      }}
                      className={`p-2 rounded-xl border font-bold transition-all cursor-pointer ${
                        isVoiceActive ? 'bg-rose-600 text-white border-rose-600 animate-pulse' : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-600" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Formative Quiz Check */}
              <div id="student-quiz-section" className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Formative Check: Q{currentQIndex + 1} of {questions.length}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">DKT Sync</span>
                </div>

                {!isQuizSubmitted ? (
                  <div className="space-y-3 text-xs">
                    <p className="font-semibold text-slate-800">
                      {studentLanguage === 'Kannada' ? (currentQ.questionKannada || currentQ.question) : (studentLanguage === 'Hindi' ? currentQ.questionHindi : currentQ.question)}
                    </p>

                    <div className="space-y-1.5">
                      {(studentLanguage === 'Kannada' ? (currentQ.optionsKannada || currentQ.options) : (studentLanguage === 'Hindi' ? currentQ.optionsHindi : currentQ.options)).map((opt, idx) => {
                        const isSelected = selectedAnswers[currentQIndex] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => {
                          const qText = studentLanguage === 'Kannada' 
                            ? (currentQ.questionKannada || currentQ.question)
                            : (studentLanguage === 'Hindi' ? currentQ.questionHindi : currentQ.question);
                          onSpeakText(qText, studentLanguage);
                        }}
                        className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Listen Question</span>
                      </button>

                      <button
                        disabled={selectedAnswers[currentQIndex] === undefined}
                        onClick={handleNextQuiz}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold transition-all flex items-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <span>{currentQIndex < questions.length - 1 ? 'Next Question' : 'Submit & Sync Score'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 text-center space-y-2 border border-emerald-300">
                    <div className="text-xl font-black text-emerald-700">
                      {calculateScore()} / {questions.length} Correct
                    </div>
                    <p className="text-xs text-slate-600">
                      {calculateScore() === questions.length ? "Outstanding! Mastery updated and next topic unlocked." : "Good effort! Practice makes permanent."}
                    </p>
                    <button
                      onClick={handleResetQuiz}
                      className="mt-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold inline-flex items-center space-x-1 shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Quiz</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: CALENDAR & PREREQUISITES (Student Workflow Item 1) */}
      {studentNavTab === 'calendar' && (
        <div className="space-y-4">
          <CalendarView
            currentPersona="student"
            events={calendarEvents}
            onOpenLesson={() => setStudentNavTab('learning')}
          />
        </div>
      )}

      {/* TAB 3: ASSESSMENTS HISTORY (Student Workflow Item 3) */}
      {studentNavTab === 'assessments' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recorded Assessment & Quiz Telemetry Ledger
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono font-bold">
              Shared State Synchronized
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="p-3">Date</th>
                  <th className="p-3">Topic / Concept</th>
                  <th className="p-3">Modality Mode</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Mastery %</th>
                  <th className="p-3">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {assessments.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70">
                    <td className="p-3 font-mono text-slate-500">{record.date}</td>
                    <td className="p-3 font-bold text-slate-900">{record.topic}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                        {record.mode}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-sky-700">
                      {record.score} / {record.maxScore}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        record.masteryPercentage >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {record.masteryPercentage}%
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 text-[11px]">{record.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REASSESSMENT MODAL (Targeted Remedial Checkpoint) */}
      {isReassessmentOpen && activeIntervention && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  Targeted Reassessment
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeIntervention.concept}
                </h3>
              </div>
              <button onClick={() => setIsReassessmentOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {!isReassessmentSubmitted ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center text-slate-500 font-bold">
                  <span>Question {reassessmentQIndex + 1} of {REASSESSMENT_QUESTIONS.length}</span>
                </div>

                <p className="font-semibold text-slate-900 text-sm">
                  {REASSESSMENT_QUESTIONS[reassessmentQIndex].question}
                </p>

                <div className="space-y-2">
                  {REASSESSMENT_QUESTIONS[reassessmentQIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setReassessmentAnswers(prev => ({ ...prev, [reassessmentQIndex]: i }))}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        reassessmentAnswers[reassessmentQIndex] === i ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button
                    disabled={reassessmentQIndex === 0}
                    onClick={() => setReassessmentQIndex(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 disabled:opacity-40 text-slate-700 font-semibold"
                  >
                    Previous
                  </button>

                  {reassessmentQIndex < REASSESSMENT_QUESTIONS.length - 1 ? (
                    <button
                      disabled={reassessmentAnswers[reassessmentQIndex] === undefined}
                      onClick={() => setReassessmentQIndex(prev => prev + 1)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      disabled={reassessmentAnswers[reassessmentQIndex] === undefined}
                      onClick={handleReassessmentSubmit}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Submit Reassessment
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2.5">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-extrabold text-emerald-900">Reassessment Complete!</h4>
                <p className="text-xs text-emerald-800">
                  Your intervention has been submitted to the shared state. Topic mastery recalibrated to <strong>88%</strong> and logged on the Teacher Radar.
                </p>
                <button
                  onClick={() => {
                    setIsReassessmentOpen(false);
                    setStudentNavTab('learning');
                  }}
                  className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Return to Learning Canvas
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
