// src/pages/Welcome.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppIcon from '../logo/app-icon.png';
import MyLogo from '../logo/logo.png';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/mode');
    }, 3800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      {/* TOP: Welcome Text */}
      <div className="welcome-header animate-fade" style={{ animationDelay: '0.4s' }}>
        <h1 className="welcome-title">Welcome</h1>
        <p className="welcome-subtitle">AI-Powered Todo App</p>
      </div>

      {/* CENTER: App Icon */}
      <div className="welcome-icon">
        <img src={AppIcon} alt="AI Todo App" className="logo-lg" />
      </div>

      {/* FOOTER: Your Brand */}
      <footer className="welcome-footer">
        <img src={MyLogo} alt="Aqsa Khan" className="logo-sm" />
        <div className="footer-links">
          <a href="https://github.com/aqsakhan" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>•</span>
          <a href="https://linkedin.com/in/aqsakhan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <a href="https://aqsakhan.dev" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
        <p className="text-xs opacity-70">
          Made with <span style={{ color: '#FF6B6B' }}>Heart</span> by <strong>Aqsa Khan</strong>
        </p>
      </footer>
    </div>
  );
}