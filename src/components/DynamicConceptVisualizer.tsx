import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, Layers, Cpu, Code, ArrowRight } from 'lucide-react';
import { VisualExplanationResult } from '../types';

interface DynamicConceptVisualizerProps {
  visualResult: VisualExplanationResult;
}

export const DynamicConceptVisualizer: React.FC<DynamicConceptVisualizerProps> = ({ visualResult }) => {
  const data = visualResult.interactive_data || {};
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Render Singly Linked List Insertion
  if (data.type === 'linked_list_insertion') {
    const steps = data.pointerSteps || [];
    const currentStepInfo = steps.find((s: any) => s.step === activeStep) || steps[0];

    return (
      <div className="space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">
              Interactive 3D / Pointer Animation
            </span>
            <h3 className="text-sm font-extrabold text-slate-900 mt-1">{data.title}</h3>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStep(prev => (prev > 1 ? prev - 1 : steps.length))}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Prev
            </button>
            <span className="text-xs font-mono font-bold text-slate-600 px-1">
              Step {activeStep} of {steps.length}
            </span>
            <button
              onClick={() => setActiveStep(prev => (prev < steps.length ? prev + 1 : 1))}
              className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Visual Node-and-Edge Memory Canvas */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white overflow-x-auto shadow-inner">
          <div className="min-w-max space-y-6">
            
            {/* Memory Address Bar */}
            <div className="flex items-center space-x-6 text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span>RAM Base Address: 0x1000</span>
              <span>•</span>
              <span>Data Structure: SinglyLinkedList</span>
              <span>•</span>
              <span className="text-emerald-400">Operation: Insertion at Index 1</span>
            </div>

            {/* Nodes Layout */}
            <div className="flex items-center space-x-6 py-4">
              
              {/* Head Pointer */}
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-sky-400 font-bold font-mono">HEAD</span>
                <p className="text-xs font-mono font-extrabold text-white mt-0.5">0x1004</p>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-500" />

              {/* Node 1 */}
              <div className="p-4 rounded-xl bg-slate-900 border-2 border-slate-700 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-mono">Addr: 0x1004</span>
                <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-extrabold text-emerald-400">Data: 10</span>
                  <span className="text-slate-600">|</span>
                  <span className={`text-xs font-mono font-bold ${activeStep >= 3 ? 'text-amber-400 font-bold' : 'text-sky-400'}`}>
                    *{activeStep >= 3 ? '0x100F (New)' : '0x1008'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block font-mono">Node A</span>
              </div>

              <ArrowRight className={`w-5 h-5 transition-all ${activeStep >= 3 ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />

              {/* New Node inserted */}
              <div className={`p-4 rounded-xl border-2 transition-all space-y-1 text-center ${
                activeStep >= 1 ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/40' : 'bg-slate-900 border-slate-800 opacity-40'
              }`}>
                <span className="text-[10px] text-amber-400 font-mono font-bold">New Node (0x100F)</span>
                <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-extrabold text-amber-300">Data: 15</span>
                  <span className="text-slate-600">|</span>
                  <span className={`text-xs font-mono ${activeStep >= 2 ? 'text-sky-400 font-bold' : 'text-slate-500'}`}>
                    *{activeStep >= 2 ? '0x1008' : 'NULL'}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold block">Inserted Node</span>
              </div>

              <ArrowRight className={`w-5 h-5 transition-all ${activeStep >= 2 ? 'text-sky-400' : 'text-slate-500'}`} />

              {/* Node 2 */}
              <div className="p-4 rounded-xl bg-slate-900 border-2 border-slate-700 text-center space-y-1">
                <span className="text-[10px] text-slate-400 font-mono">Addr: 0x1008</span>
                <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-sm font-extrabold text-emerald-400">Data: 20</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-xs font-mono text-sky-400">*0x1012</span>
                </div>
                <span className="text-[10px] text-slate-400 block font-mono">Node B</span>
              </div>

            </div>

          </div>
        </div>

        {/* Step Rationale & C Code */}
        {currentStepInfo && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900">Step {currentStepInfo.step}: {currentStepInfo.action}</span>
              <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                Pointer Logic
              </span>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
              {currentStepInfo.code}
            </pre>
          </div>
        )}

      </div>
    );
  }

  // Render Binary Tree Traversal
  if (data.type === 'binary_tree_traversal') {
    return (
      <div className="space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded uppercase">
            Tree Traversal Visualization
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">{data.title}</h3>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white text-center space-y-6">
          <div className="max-w-md mx-auto space-y-4">
            {/* Root Node */}
            <div className="w-14 h-14 rounded-full bg-purple-600 border-2 border-purple-400 flex items-center justify-center mx-auto text-lg font-black shadow-lg">
              25
            </div>
            {/* Children Row */}
            <div className="flex items-center justify-around">
              <div className="w-12 h-12 rounded-full bg-sky-600 border-2 border-sky-400 flex items-center justify-center text-sm font-bold">
                15
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center text-sm font-bold">
                35
              </div>
            </div>
            {/* Leaf Row */}
            <div className="flex items-center justify-between px-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                10
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                20
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            Inorder Sequence Output: [ 10, 15, 20, 25, 35 ] (Strictly Sorted Order)
          </div>
        </div>
      </div>
    );
  }

  // Default General Engineering Visual Model
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">
            Technical Diagram / Concept Map
          </span>
          <h3 className="text-sm font-extrabold text-slate-900 mt-1">
            {data.title || visualResult.teacher_request}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">Grounded Visual</span>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
        <img
          src={visualResult.asset_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"}
          alt={visualResult.topic}
          className="w-full h-64 object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white w-max">
            {visualResult.subject}
          </span>
          <h4 className="text-base font-extrabold mt-1">{visualResult.topic}</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {visualResult.teacher_notes}
          </p>
        </div>
      </div>
    </div>
  );
};
