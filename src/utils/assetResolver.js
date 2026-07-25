/**
 * FIFAAddict Asset URL Resolver Strategy for Version 3.0.0
 */

/**
 * Get player face avatar image URL
 * @param {Object} player - Player card object
 * @returns {String} Image URL for player face avatar
 */
export function getPlayerAvatarUrl(player) {
  if (!player) return 'https://vn.fifaaddict.com/fo4db/assets/players/p0.png';
  if (player.avatarUrl) return player.avatarUrl;

  const uid = player.fifaAddictUrl ? player.fifaAddictUrl.split('/').pop() : player.id.replace('p_', '');
  return `https://vn.fifaaddict.com/fo4db/assets/players/p${uid}.png`;
}

/**
 * Get season badge logo URL
 * @param {String} seasonCode - Season short code (e.g. 26TY, IPRM, ICONTM)
 * @returns {String|null} Image URL for season badge logo
 */
export function getSeasonBadgeUrl(seasonCode) {
  if (!seasonCode) return null;
  return `https://vn.fifaaddict.com/fo4db/assets/season/${seasonCode.toLowerCase()}.png`;
}
