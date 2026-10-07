import { Stethoscope, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 shadow-md shadow-blue-500/20">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold text-slate-800 sm:text-lg">
              AI Code Doctor
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              Agentic Multi-Agent Healing Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-xs font-medium text-blue-700">
            Agents Online &amp; Ready
          </span>
          <Activity className="hidden h-3.5 w-3.5 text-blue-500 sm:block" />
        </div>
      </div>
    </header>
  );
}
