import { useState } from 'react';
import { getUnifiedAICoachRecommendation, getAIBudgetScoutRecommendation, diagnoseTacticsProblem } from '../services/aiCoachService';

export const useAICoach = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [scoutResults, setScoutResults] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const requestUnifiedAdvisor = async (squadPlayers, currentSalaryCap) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await getUnifiedAICoachRecommendation(squadPlayers, currentSalaryCap);
      setAiResult(res);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const requestBudgetScout = async (scoutParams) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await getAIBudgetScoutRecommendation(scoutParams);
      setScoutResults(res);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const requestDiagnosis = async (problemText) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await diagnoseTacticsProblem(problemText);
      setDiagnosisResult(res);
    } catch (err) {
      setAiError(err.message);
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
