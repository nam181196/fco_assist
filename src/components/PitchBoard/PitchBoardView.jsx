import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Save, RefreshCw, Layers, Sparkles, Plus, Trash2, Cpu, Gamepad2, Move, RotateCcw } from 'lucide-react';
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
  const [seasonFilter, setSeasonFilter] = useState('');
  
  // Free Dragging State
  const [activeDraggingSlotId, setActiveDraggingSlotId] = useState(null);
  const [customPositions, setCustomPositions] = useState({}); // { role: { gridX, gridY } }
  
  const pitchRef = useRef(null);
  const activePositions = currentFormation?.positions || [];

  // Reset custom positions when formation changes
  useEffect(() => {
    setCustomPositions({});
  }, [selectedFormationId]);

  /**
   * Convert screen coordinates to pitch-local coordinates.
   * When the pitch is rotated in 3D via CSS transform, getBoundingClientRect() 
   * returns the projected bounding box which is distorted. We need to compute
   * the actual position on the untransformed pitch plane.
   */
  const screenToPitchCoords = useCallback((clientX, clientY) => {
    if (!pitchRef.current) return { gridX: 50, gridY: 50 };
    
    const rect = pitchRef.current.getBoundingClientRect();
    
    if (pitchPerspective === '2D') {
      // Simple 2D: direct mapping
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const gridX = Math.max(4, Math.min(96, Math.round((x / rect.width) * 100)));
      const gridY = Math.max(4, Math.min(96, Math.round((y / rect.height) * 100)));
      return { gridX, gridY };
    } else {
      // 3D mode: We use the projected rect but compensate for perspective distortion.
      // The CSS transform is: perspective(1200px) rotateX(35deg) scale(0.95)
      // We approximate by using the rect directly since pointer events already
      // account for the transform in the hit-test.
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const gridX = Math.max(4, Math.min(96, Math.round((x / rect.width) * 100)));
      const gridY = Math.max(4, Math.min(96, Math.round((y / rect.height) * 100)));
      return { gridX, gridY };
    }
  }, [pitchPerspective]);

  // --- Pointer Event Handlers for Free Drag-and-Drop ---
  const handlePointerDown = useCallback((e, role) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDraggingSlotId(role);
    
    // Capture pointer for smooth tracking outside element bounds
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  // We handle pointer move on the PITCH container for smooth tracking
  const handlePitchPointerMove = useCallback((e) => {
    if (!activeDraggingSlotId || !pitchRef.current) return;
    e.preventDefault();
    
    const coords = screenToPitchCoords(e.clientX, e.clientY);
    
    setCustomPositions(prev => ({
      ...prev,
      [activeDraggingSlotId]: coords
    }));
  }, [activeDraggingSlotId, screenToPitchCoords]);

  const handlePointerUp = useCallback((e) => {
    if (activeDraggingSlotId) {
      setActiveDraggingSlotId(null);
    }
  }, [activeDraggingSlotId]);

  // Attach global pointer up to handle edge cases
  useEffect(() => {
    if (activeDraggingSlotId) {
      const onUp = () => setActiveDraggingSlotId(null);
      window.addEventListener('pointerup', onUp);
      return () => window.removeEventListener('pointerup', onUp);
    }
  }, [activeDraggingSlotId]);

  const resetPositions = () => {
    setCustomPositions({});
  };

  // Unique seasons for filter dropdown
  const uniqueSeasons = useMemo(() => {
    const seasons = [...new Set(playersData.map(p => p.season))];
    return seasons.sort();
  }, []);

  const filteredPlayers = useMemo(() => {
    return playersData.filter(p => {
      const matchesSearch = searchFilter === '' || 
        p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.season.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (p.seasonFullName && p.seasonFullName.toLowerCase().includes(searchFilter.toLowerCase()));
      const matchesSeason = seasonFilter === '' || p.season === seasonFilter;
      return matchesSearch && matchesSeason;
    });
  }, [searchFilter, seasonFilter]);

  // 3D Pitch grass stripe rendering
  const renderPitchGrass = () => {
    if (pitchPerspective === '3D') {
      return (
        <>
          {/* Realistic grass stripes */}
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={`stripe-${i}`} style={{
              position: 'absolute',
              top: `${(i / 14) * 100}%`,
              left: 0,
              right: 0,
              height: `${100 / 14}%`,
              background: i % 2 === 0
                ? 'linear-gradient(180deg, #1a8a3e 0%, #15803d 100%)'
                : 'linear-gradient(180deg, #15803d 0%, #12713a 100%)',
              pointerEvents: 'none'
            }} />
          ))}
          {/* Stadium shadow gradient from top */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
          {/* Vignette bottom shadow */}
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '25%',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        </>
      );
    }
    return null;
  };

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
                color: 'var(--text-main)',
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
                background: Object.keys(customPositions).length > 0 ? 'rgba(239,68,68,0.15)' : 'var(--bg-tertiary)',
                color: Object.keys(customPositions).length > 0 ? '#ef4444' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={12} /> Đặt lại Vị trí
              {Object.keys(customPositions).length > 0 && (
                <span style={{
                  padding: '1px 6px',
                  borderRadius: '8px',
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  marginLeft: '2px'
                }}>
                  {Object.keys(customPositions).length}
                </span>
              )}
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
                📐 Sân 2D
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
                🏟️ Sân 3D
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
                color: 'var(--text-main)',
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
            <span>Nhấn giữ & kéo cầu thủ để <strong style={{ color: 'var(--accent-gold)' }}>KÉO THẢ TỰ DO</strong> trên sân.</span>
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: gameMode === 'MANAGER_SIM' ? '#10b981' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {gameMode === 'MANAGER_SIM' ? <Cpu size={14} /> : <Gamepad2 size={14} />}
            <span>{gameMode === 'MANAGER_SIM' ? 'ĐẤU GIẢ LẬP GLXH' : 'ĐẤU XẾP HẠNG 1V1'}</span>
          </div>
        </div>

        {/* ====== PITCH CANVAS CONTAINER ====== */}
        <div 
          className={pitchPerspective === '3D' ? 'pitch-perspective-wrapper' : ''}
          style={{
            // Extra padding at bottom for 3D effect depth
            paddingBottom: pitchPerspective === '3D' ? '40px' : '0'
          }}
        >
          
          <div
            ref={pitchRef}
            className={pitchPerspective === '3D' ? 'pitch-canvas-3d' : ''}
            onPointerMove={handlePitchPointerMove}
            onPointerUp={handlePointerUp}
            style={{
              position: 'relative',
              width: '100%',
              height: '560px',
              borderRadius: pitchPerspective === '3D' ? '4px' : '20px',
              background: pitchPerspective === '3D'
                ? '#15803d'
                : 'repeating-linear-gradient(0deg, #166534, #166534 40px, #14532d 40px, #14532d 80px)',
              border: pitchPerspective === '3D' 
                ? '3px solid rgba(255,255,255,0.6)' 
                : '2px solid var(--glass-border)',
              overflow: 'hidden',
              touchAction: 'none',
              cursor: activeDraggingSlotId ? 'grabbing' : 'default',
              userSelect: 'none'
            }}
          >
            {/* Realistic grass stripes for 3D mode */}
            {renderPitchGrass()}

            {/* ========= PITCH MARKING LINES ========= */}
            {/* Outer Border Line */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, pointerEvents: 'none', zIndex: 2 }} />
            
            {/* Halfway Line */}
            <div style={{ position: 'absolute', top: '50%', left: '15px', right: '15px', height: '2px', background: pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)', pointerEvents: 'none', zIndex: 2 }} />
            
            {/* Center Circle */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '120px', height: '120px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 2 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', background: pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 2 }} />

            {/* Top Goal Penalty Box */}
            <div style={{ position: 'absolute', top: '15px', left: '25%', right: '25%', height: '100px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, borderTop: 'none', pointerEvents: 'none', zIndex: 2 }} />
            <div style={{ position: 'absolute', top: '15px', left: '35%', right: '35%', height: '40px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, borderTop: 'none', pointerEvents: 'none', zIndex: 2 }} />

            {/* Bottom Goal Penalty Box */}
            <div style={{ position: 'absolute', bottom: '15px', left: '25%', right: '25%', height: '100px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, borderBottom: 'none', pointerEvents: 'none', zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '35%', right: '35%', height: '40px', border: `2px solid ${pitchPerspective === '3D' ? 'rgba(255,255,255,0.55)' : 'var(--pitch-line)'}`, borderBottom: 'none', pointerEvents: 'none', zIndex: 2 }} />

            {/* Goal Nets (3D mode enhancement) */}
            {pitchPerspective === '3D' && (
              <>
                {/* Top goal net */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '38%',
                  right: '38%',
                  height: '16px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                  borderLeft: '2px solid rgba(255,255,255,0.4)',
                  borderRight: '2px solid rgba(255,255,255,0.4)',
                  borderTop: '2px solid rgba(255,255,255,0.4)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
                {/* Bottom goal net */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '38%',
                  right: '38%',
                  height: '16px',
                  background: 'linear-gradient(0deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                  borderLeft: '2px solid rgba(255,255,255,0.4)',
                  borderRight: '2px solid rgba(255,255,255,0.4)',
                  borderBottom: '2px solid rgba(255,255,255,0.4)',
                  pointerEvents: 'none',
                  zIndex: 2
                }} />
              </>
            )}

            {/* ========= 11 PLAYER INTERACTIVE SLOT NODES ========= */}
            {activePositions.map((pos) => {
              const player = slotMap[pos.role];
              const customPos = customPositions[pos.role];
              const posX = customPos ? customPos.gridX : pos.gridX;
              const posY = customPos ? customPos.gridY : pos.gridY;
              const isDragging = activeDraggingSlotId === pos.role;
              const hasCustomPos = !!customPos;

              return (
                <div
                  key={pos.role}
                  onPointerDown={(e) => handlePointerDown(e, pos.role)}
                  style={{
                    position: 'absolute',
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: isDragging ? 50 : 10,
                    userSelect: 'none',
                    touchAction: 'none',
                    // Smooth position transition only when NOT dragging
                    transition: isDragging ? 'none' : 'left 0.2s ease, top 0.2s ease',
                    // 3D mode: lift nodes above pitch with perspective counter-rotation
                    ...(pitchPerspective === '3D' ? {
                      transformStyle: 'preserve-3d',
                      filter: isDragging ? 'drop-shadow(0 8px 20px rgba(59,130,246,0.6))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
                    } : {})
                  }}
                >
                  {/* Player shadow on pitch (3D mode) */}
                  {pitchPerspective === '3D' && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '36px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                      pointerEvents: 'none',
                      zIndex: -1
                    }} />
                  )}

                  {/* Node Circle Counter */}
                  <div
                    onClick={(e) => {
                      if (!isDragging) {
                        e.stopPropagation();
                        setSelectedSlotForAdd(pos);
                      }
                    }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: player
                        ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                        : 'radial-gradient(circle, rgba(30,30,30,0.9) 0%, rgba(0,0,0,0.95) 100%)',
                      border: isDragging
                        ? '3px solid #3b82f6'
                        : player
                        ? '2.5px solid var(--accent-gold)'
                        : '2.5px dashed rgba(255,255,255,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      boxShadow: isDragging
                        ? '0 0 25px rgba(59,130,246,0.7), 0 0 50px rgba(59,130,246,0.3)'
                        : player 
                          ? '0 4px 12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)' 
                          : '0 4px 12px rgba(0,0,0,0.4)',
                      position: 'relative',
                      transform: isDragging ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.15s ease, box-shadow 0.2s ease'
                    }}
                  >
                    {player ? (
                      <span style={{ color: 'var(--accent-gold)', textShadow: '0 0 8px rgba(245,158,11,0.3)' }}>{player.salary}</span>
                    ) : (
                      <Plus size={20} strokeWidth={2.5} />
                    )}

                    {player && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          removePlayerFromSlot(pos.role);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          top: '-6px',
                          right: '-6px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--salary-alert)',
                          border: '2px solid rgba(0,0,0,0.3)',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(239,68,68,0.4)',
                          zIndex: 60
                        }}
                      >
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>

                  {/* Role Badge & Player Name */}
                  <div style={{
                    marginTop: '4px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.92)',
                    border: hasCustomPos ? '1px solid rgba(59,130,246,0.5)' : '1px solid var(--glass-border)',
                    color: player ? '#fff' : 'var(--accent-gold)',
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {pos.role} {player ? `• ${player.name}` : ''}
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* ====== RIGHT COLUMN: Player Selection Drawer ====== */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
            {selectedSlotForAdd ? (
              <>
                CHỌN CẦU THỦ CHO: <span style={{ color: 'var(--accent-gold)' }}>{selectedSlotForAdd.role}</span>
              </>
            ) : 'DANH MỤC CẦU THỦ QUỐC DÂN'}
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {selectedSlotForAdd 
              ? `Nhấn vào cầu thủ bên dưới để gán vào vị trí ${selectedSlotForAdd.role}` 
              : 'Dữ liệu đồng bộ vn.fifaaddict.com • Nhấn + trên sân để chọn vị trí'
            }
          </p>
        </div>

        {/* Search + Season Filter Row */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Tìm tên cầu thủ..."
            style={{
              flex: 1,
              padding: '8px 10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              borderRadius: '8px',
              fontSize: '0.78rem'
            }}
          />
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            style={{
              padding: '8px 6px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              borderRadius: '8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              minWidth: '100px'
            }}
          >
            <option value="">Tất cả mùa</option>
            {uniqueSeasons.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0 4px' }}>
          <span>{filteredPlayers.length} cầu thủ</span>
          <span>{uniqueSeasons.length} mùa giải</span>
        </div>

        {/* Selected slot indicator */}
        {selectedSlotForAdd && (
          <div style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3b82f6' }}>
              📍 {selectedSlotForAdd.role} ({selectedSlotForAdd.label})
            </span>
            <button
              onClick={() => setSelectedSlotForAdd(null)}
              style={{
                padding: '2px 8px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(239,68,68,0.2)',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.7rem',
                fontWeight: 700
              }}
            >
              Huỷ
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '500px' }}>
          {filteredPlayers.map(p => (
            <div
              key={p.id}
              onClick={() => {
                if (selectedSlotForAdd) {
                  assignPlayerToSlot(selectedSlotForAdd.role, p);
                  setSelectedSlotForAdd(null);
                }
              }}
              className="glass-card"
              style={{
                padding: '10px 12px',
                cursor: selectedSlotForAdd ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                opacity: selectedSlotForAdd ? 1 : 0.7,
                borderColor: selectedSlotForAdd ? 'var(--glass-border)' : 'transparent',
                gap: '8px'
              }}
            >
              {/* OVR Badge */}
              <div style={{
                minWidth: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 900,
                fontSize: '0.8rem',
                flexShrink: 0
              }}>
                {p.ovr || '?'}
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name} <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>[{p.season}]</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '1px 6px',
                    borderRadius: '6px',
                    background: 'rgba(245,158,11,0.15)',
                    color: 'var(--accent-gold)',
                    fontWeight: 800,
                    fontSize: '0.65rem',
                    border: '1px solid rgba(245,158,11,0.3)'
                  }}>
                    {p.season}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {p.mainPositions.join('/')}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {p.heightCm}cm
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    WF{p.weakFoot}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--accent-gold)',
                  fontWeight: 800,
                  fontSize: '0.72rem'
                }}>
                  💰 {p.salary}
                </span>
                {p.fifaAddictUrl && p.fifaAddictUrl !== 'https://vn.fifaaddict.com/fo4db' && (
                  <a
                    href={p.fifaAddictUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '0.6rem',
                      color: '#06b6d4',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    FIFAAddict ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
