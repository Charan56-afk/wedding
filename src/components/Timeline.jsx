import React from 'react';
import { Utensils, Flower2, Gem, Sun, Clock, Sparkles } from 'lucide-react';

const EVENTS = [
  {
    icon: <Utensils size={22} color="#04011a" />,
    time: '7:00 PM',
    nameEn: 'Grand Dinner',
    nameTe: 'విందు (Grand Dinner)',
    descEn: 'Friday, 28th August 2026 — Guests are cordially invited for a grand feast',
    descTe: 'శుక్రవారం, 28 ఆగష్టు 2026 — విందు కార్యక్రమం',
    color: '#f5c842',
  },
  {
    icon: <Sun size={22} color="#04011a" />,
    time: '10:08 PM',
    nameEn: 'Sumuhurtham — Auspicious Wedding',
    nameTe: 'సుముహూర్తం',
    descEn: 'Shatabhisha Nakshatrayukta, Mesha Lagnam — The sacred union begins',
    descTe: 'శతభిష నక్షత్రయుక్త మేషలగ్నమందు — పవిత్ర వివాహ సమయం',
    color: '#ff6b9d',
  },
  {
    icon: <Flower2 size={22} color="#04011a" />,
    time: 'During Ceremony',
    nameEn: 'Jeelakarra Bellam',
    nameTe: 'జీలకర్ర బెల్లం',
    descEn: 'Cumin & Jaggery ritual — accepting each other before God and family',
    descTe: 'జీలకర్ర-బెల్లం కట్టే ఆచారం — ఒకరినొకరు అంగీకరించడం',
    color: '#a855f7',
  },
  {
    icon: <Gem size={22} color="#04011a" />,
    time: 'After Jeelakarra',
    nameEn: 'Mangalasutra Dharana',
    nameTe: 'మంగళసూత్ర ధారణ',
    descEn: 'The groom ties the sacred thread of matrimony with divine blessings',
    descTe: 'వివాహ బంధం పవిత్రమైన మంగళసూత్ర ధారణ',
    color: '#22d3ee',
  },
  {
    icon: <Sparkles size={22} color="#04011a" />,
    time: 'Final Ritual',
    nameEn: 'Talambralu',
    nameTe: 'తలంబ్రాలు',
    descEn: 'Couple showers sacred rice on each other — a joyful blessing ritual',
    descTe: 'తలంబ్రాలు తో వివాహ వేడుక పరిపూర్ణమవుతుంది',
    color: '#f5c842',
  },
];

export function Timeline({ lang }) {
  return (
    <section id="timeline" style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.04) 50%, transparent)' }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-eyebrow">
            <Clock size={14} />
            {lang === 'te' ? 'కార్యక్రమ వివరాలు' : 'Event Schedule'}
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'వివాహ కార్యక్రమాలు' : 'Wedding Ceremonies'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te'
              ? '28 ఆగష్టు 2026 — అన్ని కార్యక్రమాల వివరాలు'
              : 'All events on Friday, 28th August 2026 at Helapuri Lions Club Kalyana Vedika'}
          </p>
        </div>

        <div className="timeline-track">
          {EVENTS.map((ev, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                className="timeline-item"
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 72px 1fr',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                {/* Left side */}
                <div style={{ textAlign: 'right' }}>
                  {isLeft && (
                    <div
                      className="timeline-content glass-card"
                      style={{ textAlign: 'left', padding: '20px 24px' }}
                    >
                      <div className="timeline-time" style={{ color: ev.color }}>{ev.time}</div>
                      <div className="timeline-event-name">{lang === 'te' ? ev.nameTe : ev.nameEn}</div>
                      <div className="timeline-desc">{lang === 'te' ? ev.descTe : ev.descEn}</div>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div
                  className="timeline-dot"
                  style={{
                    background: `linear-gradient(135deg, ${ev.color} 0%, ${ev.color}99 100%)`,
                    boxShadow: `0 0 30px ${ev.color}80, 0 0 60px ${ev.color}30`,
                  }}
                >
                  {ev.icon}
                </div>

                {/* Right side */}
                <div>
                  {!isLeft && (
                    <div
                      className="timeline-content glass-card"
                      style={{ textAlign: 'left', padding: '20px 24px' }}
                    >
                      <div className="timeline-time" style={{ color: ev.color }}>{ev.time}</div>
                      <div className="timeline-event-name">{lang === 'te' ? ev.nameTe : ev.nameEn}</div>
                      <div className="timeline-desc">{lang === 'te' ? ev.descTe : ev.descEn}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
