import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { SalaryCounterBar } from './components/common/SalaryCounterBar';
import { PitchBoardView } from './components/PitchBoard/PitchBoardView';
import { AICoachConsoleView } from './components/AICoach/AICoachConsoleView';
import { SquadManagerView } from './components/SquadManager/SquadManagerView';
import { PlayerDBView } from './components/PlayerDB/PlayerDBView';
import { MetaLibraryView } from './components/MetaLibrary/MetaLibraryView';
import { useSquadStore } from './hooks/useSquadStore';
import './styles/theme.css';

export function App() {
  const [activeTab, setActiveTab] = useState('pitch'); // 'pitch' | 'aicoach' | 'squads' | 'playerdb' | 'meta'

  const {
    systemConfig,
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
  } = useSquadStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Container */}
      <main style={{ flex: 1, padding: '0 24px 32px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Dynamic Salary Counter Bar */}
        <SalaryCounterBar
          totalSalary={totalSalary}
          currentSalaryCap={systemConfig.CURRENT_SALARY_CAP}
          isExceeded={isSalaryExceeded}
        />

        {/* Tab 1: Pitch Board 2D */}
        {activeTab === 'pitch' && (
          <PitchBoardView
            currentFormation={currentFormation}
            selectedFormationId={selectedFormationId}
            setSelectedFormationId={setSelectedFormationId}
            slotMap={slotMap}
            assignPlayerToSlot={assignPlayerToSlot}
            removePlayerFromSlot={removePlayerFromSlot}
            squadName={squadName}
            setSquadName={setSquadName}
            handleSaveSquad={handleSaveSquad}
            totalSalary={totalSalary}
            isSalaryExceeded={isSalaryExceeded}
            systemConfig={systemConfig}
          />
        )}

        {/* Tab 2: AI Coach Console */}
        {activeTab === 'aicoach' && (
          <AICoachConsoleView
            slotMap={slotMap}
            systemConfig={systemConfig}
            assignPlayerToSlot={assignPlayerToSlot}
            setSelectedFormationId={setSelectedFormationId}
          />
        )}

        {/* Tab 3: Player Database & Comparison Side-by-Side */}
        {activeTab === 'playerdb' && (
          <PlayerDBView />
        )}

        {/* Tab 4: Meta Library */}
        {activeTab === 'meta' && (
          <MetaLibraryView
            setSelectedFormationId={setSelectedFormationId}
            setActiveTab={setActiveTab}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        FCO Meta Tactics & AI Solution Engine v1.0.0 (APPROVED) • Lương trần hiện tại: {systemConfig.CURRENT_SALARY_CAP} BP
      </footer>

    </div>
  );
}

export default App;
