import React, { useState } from 'react';
import { Copy, Check, Shield, Flame, BookOpen } from 'lucide-react';
import metaTacticsData from '../../data/meta_tactics.json';

export const MetaLibraryView = ({ setSelectedFormationId, setActiveTab }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyTacticCode = (tactic) => {
    const codeText = `=== MÃ CHIẾN THUẬT FCO META 2026 ===\nSơ đồ: ${tactic.formationId} (${tactic.title})\nLối chơi: ${tactic.playstyle}\nTốc độ: ${tactic.teamTactic.buildUpSpeed} | Chuyền: ${tactic.teamTactic.passingStyle}\nÁp lực: ${tactic.teamTactic.defensivePressure} | Độ rộng: ${tactic.teamTactic.defensiveWidth}`;
    navigator.clipboard.writeText(codeText);
    setCopiedId(tactic.tacticId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={22} color="var(--accent-gold)" /> THƯ VIỆN SƠ ĐỒ META THÁCH ĐẤU
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Danh mục các bộ chiến thuật được kiểm chứng bởi các Top Ranker hàng đầu FCO</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {metaTacticsData.map(tactic => (
          <div key={tactic.tacticId} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--accent-gold)', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>
                  SƠ ĐỒ {tactic.formationId}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  <Flame size={12} inline style={{ marginRight: '2px' }} /> {tactic.playstyle}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>{tactic.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Tác giả: {tactic.author}</p>

              {/* Team Tactic Preview Grid */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
                <div>Tốc độ lối chơi: <strong style={{ color: 'var(--accent-gold)' }}>{tactic.teamTactic.buildUpSpeed}</strong></div>
                <div>Lối chuyền bóng: <strong style={{ color: 'var(--accent-gold)' }}>{tactic.teamTactic.passingStyle}</strong></div>
                <div>Áp lực phòng ngự: <strong style={{ color: 'var(--accent-gold)' }}>{tactic.teamTactic.defensivePressure}</strong></div>
                <div>Độ rộng phòng ngự: <strong style={{ color: 'var(--accent-gold)' }}>{tactic.teamTactic.defensiveWidth}</strong></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setSelectedFormationId(tactic.formationId);
                  setActiveTab('pitch');
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--accent-gold)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Shield size={14} /> Dựng Đội Hình Với Sơ Đồ Này
              </button>

              <button
                onClick={() => handleCopyTacticCode(tactic)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="1-Click Copy Mã Chiến Thuật"
              >
                {copiedId === tactic.tacticId ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedId === tactic.tacticId ? 'Đã Copy!' : 'Copy Mã'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
