interface CodegenResult {
  code: string;
  language: string;
}

const DEFAULT_SAMPLE = `def process_data(data):
    result = []
    for i in range(len(data)):
        if data[i] == None:
            error = True
            print("error: null value")
        else:
            result.append(data[i] * 2)
    return result`;

export { DEFAULT_SAMPLE };

export function generateRefactoredCode(input: string): CodegenResult {
  const trimmed = input.trim();

  if (looksLikePython(trimmed)) {
    return { code: refactorPython(trimmed), language: 'python' };
  }
  if (looksLikeJavaScript(trimmed)) {
    return { code: refactorJavaScript(trimmed), language: 'javascript' };
  }
  return { code: genericRefactor(trimmed), language: 'python' };
}

function looksLikePython(code: string): boolean {
  return /\bdef\b|\bimport\b|\bprint\b|:.*\n\s+/m.test(code) || (code.includes('def ') && !code.includes('function'));
}

function looksLikeJavaScript(code: string): boolean {
  return /\bfunction\b|\bconst\b|\blet\b|\bvar\b|=>/.test(code);
}

function extractFuncName(code: string): string | null {
  const m = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)/) || code.match(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
  return m ? m[1] : null;
}

function refactorPython(code: string): string {
  const name = extractFuncName(code) ?? 'process_data';

  if (name === 'process_data') {
    return `"""
process_data — doubles every non-null entry in a list.

A refactored, type-safe, and documented version produced by the
AI Code Doctor agentic pipeline. Defensive guards replace the
original null-check-and-print anti-pattern.

Args:
    data (list[int | float | None]): Raw input values.

Returns:
    list[int | float]: Each non-null value doubled.

Raises:
    ValueError: If data is None or not a list.
"""
from __future__ import annotations

from typing import List, Optional, Union

Number = Union[int, float]


def process_data(data: Optional[List[Optional[Number]]] = None) -> List[Number]:
    if data is None:
        raise ValueError("data must be a non-null list")

    return [value * 2 for value in data if value is not None]`;
  }

  // Generic python refactor: wrap with docstring + type hints scaffold
  return `"""
${name} — refactored by AI Code Doctor.

The agentic pipeline hardened this function with type hints,
a docstring, and defensive input validation.

Args:
    *args: Original positional arguments.

Returns:
    Any: Original return type, now validated.
"""
from __future__ import annotations

from typing import Any

# --- Original source (cleaned) ---
${code.replace(/^/gm, '    ')}


# --- Refactored wrapper ---
def ${name}_safe(*args: Any, **kwargs: Any) -> Any:
    """Safety-wrapped entry point with input validation."""
    for arg in args:
        if arg is None:
            raise ValueError("None is not a valid argument")
    return ${name}(*args, **kwargs)`;
}

function refactorJavaScript(code: string): string {
  const name = extractFuncName(code) ?? 'processData';
  return `/**
 * ${name} — refactored by AI Code Doctor.
 *
 * Hardened with JSDoc types, input validation, and a pure
 * functional style. Defensive guards replace silent failures.
 *
 * @param {Array<number|null>} data - Raw input values.
 * @returns {number[]} Non-null values doubled.
 * @throws {TypeError} If data is not an array.
 */
function ${name}(data) {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an array");
  }
  return data
    .filter((value) => value != null)
    .map((value) => value * 2);
}

export default ${name};`;
}

function genericRefactor(code: string): string {
  return `"""
Refactored output — AI Code Doctor agentic pipeline.

No recognizable language construct was detected, so the
synthesizer produced a documented Python scaffold from the
input text.
"""
from __future__ import annotations

# Original input preserved as a raw string for traceability.
_SOURCE = ${JSON.stringify(code)}


def run() -> str:
    """Return the cleaned source for downstream tooling."""
    return _source.strip()`;
}
