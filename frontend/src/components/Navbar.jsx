import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cross, Menu, X, HandHeart, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Introduction', path: '/introduction' },
  { label: 'Home',         path: '/home' },
  { label: 'About',        path: '/about' },
  { label: 'Gallery',      path: '/gallery' },
  { label: 'Contact',      path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  /* prevent body scroll when sidebar open */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <>
      {/* ══════════════════════════════════════
          HEADER
      ══════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: scrolled ? '12px 40px' : '20px 40px',
          background: scrolled ? 'rgba(8,12,28,0.92)' : 'rgba(8,12,28,0.35)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(201,168,76,0.15)'
            : '1px solid rgba(201,168,76,0.05)',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── Mobile hamburger (LEFT) ── */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-menu-btn"
            aria-label="Open menu"
            style={{
              display: 'none',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 10,
              padding: '8px 10px',
              cursor: 'pointer',
              color: '#c9a84c',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Menu size={22} />
          </button>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.02 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(201,168,76,0.12)',
                border: '1.5px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Cross size={18} color="#c9a84c" />
              </div>
              <div>
                <div style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontSize: '1.1rem', fontWeight: 700,
                  color: '#fff', lineHeight: 1.1, letterSpacing: '0.01em',
                }}>
                  Infant Jesus Church
                </div>
                <div style={{
                  fontSize: '0.65rem', color: '#c9a84c',
                  letterSpacing: '0.1em', fontFamily: "'Meera Inimai', Inter, sans-serif", opacity: 0.85,
                }}>
                  PUTHENKADA · NEYYATTINKARA
                </div>
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ color: '#c9a84c' }}
                    style={{
                      position: 'relative',
                      padding: '8px 18px',
                      color: active ? '#c9a84c' : 'rgba(210,225,245,0.82)',
                      fontSize: '0.88rem',
                      fontWeight: active ? 600 : 400,
                      fontFamily: "'Meera Inimai', Inter, sans-serif",
                      letterSpacing: '0.03em',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="navUnderline"
                        style={{
                          position: 'absolute', bottom: 2,
                          left: '18px', right: '18px',
                          height: 1.5,
                          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
                          borderRadius: 1,
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            <Link to="/contact" style={{ textDecoration: 'none', marginLeft: 8 }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 4px 24px rgba(201,168,76,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 22px',
                  background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                  color: '#1a1200', fontSize: '0.82rem', fontWeight: 700,
                  fontFamily: "'Meera Inimai', Inter, sans-serif", letterSpacing: '0.04em',
                  border: 'none', borderRadius: 50, cursor: 'pointer',
                  boxShadow: '0 2px 16px rgba(201,168,76,0.2)',
                  transition: 'all 0.3s',
                }}
              >
                <HandHeart size={15} /> Prayer Request
              </motion.button>
            </Link>
          </nav>

          {/* ── Mobile prayer icon (RIGHT, small) ── */}
          <Link to="/contact" className="mobile-prayer-btn" style={{ textDecoration: 'none', display: 'none' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HandHeart size={16} color="#1a1200" />
            </div>
          </Link>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════
          LEFT SIDEBAR + BACKDROP
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.65)',
                zIndex: 300,
                backdropFilter: 'blur(3px)',
              }}
            />

            {/* Sidebar panel */}
            <motion.div
              key="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, bottom: 0,
                width: 300,
                background: 'linear-gradient(180deg, #080c1c 0%, #0f1c38 40%, #1a2744 100%)',
                borderRight: '1px solid rgba(201,168,76,0.18)',
                zIndex: 400,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Sidebar header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(201,168,76,0.15)',
                    border: '1.5px solid rgba(201,168,76,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Cross size={16} color="#c9a84c" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Crimson Pro, serif',
                      fontSize: '0.95rem', fontWeight: 700, color: '#fff',
                    }}>
                      Infant Jesus Church
                    </div>
                    <div style={{
                      fontSize: '0.58rem', color: '#c9a84c',
                      letterSpacing: '0.1em', fontFamily: "'Meera Inimai', Inter, sans-serif",
                    }}>
                      PUTHENKAD · NEYYATTINKARA
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 8, padding: '6px',
                    cursor: 'pointer', color: '#c9a84c',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav label */}
              <div style={{ padding: '20px 24px 8px' }}>
                <div style={{
                  fontSize: '0.6rem', color: 'rgba(180,200,230,0.4)',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: "'Meera Inimai', Inter, sans-serif",
                }}>
                  Navigation
                </div>
              </div>

              {/* Nav links */}
              <div style={{ padding: '0 16px', flex: 1 }}>
                {navLinks.map((link, i) => {
                  const active = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <Link to={link.path} style={{ textDecoration: 'none' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 16px',
                          marginBottom: 4,
                          borderRadius: 12,
                          background: active
                            ? 'linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08))'
                            : 'transparent',
                          border: active
                            ? '1px solid rgba(201,168,76,0.25)'
                            : '1px solid transparent',
                          transition: 'all 0.2s',
                        }}>
                          <span style={{
                            fontFamily: 'Crimson Pro, serif',
                            fontSize: '1.15rem',
                            fontWeight: active ? 700 : 400,
                            color: active ? '#c9a84c' : 'rgba(210,225,245,0.85)',
                          }}>
                            {link.label}
                          </span>
                          <ChevronRight
                            size={16}
                            color={active ? '#c9a84c' : 'rgba(180,200,230,0.3)'}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Prayer button at bottom */}
              <div style={{ padding: '20px 24px 32px' }}>
                <div style={{
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)',
                  marginBottom: 20,
                }} />
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', padding: '14px',
                    background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                    color: '#1a1200', fontSize: '0.9rem', fontWeight: 700,
                    fontFamily: "'Meera Inimai', Inter, sans-serif",
                    border: 'none', borderRadius: 50, cursor: 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                  }}>
                    <HandHeart size={16} /> Prayer Request
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav       { display: none !important; }
          .mobile-menu-btn   { display: flex !important; }
          .mobile-prayer-btn { display: block !important; }
          header { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  );
}
