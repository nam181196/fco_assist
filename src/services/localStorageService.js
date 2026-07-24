// LocalStorage Service - User Squads Persistence & Dynamic System Config

const SQUADS_STORAGE_KEY = 'fco_user_squads';
const CONFIG_STORAGE_KEY = 'fco_system_config';

export const getSystemConfig = () => {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) {
      const defaultConfig = {
        CURRENT_SALARY_CAP: 300,
        theme_preference: 'dark'
      };
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Lỗi khi đọc System Config:', err);
    return { CURRENT_SALARY_CAP: 300, theme_preference: 'dark' };
  }
};

export const updateSystemConfig = (newConfig) => {
  try {
    const current = getSystemConfig();
    const updated = { ...current, ...newConfig };
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Lỗi khi ghi System Config:', err);
    return getSystemConfig();
  }
};

export const getUserSquads = () => {
  try {
    const raw = localStorage.getItem(SQUADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Lỗi khi đọc User Squads:', err);
    return [];
  }
};

export const saveUserSquad = (squad) => {
  try {
    const squads = getUserSquads();
    const existingIndex = squads.findIndex(s => s.squadId === squad.squadId);
    
    if (existingIndex >= 0) {
      squads[existingIndex] = { ...squad, updatedAt: Date.now() };
    } else {
      if (squads.length >= 10) {
        throw new Error('Đã đạt giới hạn tối đa 10 đội hình lưu trữ trong bộ nhớ!');
      }
      squads.push({
        ...squad,
        squadId: squad.squadId || `sq_${Date.now()}`,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
    
    localStorage.setItem(SQUADS_STORAGE_KEY, JSON.stringify(squads));
    return squads;
  } catch (err) {
    console.error('Lỗi khi lưu Squad:', err);
    throw err;
  }
};

export const deleteUserSquad = (squadId) => {
  try {
    const squads = getUserSquads();
    const filtered = squads.filter(s => s.squadId !== squadId);
    localStorage.setItem(SQUADS_STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Lỗi khi xóa Squad:', err);
    return getUserSquads();
  }
};

export const duplicateUserSquad = (squadId) => {
  try {
    const squads = getUserSquads();
    const target = squads.find(s => s.squadId === squadId);
    if (!target) throw new Error('Không tìm thấy đội hình cần nhân bản');

    const newSquad = {
      ...target,
      squadId: `sq_${Date.now()}`,
      squadName: `Bản sao của ${target.squadName}`.substring(0, 50),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    return saveUserSquad(newSquad);
  } catch (err) {
    console.error('Lỗi khi nhân bản Squad:', err);
    throw err;
  }
};
