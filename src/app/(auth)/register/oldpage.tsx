'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Added for routing redirection
import { toast, ToastContainer } from 'react-toastify';       // Added for alert management
import { authClient } from '@/lib/auth-client';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // Global component submission state

    // Single controlled state for all form data, initialized with test defaults
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        photo: 'https://example.com/image.png',
        password: 'password1234',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                // If Better Auth returns a server-side authentication validation error
                toast.error(error.message || 'Signup failed. Please try again.');
            } else {
                // Flash success notification and immediately transition page contexts
                toast.success('Account created successfully! Redirecting...');
                router.push('/login');
            }
        } catch (err) {
            // Fallback catch block for network drops or infrastructure timeouts
            toast.error('An unexpected connection error occurred.');
            console.error("Signup submission failure:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
            <ToastContainer autoClose={1500} position="top-right" theme="dark" />
            <div className="w-full max-w-md bg-[#151D30] p-8 my-4 rounded-2xl border border-gray-800 shadow-2xl">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-sm text-gray-400 mt-1">Sign up to get started</p>
                </div>





                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            required
                            disabled={isLoading}
                            value={formData.photo}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="https://imgbb.com/your-photo"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm disabled:opacity-50"
                            placeholder="••••••••"
                        />
                    </div>



                    {/* Submit Button with Loading Spinner */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 rounded-xl bg-linear-to-r from-emerald-500 to-indigo-500 text-white font-medium hover:from-emerald-600 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-70 disabled:from-indigo-500 disabled:to-purple-600 ${
                            isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                        }"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Sign Up</span>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-5">
                    Already have an account?{' '}
                    <Link href="/login" className={`text-indigo-400 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>Sign In</Link>
                </p>
            </div>
        </div>
    );
}