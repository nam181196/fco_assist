import React from 'react';
import { Copy, Trash2, FolderOpen, Shield, Plus, Calendar } from 'lucide-react';

export const SquadManagerView = ({
  savedSquads,
  handleLoadSquad,
  handleDuplicateSquad,
  handleDeleteSquad,
  setActiveTab
}) => {
  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>QUẢN LÝ ĐỘI HÌNH CÁ NHÂN (SAVED SQUADS)</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lưu trữ tối đa 10 phương án đội hình trong bộ nhớ máy (LocalStorage)</p>
        </div>

        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--accent-gold)',
            color: '#000',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Plus size={18} /> Tạo Đội Hình Mới
        </button>
      </div>

      {savedSquads.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FolderOpen size={48} style={{ opacity: 0.5, marginBottom: '12px' }} />
          <p style={{ fontSize: '0.9rem' }}>Chưa có đội hình cá nhân nào được lưu. Hãy xếp cầu thủ trên Sân 2D và bấm "Lưu Đội Hình"!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {savedSquads.map(squad => (
            <div key={squad.squadId} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                    SƠ ĐỒ {squad.formationId}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>
                    LƯƠNG: {squad.totalSalary} / 300 BP
                  </span>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>{squad.squadName}</h3>
                
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> Tạo lúc: {new Date(squad.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
                <button
                  onClick={() => {
                    handleLoadSquad(squad);
                    setActiveTab('pitch');
                  }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--accent-gold)',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <FolderOpen size={14} /> Mở Đội Hình
                </button>

                <button
                  onClick={() => handleDuplicateSquad(squad.squadId)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-main)',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title="Nhân bản đội hình"
                >
                  <Copy size={14} />
                </button>

                <button
                  onClick={() => handleDeleteSquad(squad.squadId)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--salary-alert)',
                    background: 'rgba(239,68,68,0.1)',
                    color: 'var(--salary-alert)',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title="Xóa đội hình"
                >
                  <Trash2 size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
