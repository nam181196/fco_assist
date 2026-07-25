import React from 'react';
import { getPlayerAvatarUrl, getSeasonBadgeUrl } from '../utils/assetResolver';

/**
 * Authentic FO4 In-Game Card Component (FIFAAddict Visual Style)
 * @param {Object} player - Player object from data
 * @param {String} position - Target position code (e.g. ST, CF, CAM, SW, LWB)
 * @param {String} size - Card size ('sm' | 'md' | 'lg')
 * @param {Boolean} isSelected - Highlight state
 * @param {Boolean} isDisabled - Duplicate rule disabled state
 * @param {String} disabledReason - Reason text for disabled state
 * @param {Function} onClick - Click handler
 */
export const FifaCardComponent = ({
  player,
  position,
  size = 'md',
  isSelected = false,
  isDisabled = false,
  disabledReason = '',
  onClick
}) => {
  if (!player) return null;

  const seasonBadge = getSeasonBadgeUrl(player.season);
  const avatarUrl = getPlayerAvatarUrl(player);
  const posCode = position || (player.mainPositions ? player.mainPositions[0] : 'ST');

  // Dimensions based on size
  const dimensions = {
    sm: { width: '85px', height: '115px', ovrSize: '0.85rem', nameSize: '0.62rem', avatarSize: '48px', seasonSize: '16px' },
    md: { width: '135px', height: '185px', ovrSize: '1.1rem', nameSize: '0.78rem', avatarSize: '80px', seasonSize: '22px' },
    lg: { width: '180px', height: '240px', ovrSize: '1.4rem', nameSize: '0.9rem', avatarSize: '110px', seasonSize: '28px' }
  }[size] || dimensions.md;

  // Position badge colors (matching FO4 game standards)
  const getPositionBg = (code) => {
    const fw = ['ST', 'CF', 'LF', 'RF', 'LS', 'RS', 'LW', 'RW'];
    const mf = ['CAM', 'LAM', 'RAM', 'LM', 'RM', 'CM', 'LCM', 'RCM', 'CDM', 'LDM', 'RDM'];
    const df = ['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB', 'SW'];
    const gk = ['GK'];

    if (fw.includes(code)) return 'linear-gradient(135deg, #ef4444, #b91c1c)';
    if (mf.includes(code)) return 'linear-gradient(135deg, #10b981, #047857)';
    if (df.includes(code)) return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    if (gk.includes(code)) return 'linear-gradient(135deg, #f59e0b, #b45309)';
    return 'linear-gradient(135deg, #6366f1, #4338ca)';
  };

  return (
    <div
      onClick={isDisabled ? null : onClick}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
        borderRadius: '12px',
        background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 60%, #020617 100%)',
        border: isSelected 
          ? '2px solid #3b82f6' 
          : isDisabled 
          ? '1.5px solid rgba(239,68,68,0.4)' 
          : '1.5px solid rgba(245,158,11,0.5)',
        boxShadow: isSelected
          ? '0 0 20px rgba(59,130,246,0.6)'
          : '0 8px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
        opacity: isDisabled ? 0.45 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {/* Top Metallic Border Glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #f59e0b, #d97706, #3b82f6)'
      }} />

      {/* Header Info Bar: OVR, Position, Season Badge */}
      <div style={{
        padding: '6px 8px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'flex-start',
        zIndex: 5
      }}>
        {/* Left: OVR & Position Code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
          <span style={{
            fontSize: dimensions.ovrSize,
            fontWeight: 900,
            color: 'var(--accent-gold)',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
            {player.ovr || '100'}
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 900,
            padding: '1px 5px',
            borderRadius: '4px',
            background: getPositionBg(posCode),
            color: '#fff',
            marginTop: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            {posCode}
          </span>
        </div>

        {/* Right: Season Badge & Salary */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
          {seasonBadge ? (
            <img 
              src={seasonBadge} 
              alt={player.season}
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{ height: dimensions.seasonSize, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
            />
          ) : (
            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              {player.season}
            </span>
          )}
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#10b981',
            background: 'rgba(0,0,0,0.6)',
            padding: '1px 4px',
            borderRadius: '4px',
            marginTop: '2px'
          }}>
            💰 {player.salary}
          </span>
        </div>
      </div>

      {/* Center Body: Authentic Player Portrait Avatar */}
      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        marginTop: '-10px',
        marginBottom: '-6px'
      }}>
        {/* Season Watermark in background */}
        <span style={{
          position: 'absolute',
          fontSize: '2rem',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '2px',
          pointerEvents: 'none'
        }}>
          {player.season}
        </span>

        {/* Player Face Cutout */}
        <img
          src={avatarUrl}
          alt={player.name}
          onError={(e) => {
            e.target.src = 'https://s1.fifaaddict.com/assets/img/fo4_player_pack_empty.png';
          }}
          style={{
            width: dimensions.avatarSize,
            height: dimensions.avatarSize,
            objectFit: 'cover',
            borderRadius: '50%',
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.7))',
            border: '2px solid rgba(245,158,11,0.3)',
            zIndex: 3
          }}
        />
      </div>

      {/* Bottom Footer: Player Full Name & Season Badge */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)',
        padding: '6px 4px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        zIndex: 5
      }}>
        <div style={{
          fontSize: dimensions.nameSize,
          fontWeight: 900,
          color: '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)'
        }}>
          {player.name}
        </div>
        
        {isDisabled && disabledReason ? (
          <div style={{ fontSize: '0.58rem', color: '#ef4444', fontWeight: 800, marginTop: '2px' }}>
            ⚠️ {disabledReason}
          </div>
        ) : (
          <div style={{ fontSize: '0.6rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
            {player.seasonFullName || player.season}
          </div>
        )}
      </div>
    </div>
  );
};
