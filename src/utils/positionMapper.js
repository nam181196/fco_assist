/**
 * Smart Pitch Position Coordinate Mapper (Full-Spectrum 27 Positions for FO4/FCO)
 * @param {Number} gridX - Horizontal percentage coordinate (0% Left -> 100% Right)
 * @param {Number} gridY - Vertical percentage coordinate (0% Opponent Box -> 100% Home Box)
 * @returns {String} FO4 Position Code (GK, SW, CB, LWB, CDM, CAM, LAM, ST, CF, LS...)
 */
export function calculatePositionFromCoords(gridX, gridY) {
  const x = Number(gridX) || 50;
  const y = Number(gridY) || 50;

  // 1. Goal Keeper Zone (Y >= 88%)
  if (y >= 88) return 'GK';

  // 2. Sweeper Zone (SW - Thòng) sát khung thành đằng sau CB
  if (y >= 80 && y < 88 && x >= 40 && x <= 60) {
    return 'SW';
  }

  // 3. Defender Line & Wing Backs (68% <= Y < 88%)
  if (y >= 68) {
    if (x <= 18) return 'LWB';
    if (x <= 30) return 'LB';
    if (x <= 42) return 'LCB';
    if (x <= 58) return 'CB';
    if (x <= 70) return 'RCB';
    if (x <= 82) return 'RB';
    return 'RWB';
  }

  // 4. Defensive Midfield Line (52% <= Y < 68%)
  if (y >= 52) {
    if (x <= 35) return 'LDM';
    if (x <= 65) return 'CDM';
    return 'RDM';
  }

  // 5. Central Midfield Line (35% <= Y < 52%)
  if (y >= 35) {
    if (x <= 35) return 'LCM';
    if (x <= 65) return 'CM';
    return 'RCM';
  }

  // 6. Attacking Midfield & Wings (20% <= Y < 35%)
  if (y >= 27) {
    if (x <= 18) return 'LM';
    if (x <= 38) return 'LAM';
    if (x <= 62) return 'CAM';
    if (x <= 82) return 'RAM';
    return 'RM';
  }

  // 7. Center Forward (CF) Zone (18% <= Y < 27% in central channel)
  if (y >= 18 && y < 27 && x >= 36 && x <= 64) {
    return 'CF';
  }

  // 8. Forward Line & Strikers (Y < 27%)
  if (x <= 22) return 'LW';
  if (x <= 36) return 'LF';
  if (x <= 46) return 'LS';
  if (x <= 54) return 'ST';
  if (x <= 64) return 'RS';
  if (x <= 78) return 'RF';
  return 'RW';
}
