// app/login/page.tsx
import React, { Suspense } from 'react';
import LoginPage from './LoginPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white">Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}


