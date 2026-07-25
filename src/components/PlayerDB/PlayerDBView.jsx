import React, { useMemo } from 'react';
import { Search, Filter, ArrowLeftRight, Check, X, ExternalLink } from 'lucide-react';
import { usePlayerDB } from '../../hooks/usePlayerDB';
import playersData from '../../data/players.json';
import seasonsData from '../../data/seasons.json';

export const PlayerDBView = () => {
  const {
    filters,
    setFilters,
    filteredPlayers,
    selectedForCompare,
    toggleSelectForCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    comparisonData
  } = usePlayerDB();

  // Create a map of season id -> season info from seasons.json
  const seasonMap = useMemo(() => {
    const map = {};
    seasonsData.forEach(s => {
      map[s.id] = s;
    });
    return map;
  }, []);

  // Dynamically get unique seasons present in players.json with count
  const availableSeasons = useMemo(() => {
    const counts = {};
    playersData.forEach(p => {
      counts[p.season] = (counts[p.season] || 0) + 1;
    });
    
    // Sort seasons by number of players descending
    return Object.keys(counts).map(seasonId => ({
      id: seasonId,
      name: seasonMap[seasonId]?.name || seasonId,
      count: counts[seasonId]
    })).sort((a, b) => b.count - a.count);
  }, [seasonMap]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>TRA CỨU & SO SÁNH ĐỐI ĐẦU CẦU THỦ</h2>
              <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
                fontSize: '0.72rem',
                fontWeight: 800,
                border: '1px solid rgba(16,185,129,0.3)'
              }}>
                ⚡ {playersData.length} Cầu thủ • {availableSeasons.length} Mùa giải
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Đồng bộ dữ liệu vn.fifaaddict.com • Bộ lọc đa tiêu chí FCO & Modal so sánh Side-by-Side
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={filters.searchName ? `https://vn.fifaaddict.com/fo4db?q=${encodeURIComponent(filters.searchName)}` : "https://vn.fifaaddict.com/fo4db"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                background: 'var(--bg-tertiary)',
                color: '#06b6d4',
                border: '1px solid rgba(6,182,212,0.3)'
              }}
            >
              <ExternalLink size={15} /> Tìm Trên FIFAAddict ↗
            </a>

            <button
              onClick={() => setIsCompareModalOpen(true)}
              disabled={selectedForCompare.length < 2}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: selectedForCompare.length >= 2 ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                color: selectedForCompare.length >= 2 ? '#000' : 'var(--text-muted)',
                fontWeight: 800,
                cursor: selectedForCompare.length >= 2 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeftRight size={16} /> So Sánh đối đầu ({selectedForCompare.length}/3)
            </button>
          </div>
        </div>

        {/* Filter inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr 1fr', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Tìm theo tên cầu thủ..."
              value={filters.searchName}
              onChange={(e) => setFilters(prev => ({ ...prev, searchName: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--glass-border)',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <select
            value={filters.position}
            onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
            style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            <option value="ALL">Tất cả vị trí</option>
            <option value="ST">ST - Tiền đạo cắm</option>
            <option value="CF">CF - Hộ công</option>
            <option value="LW">LW - Tiền đạo cánh trái</option>
            <option value="RW">RW - Tiền đạo cánh phải</option>
            <option value="CAM">CAM - Tiền vệ tấn công</option>
            <option value="CM">CM - Tiền vệ trung tâm</option>
            <option value="LM">LM - Tiền vệ cánh trái</option>
            <option value="RM">RM - Tiền vệ cánh phải</option>
            <option value="CDM">CDM - Tiền vệ phòng ngự</option>
            <option value="CB">CB - Trung vệ</option>
            <option value="LB">LB - Hậu vệ trái</option>
            <option value="RB">RB - Hậu vệ phải</option>
            <option value="GK">GK - Thủ môn</option>
          </select>

          <select
            value={filters.season}
            onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
            style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            <option value="ALL">Tất cả mùa giải ({playersData.length} cầu thủ)</option>
            {availableSeasons.map(s => (
              <option key={s.id} value={s.id}>
                Mùa {s.id} - {s.name} ({s.count})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Lương tối đa (BP)"
            value={filters.maxSalary || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, maxSalary: Number(e.target.value) }))}
            style={{ padding: '8px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Player Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredPlayers.map(player => {
          const isSelected = selectedForCompare.includes(player.id);
          return (
            <div key={player.id} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {player.ovr && (
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: '#000',
                        background: 'linear-gradient(135deg, var(--accent-gold), #d97706)',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        minWidth: '28px',
                        textAlign: 'center'
                      }}>
                        {player.ovr}
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px' }}>
                      {player.season}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981' }}>
                    Lương {player.salary} BP
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '4px' }}>{player.name}</h3>
                  {player.fifaAddictUrl && player.fifaAddictUrl !== 'https://vn.fifaaddict.com/fo4db' && (
                    <a
                      href={player.fifaAddictUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.7rem',
                        color: '#06b6d4',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 600
                      }}
                    >
                      FIFAAddict <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Vị trí: {player.mainPositions.join(', ')} • Cao {player.heightCm}cm • Chân {player.weakFoot}
                </p>

                {player.keyMetaTraits && player.keyMetaTraits.length > 0 && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'var(--bg-tertiary)', padding: '6px 10px', borderRadius: '6px', marginBottom: '8px' }}>
                    {player.keyMetaTraits.join(' • ')}
                  </div>
                )}

                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  Giá: {player.estimatedBpRange}
                </div>
              </div>

              <button
                onClick={() => toggleSelectForCompare(player.id)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #10b981' : '1px solid var(--glass-border)',
                  background: isSelected ? 'rgba(16,185,129,0.15)' : 'var(--bg-tertiary)',
                  color: isSelected ? '#10b981' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {isSelected ? <Check size={14} /> : <ArrowLeftRight size={14} />}
                <span>{isSelected ? 'Đã Tích Chọn So Sánh' : 'Chọn So Sánh'}</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && comparisonData && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          padding: '24px'
        }}>
          <div className="glass-panel" style={{ width: '850px', maxWidth: '95%', maxHeight: '90vh', padding: '24px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeftRight size={22} color="var(--accent-gold)" /> BẢNG SO SÁNH ĐỐI ĐẦU SIDE-BY-SIDE
              </h2>
              <button onClick={() => setIsCompareModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {/* Matrix Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-tertiary)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--glass-border)', width: '220px' }}>THUỘC TÍNH SO SÁNH</th>
                  {comparisonData.players.map((p, idx) => (
                    <th key={p.id} style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--accent-gold)', color: 'var(--accent-gold)' }}>
                      CẦU THỦ #{idx + 1}: {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.matrix.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>{row.attributeLabel}</td>
                    {comparisonData.players.map((_, pIdx) => (
                      <td key={pIdx} style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>
                        {row[`player_${pIdx + 1}`]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      )}

    </div>
  );
};
