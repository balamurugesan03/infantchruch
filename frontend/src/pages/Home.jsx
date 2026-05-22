import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Play,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Users,
} from 'lucide-react';
import { pageService, eventService } from '../services/api';
import PageLoader from '../components/PageLoader';

/* ─── Floating Particle ─── */
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.6) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

const particles = [
  { x: 10, y: 20, size: 4, delay: 0, duration: 4 },
  { x: 20, y: 60, size: 3, delay: 1, duration: 5 },
  { x: 80, y: 30, size: 5, delay: 0.5, duration: 3.5 },
  { x: 70, y: 70, size: 3, delay: 2, duration: 6 },
  { x: 50, y: 15, size: 4, delay: 1.5, duration: 4.5 },
  { x: 90, y: 50, size: 3, delay: 0.8, duration: 5.5 },
  { x: 35, y: 80, size: 6, delay: 2.5, duration: 4 },
  { x: 60, y: 45, size: 3, delay: 3, duration: 3.5 },
];

export default function Home() {
  const [page, setPage] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    Promise.all([pageService.getPage('home'), eventService.getEvents()])
      .then(([pageRes, eventsRes]) => {
        setPage(pageRes.data.data);
        setEvents(eventsRes.data.data?.slice(0, 3) || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader message="Preparing your spiritual journey..." />;

  const sortedSections = page?.sections?.sort((a, b) => a.order - b.order) || [];
  const heroImage = page?.heroImage || '/image.jpg';

  return (
    <div style={{ background: '#0a0f1e', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════════════════
          HERO SECTION — FULLSCREEN BACKGROUND
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* ── Parallax background image ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-8%',
            y: imageY,
            zIndex: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: '95%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.0) saturate(1.05)',
          }}
        />

        {/* ── Overlay — only bottom fade + left text shadow for readability ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)',
        }} />


        {/* ── Hero text content ── */}
        <motion.div
          style={{ y: textY, opacity, position: 'relative', zIndex: 3, width: '100%' }}
        >
          <div style={{
            margin: '0 auto 0 0',
            padding: '100px clamp(24px, 5vw, 80px) 120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 780,
          }}>

            {/* Golden label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}
            >
              <div style={{ width: 44, height: 1.5, background: 'linear-gradient(90deg, #c9a84c, #e8d08a)' }} />
              <span style={{
                color: '#c9a84c',
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontFamily: "'Meera Inimai', Inter, sans-serif",
              }}>
                Welcome To
              </span>
              <div style={{ width: 44, height: 1.5, background: 'linear-gradient(90deg, #e8d08a, transparent)' }} />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'Crimson Pro, Georgia, serif',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#ffffff',
                margin: '0 0 10px 0',
                letterSpacing: '-0.01em',
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}
            >
              {page?.heroTitle || 'Infant Jesus Church'}
            </motion.h1>

            {/* Diocese italic */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                fontFamily: 'Crimson Pro, serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                color: '#e8d08a',
                fontStyle: 'italic',
                marginBottom: 30,
                opacity: 0.95,
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              Puthenkada · Neyyattinkara Diocese
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
              style={{
                width: 90,
                height: 2.5,
                background: 'linear-gradient(90deg, #c9a84c, #e8d08a, rgba(232,208,138,0))',
                marginBottom: 30,
                transformOrigin: 'left',
              }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              style={{
                fontFamily: "'Meera Inimai', Inter, sans-serif",
                fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
                color: 'rgba(210,225,245,0.88)',
                lineHeight: 1.9,
                marginBottom: 48,
                maxWidth: 520,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {page?.heroSubtitle ||
                'A living witness to faith, unity, and reliance on God — a sacred home where generations of believers have gathered in worship, prayer, and love.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="hero-cta-btns"
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}
            >
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 48px rgba(201,168,76,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '15px 36px',
                    background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                    color: '#1a1200',
                    fontSize: '0.92rem', fontWeight: 700,
                    fontFamily: "'Meera Inimai', Inter, sans-serif",
                    letterSpacing: '0.04em',
                    border: 'none', borderRadius: 50,
                    cursor: 'pointer',
                    boxShadow: '0 4px 28px rgba(201,168,76,0.35)',
                  }}
                >
                  Discover Our Church <ChevronRight size={16} />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVideoOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '15px 30px',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.92rem', fontWeight: 500,
                  fontFamily: "'Meera Inimai', Inter, sans-serif",
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 50, cursor: 'pointer',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <span style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(201,168,76,0.18)',
                  border: '1px solid rgba(201,168,76,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play size={14} fill="#c9a84c" color="#c9a84c" />
                </span>
                Watch Video
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              style={{
                display: 'flex', gap: 'clamp(20px, 4vw, 40px)',
                flexWrap: 'wrap',
                paddingTop: 28,
                borderTop: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              {[
                { value: '100+', label: 'Years of Faith' },
                { value: '5000+', label: 'Parishioners' },
                { value: '365', label: 'Days of Prayer' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'Crimson Pro, serif', fontSize: '2.2rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "'Meera Inimai', Inter, sans-serif", fontSize: '0.72rem', color: 'rgba(180,200,230,0.6)', marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            zIndex: 4,
          }}
        >
          <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: 22, height: 38,
              border: '1.5px solid rgba(201,168,76,0.4)',
              borderRadius: 11,
              display: 'flex', justifyContent: 'center', paddingTop: 6,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 3, height: 8, background: '#c9a84c', borderRadius: 2 }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          MASS TIMINGS STRIP
      ═══════════════════════════════════════════ */}
      {page?.massTimes?.length > 0 && (
        <section style={{
          background: 'linear-gradient(90deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          padding: 'clamp(16px, 3vw, 24px) clamp(16px, 4vw, 40px)',
          overflowX: 'auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              maxWidth: 1400,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: 40,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <Clock size={16} color="#c9a84c" />
              <span style={{ color: '#c9a84c', fontSize: '0.72rem', letterSpacing: '0.15em', fontWeight: 700, textTransform: 'uppercase', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>
                Mass Timings
              </span>
            </div>
            <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.2)' }} />
            {page.massTimes.map((mt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ color: 'rgba(180,200,230,0.7)', fontSize: '0.82rem', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>{mt.day}</span>
                <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>{mt.time}</span>
                <span style={{ color: 'rgba(180,200,230,0.45)', fontSize: '0.72rem', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>{mt.language}</span>
                {i < page.massTimes.length - 1 && (
                  <div style={{ width: 1, height: 20, background: 'rgba(201,168,76,0.15)', marginLeft: 10 }} />
                )}
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          WELCOME SECTIONS
      ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: '0.72rem', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>
              Our Parish
            </span>
            <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Crimson Pro, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#fff',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.2,
          }}>
            Welcome to Our Faith Community
          </h2>
        </motion.div>

        <div className="home-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 28,
        }}>
          {sortedSections.map((section, i) => (
            <motion.div
              key={section._id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.12)',
                borderRadius: 20,
                padding: '36px 32px',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'border-color 0.3s',
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle at top right, rgba(201,168,76,0.1), transparent 70%)',
              }} />

              <div style={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <span style={{ color: '#c9a84c', fontSize: '1.3rem', fontFamily: 'Crimson Pro, serif', fontWeight: 700 }}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'Crimson Pro, serif',
                fontSize: '1.4rem',
                color: '#fff',
                fontWeight: 600,
                margin: '0 0 14px 0',
                lineHeight: 1.3,
              }}>
                {section.title}
              </h3>
              <p style={{
                fontFamily: "'Meera Inimai', Inter, sans-serif",
                fontSize: '0.88rem',
                color: 'rgba(180,200,230,0.7)',
                lineHeight: 1.85,
                margin: 0,
              }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          UPCOMING EVENTS
      ═══════════════════════════════════════════ */}
      {events.length > 0 && (
        <section style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.04) 50%, transparent 100%)',
        }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 1, background: '#c9a84c' }} />
                  <span style={{ color: '#c9a84c', fontSize: '0.72rem', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>
                    Calendar
                  </span>
                </div>
                <h2 style={{ fontFamily: 'Crimson Pro, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', fontWeight: 700, margin: 0 }}>
                  Upcoming Events
                </h2>
              </div>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ gap: 12 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c9a84c', fontSize: '0.85rem', fontFamily: "'Meera Inimai', Inter, sans-serif", fontWeight: 500 }}
                >
                  View All <ArrowRight size={16} />
                </motion.div>
              </Link>
            </motion.div>

            <div className="home-events-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {events.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    borderRadius: 20,
                    padding: '28px',
                    display: 'flex',
                    gap: 20,
                    backdropFilter: 'blur(10px)',
                    cursor: 'default',
                  }}
                >
                  {/* Date box */}
                  <div style={{
                    flexShrink: 0,
                    width: 56,
                    height: 64,
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.06))',
                    border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: '#c9a84c', fontSize: '1.4rem', fontFamily: 'Crimson Pro, serif', fontWeight: 700, lineHeight: 1 }}>
                      {new Date(event.date).getDate()}
                    </span>
                    <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.65rem', fontFamily: "'Meera Inimai', Inter, sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {new Date(event.date).toLocaleString('en', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: '#c9a84c',
                      fontSize: '0.65rem',
                      fontFamily: "'Meera Inimai', Inter, sans-serif",
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: 20,
                      marginBottom: 8,
                    }}>
                      {event.category}
                    </span>
                    <h4 style={{ fontFamily: 'Crimson Pro, serif', fontSize: '1.1rem', color: '#fff', fontWeight: 600, margin: '0 0 6px 0', lineHeight: 1.3 }}>
                      {event.title}
                    </h4>
                    <p style={{ fontFamily: "'Meera Inimai', Inter, sans-serif", fontSize: '0.8rem', color: 'rgba(180,200,230,0.6)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                      {event.description}
                    </p>
                    {event.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={12} color="#c9a84c" />
                        <span style={{ color: '#c9a84c', fontSize: '0.78rem', fontFamily: "'Meera Inimai', Inter, sans-serif" }}>{event.time}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 50%, rgba(26,39,68,0.4) 100%)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 28,
            padding: 'clamp(48px, 6vw, 80px) clamp(32px, 6vw, 80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center top, rgba(201,168,76,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <Heart size={36} color="#c9a84c" style={{ marginBottom: 24 }} />

          <h2 style={{
            fontFamily: 'Crimson Pro, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#fff',
            fontWeight: 700,
            margin: '0 0 16px 0',
            lineHeight: 1.2,
          }}>
            Join Our Faith Community
          </h2>
          <p style={{
            fontFamily: "'Meera Inimai', Inter, sans-serif",
            fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
            color: 'rgba(180,200,230,0.75)',
            maxWidth: 500,
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}>
            Come, be part of a community where faith is lived, celebrated, and shared together in the love of the Infant Jesus.
          </p>
          <div className="home-cta-btns" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(201,168,76,0.4)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                  color: '#1a1200', fontWeight: 700, fontSize: '0.9rem',
                  fontFamily: "'Meera Inimai', Inter, sans-serif",
                  border: 'none', borderRadius: 50, cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(201,168,76,0.25)',
                }}
              >
                <Users size={16} /> Get in Touch
              </motion.button>
            </Link>
            <Link to="/gallery" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#fff', fontWeight: 500, fontSize: '0.9rem',
                  fontFamily: "'Meera Inimai', Inter, sans-serif",
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                }}
              >
                View Gallery <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          VIDEO MODAL
      ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.92)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(10,15,30,0.95)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 20,
                padding: 40,
                maxWidth: 500,
                width: '90%',
                textAlign: 'center',
              }}
            >
              <Play size={48} color="#c9a84c" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontFamily: 'Crimson Pro, serif', color: '#fff', fontSize: '1.5rem', margin: '0 0 12px' }}>
                Parish Video
              </h3>
              <p style={{ color: 'rgba(180,200,230,0.7)', fontFamily: "'Meera Inimai', Inter, sans-serif", fontSize: '0.88rem', marginBottom: 24 }}>
                Add your parish video URL in the Admin Panel to display it here.
              </p>
              <button
                onClick={() => setVideoOpen(false)}
                style={{
                  padding: '10px 28px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: '#c9a84c',
                  borderRadius: 50,
                  cursor: 'pointer',
                  fontFamily: "'Meera Inimai', Inter, sans-serif",
                  fontSize: '0.85rem',
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .home-events-grid { grid-template-columns: 1fr !important; }
          .home-cta-btns { flex-direction: column !important; align-items: stretch !important; }
          .home-cta-btns a, .home-cta-btns button { width: 100% !important; justify-content: center !important; }
          .hero-cta-btns { display: none !important; }
        }
      `}</style>
    </div>
  );
}
