import React, { useState } from 'react';
import { UserPlus, X, Shield, PlusCircle, Check } from 'lucide-react';
import playersData from '../../data/players.json';
import formationsData from '../../data/formations.json';

export const PitchBoardView = ({
  currentFormation,
  selectedFormationId,
  setSelectedFormationId,
  slotMap,
  assignPlayerToSlot,
  removePlayerFromSlot,
  squadName,
  setSquadName,
  handleSaveSquad,
  totalSalary,
  isSalaryExceeded,
  systemConfig
}) => {
  const [activeSlotRole, setActiveSlotRole] = useState(null);
  const [isSelectPlayerModalOpen, setIsSelectPlayerModalOpen] = useState(false);

  const handleOpenSlotModal = (role) => {
    setActiveSlotRole(role);
    setIsSelectPlayerModalOpen(true);
  };

  const handleSelectPlayer = (player) => {
    if (activeSlotRole) {
      assignPlayerToSlot(activeSlotRole, player);
    }
    setIsSelectPlayerModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>

      {/* 2D Pitch Area */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>TÊN ĐỘI HÌNH:</label>
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>CHỌN SƠ ĐỒ META:</label>
            <select
              value={selectedFormationId}
              onChange={(e) => setSelectedFormationId(e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {formationsData.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSaveSquad}
            disabled={isSalaryExceeded}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: isSalaryExceeded ? 'var(--text-muted)' : 'var(--accent-gold)',
              color: '#000',
              fontWeight: 800,
              cursor: isSalaryExceeded ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Check size={18} /> Lưu Đội Hình
          </button>
        </div>

        {/* The 2D Pitch Canvas */}
        <div className="pitch-container" style={{ width: '100%', height: '580px', position: 'relative' }}>

          {/* Pitch Lines */}
          <div className="pitch-line pitch-center-circle" />
          <div className="pitch-line pitch-half-line" />
          <div className="pitch-line pitch-penalty-area-top" />
          <div className="pitch-line pitch-penalty-area-bottom" />

          {/* Player Slot Nodes on 2D Pitch */}
          {currentFormation.positions.map((pos) => {
            const player = slotMap[pos.role];
            return (
              <div
                key={pos.role}
                onClick={() => handleOpenSlotModal(pos.role)}
                style={{
                  position: 'absolute',
                  left: `${pos.gridX}%`,
                  top: `${pos.gridY}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Node Circle */}
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: player ? 'var(--bg-secondary)' : 'rgba(0,0,0,0.6)',
                    border: player ? '2px solid var(--accent-gold)' : '2px dashed var(--pitch-line)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '-2px' }}>
                    {pos.role}
                  </span>

                  {player ? (
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {player.name.split(' ').pop()}
                    </span>
                  ) : (
                    <UserPlus size={16} color="var(--text-muted)" />
                  )}

                  {player && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-4px',
                      right: '-4px',
                      background: '#10b981',
                      color: '#000',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '1px 4px',
                      borderRadius: '4px'
                    }}>
                      L:{player.salary}
                    </span>
                  )}
                </div>

                {/* Player Card Label Underneath */}
                {player && (
                  <div style={{
                    marginTop: '4px',
                    background: 'rgba(0,0,0,0.75)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>
                      {player.name}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', marginLeft: '4px' }}>
                      [{player.season}]
                    </span>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Side Panel: Player List Breakdown */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
          DANH SÁCH 11 VỊ TRÍ
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '500px' }}>
          {currentFormation.positions.map(pos => {
            const player = slotMap[pos.role];
            return (
              <div
                key={pos.role}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--accent-gold)',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '0.75rem'
                  }}>
                    {pos.role}
                  </span>
                  {player ? (
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{player.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mùa {player.season} • Lương {player.salary} BP</div>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', italic: 'true' }}>Chưa chọn cầu thủ</span>
                  )}
                </div>

                {player ? (
                  <button
                    onClick={() => removePlayerFromSlot(pos.role)}
                    style={{ background: 'none', border: 'none', color: 'var(--salary-alert)', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenSlotModal(pos.role)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer' }}
                  >
                    <PlusCircle size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Player Modal */}
      {isSelectPlayerModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <div className="glass-panel" style={{ width: '500px', maxWidth: '90%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>CHỌN CẦU THỦ CHO VỊ TRÍ [{activeSlotRole}]</h3>
              <button onClick={() => setIsSelectPlayerModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
              {playersData.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelectPlayer(p)}
                  className="glass-card"
                  style={{
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name} <span style={{ color: 'var(--accent-gold)' }}>[{p.season}]</span></div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vị trí: {p.mainPositions.join(', ')} • Chân {p.weakFoot} • {p.estimatedBpRange}</div>
                  </div>
                  <span style={{ fontWeight: 800, color: '#10b981', fontSize: '0.85rem' }}>Lương {p.salary}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
