// src/pages/ModeSelect.jsx
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppIcon from '../logo/app-icon.png';

export default function ModeSelect() {
  const navigate = useNavigate();

  const startDemo = () => {
    localStorage.setItem('mode', 'demo');
    toast.success('Demo Mode Activated!', { icon: 'Gamepad' });
    navigate('/app');
  };

  const startAI = () => {
    localStorage.setItem('mode', 'api');
    toast.info('Enter OpenAI Key in Settings', { icon: 'Key' });
    navigate('/app');
  };

  return (
    <div className="mode-container">
      <img src={AppIcon} alt="AI Todo" className="logo-sm mb-6 animate-float" />
      <h2 style={{ color: '#9C88FF', fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 700 }}>
        Choose Your Mode
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div onClick={startDemo} className="mode-card glass-neon animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <div className="icon">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM10 12l2 2 4-4" strokeWidth="2"/>
            </svg>
          </div>
          <h3>Demo Mode</h3>
          <p>Try all features with mock AI</p>
        </div>

        <div onClick={startAI} className="mode-card glass-neon animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <div className="icon">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z"/>
              <path d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.137 0-4.158-.556-6.16-1.422L12 14z"/>
            </svg>
          </div>
          <h3>AI Mode</h3>
          <p>Real OpenAI suggestions</p>
        </div>
      </div>
    </div>
  );
}