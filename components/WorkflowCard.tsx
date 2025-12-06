import React from 'react';
import { WorkflowItem } from '../types';
import ModelBadge from './ModelBadge';
import { ArrowRight } from 'lucide-react';

interface WorkflowCardProps {
  workflow: WorkflowItem;
  onClick: (workflow: WorkflowItem) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {
  return (
    <div 
      onClick={() => onClick(workflow)}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-semibold text-gray-400">ID: {workflow.id}</span>
        <ModelBadge model={workflow.model} />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {workflow.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 flex-grow">
        {workflow.description}
      </p>
      
      <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
        View Prompt
        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default WorkflowCard;