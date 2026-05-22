import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ChurchTheology() {
  const navigate = useNavigate();

  return (
    <div className="ct-page">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="ct-card"
      >
        {/* Decorative glows */}
        <div className="ct-glow ct-glow-tr" />
        <div className="ct-glow ct-glow-bl" />

        {/* Title */}
        <div className="ct-title-row">
          <div className="ct-accent-bar" />
          <div>
            <div className="ct-label-en">Theology of the Church</div>
            <div className="ct-title-ml">ദൈവാലയത്തിന്റെ ദൈവശാസ്ത്രം</div>
          </div>
        </div>

        {/* Top divider */}
        <div className="ct-divider" />

        {/* Malayalam theology text */}
        <p className="ct-body">
          ആഗോള കത്തോലിക്കാ സഭയിൽ നെയ്യാറ്റിൻകര രൂപത പുത്തൻകട പ്രദേശത്തിൽ ഉണ്ണിമിശിഹായുടെ നാമധേയത്തിൽ നിലകൊള്ളുന്ന ദൈവാലയം തിരുസഭയുടെയും പ്രത്യേകിച്ച് ഇടവക ജനത്തിന്റെയും ദൈവാശ്രയത്തിന്റെയും വിശ്വസ്തതയുടെയും ഐക്യത്തിന്റെയും നേർസാക്ഷ്യമാണ്. സൃഷ്ടി മുതൽ പുതുസൃഷ്ടി വരെ നീളുന്ന രക്ഷാകര ചരിത്ര സംഭവങ്ങൾ നാം ഈ ദൈവാലയത്തിൽ കണ്ടുമുട്ടുന്നു. വിശുദ്ധ ഗ്രന്ഥം വിവരിക്കുന്ന ജീവിതാനുഭവങ്ങൾ ചിത്രങ്ങളായും സ്വരൂപങ്ങളായും നമ്മോട് സംവദിക്കുന്നു. ഇവിടെ തിരുസഭ മാതാവ് നമുക്ക് സ്വാഗതമേകും.... ഉണ്ണീശോ നമ്മെ കാണുമ്പോൾ ആഹ്ലാദത്തോടെ നൃത്തം ചെയ്യും.... മാലാഖമാർ ആ സ്വർഗ്ഗീയ ആനന്ദത്തിൽ പങ്കുചേരും .... പൂർവപിതാക്കന്മാർ നമ്മെ കൈപിടിച്ച് നടത്തിയേക്കും. അപ്പോസ്തലന്മാർ അതിശയകരമാംവിധം പ്രചോദിപ്പിച്ചേക്കാം. ഒത്തിരി തിരുത്താൻ ഉണ്ടെന്ന് ധീര മിഷണറിമാർ സ്നേഹത്തോടെ ഓർമ്മപ്പെടുത്തിയേക്കും. ഞങ്ങൾക്ക് ആകാമെങ്കിൽ എന്തുകൊണ്ട് നിനക്ക് ആയിക്കൂട എന്ന് വിശുദ്ധർ കണ്ണിറുക്കിയേക്കാം. ഇനിയും ഒട്ടും വൈകിയിട്ടില്ല — അനന്തകാരുണ്യവാന്‍റെ ഹൃദയത്തിലേക്ക് തിരിച്ചുവരൂ എന്ന് അൾത്താര നമ്മെ ആശ്വസിപ്പിക്കും.
          {' '}ക്രിസ്തു നടന്നു തീർത്ത കുരിശിൻ്റെ വഴികളിലൂടെ ഒരു നടത്തം.... ഭൂമിയിലേക്ക് ഇറങ്ങിവരുന്ന സ്വർഗ്ഗത്തിൻറെ സ്വന്തമാക്കൽ..... പെന്തക്കുസ്താനുഭവത്തിന്റെ ജ്വലനം ..... ഒടുവിൽ കയ്യിലിരിക്കുന്ന പൊന്നുണ്ണിയെ ശിമയോൻ നമ്മുടെ കരങ്ങളിൽ വച്ചുതരും. തുടർന്ന് ഉണ്ണിമിശിഹായെ മാറോടു ചേർക്കേണ്ടത് ഞാനാണ്... നിങ്ങളാണ്.... ദൈവാലയം പരിചയപ്പെടുത്തുന്ന ദൈവത്തെയും ദൈവമനുഷ്യരെയും കാണുവാനും കേൾക്കുവാനും മനസ്സിലാക്കുവാനും പുതിയ കണ്ണുകളും കാതുകളും ഹൃദയവും സർവ്വേശ്വരൻ നൽകട്ടെ... നമുക്കൊരുമിച്ച് ദൈവാലയാങ്കണത്തിൽ പ്രവേശിക്കാം....
        </p>

        {/* Bottom divider */}
        <div className="ct-divider" style={{ marginBottom: 22 }} />

        {/* Church Inauguration button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(201,168,76,0.5)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/introduction')}
          className="ct-btn"
        >
          <span className="ct-btn-icon">⛪</span>
          <span className="ct-btn-ml">ദൈവാലയ ഉദ്ഘാടനം</span>
          <span className="ct-btn-en">Church Inauguration</span>
        </motion.button>
      </motion.div>

      <style>{`
        .ct-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf8f0 0%, #faf5ea 50%, #f5ede0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 60px;
          font-family: Inter, sans-serif;
          box-sizing: border-box;
        }

        .ct-card {
          width: 100%;
          max-width: 780px;
          background: linear-gradient(135deg, #0f1c38 0%, #1a2744 100%);
          border-radius: 24px;
          padding: 36px 38px 28px;
          box-shadow: 0 16px 60px rgba(15,28,56,0.28);
          border: 1px solid rgba(201,168,76,0.28);
          position: relative;
          overflow: hidden;
        }

        .ct-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .ct-glow-tr {
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          background: rgba(201,168,76,0.07);
        }
        .ct-glow-bl {
          bottom: -30px; left: -30px;
          width: 120px; height: 120px;
          background: rgba(201,168,76,0.05);
        }

        .ct-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .ct-accent-bar {
          width: 3.5px;
          height: 36px;
          border-radius: 3px;
          background: linear-gradient(180deg, #c9a84c, #e8d08a);
          flex-shrink: 0;
        }
        .ct-label-en {
          font-size: 0.62rem;
          color: #c9a84c;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 4px;
          font-family: Inter, sans-serif;
        }
        .ct-title-ml {
          font-family: 'Meera Inimai', sans-serif;
          font-size: clamp(1rem, 3vw, 1.25rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
        }

        .ct-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.05));
          border-radius: 1px;
          margin-bottom: 22px;
        }

        .ct-body {
          font-family: 'Meera Inimai', sans-serif;
          font-size: clamp(0.88rem, 2vw, 1rem);
          color: rgba(220,210,190,0.93);
          line-height: 2.1;
          margin: 0 0 24px 0;
          text-align: justify;
        }

        .ct-btn {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #c9a84c 0%, #e8d08a 50%, #c9a84c 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 6px 28px rgba(201,168,76,0.38);
        }
        .ct-btn-icon { font-size: 1.2rem; }
        .ct-btn-ml {
          font-family: 'Meera Inimai', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #1a0800;
        }
        .ct-btn-en {
          font-size: 0.72rem;
          color: #5a3800;
          font-family: Inter, sans-serif;
          font-weight: 600;
        }

        /* ── Tablet ── */
        @media (max-width: 640px) {
          .ct-page {
            padding: 80px 14px 40px;
            align-items: flex-start;
          }
          .ct-card {
            border-radius: 18px;
            padding: 24px 18px 20px;
          }
          .ct-title-ml {
            font-size: 1rem;
          }
          .ct-body {
            font-size: 0.9rem;
            line-height: 2;
          }
          .ct-btn {
            padding: 14px 16px;
            gap: 8px;
            border-radius: 16px;
          }
          .ct-btn-ml { font-size: 0.92rem; }
          .ct-btn-en { display: none; }
        }

        /* ── Small mobile ── */
        @media (max-width: 380px) {
          .ct-card { padding: 20px 14px 18px; }
          .ct-body { font-size: 0.86rem; line-height: 1.95; }
          .ct-btn { padding: 13px 14px; }
          .ct-btn-ml { font-size: 0.88rem; }
        }
      `}</style>
    </div>
  );
}
