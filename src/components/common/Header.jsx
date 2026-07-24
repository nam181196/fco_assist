import React from 'react';
import { Sun, Moon, Shield, Sparkles, Database, Users, Settings } from 'lucide-react';
import { useThemeStore } from '../../hooks/useThemeStore';

export const Header = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="glass-panel" style={{ margin: '16px 24px', padding: '16px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>

        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}>
            <Shield size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.5px' }}>
              FCO META <span style={{ color: 'var(--accent-gold)' }}>AI ASSISTANT</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Trợ lý Chiến thuật & AI Solution Engine Chuẩn Meta 2026
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px', background: 'var(--bg-tertiary)', padding: '6px', borderRadius: '12px' }}>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`btn-tab ${activeTab === 'pitch' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'pitch' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'pitch' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Shield size={16} /> Sân bóng 2D & Squad
          </button>

          <button
            onClick={() => setActiveTab('aicoach')}
            className={`btn-tab ${activeTab === 'aicoach' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'aicoach' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'aicoach' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Sparkles size={16} /> FCO AI Coach Console
          </button>

          <button
            onClick={() => setActiveTab('playerdb')}
            className={`btn-tab ${activeTab === 'playerdb' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'playerdb' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'playerdb' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Users size={16} /> Tra cứu & So sánh Cầu thủ
          </button>

          <button
            onClick={() => setActiveTab('meta')}
            className={`btn-tab ${activeTab === 'meta' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'meta' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'meta' ? '#000' : 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Database size={16} /> Thư viện Meta
          </button>
        </nav>

        {/* Dual Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'all 0.2s ease'
          }}
          title="Chuyển đổi giao diện Sáng / Tối (Light Mode / Dark Mode)"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

      </div>
    </header>
  );
};
