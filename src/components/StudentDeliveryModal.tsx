import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Languages, 
  Volume2, 
  RefreshCw,
  Trophy,
  Brain,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LessonPlan, Student } from '../types';

interface StudentDeliveryModalProps {
  lessonPlan: LessonPlan;
  students: Student[];
  onUpdateStudentScore: (studentId: string, quizScore: number) => void;
  onSpeakText: (text: string, lang?: string) => void;
}

export const StudentDeliveryModal: React.FC<StudentDeliveryModalProps> = ({
  lessonPlan,
  students,
  onUpdateStudentScore,
  onSpeakText,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0].id);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isHindi, setIsHindi] = useState<boolean>(false);

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const questions = lessonPlan.formativeQuiz;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Calculate score & submit
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswerIndex) {
          correct += 1;
        }
      });
      setIsSubmitted(true);
      onUpdateStudentScore(currentStudent.id, correct);

      if (correct === questions.length) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsSubmitted(false);
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Student Mode Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Student Learning Portal & Formative Check
            </span>
            <span className="text-xs text-slate-400 font-mono">Live Classroom Delivery</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            {isHindi ? lessonPlan.topicHindi : lessonPlan.topic}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Simulate the interactive learner experience. Answers update mastery telemetry and reduce predicted risk scores in real-time.
          </p>
        </div>

        {/* Student Selector & Language Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 ml-2">Learner:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                handleReset();
              }}
              className="bg-slate-900 text-xs text-white rounded-lg px-2.5 py-1.5 border border-slate-700 outline-none"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.preferredLanguage} • Risk: {s.riskScore}%)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsHindi(!isHindi)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
              isHindi
                ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{isHindi ? 'हिंदी Active' : 'Switch to Hindi'}</span>
          </button>
        </div>
      </div>

      {/* Beginner Scaffold Callout if Student is at risk */}
      {currentStudent.riskScore >= 70 && (
        <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/30 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-300">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>Personalized Scaffolding for {currentStudent.name}</span>
            </div>
            <button
              onClick={() => onSpeakText(isHindi ? lessonPlan.beginnerExplanation.keyAnalogyHindi : lessonPlan.beginnerExplanation.keyAnalogy, isHindi ? 'Hindi' : 'English')}
              className="text-[11px] text-brand-300 flex items-center space-x-1 hover:underline"
            >
              <Volume2 className="w-3 h-3" />
              <span>Listen to Hint</span>
            </button>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            {isHindi ? lessonPlan.beginnerExplanation.keyAnalogyHindi : lessonPlan.beginnerExplanation.keyAnalogy}
          </p>
        </div>
      )}

      {/* Main Quiz Card */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-5 backdrop-blur-xl shadow-xl">
        
        {!isSubmitted ? (
          <>
            {/* Question Progress */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-brand-400 font-mono">
                  QUESTION {currentQIndex + 1} OF {questions.length}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">
                  Concept: <strong>{currentQ.targetedConcept}</strong>
                </span>
              </div>

              <div className="flex space-x-1.5">
                {questions.map((_, qi) => (
                  <div
                    key={qi}
                    className={`w-6 h-1.5 rounded-full transition-all ${
                      qi === currentQIndex
                        ? 'bg-brand-500 w-8'
                        : selectedAnswers[qi] !== undefined
                        ? 'bg-emerald-500/50'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {isHindi ? currentQ.questionHindi : currentQ.question}
                </h3>
                <button
                  onClick={() => onSpeakText(isHindi ? currentQ.questionHindi : currentQ.question, isHindi ? 'Hindi' : 'English')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex-shrink-0 cursor-pointer"
                  title="Read question aloud"
                >
                  <Volume2 className="w-4 h-4 text-brand-400" />
                </button>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5 pt-2">
                {(isHindi ? currentQ.optionsHindi : currentQ.options).map((opt, oi) => {
                  const isSelected = selectedAnswers[currentQIndex] === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelectOption(oi)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-500/20 border-brand-500 text-brand-200 ring-2 ring-brand-500/30'
                          : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected ? 'bg-brand-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 disabled:opacity-30 text-xs font-medium text-slate-300 transition-colors"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQIndex] === undefined}
                className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-40 text-slate-950 text-xs font-black flex items-center space-x-2 transition-all shadow-md shadow-brand-500/20"
              >
                <span>{currentQIndex === questions.length - 1 ? 'Submit & Grade' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* Results Card */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-500/20 border-2 border-brand-500 text-brand-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">
                Quiz Completed for {currentStudent.name}!
              </h3>
              <p className="text-sm text-slate-300">
                Score: <strong className="text-brand-400 text-lg">{calculateScore()} / {questions.length}</strong> ({Math.round((calculateScore() / questions.length) * 100)}%)
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                ✓ Student profile updated: Predicted exam gap risk reduced by 25%
              </p>
            </div>

            {/* Review Answers */}
            <div className="text-left space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Concept Review & Explanations
              </h4>
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswerIndex;
                return (
                  <div key={q.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                        <span className="text-xs font-bold text-white">
                          Q{idx + 1}: {isHindi ? q.questionHindi : q.question}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isCorrect ? 'Correct' : 'Needs Review'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 pl-6 leading-relaxed">
                      <strong className="text-brand-400">Explanation: </strong>
                      {isHindi ? q.explanationHindi : q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry / Test Another Learner</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
