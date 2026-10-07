import { useCallback, useRef, useState } from 'react';
import type { LogLine, PipelinePhase, PipelineState } from '@/types';
import { buildPipeline, makeLog, sleep } from '@/lib/pipeline';
import { generateRefactoredCode } from '@/lib/codegen';

const INITIAL: PipelineState = {
  phase: 'idle',
  running: false,
  logs: [],
  outputCode: '',
  healed: false,
};

const PHASE_FOR_STEP: Record<string, PipelinePhase> = {
  ast: 'ast',
  security: 'security',
  healing: 'healing',
  synthesizer: 'synthesizer',
};

export function usePipeline() {
  const [state, setState] = useState<PipelineState>(INITIAL);
  const cancelRef = useRef(false);

  const run = useCallback(async (input: string) => {
    cancelRef.current = false;
    const steps = buildPipeline(input);
    const result = generateRefactoredCode(input);

    setState({
      phase: 'ast',
      running: true,
      logs: [],
      outputCode: '',
      healed: false,
    });

    for (const step of steps) {
      if (cancelRef.current) return;
      await sleep(step.delay);
      if (cancelRef.current) return;

      const log: LogLine = makeLog(step.agent, step.level, step.text);
      setState((prev) => ({
        ...prev,
        phase: PHASE_FOR_STEP[step.agent] ?? prev.phase,
        logs: [...prev.logs, log],
        healed:
          prev.healed ||
          (step.agent === 'healing' && step.level === 'error'),
      }));
    }

    if (cancelRef.current) return;

    // small reveal delay for output
    await sleep(400);
    setState((prev) => ({
      ...prev,
      running: false,
      phase: 'complete',
      outputCode: result.code,
    }));
  }, []);

  const reset = useCallback(() => {
    cancelRef.current = true;
    setState(INITIAL);
  }, []);

  return { state, run, reset };
}
