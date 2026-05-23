import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

const IMAGES = [
  '/buttoon3.png',
  '/buutoon3.png',
];

export default function Button3Images() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf8f0 0%, #f5ede0 100%)',
      paddingTop: 88,
      paddingBottom: 60,
      fontFamily: "'Meera Inimai', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px, 4vw, 24px)' }}>

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #7a0c0c 0%, #9b1212 100%)',
            border: 'none', borderRadius: 50,
            padding: '10px 22px',
            cursor: 'pointer',
            marginBottom: 32,
            boxShadow: '0 4px 16px rgba(122,12,12,0.25)',
          }}
        >
          <IconArrowLeft size={18} color="#fff" strokeWidth={2.5} />
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>
            തിരിച്ചു പോകുക
          </span>
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
          }}>
            <span style={{ fontSize: '1.3rem', color: '#fff' }}>✝</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
            fontWeight: 800,
            color: '#1a2744',
            margin: 0,
          }}>
            അങ്കണത്തിൽ നിന്ന് ആനവാതിലിലേക്ക്
          </h1>
        </motion.div>

        {/* Images */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              style={{
                background: '#fff',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              <img
                src={src}
                alt={`അങ്കണത്തിൽ നിന്ന് ആനവാതിലിലേക്ക് ${i + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
