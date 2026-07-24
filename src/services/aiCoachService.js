// AI Coach Service - Unified Advisor Engine, Real-Time Patch Grounding & Budget Scout
import formationsData from '../data/formations.json';
import metaTacticsData from '../data/meta_tactics.json';
import playersData from '../data/players.json';
import diagnosisRulesData from '../data/diagnosis_rules.json';

export const getUnifiedAICoachRecommendation = async (squadPlayers = [], currentSalaryCap = 300) => {
  // Simulate AI Latency (500ms response)
  await new Promise(resolve => setTimeout(resolve, 500));

  const totalSalary = squadPlayers.reduce((sum, p) => sum + (p ? p.salary : 0), 0);
  const activeCount = squadPlayers.filter(Boolean).length;

  if (totalSalary > currentSalaryCap) {
    throw new Error(`Tổng điểm Lương (${totalSalary} BP) đã vượt quá trần Lương trần ${currentSalaryCap} BP hiện tại!`);
  }

  // AI Inference Logic - Calculate formation compatibility score
  let bestFormation = formationsData[0];
  let highestScore = 85;

  const positionsCount = {};
  squadPlayers.filter(Boolean).forEach(p => {
    p.mainPositions.forEach(pos => {
      positionsCount[pos] = (positionsCount[pos] || 0) + 1;
    });
  });

  if (positionsCount['CDM'] >= 2 || positionsCount['LDM'] || positionsCount['RDM']) {
    bestFormation = formationsData.find(f => f.id === '4-2-3-1') || formationsData[0];
    highestScore = 96;
  } else if (positionsCount['LW'] && positionsCount['RW']) {
    bestFormation = formationsData.find(f => f.id === '4-1-2-3') || formationsData[1];
    highestScore = 92;
  } else if (positionsCount['CB'] >= 3 || positionsCount['LWB']) {
    bestFormation = formationsData.find(f => f.id === '5-2-3') || formationsData[2];
    highestScore = 94;
  }

  const matchingTactic = metaTacticsData.find(t => t.formationId === bestFormation.id) || metaTacticsData[0];

  const managerSkills = [
    { skillName: "Thâm nhập vòng cấm", stars: 3, description: "Tăng tốc độ thâm nhập vòng cấm cho các tiền vệ tấn công CAM/CM" },
    { skillName: "Tốc độ thâm nhập", stars: 3, description: "Tăng khả năng tăng tốc đột biến khi phản công nhanh" },
    { skillName: "Đường chuyền quyết định", stars: 2, description: "Tăng độ chính xác của các đường chọc khe QW/W" }
  ];

  return {
    recommendedFormation: {
      formationId: bestFormation.id,
      name: bestFormation.name,
      compatibilityScore: highestScore
    },
    teamTactic: matchingTactic.teamTactic,
    individualInstructions: matchingTactic.individualInstructions,
    managerSkills,
    summaryAnalysis: `Bộ khung ${activeCount} cầu thủ của bạn có sự đồng bộ rất tốt. Hệ thống đề xuất sơ đồ ${bestFormation.name} để tối ưu hóa khả năng tranh chấp và dứt điểm cứa lòng ZD theo bản Patch Lương trần ${currentSalaryCap} BP hiện tại.`
  };
};

export const getAIBudgetScoutRecommendation = async ({ targetPosition, minBpPrice, maxBpPrice, maxSalaryAllowed }) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  let candidates = [...playersData];

  if (targetPosition && targetPosition !== 'ALL') {
    candidates = candidates.filter(p => p.mainPositions.includes(targetPosition));
  }

  if (maxSalaryAllowed > 0) {
    candidates = candidates.filter(p => p.salary <= maxSalaryAllowed);
  }

  if (minBpPrice > 0 || maxBpPrice > 0) {
    candidates = candidates.filter(p => {
      const minOk = minBpPrice > 0 ? p.bpPriceMax >= minBpPrice : true;
      const maxOk = maxBpPrice > 0 ? p.bpPriceMin <= maxBpPrice : true;
      return minOk && maxOk;
    });
  }

  const top3 = candidates.slice(0, 3).map(p => ({
    ...p,
    scoutReason: `Cầu thủ chuẩn Meta position ${targetPosition}, chân thuận ${p.weakFoot}, thể hình ${p.heightCm}cm rất đầm chắc và nằm đúng khoảng ngân sách BP do bạn thiết lập.`
  }));

  return top3;
};

export const diagnoseTacticsProblem = async (userProblemText) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const lower = userProblemText.toLowerCase();

  const matchedRule = diagnosisRulesData.find(rule =>
    rule.symptomKeywords.some(kw => lower.includes(kw))
  ) || diagnosisRulesData[0];

  return {
    diagnosisSummary: `Hệ thống ghi nhận triệu chứng: ${matchedRule.symptomKeywords.join(', ')}`,
    rootCauses: matchedRule.rootCauses,
    recommendedActions: matchedRule.recommendedActions
  };
};
