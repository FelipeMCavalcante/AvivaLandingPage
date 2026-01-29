import { Suspense } from 'react';
import LoginClient from './ui/LoginClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginClient />
    </Suspense>
  );
}

function LoginSkeleton() {
  return (
    <section className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow p-6 w-full max-w-sm">
        <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-48 bg-gray-200 rounded mb-6" />

        <div className="grid gap-3">
          <div className="h-11 bg-gray-200 rounded-xl" />
          <div className="h-11 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl mt-2" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
