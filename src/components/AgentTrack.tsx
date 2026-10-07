import { Loader2, Check } from 'lucide-react';
import type { PipelinePhase } from '@/types';
import { AGENTS, PIPELINE_ORDER } from '@/lib/agents';

interface AgentTrackProps {
  phase: PipelinePhase;
}

function statusFor(
  agentOrder: number,
  phase: PipelinePhase,
): 'pending' | 'active' | 'done' {
  const phaseIdx = PIPELINE_ORDER.indexOf(phase as never);
  if (phase === 'complete') return 'done';
  if (phaseIdx === -1 || phase === 'idle') return 'pending';
  if (agentOrder < phaseIdx) return 'done';
  if (agentOrder === phaseIdx) return 'active';
  return 'pending';
}

export default function AgentTrack({ phase }: AgentTrackProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
      {PIPELINE_ORDER.map((id, idx) => {
        const agent = AGENTS[id];
        const status = statusFor(idx, phase);
        return (
          <div key={id} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all duration-300 ${
                status === 'pending'
                  ? 'border-slate-200 bg-slate-50 opacity-60'
                  : agent.accent
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${status === 'pending' ? 'bg-slate-300' : agent.dot}`}>
                {status === 'active' && (
                  <span className="block h-2 w-2 animate-ping rounded-full bg-current opacity-75" />
                )}
              </span>
              <span className={`text-xs font-medium ${status === 'pending' ? 'text-slate-400' : agent.color}`}>
                {agent.name}
              </span>
              {status === 'active' && (
                <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
              )}
              {status === 'done' && (
                <Check className="h-3 w-3 text-emerald-500" />
              )}
            </div>
            {idx < PIPELINE_ORDER.length - 1 && (
              <div className="hidden h-px w-4 bg-slate-200 sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}
