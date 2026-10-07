import type { AgentId, LogLine, LogLevel } from '@/types';

export interface Step {
  agent: AgentId;
  level: LogLevel;
  text: string;
  delay: number;
}

const VULN_KEYWORDS = ['password', 'eval', 'sql', 'error'];
const HEAL_KEYWORDS = ['error', 'bug', 'except', 'fail'];

function lower(input: string): string {
  return input.toLowerCase();
}

export function hasVulnerability(input: string): string[] {
  const lc = lower(input);
  return VULN_KEYWORDS.filter((k) => lc.includes(k));
}

export function needsHealing(input: string): boolean {
  const lc = lower(input);
  return HEAL_KEYWORDS.some((k) => lc.includes(k));
}

function delay(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function buildPipeline(input: string): Step[] {
  const steps: Step[] = [];
  const vulns = hasVulnerability(input);
  const heal = needsHealing(input);

  // STEP 1 — AST Parsing Agent
  steps.push(
    { agent: 'ast', level: 'info', text: 'Initializing Static Code Analysis...', delay: delay(700, 1000) },
    { agent: 'ast', level: 'info', text: 'Parsing Abstract Syntax Tree...', delay: delay(800, 1100) },
    { agent: 'ast', level: 'success', text: 'Structural Node Verification: Done.', delay: delay(700, 1000) },
  );

  // STEP 2 — Security Auditor Agent
  steps.push(
    { agent: 'security', level: 'info', text: 'Scanning code blocks for OWASP Top 10 vulnerabilities...', delay: delay(800, 1100) },
    { agent: 'security', level: 'info', text: 'Detecting edge-case exceptions...', delay: delay(700, 1000) },
  );
  if (vulns.length > 0) {
    steps.push({
      agent: 'security',
      level: 'warn',
      text: `CRITICAL: Potential vulnerability/runtime threat found! (matched: ${vulns.join(', ')})`,
      delay: delay(800, 1100),
    });
  }

  // STEP 3 — Self-Healing Dynamic Loop
  if (heal) {
    steps.push(
      { agent: 'healing', level: 'error', text: 'Compilation Mock Error: Execution failed on test block #2.', delay: delay(800, 1200) },
      { agent: 'healing', level: 'error', text: 'Triggering Self-Healing Loop Phase 1...', delay: delay(700, 1000) },
      { agent: 'healing', level: 'info', text: 'Feeding compiler traceback context back into Coder LLM...', delay: delay(800, 1100) },
      { agent: 'healing', level: 'success', text: 'Re-running validation tests... Success!', delay: delay(700, 1000) },
    );
  } else {
    steps.push(
      { agent: 'healing', level: 'info', text: 'No runtime anomalies detected — skipping self-healing loop.', delay: delay(700, 900) },
    );
  }

  // STEP 4 — Final Synthesizer Agent
  steps.push(
    { agent: 'synthesizer', level: 'info', text: 'Refactoring code blocks...', delay: delay(700, 1000) },
    { agent: 'synthesizer', level: 'info', text: 'Optimizing time complexity...', delay: delay(800, 1100) },
    { agent: 'synthesizer', level: 'info', text: 'Injecting comprehensive docstrings...', delay: delay(700, 1000) },
    { agent: 'synthesizer', level: 'success', text: 'Pipeline Complete!', delay: delay(600, 900) },
  );

  return steps;
}

let logId = 0;
export function nextLogId(): number {
  return ++logId;
}

export function makeLog(agent: AgentId, level: LogLevel, text: string): LogLine {
  return {
    id: nextLogId(),
    agent,
    level,
    text,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
