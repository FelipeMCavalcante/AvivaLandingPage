'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProfileModal({
  initialName,
  initialPhone,
  email,
  onClose,
  onSaved,
}: {
  initialName: string;
  initialPhone: string;
  email: string | null;
  onClose: () => void;
  onSaved: (name: string, phone: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await supabase.auth.updateUser({
        data: { name, phone },
      });
      onSaved(name, phone);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-[#1D5176] mb-4">
          Meu perfil
        </h2>

        <p className="text-sm text-gray-600 mb-4">{email ?? '—'}</p>

        <label className="text-sm font-semibold text-[#1D5176]">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border rounded-xl p-3 outline-none"
          placeholder="Seu nome"
        />

        <label className="text-sm font-semibold text-[#1D5176] mt-4 block">
          Telefone
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full border rounded-xl p-3 outline-none"
          placeholder="(85) 9xxxx-xxxx"
        />

        <button
          onClick={save}
          disabled={saving}
          className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-extrabold disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}
