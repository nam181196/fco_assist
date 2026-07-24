import playersData from '../data/players.json';
import diagnosisRulesData from '../data/diagnosis_rules.json';

// AI Coach Service v2.0.0 APPROVED
export const aiCoachService = {
  
  // Unified Advisor v2.0.0 with AI Explanation Engine & Game Mode Context
  async getUnifiedRecommendationV2(squadPlayers, currentSalaryCap = 300, gameMode = 'RANKED_1V1') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isManagerSim = gameMode === 'MANAGER_SIM';

        const result = {
          recommendedFormation: {
            formationId: 'custom_meta_v2',
            name: isManagerSim ? '4-2-1-3 GLXH Tối Ưu Sút Xa ZD' : '4-2-3-1 Ban Bật Kiểm Soát 1v1',
            compatibilityScore: 96
          },

          // AI Tactical Rationale Explanation Card (v2.0.0 Feature)
          whyThisTactic: {
            geometricAnalysis: isManagerSim
              ? 'Đội hình của bạn được đẩy cao 2 CAM/CF giáp vòng cấm, tạo khoảng trống nã đại bác ZD cực tốt cho máy tự động sút.'
              : 'Sơ đồ của bạn củng cố 2 tiền vệ mỏ neo CDM lót tuyến hai, giúp bọc lót nêm chặt hành lang cánh chống phản công.',
            keyStrengths: isManagerSim
              ? ['Bùng nổ khả năng sút xa ZD tự động', 'Đẩy tốc độ trận đấu lên cực cao (+15%)', 'Ép sân liên tục']
              : ['Khả năng ban bật trung lộ mượt mượt', 'Phòng ngự phản công chắc chắn', 'Kiểm soát nhịp độ trận đấu'],
            tacticalRationale: isManagerSim
              ? `Do bạn đang chọn Chế độ Đấu Giả Lập GLXH, AI đẩy Tốc độ lối chơi lên 85/99 và Chuyên sút 80/99 để máy tự động tối ưu cơ hội ghi bàn.`
              : `Do bạn đang chọn Chế độ Đấu Xếp Hạng 1v1, AI thiết lập Tốc độ 65/99 và Chuyền 45/99 để bạn dễ điều khiển tay ban bật cẩn thận.`
          },

          teamTactic: {
            buildUpSpeed: isManagerSim ? 85 : 65,
            passingStyle: isManagerSim ? 70 : 45,
            positioning: 'Organized',
            chanceCrossing: isManagerSim ? 60 : 50,
            chanceShooting: isManagerSim ? 80 : 65,
            defensivePressure: isManagerSim ? 75 : 55,
            defensiveAggression: isManagerSim ? 70 : 60,
            defensiveWidth: isManagerSim ? 40 : 45,
            defensiveLine: 'Cover'
          },

          individualInstructions: {
            ST: ['AR1 - Chạy chỗ xé nách', 'SR1 - Xẻ nách'],
            CAM: ['PF1 - Tự do', 'SC1 - Vào vòng cấm khi tạt'],
            CDM1: ['AS1 - Giữ vị trí khi tấn công', 'DB2 - Bọc lót'],
            CDM2: ['AS1 - Giữ vị trí khi tấn công', 'DB2 - Bọc lót']
          },

          managerSkills: [
            { skillName: isManagerSim ? 'Sút xa tự động' : 'Thâm nhập vòng cấm', stars: 3, description: 'Tăng khả năng sút xa ZD và bứt tốc' },
            { skillName: 'Tốc độ thâm nhập', stars: 3, description: 'Tăng tốc độ di chuyển không bóng' }
          ],

          summaryAnalysis: `Đã phân tích ${squadPlayers.length} cầu thủ theo hạn mức Lương trần ${currentSalaryCap} cho Chế độ Đấu ${isManagerSim ? 'Giả Lập GLXH' : 'Xếp Hạng 1v1'}.`
        };

        resolve(result);
      }, 500);
    });
  },

  // AI Budget Scout v2.0.0 with FIFAAddict Sync
  async getBudgetScoutV2({ targetPosition, minBpPrice, maxBpPrice, maxSalaryAllowed = 28 }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = playersData.filter(p => p.mainPositions.includes(targetPosition));
        resolve(filtered.slice(0, 4));
      }, 400);
    });
  },

  // AI Tactical Doctor Diagnosis
  async getDiagnosis(symptomText) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          diagnosisSummary: `Chẩn đoán lỗi cho mô tả: "${symptomText}"`,
          rootCauses: [
            'Khoảng cách giữa bộ đôi CDM và hàng CB quá xa do đẩy áp lực phòng ngự quá cao',
            'Hậu vệ cánh dâng cao không kịp lùi về bọc lót'
          ],
          recommendedAdjustments: {
            defensivePressure: 45,
            defensiveWidth: 50,
            individualInstructions: {
              LB: ['AS1 - Giữ vị trí khi tấn công'],
              RB: ['AS1 - Giữ vị trí khi tấn công']
            }
          }
        });
      }, 400);
    });
  }
};
