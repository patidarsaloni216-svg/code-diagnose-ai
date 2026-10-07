import type { AgentId } from '@/types';

export interface AgentMeta {
  id: AgentId;
  name: string;
  short: string;
  color: string;
  accent: string;
  dot: string;
  doneColor: string;
}

export const AGENTS: Record<AgentId, AgentMeta> = {
  ast: {
    id: 'ast',
    name: 'AST Parsing Agent',
    short: 'AST',
    color: 'text-blue-600',
    accent: 'border-blue-200 bg-blue-50',
    dot: 'bg-blue-500',
    doneColor: 'text-blue-600',
  },
  security: {
    id: 'security',
    name: 'Security Auditor Agent',
    short: 'SEC',
    color: 'text-amber-600',
    accent: 'border-amber-200 bg-amber-50',
    dot: 'bg-amber-500',
    doneColor: 'text-amber-600',
  },
  healing: {
    id: 'healing',
    name: 'Self-Healing Dynamic Loop',
    short: 'HEAL',
    color: 'text-rose-600',
    accent: 'border-rose-200 bg-rose-50',
    dot: 'bg-rose-500',
    doneColor: 'text-rose-600',
  },
  synthesizer: {
    id: 'synthesizer',
    name: 'Final Synthesizer Agent',
    short: 'SYN',
    color: 'text-sky-600',
    accent: 'border-sky-200 bg-sky-50',
    dot: 'bg-sky-500',
    doneColor: 'text-sky-600',
  },
};

export const PIPELINE_ORDER: AgentId[] = [
  'ast',
  'security',
  'healing',
  'synthesizer',
];
