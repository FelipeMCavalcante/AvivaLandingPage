'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function StoreFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <img
            src="/avivablue.png"
            alt="Aviva Logo"
            className="h-10 object-contain"
          />
          <p className="text-gray-500 text-sm leading-relaxed">
            Moda com propósito e estilo. Encontre as melhores peças para o seu dia a dia com a qualidade Aviva.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Navegação</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <Link href="/store" className="hover:text-aviva-blue transition">
                Início
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-aviva-blue transition">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-aviva-blue transition">
                Minha Conta
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Atendimento</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>WhatsApp: (85) 98607-5881</li>
            <li>Email: contato@aviva.com.br</li>
            <li>Seg - Sex: 09:00 - 18:00</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-bold text-gray-900 mb-6">Redes Sociais</h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-aviva-blue hover:text-white transition-all"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-aviva-blue hover:text-white transition-all"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://wa.me/5585986075881"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-aviva-blue hover:text-white transition-all"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} Loja Aviva. Todos os direitos reservados.
        </p>
        <p className="text-gray-400 text-xs">
          Feito com ❤️ pela equipe Aviva.
        </p>
      </div>
    </footer>
  );
}
