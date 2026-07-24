import React, { useState, useRef } from 'react';
import { Save, RefreshCw, Layers, Sparkles, Plus, Trash2, Cpu, Gamepad2, Move } from 'lucide-react';
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
  
  // Free Dragging Node State
  const [activeDraggingSlotId, setActiveDraggingSlotId] = useState(null);
  const [customPositions, setCustomPositions] = useState({}); // { slotId: { gridX, gridY } }
  
  const pitchRef = useRef(null);
  const activePositions = currentFormation?.positions || [];

  // Smooth Pointer Dragging Handlers for Sơ đồ Độc Lạ (Mouse & Touch)
  const handlePointerDown = (e, slotId) => {
    e.stopPropagation();
    setActiveDraggingSlotId(slotId);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e, slotId) => {
    if (activeDraggingSlotId !== slotId || !pitchRef.current) return;
    
    const rect = pitchRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gridX = Math.max(4, Math.min(96, Math.round((x / rect.width) * 100)));
    const gridY = Math.max(4, Math.min(96, Math.round((y / rect.height) * 100)));

    setCustomPositions(prev => ({
      ...prev,
      [slotId]: { gridX, gridY }
    }));
  };

  const handlePointerUp = (e, slotId) => {
    if (activeDraggingSlotId === slotId) {
      setActiveDraggingSlotId(null);
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe release fallback
      }
    }
  };

  const resetPositions = () => {
    setCustomPositions({});
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

          {/* Perspective View Switcher (2D <-> 3D) & Reset Position Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            
            <button
              onClick={resetPositions}
              title="Đặt lại vị trí chuẩn sơ đồ"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={12} /> Đặt lại Vị trí
            </button>

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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
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
                  background: pitchPerspective === '3D' ? '#06b6d4' : 'transparent',
                  color: pitchPerspective === '3D' ? '#000' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
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

        {/* Info Banner: Free Drag & Drop Instructions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Move size={14} color="var(--accent-gold)" />
            <span>Chuột nhấn & giữ bất kỳ vị trí nút cầu thủ để <strong>KÉO THẢ TỰ DO</strong> tạo Sơ đồ Độc Lạ.</span>
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: gameMode === 'MANAGER_SIM' ? '#10b981' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {gameMode === 'MANAGER_SIM' ? <Cpu size={14} /> : <Gamepad2 size={14} />}
            <span>{gameMode === 'MANAGER_SIM' ? 'ĐẤU GIẢ LẬP GLXH' : 'ĐẤU XẾP HẠNG 1V1'}</span>
          </div>
        </div>

        {/* Pitch Canvas Container (Wrapper for 3D Perspective Depth) */}
        <div className={pitchPerspective === '3D' ? 'pitch-perspective-wrapper' : ''}>
          
          <div
            ref={pitchRef}
            className={pitchPerspective === '3D' ? 'pitch-canvas-3d' : ''}
            style={{
              position: 'relative',
              width: '100%',
              height: '560px',
              borderRadius: '20px',
              background: pitchPerspective === '3D'
                ? 'repeating-linear-gradient(0deg, #15803d, #15803d 40px, #166534 40px, #166534 80px)'
                : 'repeating-linear-gradient(0deg, #166534, #166534 40px, #14532d 40px, #14532d 80px)',
              border: pitchPerspective === '3D' ? '4px solid rgba(255,255,255,0.4)' : '2px solid var(--glass-border)',
              overflow: 'hidden',
              boxShadow: pitchPerspective === '3D' ? 'inset 0 0 100px rgba(0,0,0,0.6)' : 'none',
              touchAction: 'none'
            }}
          >
            {/* Pitch Marking Lines */}
            {/* Outer Border Line */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', border: '2px solid var(--pitch-line)', pointerEvents: 'none' }} />
            
            {/* Halfway Line */}
            <div style={{ position: 'absolute', top: '50%', left: '15px', right: '15px', height: '2px', background: 'var(--pitch-line)', pointerEvents: 'none' }} />
            
            {/* Center Circle */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '120px', height: '120px', border: '2px solid var(--pitch-line)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', background: 'var(--pitch-line)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

            {/* Top Goal Penalty Box */}
            <div style={{ position: 'absolute', top: '15px', left: '25%', right: '25%', height: '100px', border: '2px solid var(--pitch-line)', borderTop: 'none', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '15px', left: '35%', right: '35%', height: '40px', border: '2px solid var(--pitch-line)', borderTop: 'none', pointerEvents: 'none' }} />

            {/* Bottom Goal Penalty Box */}
            <div style={{ position: 'absolute', bottom: '15px', left: '25%', right: '25%', height: '100px', border: '2px solid var(--pitch-line)', borderBottom: 'none', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '35%', right: '35%', height: '40px', border: '2px solid var(--pitch-line)', borderBottom: 'none', pointerEvents: 'none' }} />

            {/* 11 Player Interactive Slot Nodes on Pitch */}
            {activePositions.map((pos) => {
              const player = slotMap[pos.id];
              const customPos = customPositions[pos.id];
              const posX = customPos ? customPos.gridX : pos.gridX;
              const posY = customPos ? customPos.gridY : pos.gridY;
              const isDragging = activeDraggingSlotId === pos.id;

              return (
                <div
                  key={pos.id}
                  onPointerDown={(e) => handlePointerDown(e, pos.id)}
                  onPointerMove={(e) => handlePointerMove(e, pos.id)}
                  onPointerUp={(e) => handlePointerUp(e, pos.id)}
                  className={pitchPerspective === '3D' ? 'pitch-node-counter-3d' : ''}
                  style={{
                    position: 'absolute',
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: pitchPerspective === '3D'
                      ? 'translate(-50%, -50%) rotateX(-48deg) translateZ(15px)'
                      : 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: isDragging ? 50 : 10,
                    userSelect: 'none',
                    touchAction: 'none'
                  }}
                >
                  {/* Node Circle Counter */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlotForAdd(pos);
                    }}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: player
                        ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                        : 'rgba(0,0,0,0.75)',
                      border: isDragging
                        ? '3px solid #3b82f6'
                        : player
                        ? '2.5px solid var(--accent-gold)'
                        : '2.5px dashed rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      boxShadow: isDragging
                        ? '0 0 20px #3b82f6'
                        : '0 6px 14px rgba(0,0,0,0.6)',
                      position: 'relative',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    {player ? (
                      <span style={{ color: 'var(--accent-gold)' }}>{player.salary}</span>
                    ) : (
                      <Plus size={20} />
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
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--salary-alert)',
                          border: 'none',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                        }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>

                  {/* Role Badge & Player Name */}
                  <div style={{
                    marginTop: '4px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid var(--glass-border)',
                    color: player ? '#fff' : 'var(--accent-gold)',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
                  }}>
                    {pos.role} {player ? `• ${player.name}` : ''}
                  </div>

                </div>
              );
            })}

          </div>

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

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '440px' }}>
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
