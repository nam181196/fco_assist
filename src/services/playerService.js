// Player Service - Multi-Filter Search & Side-by-Side Comparison Engine
import playersData from '../data/players.json';

export const getPlayers = (filters = {}) => {
  let result = [...playersData];

  if (filters.searchName && filters.searchName.trim() !== '') {
    const term = filters.searchName.toLowerCase().trim();
    result = result.filter(p => p.name.toLowerCase().includes(term));
  }

  if (filters.position && filters.position !== 'ALL') {
    result = result.filter(p => p.mainPositions.includes(filters.position));
  }

  if (filters.season && filters.season !== 'ALL') {
    result = result.filter(p => p.season === filters.season);
  }

  if (filters.maxSalary && filters.maxSalary > 0) {
    result = result.filter(p => p.salary <= filters.maxSalary);
  }

  if (filters.minBpPrice && filters.minBpPrice > 0) {
    result = result.filter(p => p.bpPriceMax >= filters.minBpPrice);
  }

  if (filters.maxBpPrice && filters.maxBpPrice > 0) {
    result = result.filter(p => p.bpPriceMin <= filters.maxBpPrice);
  }

  return result;
};

export const getPlayerById = (id) => {
  return playersData.find(p => p.id === id) || null;
};

export const comparePlayersSideBySide = (playerIds = []) => {
  const selectedPlayers = playerIds
    .map(id => getPlayerById(id))
    .filter(Boolean);

  if (selectedPlayers.length === 0) return null;

  const comparisonAttributes = [
    { key: 'name', label: 'Tên Cầu Thủ' },
    { key: 'season', label: 'Mùa Giải' },
    { key: 'salary', label: 'Mức Lương (BP)' },
    { key: 'mainPositions', label: 'Vị Trí Thi Đấu', format: (v) => Array.isArray(v) ? v.join(', ') : v },
    { key: 'heightCm', label: 'Chiều Cao / Cân Nặng', format: (v, p) => `${p.heightCm} cm / ${p.weightKg} kg` },
    { key: 'weakFoot', label: 'Kỹ Năng Chân' },
    { key: 'estimatedBpRange', label: 'Giá BP Dự Kiến' },
    { key: 'keyMetaTraits', label: 'Đặc Tính Meta Nổi Bật', format: (v) => Array.isArray(v) ? v.join(' • ') : v }
  ];

  const matrix = comparisonAttributes.map(attr => {
    const row = { attributeLabel: attr.label };
    selectedPlayers.forEach((player, idx) => {
      const rawVal = player[attr.key];
      row[`player_${idx + 1}`] = attr.format ? attr.format(rawVal, player) : rawVal;
    });
    return row;
  });

  return {
    players: selectedPlayers,
    matrix
  };
};
