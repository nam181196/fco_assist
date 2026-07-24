# ĐẶC TẢ CHỨC NĂNG MODULE (FSD) v2.0.0 - FCO META TACTICS & AI SOLUTION ENGINE

| Thông tin        | Chi tiết                 |
| :--------------- | :----------------------- |
| **Dự án**        | FCO Meta Tactics & AI Solution Engine |
| **Module**       | FCO Core Web Services & AI Coach Console |
| **Phiên bản**    | **2.0.0 (OFFICIAL RELEASE)** |
| **Ngày cập nhật**| 24/07/2026               |
| **Trạng thái**   | APPROVED / READY FOR FE-BE DEVELOPMENT |
| **Tác giả**      | Senior Business Analyst & FE Lead |

---

## LỊCH SỬ THAY ĐỔI

| Version | Ngày | Người sửa | Mô tả thay đổi |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 24/07/2026 | Senior BA & FE Lead | Phiên bản FSD MVP v1.0.0 (APPROVED): Đặc tả 5 chức năng MVP cốt lõi (Meta Library, AI Coach, Squad Management, Player DB & Comparison Side-by-side). |
| 2.0.0 | 24/07/2026 | Senior BA & FE Lead | **Nâng cấp FSD v2.0.0 (APPROVED)**: Đặc tả chi tiết các Function nâng cấp thế hệ v2.0.0: Unified AI Coach Advisor V2 (tích hợp AI Explanation Card & Game Mode Selector), Budget Scout V2 (đồng bộ dữ liệu Live `vn.fifaaddict.com`), Manage User Squads V2 (tọa độ kéo thả X/Y Sơ đồ Độc lạ) và Pitch Canvas 2D/3D Controller. Chuẩn hóa Lương trần 300. |

---

# CÁC CHỨC NĂNG NÂNG CẤP v2.0.0

## [FUNCTION] UnifiedAICoachAdvisorV2
Label: [AICoachService.getUnifiedRecommendationV2]  
API: POST /api/v1/ai-coach/recommend-v2  

---

### [SECTION] Business Description
Chức năng tư vấn AI Coach thế hệ v2.0.0: Tự động phân tích tọa độ kéo thả X/Y của **Sơ đồ Độc lạ**, nhận dạng chế độ đấu (**Xếp Hạng 1v1** vs **Giả Lập GLXH**) và sinh khối **Giải thích Lý do Chiến thuật (AI Tactical Rationale Explanation Engine)** giải thích rõ tại sao lại lựa chọn các chỉ số chiến thuật đó.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng đã xếp ít nhất 1 cầu thủ vào Sân 2D hoặc 3D Perspective.
- Gemini AI API Service sẵn sàng kết nối.

---

### [SECTION] Main Flow
1. Người dùng chọn Chế độ Đấu (`RANKED_1V1` hoặc `MANAGER_SIM`) trên Navbar và tạo Sơ đồ Độc lạ bằng Drag & Drop.
2. Bấm "Nhờ AI Coach Phân Tích & Giải Thích" trên AI Console Panel.
3. Client kiểm tra tổng điểm Lương 11 cầu thủ (`Sum(salary) <= CURRENT_SALARY_CAP`, trần `300`).
4. Đóng gói danh sách cầu thủ (kèm tọa độ `gridX/gridY`), `gameMode` và `currentSalaryCap` (`300`).
5. Gọi bất đồng bộ `AICoachService.getUnifiedRecommendationV2()`.
6. AI Engine phân tích ma trận hình học vị trí tùy biến và áp dụng quy tắc riêng cho chế độ đấu.
7. Trả về kết quả JSON dạng 4 Thẻ cấu trúc (*Card Sơ đồ*, *Card Chỉ số Chiến thuật*, *Card Kỹ năng HLV*, *Card AI Tactical Rationale Explanation*).
8. Render mượt mượt kết quả lên UI Console.

---

### [SECTION] Business Rules
- **BR-GAME-01:** Tổng Lương 11 cầu thủ không được vượt quá `CURRENT_SALARY_CAP` (`300`).
- **BR-MODE-12:** Chế độ Giả Lập GLXH (`MANAGER_SIM`) tự động đẩy Tốc độ lên +15%, Chuyền dài +10% và Tối đa hóa chỉ số Sút xa ZD (+20%).
- **BR-AI-13:** Bắt buộc chứa phần giải thích lý do (*whyThisTactic*) gồm 3 khối: Phân tích hình học sơ đồ, Điểm mạnh cốt lõi và Tactical Rationale.

---

### [SECTION] Side Effects
- **Cache:** Lưu kết quả phân tích AI vào Session Cache theo Hash của tọa độ sơ đồ.

---

### [SECTION] Input

**Request Body (`UnifiedAICoachV2RequestDto`):**
```json
{
  "currentSalaryCap": 300,
  "gameMode": "MANAGER_SIM",
  "squadPlayers": [
    { "slotId": "slot_st", "playerId": "p_shevchenko_icontm", "name": "A. Shevchenko", "position": "ST", "salary": 28, "gridX": 48, "gridY": 15 },
    { "slotId": "slot_cam", "playerId": "p_gullit_icon", "name": "R. Gullit", "position": "CAM", "salary": 28, "gridX": 50, "gridY": 35 }
  ]
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "AI Coach tư vấn và giải thích chiến thuật v2.0.0 thành công",
  "code": 200,
  "data": {
    "recommendedFormation": {
      "name": "Sơ đồ Độc Lạ Tùy Biến (Custom 3-1-3-3)",
      "compatibilityScore": 95
    },
    "whyThisTactic": {
      "geometricAnalysis": "Sơ đồ dị của bạn có 3 tiền đạo cắm dâng cao ép sân và 1 mỏ neo CDM lót tuyến hai...",
      "keyStrengths": ["Khả năng sút xa ZD bùng nổ", "Tốc độ phản công cực nhanh"],
      "tacticalRationale": "Do bạn đang chọn chế độ Đấu Giả Lập GLXH, AI đẩy Tốc độ lên 85 và Chuyên Sút 80 để tối ưu cơ hội ghi bàn tự động."
    },
    "teamTactic": {
      "buildUpSpeed": 85,
      "passingStyle": 65,
      "defensiveWidth": 45,
      "defensivePressure": 75
    },
    "managerSkills": [
      { "skillName": "Sút xa tự động", "stars": 3, "description": "Tăng độ chính xác sút xa ZD trong GLXH" }
    ]
  }
}
```

#### Error Codes
- `400` - Bad Request: Tổng Lương vượt trần `300` hoặc dữ liệu tọa độ không hợp lệ.
- `503` - Service Unavailable: AI Engine quá tải Quota.

---

## [FUNCTION] AIBudgetScoutV2
Label: [AICoachService.getBudgetScoutV2]  
API: POST /api/v1/ai-coach/scout-v2  

---

### [SECTION] Business Description
Chức năng gợi ý cầu thủ hợp ngân sách v2.0.0: Đồng bộ dữ liệu Live từ `vn.fifaaddict.com`, cập nhật các mùa giải hot mới nhất (`ICON TM`, `24TS`, `EU24`, `CU`, `24UCL`) và gắn URL liên kết bài viết chi tiết tại FIFAAddict.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng nhập khoảng giá BP và chọn vị trí thi đấu trên Toolbar.

---

### [SECTION] Main Flow
1. Người dùng chọn vị trí (VD: ST), nhập khoảng giá BP (VD: 10B - 50B).
2. Gọi `AICoachService.getBudgetScoutV2()`.
3. Lọc danh sách cầu thủ mùa mới từ `META_PLAYERS` FIFAAddict Store.
4. Trả về kết quả kèm đường dẫn `fifaAddictUrl` tới `vn.fifaaddict.com`.
5. Render kết quả trên UI Scout Tab.

---

### [SECTION] Business Rules
- **BR-DATA-14:** 100% cầu thủ gợi ý có gắn đường dẫn hợp lệ tới `vn.fifaaddict.com`.

---

### [SECTION] Input

**Request Body (`AIBudgetScoutV2RequestDto`):**
```json
{
  "targetPosition": "ST",
  "minBpPrice": 10000000000,
  "maxBpPrice": 50000000000,
  "maxSalaryAllowed": 28
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "Gợi ý cầu thủ FIFAAddict thành công",
  "code": 200,
  "data": [
    {
      "playerId": "p_shevchenko_icontm",
      "name": "A. Shevchenko",
      "season": "ICON TM",
      "salary": 28,
      "fifaAddictUrl": "https://vn.fifaaddict.com/fo4db/p_shevchenko_icontm",
      "estimatedBpRange": "35B - 45B BP",
      "scoutReason": "Tiền đạo ICON TM chuẩn meta sút ZD hai chân 5-5 dữ liệu mới nhất từ FIFAAddict"
    }
  ]
}
```

---

## [FUNCTION] PitchCanvas2D3DController
Label: [PitchBoardService.togglePerspective]  
API: POST /api/v1/pitch/toggle-view  

---

### [SECTION] Business Description
Chức năng công tắc chuyển đổi góc nhìn Sân bóng: Cho phép người dùng chuyển đổi mượt mượt trong `< 50ms` giữa góc nhìn **Sân 2D (Top-down)** phẳng và **Sân 3D (Perspective View)** nghiêng 42 độ.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Màn hình Sân bóng 2D đã được nạp sẵn.

---

### [SECTION] Main Flow
1. Người dùng click nút `PitchViewToggleBtn` trên góc Sân bóng.
2. Toggle thuộc tính CSS `.perspective-pitch` (`transform: rotateX(42deg)`).
3. Cập nhật State `pitchPerspective` (`"2D"` \| `"3D"`).
4. Phản hồi mượt mượt giao diện trong `< 50ms`.

---

### [SECTION] Input

**Request Body (`PitchToggleViewRequestDto`):**
```json
{
  "targetPerspective": "3D"
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "Chuyển đổi góc nhìn sân 3D Perspective thành công",
  "code": 200,
  "data": {
    "pitchPerspective": "3D",
    "transformCSS": "perspective(1000px) rotateX(42deg)"
  }
}
```

---

# GHI CHÚ

- Tài liệu FSD v2.0.0 này đặc tả chi tiết 100% cho tất cả các Function nâng cấp thế hệ v2.0.0.

---

END OF FSD DOCUMENT v2.0.0
