'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------
// Type Definitions (Can be moved to a separate types file)
// ----------------------------------------------------------------------
interface User {
    name: string;
    email: string;
    avatarUrl?: string;
}

// ----------------------------------------------------------------------
// Custom Hook to handle body scroll locking when mobile sidebar is open
// ----------------------------------------------------------------------
const useLockBodyScroll = (isLocked: boolean) => {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLocked]);
};

// ----------------------------------------------------------------------
// Component Props
// ----------------------------------------------------------------------
interface HeaderProps {
    // For demonstration, we simulate a logged-in user?.user?.
    // Pass 'null' to show the login/register buttons.
    user: User | null;
    // Navigation links passed from parent for flexibility
    middleLinks: { name: string; href: string }[];
}

// ----------------------------------------------------------------------
// Helper to conditionally join classNames
// ----------------------------------------------------------------------
const classNames = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

// ----------------------------------------------------------------------
// HEADER COMPONENT
// ----------------------------------------------------------------------
const Header: React.FC = ({ }) => {
    const router = useRouter();
    const handleLogOut = async () => {
        await authClient.signOut();
        router.refresh();
    }
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const middleLinks = [
        { name: 'Explore Insights', href: '/explore' },
        { name: 'How It Works', href: '/howitworks' },
        { name: 'About Us', href: '/aboutus' },
    ];

    const { data: user, isPending } = authClient.useSession();
    console.log('user from Header:', user);

    const [dropDown, setDropDown] = useState(false);
    const handleDropDown = () => {
        setDropDown(!dropDown);
    }
    useLockBodyScroll(sidebarOpen);

    // Close sidebar on route change (simulated with hash links)
    const handleNavigation = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    // Close sidebar when pressing Escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSidebarOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Reusable focus and transition classes
    const focusClasses =
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900';
    const transitionClasses = 'transition-all duration-200';

    return (
        <>
            {/* Main Header / Navbar */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Left Section: Logo */}
                        <div className="flex-shrink-0">
                            <a
                                href="/"
                                className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-slate-50 transition-all duration-200 hover:scale-[1.02]"
                                onClick={handleNavigation}
                            >
                                {/* Logo Icon: a subtle culinary mark */}
                                <svg
                                    className="h-8 w-8 text-emerald-600 dark:text-emerald-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                <span>
                                    Vines & <span className="text-emerald-600 dark:text-emerald-500">Views</span>
                                </span>
                            </a>
                        </div>

                        {/* Center Section: Desktop Navigation Links */}
                        <div className="hidden lg:flex lg:items-center lg:gap-1">
                            {middleLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={classNames(
                                        'px-3 py-2 rounded-xl text-sm font-medium',
                                        'text-slate-600 dark:text-slate-400',
                                        'hover:text-emerald-600 dark:hover:text-emerald-500',
                                        'hover:bg-white dark:hover:bg-slate-800',
                                        transitionClasses,
                                        focusClasses
                                    )}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Right Section: Auth / User Controls */}
                        <div className="hidden lg:flex lg:items-center lg:gap-4">

                            {
                                isPending ? <p>loading...</p>
                                    :
                                    user ? (
                                        // ----- LOGGED IN STATE: Avatar + Name -----
                                        <div onClick={handleDropDown} className="flex items-center gap-3  relative">
                                            <div className={`absolute top-full left-0 ${dropDown ? 'block ' : 'hidden'} w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg mt-2 z-50`}>
                                                <a href="/dashboard" className="block w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg w-full text-left cursor-pointer">
                                                    Dashboard
                                                </a>
                                                <button onClick={handleLogOut} className="px-4 py-2 text-sm text-red-700 dark:text-red-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg w-full text-left cursor-pointer">
                                                    Log out
                                                </button>
                                            </div>

                                            <button
                                                className={classNames(
                                                    'flex items-center gap-2 rounded-xl p-1.5',
                                                    'text-slate-700 dark:text-slate-300',
                                                    'hover:bg-white dark:hover:bg-slate-800',
                                                    transitionClasses,
                                                    focusClasses
                                                )}
                                                aria-label="User menu"
                                            >
                                                {/* Avatar with fallback initials */}
                                                <div className="h-8 w-8 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                                                    {user?.user?.image ? (
                                                        <img
                                                            src={user?.user?.image}
                                                            alt={user?.user?.name}
                                                            className="h-8 w-8 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        user?.user?.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .toUpperCase()
                                                            .slice(0, 2)
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium hidden xl:block">
                                                    {user?.user?.name}
                                                </span>
                                                {/* Chevron Down Indicator */}
                                                <svg
                                                    className="hidden xl:block h-4 w-4 text-slate-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        // ----- LOGGED OUT STATE: Login & Register Buttons -----
                                        <div className="flex items-center gap-3">
                                            <a
                                                href="/login"
                                                className={classNames(
                                                    'px-4 py-2 rounded-xl text-sm font-medium',
                                                    'text-slate-700 dark:text-slate-300',
                                                    'hover:text-emerald-600 dark:hover:text-emerald-500',
                                                    'hover:bg-white dark:hover:bg-slate-800',
                                                    transitionClasses,
                                                    focusClasses
                                                )}
                                            >
                                                Log in
                                            </a>
                                            <a
                                                href="/register"
                                                className={classNames(
                                                    'px-4 py-2 rounded-xl text-sm font-semibold',
                                                    'bg-emerald-600 text-white',
                                                    'dark:bg-emerald-500 dark:text-slate-900',
                                                    'hover:brightness-110 hover:scale-[1.02]',
                                                    'shadow-sm',
                                                    transitionClasses,
                                                    focusClasses
                                                )}
                                            >
                                                Sign up
                                            </a>
                                        </div>
                                    )}

                        </div>

                        {/* Mobile & Tablet: Hamburger Button */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className={classNames(
                                    'inline-flex items-center justify-center rounded-xl p-2',
                                    'text-slate-600 dark:text-slate-400',
                                    'hover:bg-white dark:hover:bg-slate-800',
                                    transitionClasses,
                                    focusClasses
                                )}
                                onClick={() => setSidebarOpen(true)}
                                aria-expanded={sidebarOpen}
                                aria-label="Open sidebar menu"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile / Tablet Sidebar */}
            {/* Backdrop overlay with fade animation */}
            <div
                className={classNames(
                    'fixed inset-0 z-50 lg:hidden',
                    sidebarOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none',
                    'transition-opacity duration-300 ease-in-out'
                )}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            >
                {/* Semi-transparent background */}
                <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm" />
            </div>

            {/* Slide-in Sidebar Panel */}
            <div
                className={classNames(
                    'fixed top-0 right-0 z-50 h-full w-full max-w-xs lg:hidden',
                    'bg-white dark:bg-slate-900',
                    'shadow-xl border-l border-slate-200 dark:border-slate-800',
                    'flex flex-col',
                    'transform transition-transform duration-300 ease-in-out',
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                {/* Sidebar Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        Menu
                    </span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className={classNames(
                            'rounded-xl p-2',
                            'text-slate-600 dark:text-slate-400',
                            'hover:bg-slate-100 dark:hover:bg-slate-800',
                            transitionClasses,
                            focusClasses
                        )}
                        aria-label="Close sidebar"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Sidebar Content: Profile or Navigation Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Conditional Profile Section */}
                    {user ? (
                        <div onClick={() => { router.push('/dashboard'); setSidebarOpen(false) }} className=" cursor-pointer flex items-center gap-4 rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700">
                            <div className="h-12 w-12 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white text-lg font-semibold shadow-sm flex-shrink-0">
                                {user?.user?.image ? (
                                    <img
                                        src={user?.user?.image}
                                        alt={user?.user?.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    user?.user?.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">
                                    {user?.user?.name}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {user?.user?.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Mobile Auth Buttons when logged out */
                        <div className="flex flex-col gap-3">
                            <a
                                href="/login"
                                className={classNames(
                                    'w-full rounded-xl px-4 py-3 text-center text-sm font-medium',
                                    'border border-slate-200 dark:border-slate-700',
                                    'text-slate-700 dark:text-slate-300',
                                    'hover:bg-slate-50 dark:hover:bg-slate-800',
                                    transitionClasses,
                                    focusClasses
                                )}
                                onClick={handleNavigation}
                            >
                                Log in
                            </a>
                            <a
                                href="/register"
                                className={classNames(
                                    'w-full rounded-xl px-4 py-3 text-center text-sm font-semibold',
                                    'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-900',
                                    'hover:brightness-110',
                                    'shadow-sm',
                                    transitionClasses,
                                    focusClasses
                                )}
                                onClick={handleNavigation}
                            >
                                Sign up
                            </a>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-slate-200 dark:border-slate-800" />

                    {/* Mobile Navigation Links */}
                    <nav className="space-y-1">
                        {middleLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={classNames(
                                    'block rounded-xl px-4 py-3 text-base font-medium',
                                    'text-slate-700 dark:text-slate-300',
                                    'hover:bg-slate-50 dark:hover:bg-slate-800',
                                    'hover:text-emerald-600 dark:hover:text-emerald-500',
                                    transitionClasses,
                                    focusClasses
                                )}
                                onClick={handleNavigation}
                            >
                                {link.name}
                            </a>
                        ))}

                        {
                            user && (
                                <button
                                    className={classNames(
                                        'block w-full text-left cursor-pointer rounded-xl px-4 py-3 text-base font-medium',
                                        'text-red-700 dark:text-red-300',
                                        'hover:bg-slate-50 dark:hover:bg-slate-800',
                                        'hover:text-red-600 dark:hover:text-red-500',
                                        transitionClasses,
                                        focusClasses
                                    )}
                                    onClick={handleLogOut}
                                >
                                    Log out
                                </button>
                            )
                        }
                    </nav>
                </div>

                {/* Sidebar Footer (Optional subtle branding) */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                        © 2026 Vines & Views Community
                    </p>
                </div>
            </div>
        </>
    );
};

export default Header;