'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast, ToastContainer } from 'react-toastify';

// Nature-inspired seed profiles utilizing the requested uniform password token
const MOCK_GARDENERS = [
    { email: "sage.meadow@grove.com", password: "12345678", label: "Sage (Horticulturist)" },
    { email: "flora.bloom@grove.com", password: "12345678", label: "Flora (Seed Vendor)" },
    { email: "rowan.soil@grove.com", password: "12345678", label: "Rowan (Arborist)" },
];

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Dynamically cycles or picks one of the mock items to instantly populate fields
    const handleAutofill = () => {
        const randomIndex = Math.floor(Math.random() * MOCK_GARDENERS.length);
        const chosenUser = MOCK_GARDENERS[randomIndex];
        setFormData({
            email: chosenUser.email,
            password: chosenUser.password
        });
        toast.info(`Nurtured fields with: ${chosenUser.label}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                rememberMe: true,
            });

            if (error) {
                toast.error(error.message || 'Invalid email or password');
                setIsLoading(false);
                return;
            }

            if (data) {
                toast.success('Welcome back to the patch!');
                const callbackUrl = searchParams.get('callbackUrl');
                const targetDestination = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

                router.push(targetDestination);
                router.refresh();
            }
        } catch (err) {
            toast.error('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 py-12 transition-colors duration-300">
            <ToastContainer autoClose={1500} position="top-right" theme="auto" />

            <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl transition-all duration-300">

                {/* Brand Header */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                        Welcome Back
                    </span>
                    <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                        Enter the Greenhouses
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        Access your organic garden journal and shop dashboard
                    </p>
                </div>

                {/* Clean, Non-obtrusive Autofill Feature Action Button */}
                <div className="mb-6">
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleAutofill}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium rounded-xl border border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-950/40 text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-600 dark:hover:border-emerald-400 hover:scale-[1.01] transition-all duration-300 ease-out focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Autofill Seed Credentials (Testing)
                    </button>
                </div>

                {/* Login Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-950/30 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 text-sm transition-all disabled:opacity-50"
                            placeholder="your.sprout@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-950/30 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 text-sm transition-all disabled:opacity-50"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Action Block */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 mt-4 rounded-xl text-white font-medium bg-lime-600 dark:bg-lime-400 dark:text-stone-950 hover:scale-[1.01] transition-all duration-300 ease-out focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer shadow-md'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Verifying Access...</span>
                            </>
                        ) : (
                            <span>Tend to Account</span>
                        )}
                    </button>
                </form>

                {/* Alternative Registration Pipeline */}
                <p className="text-center text-sm text-stone-600 dark:text-stone-400 mt-5">
                    New to the collective?{' '}
                    <Link
                        href="/register"
                        className={`font-semibold text-emerald-700 dark:text-emerald-400 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''
                            }`}
                    >
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    );
}