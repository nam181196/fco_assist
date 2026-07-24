import React, { useState } from 'react';
import { Sparkles, Bot, ShieldCheck, Copy, Check, Search, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAICoach } from '../../hooks/useAICoach';

export const AICoachConsoleView = ({ slotMap, systemConfig, assignPlayerToSlot, setSelectedFormationId }) => {
  const {
    aiLoading,
    aiResult,
    scoutResults,
    diagnosisResult,
    aiError,
    requestUnifiedAdvisor,
    requestBudgetScout,
    requestDiagnosis
  } = useAICoach();

  const [activeTab, setActiveTab] = useState('unified'); // 'unified' | 'scout' | 'diagnosis'
  const [copied, setCopied] = useState(false);

  // Scout inputs
  const [scoutPos, setScoutPos] = useState('ST');
  const [minBp, setMinBp] = useState(10000000000);
  const [maxBp, setMaxBp] = useState(50000000000);

  // Diagnosis input
  const [problemText, setProblemText] = useState('');

  const handleRunUnifiedCoach = () => {
    const playersList = Object.values(slotMap).filter(Boolean);
    requestUnifiedAdvisor(playersList, systemConfig.CURRENT_SALARY_CAP);
  };

  const handleRunScout = () => {
    requestBudgetScout({
      targetPosition: scoutPos,
      minBpPrice: minBp,
      maxBpPrice: maxBp,
      maxSalaryAllowed: 28
    });
  };

  const handleRunDiagnosis = () => {
    if (!problemText.trim()) return;
    requestDiagnosis(problemText);
  };

  const handleCopyTactic = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>

      {/* Left Navigation Console Menu */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Bot size={28} color="var(--accent-gold)" />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>FCO AI COACH CONSOLE</h3>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Chuyên Gia Chiến Thuật & Trợ Lý AI Real-Time</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('unified')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'unified' ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
              color: activeTab === 'unified' ? '#000' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={18} /> Tư Vấn Trọn Bộ Đội Hình
          </button>

          <button
            onClick={() => setActiveTab('scout')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'scout' ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
              color: activeTab === 'scout' ? '#000' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Search size={18} /> AI Budget Scout (Tìm Cầu Thủ)
          </button>

          <button
            onClick={() => setActiveTab('diagnosis')}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'diagnosis' ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
              color: activeTab === 'diagnosis' ? '#000' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.85rem',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <HelpCircle size={18} /> AI Tactical Doctor (Bắt Bệnh)
          </button>
        </div>
      </div>

      {/* Right Result Display Area */}
      <div className="glass-panel" style={{ padding: '24px' }}>

        {/* Tab 1: Unified Advisor */}
        {activeTab === 'unified' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>TƯ VẤN SƠ ĐỒ - CHIẾN THUẬT - KỸ NĂNG HLV</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI phân tích ma trận cầu thủ đầu vào để đề xuất trọn gói chuẩn Meta Lương {systemConfig.CURRENT_SALARY_CAP} BP</p>
              </div>
              <button
                onClick={handleRunUnifiedCoach}
                disabled={aiLoading}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--accent-gold)',
                  color: '#000',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {aiLoading ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
                <span>{aiLoading ? 'AI Đang Phân Tích...' : 'Nhờ AI Coach Phân Tích'}</span>
              </button>
            </div>

            {aiError && (
              <div style={{ padding: '12px', background: 'rgba(239,68,68,0.15)', border: '1px solid var(--salary-alert)', borderRadius: '8px', color: 'var(--salary-alert)' }}>
                {aiError}
              </div>
            )}

            {aiResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Card 1: Formation Recommendation */}
                <div className="glass-card" style={{ padding: '16px', borderColor: 'var(--accent-gold)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={24} color="var(--accent-gold)" />
                      <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>SƠ ĐỒ ĐỀ XUẤT #1: {aiResult.recommendedFormation.name}</h3>
                    </div>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', background: '#10b981', color: '#000', fontWeight: 800, fontSize: '0.8rem' }}>
                      Độ tương thích {aiResult.recommendedFormation.compatibilityScore}%
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{aiResult.summaryAnalysis}</p>
                </div>

                {/* Card 2: Team Tactics Sliders & Individual Instructions */}
                <div className="glass-card" style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px', color: 'var(--accent-gold)' }}>
                    BẢNG THÔNG SỐ CHIẾN THUẬT ĐỘI (TEAM TACTICS)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tốc độ lối chơi:</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{aiResult.teamTactic.buildUpSpeed} / 99</div>
                    </div>
                    <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Chuyền bóng:</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{aiResult.teamTactic.passingStyle} / 99</div>
                    </div>
                    <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Độ rộng phòng ngự:</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{aiResult.teamTactic.defensiveWidth} / 99</div>
                    </div>
                    <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Áp lực phòng ngự:</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{aiResult.teamTactic.defensivePressure} / 99</div>
                    </div>
                  </div>

                  <h5 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '8px' }}>LỆNH ĐƠN CÁ NHÂN (INDIVIDUAL INSTRUCTIONS):</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {Object.entries(aiResult.individualInstructions).map(([pos, instructions]) => (
                      <div key={pos} style={{ fontSize: '0.8rem', background: 'var(--bg-tertiary)', padding: '6px 10px', borderRadius: '6px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>[{pos}]:</span> {instructions.join(' • ')}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3: Manager Skills Recommendation */}
                <div className="glass-card" style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '12px', color: 'var(--accent-gold)' }}>
                    BỘ KỸ NĂNG HLV (MANAGER SKILLS) TỐI ƯU
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {aiResult.managerSkills.map((skill, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{skill.skillName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.description}</div>
                        </div>
                        <span style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>{'★'.repeat(skill.stars)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setSelectedFormationId(aiResult.recommendedFormation.formationId)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'var(--accent-gold)',
                      color: '#000',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ArrowRight size={16} /> Áp Dụng Sơ Đồ Vào Sân 2D
                  </button>

                  <button
                    onClick={() => handleCopyTactic(JSON.stringify(aiResult, null, 2))}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-main)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    <span>{copied ? 'Đã Copy mã!' : 'Copy Toàn Bộ Chỉ Số AI'}</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Tab 2: Budget Scout */}
        {activeTab === 'scout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI BUDGET SCOUT - TÌM CẦU THỦ THEO NGÂN SÁCH</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gợi ý Top cầu thủ ngon-bổ-rẻ hợp meta trong tầm tiền BP</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VỊ TRÍ CẦN MUA:</label>
                <select
                  value={scoutPos}
                  onChange={(e) => setScoutPos(e.target.value)}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                >
                  <option value="ST">ST - Tiền đạo cắm</option>
                  <option value="CAM">CAM - Tiền vệ tấn công</option>
                  <option value="LW">LW - Tiền đạo cánh trái</option>
                  <option value="RW">RW - Tiền đạo cánh phải</option>
                  <option value="CDM">CDM - Tiền vệ mỏ neo</option>
                  <option value="CB">CB - Trung vệ</option>
                  <option value="LB">LB - Hậu vệ cánh trái</option>
                  <option value="RB">RB - Hậu vệ cánh phải</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GIÁ BP MIN:</label>
                <input
                  type="number"
                  value={minBp}
                  onChange={(e) => setMinBp(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GIÁ BP MAX:</label>
                <input
                  type="number"
                  value={maxBp}
                  onChange={(e) => setMaxBp(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
                />
              </div>

              <button
                onClick={handleRunScout}
                style={{ padding: '8px 16px', background: 'var(--accent-gold)', border: 'none', color: '#000', fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
              >
                Tìm Kiếm
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scoutResults.map(p => (
                <div key={p.id} className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{p.name} <span style={{ color: 'var(--accent-gold)' }}>[{p.season}]</span></div>
                    <span style={{ fontWeight: 800, color: '#10b981' }}>Lương {p.salary} • {p.estimatedBpRange}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{p.scoutReason}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Đặc tính: {p.keyMetaTraits.join(' • ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Tactical Doctor */}
        {activeTab === 'diagnosis' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI TACTICAL DOCTOR - BẮT BỆNH LỖI CHIẾN THUẬT</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mô tả lỗi thi đấu để AI chẩn đoán nguyên nhân và đưa ra giải pháp sửa chỉ số</p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Ví dụ: Tôi đá 4-2-3-1 hay bị hở cánh khi bị đối thủ phản công..."
                style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '8px' }}
              />
              <button
                onClick={handleRunDiagnosis}
                style={{ padding: '12px 20px', background: 'var(--accent-gold)', border: 'none', color: '#000', fontWeight: 800, borderRadius: '8px', cursor: 'pointer' }}
              >
                Chẩn Đoán
              </button>
            </div>

            {diagnosisResult && (
              <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>📌 KẾT QUẢ CHẨN ĐOÁN:</h3>
                <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{diagnosisResult.diagnosisSummary}</p>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--salary-alert)', marginBottom: '6px' }}>NGUYÊN NHÂN GÂY LỖI IN-GAME:</h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {diagnosisResult.rootCauses.map((cause, idx) => (
                      <li key={idx}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981', marginBottom: '6px' }}>KHUYẾN NGHỊ ĐIỀU CHỈNH CHỈ SỐ SỬA LỖI:</h4>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                    <div>• Độ rộng phòng ngự: chỉnh lên {diagnosisResult.recommendedActions.teamTacticAdjustments.defensiveWidth}</div>
                    <div>• Lệnh cá nhân LB/RB: {diagnosisResult.recommendedActions.individualInstructionAdjustments.LB_RB || diagnosisResult.recommendedActions.individualInstructionAdjustments.LB}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
