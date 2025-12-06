import React, { useState } from 'react';
import { WorkflowItem } from '../types';
import ModelBadge from './ModelBadge';
import { X, Copy, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { generateWithGemini } from '../services/geminiService';

interface PromptModalProps {
  workflow: WorkflowItem | null;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ workflow, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!workflow) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(workflow.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunGemini = async () => {
    setIsLoading(true);
    setGeminiResult(null);
    setError(null);
    
    const response = await generateWithGemini(workflow.prompt, workflow.model);
    
    if (response.error) {
        setError(response.error);
    } else {
        setGeminiResult(response.text);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold text-gray-400">ID: {workflow.id}</span>
              <ModelBadge model={workflow.model} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{workflow.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{workflow.description}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                 Prompt Content
              </h3>
              <div className="flex gap-3">
                 <button
                  onClick={handleRunGemini}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-md transition-all disabled:opacity-50 shadow-sm"
                >
                  <Sparkles size={16} />
                  {isLoading ? 'Running Gemini...' : 'Run with Gemini'}
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors shadow-sm"
                >
                  {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed border border-gray-800 shadow-inner whitespace-pre-wrap">
                {workflow.prompt}
              </pre>
            </div>
          </div>

          {/* Gemini Result Section */}
          {(geminiResult || isLoading || error) && (
             <div className="mt-8 pt-8 border-t border-gray-100 animate-in slide-in-from-bottom-4 fade-in">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-indigo-600" size={20}/>
                    <h3 className="font-bold text-gray-900">Gemini Response</h3>
                </div>
                
                {isLoading && (
                    <div className="flex items-center justify-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 flex-shrink-0" size={20}/>
                        <div>
                            <p className="font-semibold">Execution Failed</p>
                            <p className="text-sm mt-1">{error}</p>
                            <p className="text-xs mt-2 text-red-500">Note: Ensure a valid API Key is present in the environment variables.</p>
                        </div>
                    </div>
                )}

                {geminiResult && (
                     <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-6">
                        <pre className="text-gray-800 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                            {geminiResult}
                        </pre>
                     </div>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;