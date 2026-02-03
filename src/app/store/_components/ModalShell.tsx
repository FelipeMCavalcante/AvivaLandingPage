'use client';

import { useRouter } from 'next/navigation';

export default function ModalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative shadow-2xl">
        <button
          onClick={() => router.back()}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
