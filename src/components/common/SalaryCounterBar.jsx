import React from 'react';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const SalaryCounterBar = ({ totalSalary = 0, currentSalaryCap = 300, isExceeded = false }) => {
  const percent = Math.min(100, Math.round((totalSalary / currentSalaryCap) * 100));

  return (
    <div
      className={`glass-panel ${isExceeded ? 'salary-bar-alert' : 'salary-bar-ok'}`}
      style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isExceeded ? (
          <AlertTriangle size={22} color="var(--salary-alert)" />
        ) : (
          <CheckCircle size={22} color="var(--salary-ok)" />
        )}
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>TRẦN LƯƠNG ĐỘNG (DYNAMIC SALARY CAP):</span>
            <span style={{ color: isExceeded ? 'var(--salary-alert)' : 'var(--accent-gold)', fontSize: '1rem' }}>
              {totalSalary} / {currentSalaryCap} BP
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.85 }}>
            {isExceeded
              ? `⚠️ CẢNH BÁO: Đội hình đã vượt quá trần Lương ${totalSalary - currentSalaryCap} BP! Vui lòng hạ Lương cầu thủ để thi đấu.`
              : `✓ Đội hình hợp lệ. Còn trống ${currentSalaryCap - totalSalary} BP Lương.`}
          </p>
        </div>
      </div>

      {/* Progress Meter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '200px' }}>
        <div style={{
          flex: 1,
          height: '10px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '5px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{
            height: '100%',
            width: `${percent}%`,
            background: isExceeded ? 'var(--salary-alert)' : 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)',
            borderRadius: '5px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{percent}%</span>
      </div>
    </div>
  );
};
