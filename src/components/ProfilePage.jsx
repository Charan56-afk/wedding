import React, { useEffect } from 'react';
import ProfileBackground from './ProfileBackground';
import { ArrowLeft, GraduationCap, Users, Home, Heart, MapPin, Star, Crown, Flower2, Sparkles, UserCircle2 } from 'lucide-react';

const PROFILES = {
  bride: {
    type: 'bride',
    prefix:      { en: 'Chi.La.Sow.', te: 'చి||లా||సౌ||' },
    fullName:    'Hari Chandana',
    degree:      'B.Tech',
    tagLabel:    { en: '🌸 The Bride — Pelli Kuthuru', te: '🌸 వధువు — పెళ్ళికూతురు' },
    accent:      '#ff6b9d',
    accentDark:  '#c41f6b',
    accentGlow:  'rgba(255,107,157,0.35)',
    nameGrad:    'linear-gradient(135deg,#ff6b9d 0%,#f5c842 55%,#ffb347 100%)',
    father:      { en: 'Sri Peddada Durgaraju (Raja)',  te: 'శ్రీ పెద్దడ దుర్గారాజు (రాజా)' },
    mother:      { en: 'Smt. Ratna Kumari',            te: 'శ్రీమతి రత్నకుమారి' },
    relation:    { en: 'Beloved Daughter',  te: 'ఏకైక కుమార్తె' },
    family:      'Peddada Family',
    native:      { en: 'Sanivarapupeta',    te: 'శనివారపుపేట' },
    brother:     { en: 'Ganesh Charan Peddada', te: 'గణేష్ చరణ్ పెద్దడ' },
    brotherRel:  { en: 'Brother', te: 'సోదరుడు' },
    description: {
      en: 'Hari Chandana is the radiant bride and beloved daughter of the Peddada family. Blessed with grace, intelligence and a warm heart, she brings happiness to every heart she touches. Her brother Ganesh Charan stands beside her on this joyous occasion, making the celebration complete.',
      te: 'హరి చందన పెద్దడ కుటుంబానికి చెందిన ప్రియమైన కుమార్తె. ఆమె తెలివి, సౌందర్యం, మరియు మంచి మనసుతో అందరి ప్రేమను పొందింది. ఆమె సోదరుడు గణేష్ చరణ్ ఈ శుభ సందర్భంలో ఆమెతో నిలబడ్డాడు.',
    },
    rituals: [
      { en: 'Pelli Kuthuru (The Bride)',          te: 'పెళ్ళికూతురు' },
      { en: 'Jeelakarra Bellam Ritual',           te: 'జీలకర్ర బెల్లం' },
      { en: 'Mangalasutra Dharana',               te: 'మంగళసూత్ర ధారణ' },
      { en: 'Talambralu — Sacred rice ritual',    te: 'తలంబ్రాలు' },
    ],
  },
  groom: {
    type: 'groom',
    prefix:      { en: 'Chi.', te: 'చి||' },
    fullName:    'Veera Harsha Vardhan',
    degree:      'B.Tech',
    tagLabel:    { en: '✨ The Groom',  te: '✨ వరుడు' },
    accent:      '#60a0ff',
    accentDark:  '#1a3cbf',
    accentGlow:  'rgba(96,160,255,0.35)',
    nameGrad:    'linear-gradient(135deg,#a0d0ff 0%,#60a0ff 40%,#f5c842 100%)',
    father:      { en: 'Sri Suravarapu Srinivasarao',  te: 'శ్రీ సూరవరపు శ్రీనివాసరావు' },
    mother:      { en: 'Smt. Venkata Nagalakshmi',     te: 'శ్రీమతి వెంకట నాగలక్ష్మి' },
    relation:    { en: 'Elder Son',    te: 'ప్రథమ కుమారుడు' },
    family:      'Suravarapu Family',
    native:      { en: 'Kunchanapalli Village, Tadepalli Mandal, Guntur Dist.', te: 'కుంచనపల్లి గ్రామం, తాడేపల్లి మండలం, గుంటూరు జిల్లా' },
    brother:     { en: 'Chinna Suravarapu', te: 'చిన్న సూరవరపు' },
    brotherRel:  { en: 'Younger Brother', te: 'చిన్న సోదరుడు' },
    description: {
      en: 'Veera Harsha Vardhan is the proud elder son of the Suravarapu family, hailing from Kunchanapalli Village, Guntur District. His younger brother Chinna Suravarapu joyfully supports him on this auspicious occasion. Known for his noble character and dedication, Harsha begins a new chapter of life.',
      te: 'వీర హర్షవర్ధన్ సూరవరపు కుటుంబానికి చెందిన ప్రథమ కుమారుడు. గుంటూరు జిల్లా కుంచనపల్లి గ్రామానికి చెందిన ఆయన నిజాయితీ మరియు సంస్కారానికి ప్రసిద్ధుడు. ఆయన చిన్న సోదరుడు చిన్న సూరవరపు ఈ శుభ సందర్భంలో సంతోషంగా సహకరిస్తున్నాడు.',
    },
    rituals: [
      { en: 'Pelli Koduku (The Groom)',       te: 'పెళ్ళికొడుకు' },
      { en: 'Mangalasutra Dharana — Sacred tie', te: 'మంగళసూత్ర ధారణ' },
      { en: 'Talambralu — Sacred rice ritual', te: 'తలంబ్రాలు' },
      { en: 'Sapthapadi — Seven Sacred Steps', te: 'సప్తపది' },
    ],
  },
};

export function ProfilePage({ type, lang, onBack }) {
  const d = PROFILES[type];
  const isBride = type === 'bride';

  // Scroll to top on open
  useEffect(() => { window.scrollTo(0, 0); }, [type]);

  const t = (obj) => typeof obj === 'object' ? (lang === 'te' ? obj.te : obj.en) : obj;

  const InfoRow = ({ icon, label, value, sub }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 0', borderBottom: `1px solid ${d.accent}18` }}>
      <div style={{
        width: 42, height: 42, borderRadius: 13, flexShrink: 0,
        background: `${d.accent}18`, border: `1px solid ${d.accent}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: d.accent,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: d.accent, fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.98rem', color: '#fff', lineHeight: 1.4 }}>
          {value}
        </div>
        {sub && (
          <div style={{ fontFamily: 'Noto Sans Telugu, Plus Jakarta Sans', fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.5 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Unique colored animated background */}
      <ProfileBackground type={type} />

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

        {/* ── TOP BACK BAR ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          padding: '14px clamp(16px,4vw,32px)',
          background: isBride ? 'rgba(26,0,16,0.85)' : 'rgba(0,13,46,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${d.accent}25`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 18px', borderRadius: 100,
              background: `${d.accent}15`, border: `1px solid ${d.accent}40`,
              color: d.accent, fontSize: '0.78rem', fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Plus Jakarta Sans',
              letterSpacing: '0.05em', transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `${d.accent}28`}
            onMouseLeave={(e) => e.currentTarget.style.background = `${d.accent}15`}
          >
            <ArrowLeft size={15} /> {lang === 'te' ? 'వెనక్కి వెళ్ళు' : 'Back'}
          </button>

          <div style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(0.65rem,2vw,0.8rem)',
            fontWeight: 700, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
          }}>
            {t(d.tagLabel)}
          </div>
        </div>

        {/* ── HERO HEADER ── */}
        <div style={{
          padding: 'clamp(32px,6vw,60px) clamp(16px,4vw,40px) clamp(24px,4vw,40px)',
          maxWidth: 740,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Glow ring avatar */}
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            margin: '0 auto 24px',
            background: isBride
              ? 'radial-gradient(circle, rgba(255,107,157,0.3) 0%, rgba(200,30,90,0.1) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(96,160,255,0.3) 0%, rgba(20,60,200,0.1) 60%, transparent 100%)',
            border: `2px solid ${d.accent}50`,
            boxShadow: `0 0 50px ${d.accentGlow}, 0 0 100px ${d.accentGlow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}>
            <UserCircle2 size={60} color={d.accent} strokeWidth={1.2} />
          </div>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 20px', borderRadius: 100,
            background: `${d.accent}20`, border: `1px solid ${d.accent}50`,
            color: d.accent, fontSize: '0.7rem', fontWeight: 800,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'Plus Jakarta Sans', marginBottom: 16,
          }}>
            {t(d.tagLabel)}
          </div>

          {/* Prefix */}
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${d.accent}80`, fontFamily: 'Plus Jakarta Sans', marginBottom: 8 }}>
            {t(d.prefix)}
          </div>

          {/* Big name */}
          <h1 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem,7vw,3.8rem)',
            background: d.nameGrad,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            filter: `drop-shadow(0 0 40px ${d.accent}60)`,
            marginBottom: 12,
          }}>
            {d.fullName}
          </h1>

          {/* Degree */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 600,
            marginBottom: 24,
          }}>
            <GraduationCap size={14} /> {d.degree}
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem,2vw,1.05rem)',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.68)',
          }}>
            {t(d.description)}
          </p>
        </div>

        {/* ── DETAILS CARDS ── */}
        <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 clamp(16px,4vw,32px) 60px' }}>

          {/* Family Info Card */}
          <div style={{
            borderRadius: 24,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${d.accent}25`,
            backdropFilter: 'blur(20px)',
            padding: 'clamp(18px,4vw,28px)',
            marginBottom: 20,
            boxShadow: `0 0 60px ${d.accent}15`,
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: d.accent, fontFamily: 'Plus Jakarta Sans', marginBottom: 4 }}>
              {lang === 'te' ? '👨‍👩‍👧 కుటుంబ వివరాలు' : '👨‍👩‍👧 Family Details'}
            </div>

            <InfoRow
              icon={<Users size={17} />}
              label={lang === 'te' ? 'తండ్రి (Father)' : 'Father'}
              value={t(d.father)}
              sub={lang === 'te' ? undefined : d.father.te}
            />
            <InfoRow
              icon={<Heart size={17} />}
              label={lang === 'te' ? 'తల్లి (Mother)' : 'Mother'}
              value={t(d.mother)}
              sub={lang === 'te' ? undefined : d.mother.te}
            />

            {/* ── BROTHER SECTION ── */}
            <InfoRow
              icon={<UserCircle2 size={17} />}
              label={lang === 'te' ? t(d.brotherRel) + ' (Brother)' : t(d.brotherRel)}
              value={t(d.brother)}
              sub={lang === 'te' ? undefined : `${d.brother.te} (${d.brotherRel.te})`}
            />

            <InfoRow
              icon={<Sparkles size={17} />}
              label={lang === 'te' ? 'సంబంధం' : 'Relation in Family'}
              value={`${t(d.relation)} · ${d.family}`}
              sub={undefined}
            />
            <div style={{ padding: '16px 0 0' }}>
              <InfoRow
                icon={<MapPin size={17} />}
                label={lang === 'te' ? 'స్వగ్రామం (Native Place)' : 'Native Place'}
                value={t(d.native)}
                sub={lang === 'te' ? undefined : d.native.te}
              />
            </div>
          </div>

          {/* Wedding Ceremonies Card */}
          <div style={{
            borderRadius: 24,
            background: isBride
              ? 'linear-gradient(145deg, rgba(255,107,157,0.1) 0%, rgba(200,30,90,0.04) 100%)'
              : 'linear-gradient(145deg, rgba(96,160,255,0.1) 0%, rgba(20,60,200,0.04) 100%)',
            border: `1px solid ${d.accent}35`,
            backdropFilter: 'blur(20px)',
            padding: 'clamp(18px,4vw,28px)',
            marginBottom: 20,
            boxShadow: `0 0 60px ${d.accentGlow}`,
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: d.accent, fontFamily: 'Plus Jakarta Sans', marginBottom: 18 }}>
              {lang === 'te' ? '🎊 వివాహ కార్యక్రమాలు' : '🎊 Wedding Ceremonies & Role'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {d.rituals.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: `${d.accent}18`, border: `1px solid ${d.accent}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '0.7rem', color: d.accent,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'te' ? r.te : r.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wedding Date & Venue */}
          <div style={{
            borderRadius: 24,
            background: 'rgba(245,200,66,0.06)',
            border: '1px solid rgba(245,200,66,0.25)',
            padding: 'clamp(18px,4vw,28px)',
            marginBottom: 32,
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f5c842', fontFamily: 'Plus Jakarta Sans', marginBottom: 16 }}>
              💍 {lang === 'te' ? 'వివాహ వివరాలు' : 'Wedding Details'}
            </div>

            {[
              { label: lang === 'te' ? 'తేదీ' : 'Date', value: 'Friday, 28th August 2026' },
              { label: lang === 'te' ? 'సుముహూర్తం' : 'Sumuhurtham', value: '10:08 PM — Shatabhisha Nakshatrayukta' },
              { label: lang === 'te' ? 'విందు' : 'Dinner', value: '7:00 PM onwards' },
              { label: lang === 'te' ? 'వేదిక' : 'Venue', value: 'Helapuri Lions Club Kalyana Vedika, Sanivarapupeta' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(245,200,66,0.1)' : 'none' }}>
                <div style={{ minWidth: 90, fontSize: '0.72rem', fontWeight: 700, color: 'rgba(245,200,66,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
                  {item.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Back button */}
          <button
            onClick={onBack}
            style={{
              width: '100%', padding: '16px', borderRadius: 18,
              background: `linear-gradient(135deg, ${d.accent} 0%, ${d.accentDark} 100%)`,
              color: '#fff', fontSize: '0.9rem', fontWeight: 800,
              border: 'none', cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.1em', textTransform: 'uppercase',
              boxShadow: `0 8px 30px ${d.accentGlow}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <ArrowLeft size={16} /> {lang === 'te' ? 'వెనక్కి వెళ్ళు' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
}
