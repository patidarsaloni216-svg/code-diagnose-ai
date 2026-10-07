import { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import type { LogLine, PipelinePhase } from '@/types';
import { AGENTS } from '@/lib/agents';

interface TerminalLogProps {
  logs: LogLine[];
  phase: PipelinePhase;
}

const LEVEL_STYLES: Record<string, string> = {
  info: 'text-slate-600',
  warn: 'text-amber-600',
  error: 'text-rose-600',
  success: 'text-emerald-600',
};

const LEVEL_PREFIX: Record<string, string> = {
  info: '›',
  warn: '⚠',
  error: '✕',
  success: '✓',
};

export default function TerminalLog({ logs, phase }: TerminalLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <Terminal className="h-4 w-4 text-blue-500" />
          Agent Terminal
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400">
          {phase === 'idle' ? 'standby' : phase}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[260px] overflow-y-auto bg-slate-50/50 px-4 py-3 font-mono text-xs leading-relaxed"
      >
        {logs.length === 0 && (
          <div className="flex h-full items-center justify-center text-slate-400">
            Awaiting pipeline execution...
          </div>
        )}
        {logs.map((log) => {
          const agent = AGENTS[log.agent];
          return (
            <div
              key={log.id}
              className="flex animate-[fadeInIn_0.2s_ease-out] items-start gap-2 py-0.5"
            >
              <span className="shrink-0 text-slate-400">{log.timestamp}</span>
              <span className={`shrink-0 font-bold ${agent.color}`}>
                [{agent.short}]
              </span>
              <span className={`shrink-0 ${LEVEL_STYLES[log.level]}`}>
                {LEVEL_PREFIX[log.level]}
              </span>
              <span className={`${LEVEL_STYLES[log.level]}`}>{log.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
