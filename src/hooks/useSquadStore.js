import { useState, useEffect, useMemo } from 'react';
import formationsData from '../data/formations.json';
import playersData from '../data/players.json';
import { getSystemConfig, saveUserSquad, getUserSquads, duplicateUserSquad, deleteUserSquad } from '../services/localStorageService';

export function getCanonicalPlayerName(name) {
  if (!name) return '';
  let clean = name.toLowerCase().trim().replace(/^[a-z]\.\s+/, '');
  const parts = clean.split(/\s+/);
  return parts[parts.length - 1];
}

export const useSquadStore = () => {
  const [systemConfig, setSystemConfig] = useState(() => getSystemConfig());
  const [selectedFormationId, setSelectedFormationId] = useState('4-2-3-1');
  const [squadName, setSquadName] = useState('Đội hình Cày Rank 4-2-3-1');
  const [squadId, setSquadId] = useState(`sq_${Date.now()}`);
  
  // 11 Player slots map
  const [slotMap, setSlotMap] = useState({});
  const [savedSquads, setSavedSquads] = useState(() => getUserSquads());

  const currentFormation = useMemo(() => {
    return formationsData.find(f => f.id === selectedFormationId) || formationsData[0];
  }, [selectedFormationId]);

  // Load 11 default UNIQUE players for formation (guaranteeing no duplicate player names)
  useEffect(() => {
    const defaultMap = {};
    const usedNames = new Set();
    let playerIdx = 0;

    currentFormation.positions.forEach((pos) => {
      while (playerIdx < playersData.length) {
        const p = playersData[playerIdx];
        playerIdx++;
        const canonName = getCanonicalPlayerName(p.name);
        if (!usedNames.has(canonName)) {
          usedNames.add(canonName);
          defaultMap[pos.role] = p;
          break;
        }
      }
    });
    setSlotMap(defaultMap);
  }, [selectedFormationId]);

  const totalSalary = useMemo(() => {
    return Object.values(slotMap).reduce((sum, p) => sum + (p ? p.salary : 0), 0);
  }, [slotMap]);

  const isSalaryExceeded = totalSalary > systemConfig.CURRENT_SALARY_CAP;

  const validateUniquePlayerConstraint = (candidatePlayer, targetRole, customPositions = null) => {
    if (!candidatePlayer || !candidatePlayer.name) return { allowed: true };
    const normCandidateName = getCanonicalPlayerName(candidatePlayer.name);
    const activeMap = customPositions || slotMap;

    for (const [role, data] of Object.entries(activeMap)) {
      if (role === targetRole) continue;
      const playerObj = data.player || data;
      if (playerObj && playerObj.name) {
        const normExistingName = getCanonicalPlayerName(playerObj.name);
        if (normExistingName === normCandidateName) {
          return {
            allowed: false,
            conflictName: playerObj.name,
            conflictSeason: playerObj.season,
            conflictRole: role
          };
        }
      }
    }
    return { allowed: true };
  };

  const assignPlayerToSlot = (role, player) => {
    const check = validateUniquePlayerConstraint(player, role);
    if (!check.allowed) {
      alert(`Cầu thủ '${check.conflictName}' đã có mặt trong đội hình (Thẻ ${check.conflictSeason})! Vui lòng chọn cầu thủ khác.`);
      return false;
    }
    setSlotMap(prev => ({
      ...prev,
      [role]: player
    }));
    return true;
  };

  const removePlayerFromSlot = (role) => {
    setSlotMap(prev => {
      const copy = { ...prev };
      delete copy[role];
      return copy;
    });
  };

  const handleSaveSquad = () => {
    if (isSalaryExceeded) {
      alert(`Đội hình Quá Lương! Tổng Lương hiện tại là ${totalSalary}, vượt quá hạn mức Lương trần ${systemConfig.CURRENT_SALARY_CAP}!`);
      return false;
    }

    const newSquad = {
      squadId,
      squadName,
      formationId: selectedFormationId,
      totalSalary,
      slotMap
    };

    const updatedList = saveUserSquad(newSquad);
    setSavedSquads(updatedList);
    alert('Lưu đội hình cá nhân thành công!');
    return true;
  };

  const handleLoadSquad = (squad) => {
    setSquadId(squad.squadId);
    setSquadName(squad.squadName);
    setSelectedFormationId(squad.formationId);
    setSlotMap(squad.slotMap || {});
  };

  const handleDuplicateSquad = (sId) => {
    const updatedList = duplicateUserSquad(sId);
    setSavedSquads(updatedList);
  };

  const handleDeleteSquad = (sId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đội hình này?')) {
      const updatedList = deleteUserSquad(sId);
      setSavedSquads(updatedList);
    }
  };

  return {
    systemConfig,
    setSystemConfig,
    selectedFormationId,
    setSelectedFormationId,
    currentFormation,
    squadName,
    setSquadName,
    squadId,
    slotMap,
    totalSalary,
    isSalaryExceeded,
    assignPlayerToSlot,
    validateUniquePlayerConstraint,
    removePlayerFromSlot,
    handleSaveSquad,
    handleLoadSquad,
    handleDuplicateSquad,
    handleDeleteSquad,
    savedSquads
  };
};
