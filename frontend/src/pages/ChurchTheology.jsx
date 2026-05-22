import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChurchTheology() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf8f0 0%, #faf5ea 50%, #f5ede0 100%)',
      paddingTop: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 60px',
      fontFamily: 'Inter, sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: 780,
          background: 'linear-gradient(135deg, #0f1c38 0%, #1a2744 100%)',
          borderRadius: 24,
          padding: '36px 38px 28px',
          boxShadow: '0 16px 60px rgba(15,28,56,0.28)',
          border: '1px solid rgba(201,168,76,0.28)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glows */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(201,168,76,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(201,168,76,0.05)', pointerEvents: 'none' }} />

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 3.5, height: 36, borderRadius: 3, background: 'linear-gradient(180deg, #c9a84c, #e8d08a)', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.62rem', color: '#c9a84c', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
              Theology of the Church
            </div>
            <div style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              ദൈവാലയത്തിന്റെ ദൈവശാസ്ത്രം
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.05))', borderRadius: 1, marginBottom: 22 }} />

        {/* Malayalam theology text */}
        <p style={{
          fontFamily: "'Meera Inimai', sans-serif",
          fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
          color: 'rgba(220,210,190,0.93)',
          lineHeight: 2.1,
          margin: '0 0 24px 0',
          textAlign: 'justify',
        }}>
          ആഗോള കത്തോലിക്കാ സഭയിൽ നെയ്യാറ്റിൻകര രൂപത പുത്തൻകട പ്രദേശത്തിൽ ഉണ്ണിമിശിഹായുടെ നാമധേയത്തിൽ നിലകൊള്ളുന്ന ദൈവാലയം തിരുസഭയുടെയും പ്രത്യേകിച്ച് ഇടവക ജനത്തിന്റെയും ദൈവാശ്രയത്തിന്റെയും വിശ്വസ്തതയുടെയും ഐക്യത്തിന്റെയും നേർസാക്ഷ്യമാണ്. സൃഷ്ടി മുതൽ പുതുസൃഷ്ടി വരെ നീളുന്ന രക്ഷാകര ചരിത്ര സംഭവങ്ങൾ നാം ഈ ദൈവാലയത്തിൽ കണ്ടുമുട്ടുന്നു. വിശുദ്ധ ഗ്രന്ഥം വിവരിക്കുന്ന ജീവിതാനുഭവങ്ങൾ ചിത്രങ്ങളായും സ്വരൂപങ്ങളായും നമ്മോട് സംവദിക്കുന്നു. ഇവിടെ തിരുസഭ മാതാവ് നമുക്ക് സ്വാഗതമേകും.... ഉണ്ണീശോ നമ്മെ കാണുമ്പോൾ ആഹ്ലാദത്തോടെ നൃത്തം ചെയ്യും.... മാലാഖമാർ ആ സ്വർഗ്ഗീയ ആനന്ദത്തിൽ പങ്കുചേരും .... പൂർവപിതാക്കന്മാർ നമ്മെ കൈപിടിച്ച് നടത്തിയേക്കും. അപ്പോസ്തലന്മാർ അതിശയകരമാംവിധം പ്രചോദിപ്പിച്ചേക്കാം. ഒത്തിരി തിരുത്താൻ ഉണ്ടെന്ന് ധീര മിഷണറിമാർ സ്നേഹത്തോടെ ഓർമ്മപ്പെടുത്തിയേക്കും. ഞങ്ങൾക്ക് ആകാമെങ്കിൽ എന്തുകൊണ്ട് നിനക്ക് ആയിക്കൂട എന്ന് വിശുദ്ധർ കണ്ണിറുക്കിയേക്കാം. ഇനിയും ഒട്ടും വൈകിയിട്ടില്ല — അനന്തകാരുണ്യവാന്‍റെ ഹൃദയത്തിലേക്ക് തിരിച്ചുവരൂ എന്ന് അൾത്താര നമ്മെ ആശ്വസിപ്പിക്കും.
          {' '}ക്രിസ്തു നടന്നു തീർത്ത കുരിശിൻ്റെ വഴികളിലൂടെ ഒരു നടത്തം.... ഭൂമിയിലേക്ക് ഇറങ്ങിവരുന്ന സ്വർഗ്ഗത്തിൻറെ സ്വന്തമാക്കൽ..... പെന്തക്കുസ്താനുഭവത്തിന്റെ ജ്വലനം ..... ഒടുവിൽ കയ്യിലിരിക്കുന്ന പൊന്നുണ്ണിയെ ശിമയോൻ നമ്മുടെ കരങ്ങളിൽ വച്ചുതരും. തുടർന്ന് ഉണ്ണിമിശിഹായെ മാറോടു ചേർക്കേണ്ടത് ഞാനാണ്... നിങ്ങളാണ്.... ദൈവാലയം പരിചയപ്പെടുത്തുന്ന ദൈവത്തെയും ദൈവമനുഷ്യരെയും കാണുവാനും കേൾക്കുവാനും മനസ്സിലാക്കുവാനും പുതിയ കണ്ണുകളും കാതുകളും ഹൃദയവും സർവ്വേശ്വരൻ നൽകട്ടെ... നമുക്കൊരുമിച്ച് ദൈവാലയാങ്കണത്തിൽ പ്രവേശിക്കാം....
        </p>

        {/* Gold divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,168,76,0.55), rgba(201,168,76,0.08))', borderRadius: 1, marginBottom: 22 }} />

        {/* Church Inauguration button → /introduction */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(201,168,76,0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/introduction')}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #c9a84c 0%, #e8d08a 50%, #c9a84c 100%)',
            border: 'none',
            borderRadius: 50,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            boxShadow: '0 6px 28px rgba(201,168,76,0.38)',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>⛪</span>
          <span style={{ fontFamily: "'Meera Inimai', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#1a0800' }}>
            ദൈവാലയ ഉദ്ഘാടനം
          </span>
          <span style={{ fontSize: '0.72rem', color: '#5a3800', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
            Church Inauguration
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
