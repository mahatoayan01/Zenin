import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export function FloatingActions() {
  const { info } = restaurantData;

  const defaultWhatsappMsg = encodeURIComponent(
    `Hello ${info.name}! I would like to inquire about table booking / food delivery.`
  );
  const waUrl = `https://wa.me/${info.whatsappNumber}?text=${defaultWhatsappMsg}`;

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Mobile-only Click-to-Call button */}
      <a
        href={info.phoneDial}
        className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-brand-surface border border-brand-border text-brand-cream shadow-xl hover:scale-105 active:scale-95 transition-transform"
        aria-label="Call ZENZI Restaurant Cafe"
      >
        <Phone className="w-5 h-5 text-brand-accent" />
      </a>

      {/* WhatsApp Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-2xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-semibold">Chat with Us</span>
      </a>
    </aside>
  );
}
