import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music2, Pause } from 'lucide-react';

export function AudioPlayer({ lang }) {
  const [isPlaying, setIsPlaying]   = useState(false);
  const [volume, setVolume]         = useState(0.55);
  const [showHint, setShowHint]     = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef  = useRef(null);
  const startedRef = useRef(false);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;
    audio.volume = volume;
    audio.play().then(() => {
      startedRef.current = true;
      setIsPlaying(true);
      setShowHint(false);
      setAutoplayBlocked(false);
    }).catch(() => {});
  };

  // 1️⃣ Try immediate autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.play().then(() => {
      startedRef.current = true;
      setIsPlaying(true);
    }).catch(() => {
      // Browser blocked silent autoplay — wait for first user interaction
      setAutoplayBlocked(true);
      setShowHint(true);
    });
  }, []);

  // 2️⃣ On first touch/click/scroll anywhere → start music
  useEffect(() => {
    if (!autoplayBlocked) return;
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    const handler = () => {
      startMusic();
      events.forEach(ev => window.removeEventListener(ev, handler));
    };
    events.forEach(ev => window.addEventListener(ev, handler, { once: true, passive: true }));
    return () => events.forEach(ev => window.removeEventListener(ev, handler));
  }, [autoplayBlocked]);

  // Hide hint after 6s
  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(t);
  }, [showHint]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = volume;
      audio.play().then(() => {
        startedRef.current = true;
        setIsPlaying(true);
        setShowHint(false);
      }).catch(() => {});
    }
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/assets/wedding_music.mpeg"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating player button */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 20,
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {/* Hint bubble */}
        {showHint && (
          <div
            style={{
              padding: '8px 14px',
              borderRadius: 12,
              background: 'rgba(4,1,26,0.92)',
              border: '1px solid rgba(245,200,66,0.4)',
              color: 'rgba(245,200,66,0.9)',
              fontSize: '0.72rem',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              animation: 'fadeInUp 0.4s ease',
            }}
          >
            🎵 {lang === 'te' ? 'సంగీతం వినండి' : 'Tap to play wedding music'}
          </div>
        )}

        {/* Volume slider — shown when playing */}
        {isPlaying && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              borderRadius: 50,
              background: 'rgba(4,1,26,0.88)',
              border: '1px solid rgba(245,200,66,0.25)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            <VolumeX size={12} color="rgba(245,200,66,0.5)" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: 72,
                accentColor: '#f5c842',
                cursor: 'pointer',
              }}
            />
            <Volume2 size={12} color="rgba(245,200,66,0.8)" />
          </div>
        )}

        {/* Main play/pause button */}
        <button
          onClick={togglePlay}
          title={isPlaying ? 'Pause music' : 'Play wedding music'}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: `2px solid ${isPlaying ? '#f5c842' : 'rgba(245,200,66,0.35)'}`,
            background: isPlaying
              ? 'linear-gradient(135deg, rgba(245,200,66,0.25), rgba(255,107,157,0.15))'
              : 'rgba(4,1,26,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: isPlaying ? '#f5c842' : 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isPlaying
              ? '0 0 0 6px rgba(245,200,66,0.12), 0 8px 32px rgba(245,200,66,0.3)'
              : '0 4px 24px rgba(0,0,0,0.5)',
            transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
          }}
        >
          {/* Pulsing ring when playing */}
          {isPlaying && (
            <span
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                border: '2px solid rgba(245,200,66,0.3)',
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
                pointerEvents: 'none',
              }}
            />
          )}
          {isPlaying
            ? <Pause size={22} fill="currentColor" />
            : <Music2 size={22} />
          }
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
