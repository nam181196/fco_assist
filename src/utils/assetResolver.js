/**
 * Authentic FIFAAddict CDN Asset URL Resolver Strategy for Version 3.0.0
 */

/**
 * Get player face portrait avatar image URL from FIFAAddict s1 CDN
 * @param {Object} player - Player card object
 * @returns {String} Image URL for player face portrait
 */
export function getPlayerAvatarUrl(player) {
  if (!player) return 'https://s1.fifaaddict.com/assets/img/fo4_player_pack_empty.png';
  if (player.avatarUrl) return player.avatarUrl;

  const uid = player.fifaAddictUrl ? player.fifaAddictUrl.split('/').pop() : player.id.replace('p_', '');
  return `https://s1.fifaaddict.com/fo4/players/${uid}.png`;
}

/**
 * Get season badge logo URL from FIFAAddict s1 CDN
 * @param {String} seasonCode - Season short code (e.g. 26TY, IPRM, ICONTM)
 * @returns {String|null} Image URL for season badge logo
 */
export function getSeasonBadgeUrl(seasonCode) {
  if (!seasonCode) return null;
  return `https://s1.fifaaddict.com/fo4/season/${seasonCode.toLowerCase()}.png`;
}
