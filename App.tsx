import React, { useState, useMemo } from 'react';
import { phases } from './data';
import { WorkflowItem } from './types';
import WorkflowCard from './components/WorkflowCard';
import PromptModal from './components/PromptModal';
import { Layers, Terminal, Database, PlayCircle, Rocket, BarChart2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);

  const currentPhase = useMemo(() => 
    phases.find(p => p.id === selectedPhaseId), 
  [selectedPhaseId]);

  const icons: Record<number, React.ReactNode> = {
    1: <Database size={20} />,
    2: <Terminal size={20} />,
    3: <Layers size={20} />,
    4: <PlayCircle size={20} />,
    5: <BarChart2 size={20} />,
    6: <Rocket size={20} />
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10 shadow-sm">
        <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <Terminal size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 leading-tight">FM Dev Workflow</h1>
                    <p className="text-xs text-gray-500 font-medium">Prompt Manager</p>
                </div>
            </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhaseId(phase.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 group ${
                selectedPhaseId === phase.id
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={`p-2 rounded-md transition-colors ${
                  selectedPhaseId === phase.id ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-gray-200'
              }`}>
                {icons[phase.id]}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-0.5">Phase {phase.id}</span>
                <span className="font-medium text-sm">{phase.title}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                v1.0.0 • Claude & Gemini Power
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                        Phase {currentPhase?.id}
                    </span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{currentPhase?.title}</h2>
                <p className="text-gray-500 mt-2 text-lg">Select a workflow module below to generate its prompt.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentPhase?.workflows.map((workflow) => (
                <WorkflowCard
                    key={workflow.id}
                    workflow={workflow}
                    onClick={setSelectedWorkflow}
                />
            ))}
            </div>
        </div>
      </main>

      {/* Modal */}
      {selectedWorkflow && (
        <PromptModal
          workflow={selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
        />
      )}
    </div>
  );
};

export default App;