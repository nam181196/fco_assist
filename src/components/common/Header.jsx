import React from 'react';
import { Sun, Moon, ShieldAlert, Sparkles, Gamepad2, Cpu } from 'lucide-react';
import { useThemeStore } from '../../hooks/useThemeStore';

export const Header = ({ activeTab, setActiveTab, gameMode, setGameMode }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--glass-border)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-main)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      
      {/* Brand Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-gold), #f59e0b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000',
          fontWeight: 900,
          fontSize: '1.2rem',
          boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)'
        }}>
          FCO
        </div>
        <div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            FCO META TACTICS & AI ENGINE
            <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '12px', background: 'var(--accent-gold)', color: '#000', fontWeight: 800 }}>
              v2.0.0 APPROVED
            </span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Hệ Thống Tối Ưu Chiến Thuật & Trợ Lý AI Cá Nhân Hoá FC Online
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '8px', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '10px' }}>
        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'pitch' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'pitch' ? '#000' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ⚽ Sân Bóng 2D/3D
        </button>

        <button
          onClick={() => setActiveTab('aicoach')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'aicoach' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'aicoach' ? '#000' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={16} /> Console AI Coach
        </button>

        <button
          onClick={() => setActiveTab('playerdb')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'playerdb' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'playerdb' ? '#000' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🔍 FIFAAddict Live DB
        </button>

        <button
          onClick={() => setActiveTab('meta')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'meta' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'meta' ? '#000' : 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          📚 Meta Library
        </button>
      </nav>

      {/* Right Controls: Game Mode Selector (1v1 vs GLXH) & Theme Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Game Mode Selector (v2.0.0 Feature) */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-tertiary)',
          padding: '3px',
          borderRadius: '10px',
          border: '1px solid var(--glass-border)'
        }}>
          <button
            onClick={() => setGameMode && setGameMode('RANKED_1V1')}
            title="Tối ưu chiến thuật cho Chế độ Đấu Xếp Hạng 1v1"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              background: gameMode === 'RANKED_1V1' ? '#3b82f6' : 'transparent',
              color: gameMode === 'RANKED_1V1' ? '#fff' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Gamepad2 size={14} /> Xếp Hạng 1v1
          </button>

          <button
            onClick={() => setGameMode && setGameMode('MANAGER_SIM')}
            title="Tối ưu chiến thuật tự động cho Chế độ Đấu Giả Lập GLXH"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              background: gameMode === 'MANAGER_SIM' ? '#10b981' : 'transparent',
              color: gameMode === 'MANAGER_SIM' ? '#000' : 'var(--text-muted)',
              fontWeight: 800,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Cpu size={14} /> Giả Lập GLXH
          </button>
        </div>

        {/* Dual Theme Switcher (Dark / Light) */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--accent-gold)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 700,
            fontSize: '0.8rem',
            transition: 'all 0.2s ease'
          }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

      </div>

    </header>
  );
};
