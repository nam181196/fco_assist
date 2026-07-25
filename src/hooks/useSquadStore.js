import { useState, useEffect, useMemo } from 'react';
import formationsData from '../data/formations.json';
import playersData from '../data/players.json';
import { getSystemConfig, saveUserSquad, getUserSquads, duplicateUserSquad, deleteUserSquad } from '../services/localStorageService';

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

  // Load default players for 4-2-3-1
  useEffect(() => {
    const defaultMap = {};
    currentFormation.positions.forEach((pos, idx) => {
      if (playersData[idx]) {
        defaultMap[pos.role] = playersData[idx];
      }
    });
    setSlotMap(defaultMap);
  }, [selectedFormationId]);

  const totalSalary = useMemo(() => {
    return Object.values(slotMap).reduce((sum, p) => sum + (p ? p.salary : 0), 0);
  }, [slotMap]);

  const isSalaryExceeded = totalSalary > systemConfig.CURRENT_SALARY_CAP;

  const assignPlayerToSlot = (role, player) => {
    setSlotMap(prev => ({
      ...prev,
      [role]: player
    }));
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
    removePlayerFromSlot,
    handleSaveSquad,
    handleLoadSquad,
    handleDuplicateSquad,
    handleDeleteSquad,
    savedSquads
  };
};
