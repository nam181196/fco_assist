import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const SalaryCounterBar = ({ totalSalary, currentSalaryCap = 300, isExceeded }) => {
  const percentage = Math.min(100, Math.round((totalSalary / currentSalaryCap) * 100));

  return (
    <div className={`glass-panel ${isExceeded ? 'salary-warning-flash' : ''}`} style={{
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      borderColor: isExceeded ? 'var(--salary-alert)' : 'var(--glass-border)'
    }}>
      
      {/* Icon Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: isExceeded ? 'var(--salary-alert)' : 'var(--accent-gold)'
      }}>
        {isExceeded ? <ShieldAlert size={28} className="shake" /> : <ShieldCheck size={28} />}
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>
            HẠN MỨC LƯƠNG TRẦN SYSTEM
          </span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isExceeded ? 'var(--salary-alert)' : 'var(--text-main)' }}>
            {totalSalary} / {currentSalaryCap}
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '6px' }}>
              (Lương trần FCO)
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
          <span>Tiến độ Lương đội hình</span>
          <span style={{ color: isExceeded ? 'var(--salary-alert)' : 'var(--accent-gold)' }}>
            {percentage}% {isExceeded ? '• BỊ QUÁ LƯƠNG TRẦN!' : '• HỢP LỆ'}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          background: 'var(--bg-tertiary)',
          borderRadius: '5px',
          overflow: 'hidden',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            background: isExceeded
              ? 'linear-gradient(90deg, #ef4444, #dc2626)'
              : 'linear-gradient(90deg, #3b82f6, var(--accent-gold))',
            borderRadius: '5px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Warning Toast Message */}
      {isExceeded && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid var(--salary-alert)',
          color: 'var(--salary-alert)',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>
          ⚠️ CẢNH BÁO QUÁ LƯƠNG TRẦN! Hãy giảm cầu thủ để lưu đội hình.
        </div>
      )}

    </div>
  );
};
