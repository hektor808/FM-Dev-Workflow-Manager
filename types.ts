export type ModelType = 'Opus 4.5' | 'Sonnet 4.5';

export interface WorkflowItem {
  id: string;
  title: string;
  model: ModelType;
  description: string;
  prompt: string;
}

export interface Phase {
  id: number;
  title: string;
  workflows: WorkflowItem[];
}

export interface GeminiResponse {
  text: string;
  isLoading: boolean;
  error?: string;
}