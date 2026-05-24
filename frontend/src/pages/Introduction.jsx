import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IconSearch,
  IconChevronRight,
  IconBuildingChurch,
  IconMapPin,
  IconMap,
  IconGlobe,
} from '@tabler/icons-react';
import { pageService } from '../services/api';

const STEPS = [
  { icon: IconBuildingChurch, label: 'വത്തിക്കാൻ', sublabel: 'Vatican' },
  { icon: IconGlobe,          label: 'ലോക സഭ',     sublabel: 'World' },
  { icon: IconMap,            label: 'ഇന്ത്യ',      sublabel: 'India' },
  { icon: IconMapPin,         label: 'കേരളം',       sublabel: 'Kerala' },
  { icon: IconBuildingChurch, label: 'ദൈവാലയം',    sublabel: 'Church' },
];

export default function Introduction() {
  const [searchVal, setSearchVal] = useState('');
  const [pageData, setPageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    pageService.getPage('introduction')
      .then((res) => setPageData(res.data.data))
      .catch(() => {});
  }, []);

  const m = (key, fallback) => pageData?.metadata?.[key] || fallback;
  const churchImage = pageData?.heroImage || '/image.jpg';

  return (
    <div className="intro-page">

      <div className="intro-grid">

        {/* ══════════════════════════
            LEFT PANEL
        ══════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* Yellow welcome banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="intro-banner"
          >
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: '#7a5c00' }}>✝</span>
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7a5c00' }}>
                സ്വാഗതം
              </span>
            </div>
            <p style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', fontWeight: 700, color: '#2c1800', margin: 0, lineHeight: 1.55 }}>
              {m('welcomeText', 'പുത്തൻകാട് ശിശുയേശു ദൈവാലയത്തിലേക്ക് സ്വാഗതം')}
            </p>
          </motion.div>

          {/* Malayalam paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ background: '#fff', borderRadius: 18, padding: '20px 22px', marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 26, borderRadius: 2, background: 'linear-gradient(180deg, #c9a84c, #e8d08a)', flexShrink: 0 }} />
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a2744' }}>ആമുഖം</span>
            </div>
            <p style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: '0.92rem', color: '#333', lineHeight: 1.9, margin: '0 0 10px 0' }}>
              {m('introPara1', 'നെയ്യാറ്റിൻകര രൂപതയ്ക്ക് കീഴിലുള്ള പുത്തൻകാട് ശിശുയേശു ദൈവാലയം, വിശ്വാസം, ഐക്യം, ദൈവത്തിലുള്ള ആശ്രയം എന്നിവയുടെ ജീവന്റെ സാക്ഷ്യമാണ്. തലമുറകളായി ഭക്തജനങ്ങൾ ഈ ദൈവാലയത്തിൽ ആരാധനയ്ക്കും പ്രാർഥനയ്ക്കും ഒത്തുചേർന്ന് ദൈവകൃപ അനുഭവിക്കുന്നു.')}
            </p>
            <p style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: '0.92rem', color: '#555', lineHeight: 1.9, margin: 0 }}>
              {m('introPara2', 'ഈ ദൈവാലയം ഒരു സാധാരണ കെട്ടിടം മാത്രമല്ല — ഇത് ആത്മീയ ജീവിതത്തിന്റെ കേന്ദ്രമാണ്. കൂദാശകൾ, ഭക്തി കൂട്ടായ്മകൾ, സേവന പ്രവർത്തനങ്ങൾ എന്നിവ വഴി ഓരോ വിശ്വാസിയുടെ ജീവിതത്തെയും ഈ ദൈവാലയം സമ്പന്നമാക്കുന്നു.')}
            </p>
          </motion.div>

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ background: '#fff', borderRadius: 18, padding: '18px 22px', marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              ദൈവാലയം കണ്ടെത്തുക
            </p>
            <div className="intro-search-row">
              {/* <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="പള്ളി കണ്ടെത്തി..."
                className="intro-search-input"
                onFocus={e => e.target.style.borderColor = '#c9a84c'}
                onBlur={e => e.target.style.borderColor = '#e8e0d0'}
              /> */}
              <motion.button
                animate={{ scale: [1, 1.05, 1], boxShadow: ['0 4px 16px rgba(122,12,12,0.3)', '0 8px 32px rgba(122,12,12,0.6)', '0 4px 16px rgba(122,12,12,0.3)'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1, boxShadow: '0 12px 36px rgba(122,12,12,0.7)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/church-intro')}
                className="intro-search-btn"
                style={{
                  background: 'linear-gradient(135deg, #7a0c0c 0%, #9b1212 100%)',
                  border: 'none',
                  width: 200,
                  height: 64,
                  flexShrink: 0,
                  cursor: 'pointer',
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <img src="/palli kannadi-1.png" alt="പള്ളി കണ്ടി" style={{ height: 36, objectFit: 'contain' }} />
              </motion.button>
            </div>
          </motion.div>

          {/* Journey steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ background: '#fff', borderRadius: 18, padding: '20px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(201,168,76,0.12)' }}
          >
            {/* <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px 0', textAlign: 'center' }}>
               ഉണ്ണിമിശിഹാ ദൈവാലയം പുത്തൻകട
            </p> */}

            {/* Desktop: horizontal row */}
            {/* <div className="intro-steps-desktop">
              {STEPS.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: i === STEPS.length - 1 ? 'flex-end' : 'flex-start' }}>
                  <StepCircle step={step} last={i === STEPS.length - 1} />
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, minWidth: 16, marginBottom: 22 }}>
                      <div style={{ flex: 1, height: 1.5, background: 'linear-gradient(90deg, #e0d4bc, #c9a84c)' }} />
                      <IconChevronRight size={13} color="#c9a84c" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              ))}
            </div> */}

            {/* Mobile: 3+2 grid */}
            <div className="intro-steps-mobile">
              <div className="intro-steps-row">
                {STEPS.slice(0, 3).map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <StepCircle step={step} last={false} />
                    {i < 2 && (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: 20, minWidth: 10 }}>
                        <div style={{ flex: 1, height: 1.5, background: 'linear-gradient(90deg, #e0d4bc, #c9a84c)' }} />
                        <IconChevronRight size={12} color="#c9a84c" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="intro-steps-row intro-steps-row2">
                {STEPS.slice(3).map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <StepCircle step={step} last={i === 1} />
                    {i < 1 && (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', marginBottom: 20, minWidth: 10 }}>
                        <div style={{ flex: 1, height: 1.5, background: 'linear-gradient(90deg, #e0d4bc, #c9a84c)' }} />
                        <IconChevronRight size={12} color="#c9a84c" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════
            RIGHT PANEL
        ══════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="intro-right"
        >
          {/* Church image card */}
          <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.14)', border: '1px solid rgba(201,168,76,0.2)', background: '#1a2744', position: 'relative' }}>
            <div className="intro-image-wrap">
              <img src={churchImage} alt="Infant Jesus Church" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.35) 45%, transparent 70%)' }} />

              {/* Top badge */}
              <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 50, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: '0.85rem' }}>✝</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#fff', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>Catholic Church</span>
              </div>

              {/* Bottom overlay */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 22px 26px' }}>
                <div style={{ width: 40, height: 2.5, background: 'linear-gradient(90deg, #c9a84c, #e8d08a)', borderRadius: 2, marginBottom: 12 }} />
                <h2 style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', fontWeight: 700, color: '#fff', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                  {m('blessingTitle', 'ദൈവാലയ ആശീർവാദം')}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                  <p style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: '0.78rem', color: 'rgba(220,210,190,0.9)', margin: 0 }}>
                    {m('blessingDate', '2026 മെയ് 24 ഞായറാഴ്ച വൈകുന്നേരം 4:00 ന്')}
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>സ്ഥലം</div>
                    <div style={{ fontSize: '0.82rem', color: '#fff', fontFamily: "'Meera Inimai', sans-serif", fontWeight: 600 }}>
                      {m('location', 'പുത്തൻകാട്, കേരളം')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.62rem', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>രൂപത</div>
                    <div style={{ fontSize: '0.82rem', color: '#fff', fontFamily: "'Meera Inimai', sans-serif", fontWeight: 600 }}>
                      {m('diocese', 'നെയ്യാറ്റിൻകര')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
            {[
              { icon: '🙏', label: 'ദിവ്യബലി സമയം', value: m('massTimeValue', 'രാവിലെ 6:30') },
              { icon: '📍', label: 'വിലാസം', value: m('addressValue', 'പുത്തൻകാട്') },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: 5 }}>{item.icon}</div>
                <div style={{ fontSize: '0.65rem', color: '#aaa', marginBottom: 2, fontFamily: "'Meera Inimai', sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1a2744', fontFamily: "'Meera Inimai', sans-serif" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .intro-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf8f0 0%, #faf5ea 50%, #f5ede0 100%);
          padding-top: 80px;
          font-family: Inter, sans-serif;
        }
        .intro-grid {
          max-width: 1300px;
          margin: 0 auto;
          padding: 32px 20px 60px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 28px;
          align-items: start;
        }
        .intro-banner {
          background: linear-gradient(135deg, #f5c842 0%, #f7d060 50%, #e8b820 100%);
          border-radius: 18px;
          padding: 20px 24px;
          margin-bottom: 16px;
          box-shadow: 0 6px 28px rgba(245,200,66,0.35);
          position: relative;
          overflow: hidden;
        }
        .intro-right { position: sticky; top: 96px; }

        /* Search row */
        .intro-search-row { display: flex; gap: 10px; }
        .intro-search-input {
          flex: 1;
          padding: 12px 18px;
          border-radius: 50px;
          border: 1.5px solid #e8e0d0;
          background: #fdfaf5;
          font-size: 0.9rem;
          color: #333;
          outline: none;
          font-family: sans-serif;
          min-width: 0;
        }
        .intro-search-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 12px 20px;
          border-radius: 50px; border: none;
          background: linear-gradient(135deg, #f5c842, #e8b820);
          font-weight: 700; font-size: 0.85rem;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 4px 16px rgba(245,200,66,0.3);
          font-family: inherit; flex-shrink: 0;
          color: #1a1200;
        }

        /* Image */
        .intro-image-wrap {
          position: relative;
          aspect-ratio: 3/4;
        }

        /* Steps */
        .intro-steps-desktop {
          display: flex; align-items: center;
          justify-content: space-between; gap: 4;
        }
        .intro-steps-mobile { display: none; }

        /* ── TABLET ── */
        @media (max-width: 960px) {
          .intro-grid { grid-template-columns: 1fr; }
          .intro-right { position: static; }
          .intro-image-wrap { aspect-ratio: 16/9; }
        }

        /* ── MOBILE ── */
        @media (max-width: 600px) {
          .intro-page { padding-top: 70px; }
          .intro-grid { padding: 16px 14px 48px; gap: 16px; }
          .intro-banner { padding: 16px 18px; border-radius: 14px; }

          .intro-search-row { flex-direction: column; gap: 10px; }
          .intro-search-btn { width: 100%; justify-content: center; border-radius: 14px; }
          .intro-search-input { border-radius: 14px; }

          .intro-image-wrap { aspect-ratio: 4/3; }

          .intro-steps-desktop { display: none; }
          .intro-steps-mobile {
            display: flex; flex-direction: column; gap: 16px;
          }
          .intro-steps-row {
            display: flex; align-items: center;
            justify-content: center; gap: 4;
          }
          .intro-steps-row2 {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

function StepCircle({ step, last }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <div style={{
        width: 46, height: 46, borderRadius: '50%',
        background: last ? 'linear-gradient(135deg, #c9a84c, #e8d08a)' : 'linear-gradient(135deg, #f5f0e8, #ede5d4)',
        border: last ? '2.5px solid #c9a84c' : '2px solid #e0d4bc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: last ? '0 6px 20px rgba(201,168,76,0.35)' : '0 3px 10px rgba(0,0,0,0.07)',
        flexShrink: 0,
      }}>
        <step.icon size={20} color={last ? '#fff' : '#c9a84c'} strokeWidth={1.8} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: last ? '#c9a84c' : '#333', fontFamily: "'Meera Inimai', sans-serif", lineHeight: 1.2 }}>
          {step.label}
        </div>
        <div style={{ fontSize: '0.58rem', color: '#aaa', fontFamily: 'Inter, sans-serif' }}>
          {step.sublabel}
        </div>
      </div>
    </div>
  );
}
