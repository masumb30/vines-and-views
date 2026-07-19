
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast, ToastContainer } from 'react-toastify';

const users = [
  {email: "user@gmail.com", password: "12345678"},
  {email: "chef@gmail.com", password: "12345678"},
  {email: "admin@gmail.com", password: "12345678"},
]

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    // Implement Google OAuth trigger here
    // Remember to set default user role as "user" on backend for social login
    console.log('Google login clicked');
    const data = await authClient.signIn.social({
      provider: 'google'
    });
    console.log("google login response:", data);
  };

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Prevent double submissions
    if (isLoading) return;
    setIsLoading(true);

    // Create a loading toast that we can update later

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
      });

      // 2. Handle Errors
      if (error) {
        toast.error(error.message || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      // 3. Handle Success
      if (data) {
        toast.success('Welcome back!');

        // Grab the redirect URL from middleware, or fallback to the root/dashboard
        const callbackUrl = searchParams.get('callbackUrl');
        const targetDestination = callbackUrl ? decodeURIComponent(callbackUrl) : '/';

        // Route them and force Next.js to refresh server components (like the header avatar!)
        router.push(targetDestination);
        router.refresh();
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-[#151D30] p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
        </div>

        {/* Google Social Login */}
        {/* <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-700 rounded-xl text-sm font-medium text-gray-200 bg-[#1E293B] hover:bg-[#273549] transition-all mb-6"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.21 1 3.14 3.74 1.24 7.72l3.82 2.96C6 7.42 8.78 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.46h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.86c2.16-1.99 3.74-4.92 3.74-8.54z" />
            <path fill="#FBBC05" d="M5.06 14.68c-.25-.72-.39-1.5-.39-2.31s.14-1.59.39-2.31L1.24 7.09C.44 8.67 0 10.44 0 12.31s.44 3.64 1.24 5.22l3.82-2.85z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.86c-1.12.75-2.54 1.19-4.27 1.19-3.22 0-6-2.38-6.94-5.64L1.24 15.64C3.14 19.62 7.21 23 12 23z" />
          </svg>
          <span>Continue with Google</span>
        </button> */}

        {/* <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-3 bg-[#151D30] text-gray-500">or</span></div>
        </div> */}
        {/* auto fill some users */}
        <div className="flex justify-between mb-4 gap-2">
          {/* <button className="bg-orange-200 text-black rounded-md flex-1 p-1 cursor-pointer" onClick={() => setFormData(users[2])}>Admin</button> */}
          <button className="bg-orange-200 text-black rounded-md flex-1 p-1 cursor-pointer" onClick={() => setFormData(users[1])}>chef</button>
          <button className="bg-orange-200 text-black rounded-md flex-1 p-1 cursor-pointer" onClick={() => setFormData(users[0])}>user</button>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-[#0B0F19] text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-medium hover:from-emerald-600 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/10 cursor-pointer
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}