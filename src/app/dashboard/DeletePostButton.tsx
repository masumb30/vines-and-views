'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // Retrieve session token from authClient
      const session = await authClient.getSession();
      const token = session?.data?.session?.token;

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const res = await fetch(`https://vine-and-views-backend.onrender.com/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete post');
      }

      setIsOpen(false);
      // Refresh the current route to refetch Server Component data
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Delete post "${postTitle}"`}
        className="rounded-xl p-2 text-stone-400 hover:bg-stone-100 hover:text-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:hover:bg-stone-800 dark:hover:text-red-400 dark:focus:ring-offset-stone-900"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-xl transition-all dark:border-stone-800 dark:bg-stone-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="rounded-2xl bg-red-100 p-2.5 dark:bg-red-950/60">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 id="delete-modal-title" className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Delete Post
              </h3>
            </div>

            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
              Are you sure you want to delete <span className="font-semibold text-stone-900 dark:text-stone-200">"{postTitle}"</span>? This action cannot be undone.
            </p>

            {error && (
              <div className="mt-3 rounded-xl bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/50 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="rounded-2xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition-all duration-200 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-offset-stone-900"
              >
                {isDeleting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete Post'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}