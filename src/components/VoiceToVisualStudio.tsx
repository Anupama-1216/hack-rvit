import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Eye, 
  RotateCcw, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Send, 
  Volume2, 
  Box, 
  Compass, 
  Info,
  Sparkle
} from 'lucide-react';
import { CourseContext, VisualExplanationResult } from '../types';
import { voiceService } from '../services/voiceService';
import { visualGenerationService } from '../services/visualGenerationService';
import { DynamicConceptVisualizer } from './DynamicConceptVisualizer';

interface VoiceToVisualStudioProps {
  currentContext: CourseContext;
}

export const VoiceToVisualStudio: React.FC<VoiceToVisualStudioProps> = ({ currentContext }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [editableTranscript, setEditableTranscript] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedVisual, setGeneratedVisual] = useState<VisualExplanationResult | null>(null);
  const [refinementText, setRefinementText] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);

  useEffect(() => {
    voiceService.setCallbacks(
      (text: string, isFinal: boolean) => {
        setTranscript(text);
        setEditableTranscript(text);
      },
      (listening: boolean) => {
        setIsRecording(listening);
      },
      (level: number) => {
        setAudioLevel(level);
      }
    );
  }, []);

  const handleToggleRecording = async () => {
    if (isRecording) {
      await voiceService.stopListening();
      setIsRecording(false);
      if (editableTranscript.trim().length > 3) {
        handleGenerateVisual(editableTranscript);
      }
    } else {
      setTranscript('');
      setEditableTranscript('');
      await voiceService.startListening('en-IN');
    }
  };

  const handleGenerateVisual = async (inputText: string) => {
    if (!inputText.trim()) return;
    setIsGenerating(true);

    const result = await visualGenerationService.generateVisualFromVoice(
      inputText,
      inputText,
      currentContext
    );

    setGeneratedVisual(result);
    setIsGenerating(false);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementText.trim() || !generatedVisual) return;
    const combinedPrompt = `${generatedVisual.teacher_request}. Refinement instruction: ${refinementText}`;
    setEditableTranscript(combinedPrompt);
    handleGenerateVisual(combinedPrompt);
    setRefinementText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Studio */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <span>Voice-to-Visual AI Assistant</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                {currentContext.subjectCode}
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Speak teaching ideas naturally to generate source-grounded 2D diagrams & 3D interactive explanations.
            </p>
          </div>
        </div>

        {/* Current Active Context Badge */}
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
          <span className="font-bold">{currentContext.university}</span>
          <span className="text-slate-400">•</span>
          <span className="font-semibold text-purple-700">{currentContext.subjectTitle}</span>
        </div>
      </div>

      {/* Main Grid: Voice Input Control Left, Visual Renderer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Voice Input & Transcript Studio */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-5">
            
            {/* Big Mic Recording Button */}
            <div className="text-center py-4 space-y-3">
              <button
                onClick={handleToggleRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all shadow-lg cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200 scale-105'
                    : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {isRecording ? 'Listening... Speak your teaching idea' : 'Click to Speak Teaching Request'}
                </span>
                <span className="text-[11px] text-slate-500">
                  Example: "Create a visual explanation of how insertion works in a singly linked list."
                </span>
              </div>

              {/* Audio Wave Meter */}
              {isRecording && (
                <div className="flex items-center justify-center space-x-1 pt-1">
                  <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-10 bg-rose-500 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce delay-100" />
                </div>
              )}
            </div>

            {/* Editable Transcript Text Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Recognized Teaching Intent:</span>
                {transcript && <span className="text-[10px] text-emerald-600 font-bold">Speech Captured</span>}
              </label>
              <textarea
                rows={4}
                value={editableTranscript}
                onChange={(e) => setEditableTranscript(e.target.value)}
                placeholder="Transcribed voice prompt will appear here. You can also type or edit your instructions directly..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Sample Ideas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    const text = "Create a visual explanation of how insertion works in a singly linked list. Show how the new node is connected to the existing nodes and explain the pointer changes step by step.";
                    setEditableTranscript(text);
                    handleGenerateVisual(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                >
                  Singly Linked List Insertion
                </button>
                <button
                  onClick={() => {
                    const text = "Show Binary Search Tree (BST) inorder traversal step by step with node visits.";
                    setEditableTranscript(text);
                    handleGenerateVisual(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                >
                  BST Inorder Traversal
                </button>
                <button
                  onClick={() => {
                    const text = "Explain OS CPU scheduling process state transitions and Round Robin Gantt timeline.";
                    setEditableTranscript(text);
                    handleGenerateVisual(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                >
                  OS Process Scheduling
                </button>
                <button
                  onClick={() => {
                    const text = "Explain Quantum Key Distribution (QKD) BB84 photon polarization protocol.";
                    setEditableTranscript(text);
                    handleGenerateVisual(text);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold cursor-pointer"
                >
                  Exploratory Quantum Concept
                </button>
              </div>
            </div>

            {/* Action Generate Button */}
            <button
              onClick={() => handleGenerateVisual(editableTranscript)}
              disabled={isGenerating || !editableTranscript.trim()}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'Generating Visual Model...' : 'Generate Visual Explanation'}</span>
            </button>

          </div>
        </div>

        {/* Right Column (7 cols): Generated Visual Model & Grounding Metadata */}
        <div className="lg:col-span-7 space-y-4">
          {generatedVisual ? (
            <div className="space-y-4">
              
              {/* Grounding Rationale Banner */}
              <div className={`p-4 rounded-2xl border text-xs flex items-start space-x-3 ${
                generatedVisual.is_exploratory
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                {generatedVisual.is_exploratory ? (
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-extrabold flex items-center space-x-2">
                    <span>{generatedVisual.is_exploratory ? 'Exploratory Teaching Idea' : 'Source-Grounded Visual'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-bold border">
                      {generatedVisual.visual_type === '3d_interactive' ? '3D / Interactive Model' : '2D Diagram'}
                    </span>
                  </h4>
                  <p className="mt-0.5 text-[11px]">
                    {generatedVisual.teacher_notes}
                  </p>
                </div>
              </div>

              {/* Dynamic Visual Render Canvas */}
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
                <DynamicConceptVisualizer visualResult={generatedVisual} />
              </div>

              {/* Source Traceability & Grounding Metadata */}
              <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Grounding Educational Sources ({generatedVisual.grounding_sources.length})</span>
                </h4>
                <div className="space-y-2">
                  {generatedVisual.grounding_sources.map((src, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="font-bold text-slate-800">{src.title}</span>
                      <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {src.page || src.citation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Natural Language Refinement Form */}
              <form onSubmit={handleRefineSubmit} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-xs flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Refine visual (e.g., 'Show node deletion', 'Add step 4', 'Translate to Hindi')..."
                  value={refinementText}
                  onChange={e => setRefinementText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Refine</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 space-y-3">
              <Box className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">No Visual Model Generated Yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click the microphone button on the left or select a sample prompt to generate a 2D diagram or 3D interactive explanation.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
