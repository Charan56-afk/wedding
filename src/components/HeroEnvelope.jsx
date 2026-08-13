import React, { useState } from 'react';
import { Sparkles, Heart, Crown, MapPin, Clock, ScrollText, Volume2, ArrowRight } from 'lucide-react';

export function HeroEnvelope({ lang, onOpenCardReplica, onOpenRsvp }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Sacred Top Banner Mantras */}
      <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full glass-panel mb-6 border-2 border-amber-400/50 shadow-2xl">
        <Sparkles className="w-5 h-5 text-amber-300" />
        <span className="text-amber-200 text-sm md:text-base font-telugu tracking-wider font-bold">
          {lang === 'te' ? '॥ శ్రీరస్తు ॥  ॥ శుభమస్తు ॥  ॥ అవిఘ్నమస్తు ॥' : '॥ Srirasthu ॥  ॥ Subhamasthu ॥  ॥ Avignamasthu ॥'}
        </span>
        <Sparkles className="w-5 h-5 text-amber-300" />
      </div>

      {/* Pelli Kuthuru Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-950/90 border-2 border-rose-400/70 text-rose-200 text-xs md:text-sm font-extrabold uppercase tracking-widest shadow-2xl">
          <Crown className="w-4 h-4 text-amber-300" />
          {lang === 'te' ? 'పెండ్లికూతురు & వివాహ ఆహ్వానము (Bride Side Wedding)' : 'Pelli Kuthuru & Wedding Celebration'}
        </span>
      </div>

      {/* Interactive 3D Envelope Container */}
      <div className="relative max-w-2xl w-full my-6 perspective-1000">
        <div className={`glass-panel p-8 md:p-12 rounded-3xl border-2 border-amber-400/60 shadow-2xl relative transition-all duration-700 transform ${isOpen ? 'scale-105 shadow-amber-400/20' : 'hover:scale-102'}`}>
          
          {/* Card Decorative Corners */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>

          {/* Divine Crest Logo */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-amber-400 to-amber-100 shadow-2xl">
            <img src="/assets/divine_motif.png" alt="Divine Motif" className="w-full h-full object-cover rounded-full" />
          </div>

          {/* Bride Name Highlighted FIRST */}
          <div className="space-y-2 mb-6">
            <span className="text-rose-300 font-cinzel text-xs uppercase tracking-widest font-bold">
              {lang === 'te' ? 'వధువు (The Bride)' : 'The Bride'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-cinzel bride-gradient-text uppercase tracking-wide">
              Chi.La.Sow. Hari Chandana
            </h1>
            <span className="text-amber-300 font-bold text-sm font-cinzel block">B.Tech</span>
          </div>

          <div className="flex items-center justify-center gap-4 my-4">
            <span className="h-[2px] w-20 bg-gradient-to-r from-transparent via-amber-400 to-amber-300"></span>
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400/50 animate-bounce" />
            <span className="h-[2px] w-20 bg-gradient-to-l from-transparent via-amber-400 to-amber-300"></span>
          </div>

          {/* Groom Name */}
          <div className="space-y-2 mb-8">
            <span className="text-amber-300/90 font-cinzel text-xs uppercase tracking-widest font-bold">
              {lang === 'te' ? 'వరుడు (with Groom)' : 'with Groom'}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-cinzel gold-gradient-text uppercase tracking-wide">
              Chi. Veera Harsha Vardhan
            </h2>
            <span className="text-amber-200/90 font-bold text-sm font-cinzel block">B.Tech</span>
          </div>

          {/* Invitation Details Summary */}
          <div className="border-t border-b border-amber-400/30 py-4 my-6 space-y-2 text-white font-playfair">
            <p className="text-amber-300 font-cinzel font-bold text-xs uppercase tracking-widest">
              Sumuhurtham Date & Venue
            </p>
            <p className="text-xl md:text-2xl font-bold text-amber-100 font-cinzel">
              Friday, 28th August 2026 @ 10:08 PM
            </p>
            <p className="text-xs text-amber-200/90 italic font-telugu">
              (శతభిష నక్షత్రయుక్త మేషలగ్నమందు • Shatabhisha Nakshatrayukta, Mesha Lagnam)
            </p>
            <div className="text-sm font-semibold text-rose-300 pt-1">
              📍 Helapuri Lions Club Kalyana Vedika, Sanivarapupeta
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button onClick={onOpenCardReplica} className="btn-gold text-xs md:text-sm py-3 px-6 shadow-2xl">
              <ScrollText className="w-4 h-4" />
              {lang === 'te' ? 'లగ్న పత్రిక తెరవండి (View Original Card)' : 'Open Digital Card Replica'}
            </button>

            <button onClick={onOpenRsvp} className="btn-glass text-xs md:text-sm py-3 px-6">
              <Heart className="w-4 h-4 text-rose-400 fill-current" />
              {lang === 'te' ? 'RSVP పంపండి' : 'Confirm RSVP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
