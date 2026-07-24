import React, { useState } from 'react';
import { Save, RefreshCw, Layers, Sparkles, Plus, Trash2, Cpu, Gamepad2 } from 'lucide-react';
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
  systemConfig,
  gameMode
}) => {
  const [pitchPerspective, setPitchPerspective] = useState('2D'); // '2D' | '3D'
  const [selectedSlotForAdd, setSelectedSlotForAdd] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [customPositions, setCustomPositions] = useState({}); // { slotId: { gridX, gridY } }

  const activePositions = currentFormation?.positions || [];

  // Drag & Drop position handlers for Sơ đồ Độc Lạ
  const handleDragStart = (e, slotId) => {
    setDraggedNodeId(slotId);
    e.dataTransfer.setData('text/plain', slotId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropOnPitch = (e) => {
    e.preventDefault();
    if (!draggedNodeId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gridX = Math.max(5, Math.min(95, Math.round((x / rect.width) * 100)));
    const gridY = Math.max(5, Math.min(95, Math.round((y / rect.height) * 100)));

    setCustomPositions(prev => ({
      ...prev,
      [draggedNodeId]: { gridX, gridY }
    }));

    setDraggedNodeId(null);
  };

  const filteredPlayers = playersData.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.season.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
      
      {/* Left Column: Interactive 2D/3D Pitch Board Canvas */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Top Controls: Squad Name & Formation / Perspective Selectors */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              placeholder="Nhập tên đội hình..."
              style={{
                padding: '8px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: '8px',
                fontSize: '0.9rem',
                minWidth: '220px'
              }}
            />
            <button
              onClick={handleSaveSquad}
              disabled={isSalaryExceeded}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: isSalaryExceeded ? 'var(--bg-tertiary)' : 'var(--accent-gold)',
                color: isSalaryExceeded ? 'var(--text-muted)' : '#000',
                fontWeight: 800,
                cursor: isSalaryExceeded ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Save size={16} /> Lưu Đội Hình
            </button>
          </div>

          {/* Perspective View Switcher (2D <-> 3D) & Formation Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            {/* 2D / 3D Pitch Toggle Button (v2.0.0 Feature) */}
            <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '3px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <button
                onClick={() => setPitchPerspective('2D')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: pitchPerspective === '2D' ? 'var(--accent-gold)' : 'transparent',
                  color: pitchPerspective === '2D' ? '#000' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                📐 Sân 2D Phẳng
              </button>
              <button
                onClick={() => setPitchPerspective('3D')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: pitchPerspective === '3D' ? 'var(--accent-cyan)' : 'transparent',
                  color: pitchPerspective === '3D' ? '#000' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                🏟️ Sân 3D Perspective
              </button>
            </div>

            {/* Formation Select Dropdown */}
            <select
              value={selectedFormationId}
              onChange={(e) => setSelectedFormationId(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            >
              {formationsData.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>

          </div>

        </div>

        {/* Current Game Mode & Custom Pitch Drag Info Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            💡 <strong style={{ color: 'var(--accent-gold)' }}>Mẹo v2.0.0:</strong> Kéo & thả nút vị trí để tạo <strong>Sơ đồ Độc Lạ</strong> tùy biến.
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: gameMode === 'MANAGER_SIM' ? '#10b981' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {gameMode === 'MANAGER_SIM' ? <Cpu size={14} /> : <Gamepad2 size={14} />}
            <span>{gameMode === 'MANAGER_SIM' ? 'CHẾ ĐỘ GIẢ LẬP GLXH' : 'CHẾ ĐỘ XẾP HẠNG 1V1'}</span>
          </div>
        </div>

        {/* Dynamic Pitch Field Canvas Container (Supports 2D & 3D Perspective) */}
        <div
          onDragOver={handleDropOnPitch ? (e) => e.preventDefault() : undefined}
          onDrop={handleDropOnPitch}
          className={pitchPerspective === '3D' ? 'perspective-pitch' : ''}
          style={{
            position: 'relative',
            width: '100%',
            height: '540px',
            borderRadius: '16px',
            background: pitchPerspective === '3D'
              ? 'radial-gradient(circle, #15803d 0%, #064e3b 100%)'
              : 'linear-gradient(180deg, #166534 0%, #14532d 100%)',
            border: '2px solid rgba(255,255,255,0.2)',
            overflow: 'hidden',
            boxShadow: pitchPerspective === '3D' ? '0 20px 40px rgba(0,0,0,0.6)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Pitch Lines Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '2px solid rgba(255,255,255,0.25)', margin: '15px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', border: '2px solid rgba(255,255,255,0.25)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

          {/* 11 Player Slot Nodes on Pitch */}
          {activePositions.map((pos) => {
            const player = slotMap[pos.id];
            const customPos = customPositions[pos.id];
            const posX = customPos ? customPos.gridX : pos.gridX;
            const posY = customPos ? customPos.gridY : pos.gridY;

            return (
              <div
                key={pos.id}
                draggable
                onDragStart={(e) => handleDragStart(e, pos.id)}
                style={{
                  position: 'absolute',
                  left: `${posX}%`,
                  top: `${posY}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'grab',
                  zIndex: 10,
                  transition: draggedNodeId === pos.id ? 'none' : 'all 0.2s ease'
                }}
              >
                {/* Node Circle Button */}
                <div
                  onClick={() => setSelectedSlotForAdd(pos)}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: player ? 'var(--bg-tertiary)' : 'rgba(0,0,0,0.6)',
                    border: player ? '2px solid var(--accent-gold)' : '2px dashed #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                    position: 'relative'
                  }}
                >
                  {player ? (
                    <span style={{ color: 'var(--accent-gold)' }}>{player.salary}</span>
                  ) : (
                    <Plus size={18} />
                  )}

                  {player && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePlayerFromSlot(pos.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'var(--salary-alert)',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={10} />
                    </button>
                  )}
                </div>

                {/* Role Badge & Player Name */}
                <span style={{
                  marginTop: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(0,0,0,0.85)',
                  color: player ? '#fff' : 'var(--accent-gold)',
                  fontWeight: 800,
                  fontSize: '0.7rem',
                  whiteSpace: 'nowrap'
                }}>
                  {pos.role} {player ? `• ${player.name}` : ''}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      {/* Right Column: Player Selection Drawer & Database Quick Pick */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
            {selectedSlotForAdd ? `CHỌN CẦU THỦ CHO VỊ TRÍ: ${selectedSlotForAdd.role}` : 'DANH MỤC CẦU THỦ QUỐC DÂN'}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Dữ liệu đồng bộ vn.fifaaddict.com mới nhất
          </p>
        </div>

        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Tìm tên cầu thủ hoặc mùa giải..."
          style={{
            padding: '8px 12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--glass-border)',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '0.8rem'
          }}
        />

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px' }}>
          {filteredPlayers.map(p => (
            <div
              key={p.id}
              onClick={() => {
                if (selectedSlotForAdd) {
                  assignPlayerToSlot(selectedSlotForAdd.id, p);
                  setSelectedSlotForAdd(null);
                }
              }}
              className="glass-card"
              style={{
                padding: '12px',
                cursor: selectedSlotForAdd ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                  {p.name} <span style={{ color: 'var(--accent-gold)' }}>[{p.season}]</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {p.mainPositions.join('/')} • {p.heightCm}cm • Chân {p.weakFoot}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--accent-gold)',
                  fontWeight: 800,
                  fontSize: '0.75rem'
                }}>
                  Lương {p.salary}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
