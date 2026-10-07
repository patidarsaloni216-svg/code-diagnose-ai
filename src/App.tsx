import { useCallback, useState } from 'react';
import { Github, Sparkles, Zap, ShieldCheck, BrainCircuit } from 'lucide-react';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import TerminalLog from '@/components/TerminalLog';
import OutputBlock from '@/components/OutputBlock';
import AgentTrack from '@/components/AgentTrack';
import { usePipeline } from '@/hooks/usePipeline';
import { DEFAULT_SAMPLE } from '@/lib/codegen';

export default function App() {
  const [input, setInput] = useState(DEFAULT_SAMPLE);
  const { state, run, reset } = usePipeline();

  const handleExecute = useCallback(() => {
    void run(input);
  }, [input, run]);

  const handleReset = useCallback(() => {
    reset();
    setInput(DEFAULT_SAMPLE);
  }, [reset]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-700">
      {/* Subtle ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />
      </div>

      <div className="relative">
        <Header />

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Hero blurb */}
          <section className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              Mock Agentic Core Engine — zero API keys, instant response
            </div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Diagnose. Audit. Self-Heal. Synthesize.
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
              Paste buggy code on the left, run the pipeline, and watch four
              specialized agents collaborate to produce clean, documented,
              production-ready code.
            </p>
          </section>

          {/* Agent track */}
          <div className="mb-5">
            <AgentTrack phase={state.phase} />
          </div>

          {/* Split-screen workspace */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* LEFT — Developer Input */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Zap className="h-4 w-4 text-blue-500" />
                Developer Input
              </div>
              <div className="h-[480px]">
                <CodeEditor
                  value={input}
                  onChange={setInput}
                  onExecute={handleExecute}
                  onReset={handleReset}
                  running={state.running}
                />
              </div>
            </div>

            {/* RIGHT — Agentic Engine & Output */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <BrainCircuit className="h-4 w-4 text-blue-500" />
                  Agentic Engine
                </div>
                <TerminalLog logs={state.logs} phase={state.phase} />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                  Synthesized Output
                </div>
                <OutputBlock
                  code={state.outputCode}
                  language={state.phase === 'complete' ? 'python' : ''}
                  visible={state.phase === 'complete'}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-10 border-t border-slate-200/60 pt-6 pb-4">
            <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
              <p>
                AI Code Doctor — Self-contained mock agentic pipeline for demo
                purposes. No external API calls.
              </p>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5" />
                  Production-ready
                </span>
                <span>v1.0.0</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
