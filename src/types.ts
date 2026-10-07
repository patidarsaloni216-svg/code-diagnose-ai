export type AgentId =
  | 'ast'
  | 'security'
  | 'healing'
  | 'synthesizer';

export type LogLevel = 'info' | 'warn' | 'error' | 'success';

export interface LogLine {
  id: number;
  agent: AgentId;
  level: LogLevel;
  text: string;
  timestamp: string;
}

export type PipelinePhase =
  | 'idle'
  | 'ast'
  | 'security'
  | 'healing'
  | 'synthesizer'
  | 'complete';

export interface PipelineState {
  phase: PipelinePhase;
  running: boolean;
  logs: LogLine[];
  outputCode: string;
  healed: boolean;
}
