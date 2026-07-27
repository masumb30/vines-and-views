'use client';

import { useState } from 'react';

interface CopyTitleButtonProps {
  textToCopy: string;
}

export function CopyTitleButton({ textToCopy }: CopyTitleButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label="Copy title to clipboard"
      className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600 transition-all duration-300 ease-out hover:border-lime-500 hover:bg-stone-100 hover:text-stone-900 focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400 dark:hover:border-lime-400 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:focus:ring-offset-stone-900"
    >
      {copied ? (
        <>
          <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-700 dark:text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 002-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        </>
      )}
    </button>
  );
}