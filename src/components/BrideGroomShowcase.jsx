import React from 'react';
import { Crown, Sparkles, GraduationCap, Users, Heart, Home } from 'lucide-react';

export function BrideGroomShowcase({ lang }) {
  return (
    <section id="couple" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border-2 border-amber-400/50 text-amber-200 text-xs md:text-sm font-cinzel mb-4 font-bold shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-300" /> {lang === 'te' ? 'వధూ వరుల సమాచారం' : 'Royal Bride & Groom Showcase'}
        </div>
        <h2 className="text-4xl md:text-6xl font-black font-cinzel gold-gradient-text">
          {lang === 'te' ? 'వధువు & వరుడు' : 'Bride & Groom'}
        </h2>
        <p className="text-white text-base md:text-lg max-w-2xl mx-auto mt-3 font-playfair italic">
          {lang === 'te'
            ? 'పెద్దలు నిశ్చయించిన పవిత్ర వివాహ బంధంలో ఒకటవుతున్న వధూవరులు'
            : 'Two souls joined together with divine love and family blessings'}
        </p>
      </div>

      {/* Royal Artwork Banner */}
      <div className="glass-panel p-4 md:p-8 rounded-3xl mb-16 border-2 border-amber-400/50 relative overflow-hidden group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 h-80 rounded-2xl overflow-hidden border-2 border-amber-400/50 relative shadow-2xl">
            <img src="/assets/royal_couple.png" alt="Hari Chandana & Harsha" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-amber-200 font-cinzel font-bold text-xl">
              Hari Chandana & Veera Harsha Vardhan
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 text-white p-2">
            <span className="px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs font-bold uppercase tracking-widest">
              Peddada & Suravarapu Families
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold font-cinzel bride-gradient-text">
              Holy Matrimony & Divine Union
            </h3>
            <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed font-playfair">
              {lang === 'te'
                ? 'శ్రీ పెద్దడ దుర్గారాజు (రాజా) - శ్రీమతి రత్నకుమారి దంపతుల ఏకైక కుమార్తె చి||లా||సౌ|| హరి చందన ని, శ్రీ సూరవరపు శ్రీనివాసరావు - శ్రీమతి వెంకట నాగలక్ష్మి దంపతుల ప్రథమ కుమారుడు చి|| వీర హర్షవర్ధన్ తో జరుపు పవిత్ర పరిణయ వేడుక.'
                : 'With divine grace, Chi.La.Sow. Hari Chandana (D/o Sri Peddada Durgaraju & Smt. Ratna Kumari) and Chi. Veera Harsha Vardhan (S/o Sri Suravarapu Srinivasarao & Smt. Venkata Nagalakshmi) unite in holy matrimony.'}
            </p>
          </div>
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* BRIDE CARD - FIRST */}
        <div className="glass-panel-bride p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between border-2 border-rose-400/70 shadow-2xl group">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-rose-500 to-amber-500 text-slate-950 font-black text-xs uppercase px-5 py-2 rounded-bl-2xl shadow-lg font-cinzel">
            {lang === 'te' ? 'వధువు (Peddada Family)' : 'Featured Bride'}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-amber-300 animate-bounce" />
              <span className="text-sm font-telugu text-amber-200 font-bold">చి||లా||సౌ|| (Chi.La.Sow.)</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-black font-cinzel bride-gradient-text mb-2">
              Hari Chandana
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/50 text-amber-200 text-sm font-bold mb-6">
              <GraduationCap className="w-5 h-5 text-amber-300" /> B.Tech
            </div>

            <div className="space-y-4 border-t border-rose-400/30 pt-6 text-white text-base">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-amber-300 shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold block text-xs uppercase tracking-wider">
                    {lang === 'te' ? 'తల్లిదండ్రులు (Parents)' : 'Proud Parents'}
                  </span>
                  <p className="font-extrabold text-white text-xl">
                    Sri Peddada Durgaraju (Raja) & <br />
                    Smt. Ratna Kumari
                  </p>
                  <p className="text-xs text-rose-200 font-telugu mt-1 font-semibold">
                    (శ్రీ పెద్దడ దుర్గారాజు (రాజా) - శ్రీమతి రత్నకుమారి దంపతుల ఏకైక కుమార్తె)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-rose-400 shrink-0 mt-1 fill-rose-400/50" />
                <div>
                  <span className="text-amber-300 font-bold block text-xs uppercase tracking-wider">
                    {lang === 'te' ? 'ఆహ్వానించువారు' : 'Invited By'}
                  </span>
                  <p className="font-bold text-white text-base">
                    Peddada Family & Suravarapu Family
                  </p>
                  <p className="text-xs text-amber-200 italic mt-0.5 font-semibold">
                    "With Best Compliments From Near & Dear"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GROOM CARD - SECOND */}
        <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between border-2 border-amber-400/50 shadow-2xl group">
          <div className="absolute top-0 right-0 bg-amber-500/30 text-amber-100 font-bold text-xs uppercase px-5 py-2 rounded-bl-2xl border-l border-b border-amber-400/40 font-cinzel">
            {lang === 'te' ? 'వరుడు (Groom)' : 'The Groom'}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-telugu text-amber-300 font-bold">చి|| (Chi.)</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-black font-cinzel text-amber-100 mb-2">
              Veera Harsha Vardhan
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-200 text-sm font-bold mb-6">
              <GraduationCap className="w-5 h-5 text-amber-400" /> B.Tech
            </div>

            <div className="space-y-4 border-t border-amber-400/30 pt-6 text-white text-base">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold block text-xs uppercase tracking-wider">
                    {lang === 'te' ? 'తల్లిదండ్రులు (Parents)' : 'Proud Parents'}
                  </span>
                  <p className="font-extrabold text-white text-xl">
                    Sri Suravarapu Srinivasarao & <br />
                    Smt. Venkata Nagalakshmi
                  </p>
                  <p className="text-xs text-amber-200 font-telugu mt-1 font-semibold">
                    (శ్రీ సూరవరపు శ్రీనివాసరావు - శ్రీమతి వెంకట నాగలక్ష్మి దంపతుల ప్రథమ కుమారుడు)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold block text-xs uppercase tracking-wider">
                    {lang === 'te' ? 'స్వగ్రామం (Native)' : 'Native Residence'}
                  </span>
                  <p className="font-bold text-white text-base">
                    Kunchanapalli Village, Tadepalli Mandal, Guntur Dist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
