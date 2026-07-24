import { useState } from 'react';
import { aiCoachService } from '../services/aiCoachService';

export const useAICoach = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [scoutResults, setScoutResults] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const requestUnifiedAdvisor = async (squadPlayers, currentSalaryCap = 300, gameMode = 'RANKED_1V1') => {
    setAiLoading(true);
    setAiError(null);
    try {
      const data = await aiCoachService.getUnifiedRecommendationV2(squadPlayers, currentSalaryCap, gameMode);
      setAiResult(data);
    } catch (err) {
      setAiError('Lỗi kết nối AI Coach: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const requestBudgetScout = async (scoutParams) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const data = await aiCoachService.getBudgetScoutV2(scoutParams);
      setScoutResults(data);
    } catch (err) {
      setAiError('Lỗi AI Budget Scout: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const requestDiagnosis = async (symptomText) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const data = await aiCoachService.getDiagnosis(symptomText);
      setDiagnosisResult(data);
    } catch (err) {
      setAiError('Lỗi AI Diagnosis: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  return {
    aiLoading,
    aiResult,
    scoutResults,
    diagnosisResult,
    aiError,
    requestUnifiedAdvisor,
    requestBudgetScout,
    requestDiagnosis
  };
};
