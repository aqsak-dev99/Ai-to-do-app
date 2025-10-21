// src/components/Settings.jsx
import AppIcon from '../logo/app-icon.png';

export default function Settings({
  isDarkMode, toggleDarkMode, mode, setMode, apiKey, setApiKey,
  clearAllTodos, onClose
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade"
      onClick={onClose}
    >
      <div
        className="glass glass-neon p-6 w-96 max-w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* App Icon + Title */}
        <div className="text-center mb-6">
          <img
            src={AppIcon}
            alt="AI Todo"
            className="logo-sm mx-auto animate-float"
            style={{ boxShadow: '0 0 25px rgba(156, 136, 255, 0.6)' }}
          />
          <h3 className="text-xl font-bold mt-3" style={{ color: '#9C88FF' }}>
            Settings
          </h3>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-sm">Dark Mode</label>
          <div
            className={`toggle-container ${isDarkMode ? 'active' : ''}`}
            onClick={toggleDarkMode}
          >
            <div className="toggle-knob"></div>
          </div>
        </div>

        {/* Mode Select */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-sm">Mode</label>
          <select
            value={mode}
            onChange={e => setMode(e.target.value)}
            className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white text-sm"
            style={{
              padding: '0.9rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#e0e7ff',
              fontSize: '0.95rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#9c88ff';
              e.target.style.boxShadow = '0 0 15px rgba(156, 136, 255, 0.4)';
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="demo">Demo Mode</option>
            <option value="api">AI Mode</option>
          </select>
        </div>

        {/* API Key Input — EXACTLY like "New task..." */}
        {mode === 'api' && (
          <div className="mb-5">
            <label className="block mb-2 font-medium text-sm">OpenAI API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full"
              style={{
                padding: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#e0e7ff',
                fontSize: '0.95rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#9c88ff';
                e.target.style.boxShadow = '0 0 15px rgba(156, 136, 255, 0.4)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        {/* Buttons — EXACT CLONE OF "ADD" BUTTON */}
        <div className="flex flex-col gap-3 mt-6">
          {/* Clear All Tasks — Red Version */}
          <button
            onClick={clearAllTodos}
            className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #E04E4E)',
              boxShadow: '0 8px 20px rgba(255, 107, 107, 0.4)',
              padding: '0.9rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 25px rgba(255, 107, 107, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.4)';
            }}
          >
            Clear All Tasks
          </button>

          {/* Close — Purple Version (like "Add") */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #9C88FF, #5E4B8B)',
              boxShadow: '0 8px 20px rgba(156, 136, 255, 0.4)',
              padding: '0.9rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 25px rgba(156, 136, 255, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(156, 136, 255, 0.4)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}