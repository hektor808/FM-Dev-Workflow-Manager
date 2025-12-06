import React from 'react';
import { ModelType } from '../types';
import { Zap, Brain } from 'lucide-react';

interface ModelBadgeProps {
  model: ModelType;
}

const ModelBadge: React.FC<ModelBadgeProps> = ({ model }) => {
  const isOpus = model.includes('Opus');
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      isOpus 
        ? 'bg-purple-100 text-purple-700 border-purple-200' 
        : 'bg-amber-100 text-amber-700 border-amber-200'
    }`}>
      {isOpus ? <Brain size={12} /> : <Zap size={12} />}
      {model}
    </span>
  );
};

export default ModelBadge;