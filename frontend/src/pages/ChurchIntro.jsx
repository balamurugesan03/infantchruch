import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconSearch, IconChevronRight } from '@tabler/icons-react';
import { pageService } from '../services/api';

const MENU_ITEMS = [
  { label: 'ദൈവാലയ ഗോപുരങ്ങൾ',                        download: '/pdfs/Button 1 daivalaya gopurangal 3 pages (1).pdf' },
  { label: 'രക്ഷാകര ചരിത്രം',                          path: '/about' },
  { label: 'അങ്കണത്തിൽ നിന്ന് ആനവാതിലിലേക്ക്',       path: '/contact' },
  { label: 'ദൈവാലയത്തിന്റെ ഉൽത്തളങ്ങളിൽ',            path: '/about' },
  { label: 'ആൾത്താരയിലേക്ക്',                         path: '/contact' },
  { label: 'വിശുദ്ധർ',                                 path: '/gallery' },
  { label: 'തിരികെ ഇറങ്ങുമ്പോൾ',                     path: '/gallery' },
];

export default function ChurchIntro() {
  const [search, setSearch] = useState('');
  const [pageData, setPageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    pageService.getPage('church-intro')
      .then((res) => setPageData(res.data.data))
      .catch(() => {});
  }, []);

  const m = (key, fallback) => pageData?.metadata?.[key] || fallback;
  const bgImage = pageData?.heroImage || '/image.jpg';

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      fontFamily: "'Meera Inimai', sans-serif",
      overflow: 'hidden',
    }}>

      {/* ── Blurred church background ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(3px) brightness(0.55)',
        transform: 'scale(1.05)',
        zIndex: 0,
      }} />

      {/* ── Cream overlay ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(253,248,240,0.82) 0%, rgba(245,237,224,0.78) 100%)',
        zIndex: 1,
      }} />

      {/* ── Page content ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        paddingTop: 88,
        paddingBottom: 60,
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 24px)',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 40,
          alignItems: 'start',
          minHeight: 'calc(100vh - 148px)',
        }}
        className="church-intro-grid"
        >

          {/* ════════════════════════════
              LEFT — Search + Content
          ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Church title header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 28,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '1.3rem', color: '#fff' }}>✝</span>
              </div>
              <div>
                <h1 style={{
                  fontFamily: "'Meera Inimai', sans-serif",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
                  fontWeight: 800,
                  color: '#1a2744',
                  margin: 0,
                  lineHeight: 1.25,
                }}>
                  {m('churchTitle', 'ശിശുയേശു ദൈവാലയം, പുത്തൻകാട്')}
                </h1>
                <p style={{
                  fontSize: '0.78rem',
                  color: '#c9a84c',
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}>
                  {m('dioceseSubtitle', 'നെയ്യാറ്റിൻകര രൂപത · Neyyattinkara Diocese')}
                </p>
              </div>
            </motion.div>

            {/* ── Search bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="church-intro-search"
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 32,
              }}
            >
              {/* <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 50,
                border: '2px solid rgba(244,163,0,0.3)',
                boxShadow: '0 4px 20px rgba(244,163,0,0.12)',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              >
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="പള്ളി കണ്ടെത്തി..."
                  style={{
                    flex: 1,
                    padding: '14px 22px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1rem',
                    color: '#333',
                    outline: 'none',
                    fontFamily: "'Meera Inimai', sans-serif",
                  }}
                />
              </div> */}
              {/* <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 8px 28px rgba(244,163,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #f4a300, #f5c842)',
                  border: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(244,163,0,0.35)',
                  flexShrink: 0,
                }}
              >
                <IconSearch size={20} color="#1a56db" strokeWidth={2.5} />
                <span style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#1a1200',
                  fontFamily: "'Meera Inimai', sans-serif",
                }}>
                  തിരയുക
                </span>
              </motion.button> */}
            </motion.div>

            {/* ── Malayalam content card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: 24,
                padding: '32px 36px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                border: '1px solid rgba(201,168,76,0.18)',
              }}
            >
              {/* Section label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
              }}>
                <div style={{
                  width: 4, height: 32, borderRadius: 3,
                  background: 'linear-gradient(180deg, #f4a300, #c9a84c)',
                }} />
                <div>
                  <div style={{
                    fontSize: '0.68rem', color: '#f4a300', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2,
                  }}>
                    {m('introLabel', 'ആമുഖം')}
                  </div>
                  <div style={{
                    fontSize: '1.05rem', fontWeight: 700, color: '#1a2744',
                  }}>
                    {m('introSectionTitle', 'ദൈവാലയ പരിചയം')}
                  </div>
                </div>
              </div>

              {/* Malayalam text */}
              <div style={{
                fontSize: '1rem',
                color: '#2c2c2c',
                lineHeight: 2.1,
                textAlign: 'justify',
                whiteSpace: 'pre-line',
                fontFamily: "'Meera Inimai', sans-serif",
              }}>
                {m('mainContent', `ആഗോള കത്തോലിക്കാ സഭയിൽ നെയ്യാറ്റിൻകര രൂപത
പുത്തൻകട പ്രദേശത്തിൽ ഉണ്ണിമിശിഹായുടെ നാമധേയത്തിൽ
നിലകൊള്ളുന്ന ദൈവാലയം തിരുസഭയുടെയും പ്രത്യേകിച്ച്
ഇടവക ജനത്തിന്റെയും ദൈവാശ്രയത്തിന്റെയും
വിശ്വസ്തതയുടെയും ഐക്യത്തിന്റെയും നേർസാക്ഷ്യമാണ്.
ഈ ദൈവാലയം കേവലം ഒരു കല്ലും ചുണ്ണാമ്പും കൊണ്ട്
നിർമ്മിച്ച കെട്ടിടം മാത്രമല്ല, മറിച്ച് തലമുറതലമുറയായി
കൈമാറി വന്ന ഭക്തിയുടെയും ത്യാഗത്തിന്റെയും
ഒരു ജീവനുള്ള ആലയമാണ്.

ഇവിടെ ദൈവകൃപ അനുഭവിച്ച് ജീവിതം നയിക്കുന്ന
അനേകം ക്രൈസ്തവ കുടുംബങ്ങൾ ഈ ദൈവാലയത്തിന്
ചുറ്റും ഒത്തുചേർന്ന് ദൈവ ജനത്തിന്റെ ഐക്യം
പ്രഘോഷിക്കുന്നു. ദൈവസ്നേഹത്തിന്റെ ഈ ഭവനത്തിലേക്ക്
നിങ്ങളെ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.`)}
              </div>

              {/* Gold divider */}
              <div style={{
                margin: '24px 0 0',
                height: 1,
                background: 'linear-gradient(90deg, #f4a300, rgba(201,168,76,0.3), transparent)',
                borderRadius: 1,
              }} />

              {/* Footer tag */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 16,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(244,163,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '0.75rem' }}>✝</span>
                </div>
                <span style={{
                  fontSize: '0.75rem', color: '#999',
                  fontStyle: 'italic',
                }}>
                  {m('dioceseFooter', 'നെയ്യാറ്റിൻകര രൂപതയ്ക്ക് കീഴിലുള്ള ഇടവക')}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ════════════════════════════
              RIGHT — Maroon pill buttons
          ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'sticky',
              top: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Section label */}
            <div style={{
              fontSize: '0.7rem', fontWeight: 700,
              color: '#7a0c0c', letterSpacing: '0.14em',
              textTransform: 'uppercase', marginBottom: 4,
              paddingLeft: 4,
            }}>
             ദൈവാലയ ഗോപുരങ്ങൾ
            </div>

            {MENU_ITEMS.map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                whileHover={{
                  scale: 1.03,
                  x: 4,
                  boxShadow: '0 8px 28px rgba(122,12,12,0.35)',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (item.download) {
                    window.open(item.download, '_blank');
                  } else {
                    navigate(item.path);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '15px 22px',
                  background: 'linear-gradient(135deg, #7a0c0c 0%, #9b1212 100%)',
                  border: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  boxShadow: '0 4px 16px rgba(122,12,12,0.25)',
                  transition: 'all 0.25s',
                }}
              >
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: "'Meera Inimai', sans-serif",
                  textAlign: 'left',
                  lineHeight: 1.3,
                }}>
                  {item.label}
                </span>
                <IconChevronRight
                  size={16}
                  color="rgba(255,255,255,0.6)"
                  strokeWidth={2.5}
                  style={{ flexShrink: 0 }}
                />
              </motion.button>
            ))}

            {/* Decorative card below buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                marginTop: 8,
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '20px',
                border: '1px solid rgba(201,168,76,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>🕊️</div>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#1a2744',
                fontFamily: "'Meera Inimai', sans-serif",
                marginBottom: 4,
              }}>
                {m('decorativeCardTitle', 'ദൈവ സന്നിധിയിൽ')}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: '#888',
                fontFamily: "'Meera Inimai', sans-serif",
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}>
                {m('decorativeCardText', 'ഓരോ ദിവസവും\nദൈവകൃപ അനുഭവിക്കുക')}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


      <style>{`
        @media (max-width: 860px) {
          .church-intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .church-intro-search {
            flex-direction: column !important;
          }
          .church-intro-search button {
            width: 100% !important;
            border-radius: 16px !important;
          }
          .church-intro-search > div {
            border-radius: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
