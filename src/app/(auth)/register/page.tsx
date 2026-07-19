'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

// 1. Premium Seed Profiles containing realistic data and genuine nature-focused avatars
const MOCK_SEED_USERS = [
    {
        name: 'Sage Meadowcroft',
        email: 'sage.gardens@example.com',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
        password: 'SproutSpore2026!'
    },
    {
        name: 'Rowan Thornhill',
        email: 'rowan.botanicals@example.com',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
        password: 'MyceliumMagic88'
    },
    {
        name: 'Flora Greenwood',
        email: 'flora.blooms@example.com',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
        password: 'PerennialPassion9'
    },
    {
        name: 'Jasper Soilworth',
        email: 'jasper.organic@example.com',
        photo: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=256&q=80',
        password: 'CompostKing432'
    }
];

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Initialized empty to encourage demo engagement, or feel free to match array index 0
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Selects a fresh test profile and sets the React state
    const handleAutofill = () => {
        const randomIndex = Math.floor(Math.random() * MOCK_SEED_USERS.length);
        const randomUser = MOCK_SEED_USERS[randomIndex];
        setFormData(randomUser);
        toast.info(`Sprouted fresh credentials for: ${randomUser.name}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                image: formData.photo
            });

            if (error) {
                console.log('sign up error: ', error)
                toast.error(error.message || 'Signup failed. Please try again.');
            } else {
                toast.success('Account created successfully! Redirecting...');
                router.push('/login');
            }
        } catch (err) {
            toast.error('An unexpected connection error occurred.');
            console.error("Signup submission failure:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 py-12 transition-colors duration-300">
            <ToastContainer autoClose={1500} position="top-right" theme="auto" />

            <div className="w-full max-w-md bg-white dark:bg-stone-900 p-8 my-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl transition-all duration-300">

                {/* Brand Header */}
                <div className="text-center mb-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
                        Marketplace & Community
                    </span>
                    <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                        Join the Grove
                    </h2>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        Connect with organic horticulturists worldwide
                    </p>
                </div>

                {/* Autofill Feature Action Button */}
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
                        Autofill Seed Data (Testing)
                    </button>
                </div>

                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-1.5">
                            Full Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-950/30 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 text-sm transition-all disabled:opacity-50"
                            placeholder="e.g. Sage Meadowcroft"
                        />
                    </div>

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
                            Avatar Photo URL
                        </label>
                        <input
                            name="photo"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-950/30 text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900 text-sm transition-all disabled:opacity-50"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-1.5">
                            Secure Password
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

                    {/* Submit Button */}
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
                                <span>Planting Account Seed...</span>
                            </>
                        ) : (
                            <span>Cultivate Account</span>
                        )}
                    </button>
                </form>

                {/* Secondary Redirection Link */}
                <p className="text-center text-sm text-stone-600 dark:text-stone-400 mt-5">
                    Already a community member?{' '}
                    <Link
                        href="/login"
                        className={`font-semibold text-emerald-700 dark:text-emerald-400 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''
                            }`}
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}