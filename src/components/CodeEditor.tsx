import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  onExecute: () => void;
  onReset: () => void;
  running: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  onExecute,
  onReset,
  running,
}: CodeEditorProps) {
  const lineCount = useMemo(() => value.split('\n').length, [value]);
  const lineNumbers = useMemo(
    () => Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1),
    [lineCount],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newValue = value.slice(0, start) + '    ' + value.slice(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-md">
      {/* Editor chrome */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs font-medium text-slate-500">
            developer_input.py
          </span>
        </div>
        <button
          onClick={onReset}
          disabled={running}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Editor body */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Line numbers */}
        <div
          className="select-none overflow-hidden border-r border-slate-200 bg-slate-50 px-3 py-4 text-right font-mono text-xs leading-6 text-slate-400"
          aria-hidden
        >
          {lineNumbers.map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          wrap="off"
          placeholder="Paste or type your buggy code here..."
          className="flex-1 resize-none bg-white py-4 px-4 font-mono text-xs leading-6 text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Action bar */}
      <div className="border-t border-slate-200 px-4 py-3">
        <button
          onClick={onExecute}
          disabled={running || !value.trim()}
          className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
        >
          {running ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Agentic Pipeline Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
              Execute Agentic Healing Pipeline
            </>
          )}
          {!running && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}
        </button>
      </div>
    </div>
  );
}
