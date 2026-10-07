import { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';

interface OutputBlockProps {
  code: string;
  language: string;
  visible: boolean;
}

export default function OutputBlock({ code, language, visible }: OutputBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <FileCode2 className="h-4 w-4 text-blue-500" />
          Refactored Output
          {language && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-500">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          disabled={!visible}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all disabled:opacity-40 ${
            copied
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Code
            </>
          )}
        </button>
      </div>

      <div className="relative max-h-[340px] min-h-[200px] overflow-auto bg-slate-50/50">
        {visible ? (
          <pre className="px-4 py-3 font-mono text-xs leading-relaxed text-slate-800">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex h-[200px] items-center justify-center text-slate-400">
            <div className="text-center">
              <FileCode2 className="mx-auto mb-2 h-8 w-8 opacity-40" />
              <p className="text-xs">Refactored code will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
