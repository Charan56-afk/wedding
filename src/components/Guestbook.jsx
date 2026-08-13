import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, UserCheck, Clock, CheckCircle2 } from 'lucide-react';
import { db, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from '../firebase';

const EMOJIS = ['🙏', '❤️', '💐', '🎊', '✨', '🌸', '💍', '🎉'];

const SAMPLE_WISHES = [
  { name: 'Vijaya Lakshmi', msg: 'Wishing you both a lifetime of love and happiness! Congratulations Hari Chandana & Harsha! 💐', emojis: { '🙏': 5, '❤️': 3 }, time: 'Aug 2026' },
  { name: 'Ravi Kumar', msg: 'Telugu Subhakankshalu! May God bless this beautiful couple always. 🌸', emojis: { '🌸': 7, '🎊': 2 }, time: 'Aug 2026' },
  { name: 'Srinivasa Rao', msg: 'Congratulations to the lovely couple! May your journey together be full of joy! ✨', emojis: { '✨': 4 }, time: 'Aug 2026' },
];

export function Guestbook({ lang }) {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [wishes, setWishes] = useState(SAMPLE_WISHES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Real-time synchronization with Firestore (wishes collection)
  useEffect(() => {
    let unsubscribe = () => {};

    if (db) {
      try {
        const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const liveWishes = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Anonymous Guest',
              msg: data.msg || '',
              emojis: data.emojis || {},
              time: data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : 'Just now',
            };
          });

          if (liveWishes.length > 0) {
            setWishes([...liveWishes, ...SAMPLE_WISHES]);
          }
        }, (err) => {
          console.warn("Firestore live sync fallback to local:", err.message);
          const saved = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
          if (saved.length > 0) setWishes([...saved, ...SAMPLE_WISHES]);
        });
      } catch (err) {
        console.warn("Firestore error:", err);
      }
    } else {
      const saved = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
      if (saved.length > 0) setWishes([...saved, ...SAMPLE_WISHES]);
    }

    return () => unsubscribe();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    setIsSubmitting(true);
    const newWish = {
      name: name.trim(),
      msg: msg.trim(),
      emojis: {},
      time: 'Just now',
      createdAt: new Date().toISOString(),
    };

    // 1. Send wish to Node.js Express Backend API
    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newWish.name, msg: newWish.msg })
      });
    } catch (apiErr) {
      console.warn("Express backend API post note:", apiErr.message);
    }

    // 2. Try writing doc to Firebase Firestore collection 'wishes'
    if (db) {
      try {
        await addDoc(collection(db, 'wishes'), {
          name: newWish.name,
          msg: newWish.msg,
          createdAt: serverTimestamp(),
          formattedTime: new Date().toLocaleString(),
        });
      } catch (err) {
        console.warn("Firebase write warning:", err.message);
      }
    }

    // 3. Save locally as fallback & update state
    const saved = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
    localStorage.setItem('wedding-wishes', JSON.stringify([newWish, ...saved]));

    setWishes((prev) => [newWish, ...prev]);
    setName('');
    setMsg('');
    setIsSubmitting(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f5c842', '#ff6b9d', '#a855f7', '#34d399', '#ffffff'],
    });
  };

  const addEmoji = (idx, emoji) => {
    setWishes((prev) =>
      prev.map((w, i) =>
        i === idx
          ? { ...w, emojis: { ...w.emojis, [emoji]: (w.emojis[emoji] || 0) + 1 } }
          : w
      )
    );
  };

  return (
    <section id="guestbook" style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-wrapper">
        <div className="section-header">
          <div className="section-eyebrow">
            <Sparkles size={14} />
            {lang === 'te' ? 'దీవెనలు & శుభాకాంక్షలు' : 'Blessings Wall & Firebase Live'}
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'మీ దీవెనలు పంపండి' : 'Send Your Blessings'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te'
              ? 'మీ ఆశీస్సులు ఫైర్‌బేస్‌లో భద్రపరచబడతాయి'
              : 'Your wishes are recorded in real-time so Hari Chandana & Harsha can see them forever'}
          </p>
        </div>

        {/* Submit Form */}
        <div className="glass-card-gold" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 32, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '0.9rem', fontWeight: 700, color: 'rgba(245,200,66,0.9)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Heart size={16} fill="currentColor" color="#ff6b9d" />
              {lang === 'te' ? 'మీ దీవెన పంచుకోండి' : 'Leave a Blessing for the Couple'}
            </div>

            {/* Cloud Firestore sync badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 100,
              background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399', fontSize: '0.68rem', fontWeight: 700,
              fontFamily: 'Plus Jakarta Sans',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              Firebase Firestore Connected
            </div>
          </div>

          {submittedSuccess && (
            <div style={{
              padding: '12px 18px', borderRadius: 14,
              background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.4)',
              color: '#34d399', fontSize: '0.85rem', fontWeight: 700,
              marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
              animation: 'backdrop-fade-in 0.3s ease both',
            }}>
              <CheckCircle2 size={18} />
              {lang === 'te' ? 'మీ దీవెనలు భద్రపరచబడ్డాయి! ధన్యవాదాలు ❤️' : 'Your blessing has been sent and saved to Firebase! Thank you ❤️'}
            </div>
          )}

          <form onSubmit={submit}>
            <div className="guestbook-form" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6, fontFamily: 'Plus Jakarta Sans' }}>
                  {lang === 'te' ? 'మీ పేరు' : 'Your Name'}
                </label>
                <input
                  className="guestbook-input"
                  placeholder={lang === 'te' ? 'ఉదా: రామారావు గారు' : 'e.g., Ramesh & Family'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(245,200,66,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6, fontFamily: 'Plus Jakarta Sans' }}>
                  {lang === 'te' ? 'మీ శుభాకాంక్షలు & దీవెనలు' : 'Your Heartfelt Blessings & Message'}
                </label>
                <textarea
                  className="guestbook-textarea"
                  placeholder={lang === 'te' ? 'వివాహ జంటకు మీ ఆశీస్సులు రాసేయండి...' : 'Write your heartfelt wishes & blessings for Hari Chandana & Harsha...'}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-rsvp"
                disabled={isSubmitting}
                style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Send size={14} />
                {isSubmitting
                  ? (lang === 'te' ? 'పంపుతోంది...' : 'Sending to Firestore...')
                  : (lang === 'te' ? 'దీవెన పంపండి' : 'Send Blessings')}
              </button>
            </div>
          </form>
        </div>

        {/* Blessings Wall Display */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 700, fontSize: '1rem', color: '#f5c842' }}>
            💌 {lang === 'te' ? 'వచ్చిన దీవెనలు' : 'Recent Wishes Received'} ({wishes.length})
          </div>
        </div>

        <div className="blessings-wall">
          {wishes.map((w, i) => (
            <div className="blessing-card glass-card" key={w.id || i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${(i * 75) % 360}, 75%, 55%), hsl(${(i * 75 + 40) % 360}, 70%, 45%))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.92rem', color: '#fff',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    flexShrink: 0,
                  }}
                >
                  {(w.name || 'G').charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {w.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} /> {w.time}
                  </div>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 14, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                "{w.msg}"
              </p>

              {/* Emoji Reactions */}
              <div className="blessing-emoji-bar">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    className="emoji-btn"
                    onClick={() => addEmoji(i, emoji)}
                    title={`React with ${emoji}`}
                  >
                    {emoji}
                    {w.emojis && w.emojis[emoji] ? (
                      <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginLeft: 3 }}>
                        {w.emojis[emoji]}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
