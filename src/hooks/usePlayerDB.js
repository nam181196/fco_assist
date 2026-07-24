import { useState, useMemo } from 'react';
import { getPlayers, comparePlayersSideBySide } from '../services/playerService';

export const usePlayerDB = () => {
  const [filters, setFilters] = useState({
    searchName: '',
    position: 'ALL',
    season: 'ALL',
    maxSalary: 300,
    minBpPrice: 0,
    maxBpPrice: 0
  });

  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const filteredPlayers = useMemo(() => {
    return getPlayers(filters);
  }, [filters]);

  const toggleSelectForCompare = (playerId) => {
    setSelectedForCompare(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      }
      if (prev.length >= 3) {
        alert('Chỉ được chọn tối đa 3 cầu thủ để so sánh đối đầu!');
        return prev;
      }
      return [...prev, playerId];
    });
  };

  const comparisonData = useMemo(() => {
    if (selectedForCompare.length < 2) return null;
    return comparePlayersSideBySide(selectedForCompare);
  }, [selectedForCompare]);

  return {
    filters,
    setFilters,
    filteredPlayers,
    selectedForCompare,
    toggleSelectForCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    comparisonData
  };
};
