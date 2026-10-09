import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Send, 
  RefreshCw, 
  Volume2, 
  Clock, 
  Layers,
  HelpCircle,
  Play
} from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

interface VoiceCoPilotBarProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcript: string;
  setTranscript: (text: string) => void;
  onToggleListen: () => void;
  onSubmitCommand: (text: string) => void;
  onToggleSpeech: () => void;
  agentSpeechSummary: string;
  onOpenBhashiniConfig?: () => void;
}

export const VoiceCoPilotBar: React.FC<VoiceCoPilotBarProps> = ({
  isListening,
  isProcessing,
  isSpeaking,
  transcript,
  setTranscript,
  onToggleListen,
  onSubmitCommand,
  onToggleSpeech,
  agentSpeechSummary,
  onOpenBhashiniConfig,
}) => {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const DEMO_PROMPTS = [
    {
      id: 'p-sched',
      label: '📅 "Schedule a class for me in 10 min"',
      prompt: 'Schedule a class for me in 10 min on Computer Networks TCP Flow Control.',
      tag: 'Autonomous Scheduling'
    },
    {
      id: 'p-interv',
      label: '🎯 "Rahul is weak in Slow Start, schedule an intervention"',
      prompt: 'My student Rahul Sharma is weak in Slow Start, schedule an intervention review and reassessment.',
      tag: 'Targeted Remedial'
    },
    {
      id: 'p-marks',
      label: '📝 "Edit marks for Aarav to 9 out of 10"',
      prompt: 'Edit marks for Aarav Sharma to 9 out of 10 in Slow Start.',
      tag: 'Voice Gradebook'
    },
    {
      id: 'p-cn',
      label: '🌐 30m Computer Networks (CN • Rahul Weak in Slow Start & Flow Control)',
      prompt: 'I have a 30-minute class on Computer Networks (CN) to teach TCP Congestion Control and Flow Control. My student Rahul Sharma is weak in Slow Start and Flow Control, so please scaffold the lesson and update his Learning Twin.',
      tag: 'CN 30m Workflow'
    },
    {
      id: 'p1',
      label: '🌱 40m Photosynthesis (Bilingual + 3 At-Risk)',
      prompt: 'I need a 40-minute Grade 7 science lesson on photosynthesis, in English and Hindi. Use my uploaded chapter notes. Three students need simpler explanations, and the exam is next week.',
      tag: 'Primary Flow'
    },
    {
      id: 'p2',
      label: '⚡ "Reduce this to 20 minutes (Class is behind)"',
      prompt: 'The class is behind; reduce this to 20 minutes.',
      tag: 'Dynamic Replan'
    },
    {
      id: 'p-qa',
      label: '❓ Siri Q&A: "What is photosynthesis?"',
      prompt: 'What is photosynthesis and how do stomata regulate gas exchange?',
      tag: 'Voice Q&A'
    },
    {
      id: 'p3',
      label: '🌟 "ಕನ್ನಡದಲ್ಲಿ ವಿವರಿಸಿ (Explain in Kannada)"',
      prompt: 'ಕನ್ನಡದಲ್ಲಿ ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ (Photosynthesis) ಪಾಠವನ್ನು ವಿವರಿಸಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಸಪ್ರಶ್ನೆ ರಚಿಸಿ.',
      tag: 'ಕನ್ನಡ Voice'
    }
  ];

  const handleChipClick = (prompt: string, id: string) => {
    setActiveChip(id);
    setTranscript(prompt);
    onSubmitCommand(prompt);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      onSubmitCommand(transcript.trim());
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="relative rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 shadow-xs backdrop-blur-sm">
        
        <div className="relative flex flex-col space-y-3.5">
          
          {/* Top Row: Voice Orb, Waveform, Status & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center space-x-3.5">
              {/* Mic / Voice Button */}
              <button
                onClick={onToggleListen}
                disabled={isProcessing}
                className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 shadow-sm cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white shadow-rose-200 ring-4 ring-rose-200 animate-pulse'
                    : isProcessing
                    ? 'bg-amber-500 text-white shadow-amber-200'
                    : 'bg-sky-600 hover:bg-sky-700 text-white hover:shadow-md'
                }`}
                title={isListening ? "Click to stop listening" : "Click to speak with MINDMESH-NEXUS Voice Agent"}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-white" />
                ) : isProcessing ? (
                  <RefreshCw className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-slate-900 flex items-center">
                    {isListening ? (
                      <span className="text-rose-600 flex items-center space-x-1.5 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                        <span>Listening... (Digital India Bhashini Indic ASR & Mic)</span>
                      </span>
                    ) : isProcessing ? (
                      <span className="text-amber-700 flex items-center space-x-1.5 font-bold">
                        <Sparkles className="w-4 h-4 animate-spin text-amber-600" />
                        <span>MINDMESH-NEXUS Agent Reasoning & Grounding...</span>
                      </span>
                    ) : isSpeaking ? (
                      <span className="text-indigo-700 flex items-center space-x-1.5 font-bold">
                        <Volume2 className="w-4 h-4 animate-bounce text-indigo-600" />
                        <span>MINDMESH-NEXUS Voice Co-Pilot Speaking Aloud</span>
                      </span>
                    ) : (
                      <span className="text-slate-900 font-extrabold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-sky-600" />
                        Voice-First AI Educator Co-Pilot
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span>Speak natural requirements in English, Hindi, or Kannada</span>
                  {onOpenBhashiniConfig && (
                    <button
                      type="button"
                      onClick={onOpenBhashiniConfig}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition-colors"
                    >
                      🇮🇳 Bhashini Active
                    </button>
                  )}
                </p>
              </div>
            </div>

            {/* Audio Waveform Display */}
            <div className="hidden sm:flex items-center px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
              <span className="text-[10px] font-mono text-emerald-700 font-bold mr-2">BHASHINI STREAM</span>
              <AudioVisualizer isActive={isListening || isSpeaking} height={24} barCount={18} />
            </div>

            {/* Agent Voice Playback Controller */}
            {agentSpeechSummary && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onToggleSpeech}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                    isSpeaking
                      ? 'bg-indigo-50 text-indigo-800 border-indigo-300 ring-2 ring-indigo-200'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-indigo-600' : 'text-slate-500'}`} />
                  <span>{isSpeaking ? 'Pause Audio' : 'Play Explanation'}</span>
                </button>
              </div>
            )}

          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleFormSubmit} className="relative flex items-center">
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Speak or type: 'I need a 40-minute Grade 7 science lesson on photosynthesis in English and Hindi...'"
              disabled={isProcessing}
              className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-24 py-3 outline-none transition-all shadow-xs"
            />
            <button
              type="submit"
              disabled={!transcript.trim() || isProcessing}
              className="absolute right-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Execute</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Demo Voice Scenario Chips (Matching Official Theme & Multilingual Flow) */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-[11px] font-bold text-slate-500 flex items-center mr-1">
              <Sparkles className="w-3 h-3 text-sky-600 mr-1" /> Spoken Shortcuts:
            </span>
            {DEMO_PROMPTS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleChipClick(item.prompt, item.id)}
                className={`group flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  activeChip === item.id
                    ? 'bg-sky-50 text-sky-900 border-sky-300 font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
                title={item.prompt}
              >
                <span>{item.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-800 font-semibold">
                  {item.tag}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
