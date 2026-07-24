# ĐẶC TẢ CHỨC NĂNG MODULE (FSD) v1.0.0 - FCO META TACTICS & AI SOLUTION ENGINE

| Thông tin        | Chi tiết                 |
| :--------------- | :----------------------- |
| **Dự án**        | FCO Meta Tactics & AI Solution Engine |
| **Module**       | FCO Core Web Services & AI Coach Console |
| **Phiên bản**    | **1.0.0 (MVP OFFICIAL)** |
| **Ngày cập nhật**| 24/07/2026               |
| **Trạng thái**   | APPROVED / VERSION 1.0.0 ARCHIVED |
| **Tác giả**      | Senior Business Analyst & FE Lead |

---

## LỊCH SỬ THAY ĐỔI

| Version | Ngày         | Người sửa  | Mô tả thay đổi  |
| :------ | :----------- | :--------- | :-------------- |
| 1.0.0   | 24/07/2026   | Senior BA & FE Lead | **Phiên bản hoàn chỉnh FS v1.0.0 (APPROVED)**: Đặc tả chi tiết các Function cho 4 Modules MVP (Meta Library, AI Coach, Squad Management, Player DB & Comparison Side-by-side) chuẩn 100% template docit |

---

# CÁC CHỨC NĂNG

## [FUNCTION] GetMetaTacticsList
Label: [MetaTacticsService.getMetaTactics]  
API: GET /api/v1/meta-tactics  

---

### [SECTION] Business Description
Chức năng cho phép người dùng tra cứu, tìm kiếm và lọc danh sách các sơ đồ chiến thuật hot meta chuẩn FCO theo loại sơ đồ và trường phái lối chơi (Tiki-taka, Phòng ngự phản công, Tạt cánh, Pressing), đồng thời cung cấp chuỗi mã chiến thuật để copy 1-click.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Hệ thống đã nạp sẵn dữ liệu `FORMATIONS` và `META_TACTICS` từ Static JSON Modules.

---

### [SECTION] Main Flow
1. Người dùng chọn bộ lọc Sơ đồ (như `4-2-3-1`) hoặc Lối chơi (như `Tiki-taka`) trên giao diện Meta Library.
2. Frontend gọi hàm `MetaTacticsService.getMetaTactics(params)`.
3. Validate tham số truyền vào (`formationId`, `playstyle`).
4. Lọc danh sách bộ chiến thuật thỏa mãn tiêu chí từ `META_TACTICS` JSON Store.
5. Map kết quả sang danh sách Thẻ Meta Cards hiển thị giao diện UI (gồm tọa độ 2D sơ đồ, bảng chỉ số 1-99 và lệnh cá nhân).
6. Trả về HTTP 200 kèm danh sách bộ chiến thuật.

---

### [SECTION] Business Rules
- **Dải chỉ số hợp lệ:** Các chỉ số Chiến thuật Đội (Speed, Passing, Width, Depth...) bắt buộc nằm trong dải `[1, 99]`.
- **Sao chép mã:** Khi người dùng bấm nút "Copy Bộ Chiến Thuật", hệ thống xuất chuỗi Markdown sạch sẽ và kích hoạt hiệu ứng Toast Notification trong 2 giây.

---

### [SECTION] Side Effects
- **Cache:** Lưu tạm danh sách kết quả lọc vào In-Memory RAM Cache trên Client-side.

---

### [SECTION] Input

**Query Parameters (`GetMetaTacticsRequestDto`):**
```json
{
  "formationId": "string — Mã sơ đồ (Optional, VD: '4-2-3-1')",
  "playstyle": "string — Trường phái lối chơi (Optional, VD: 'Tiki-taka')"
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "Lấy danh sách chiến thuật meta thành công",
  "code": 200,
  "data": [
    {
      "tacticId": "tac_4231_tikitaka_pro",
      "formationId": "4-2-3-1",
      "title": "4-2-3-1 Kiểm soát bóng Ban bật Trung lộ",
      "playstyle": "Tiki-taka",
      "author": "Top 1 Ranker Meta Patch 2026",
      "teamTactic": {
        "buildUpSpeed": 65,
        "passingStyle": 40,
        "positioning": "Organized",
        "chanceCrossing": 50,
        "chanceShooting": 70,
        "defensivePressure": 55,
        "defensiveAggression": 60,
        "defensiveWidth": 45,
        "defensiveLine": "Cover"
      },
      "individualInstructions": {
        "ST": ["AR1", "SR1"],
        "CAM": ["PF1", "SC1"],
        "LDM": ["AS1", "DB2"],
        "RDM": ["AS1", "DB2"],
        "LB": ["AS1"],
        "RB": ["AS1"]
      }
    }
  ]
}
```

#### Error Codes
- `400` - Bad Request: Tham số query không hợp lệ.
- `500` - Internal Server Error: Lỗi nạp dữ liệu static store.

---

## [FUNCTION] UnifiedAICoachAdvisor
Label: [AICoachService.getUnifiedRecommendation]  
API: POST /api/v1/ai-coach/recommend  

---

### [SECTION] Business Description
Chức năng cốt lõi cho phép phân tích 11 cầu thủ người dùng đã thêm vào Sân bóng 2D theo hạn mức Lương trần hiện tại (`CURRENT_SALARY_CAP = 300`) -> AI Coach tự động tính toán điểm tương thích và đề xuất đồng thời: *Sơ đồ tối ưu nhất + Chiến thuật Đội/Đơn + Kỹ năng HLV*.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng đã thêm ít nhất 1 cầu thủ vào Sân bóng 2D.
- Gemini AI Service API sẵn sàng kết nối.

---

### [SECTION] Main Flow
1. Người dùng bấm "Nhờ AI Coach Tư vấn" trên giao diện Sân bóng 2D.
2. Client kiểm tra tổng điểm Lương 11 cầu thủ (`Sum(Salary) <= CURRENT_SALARY_CAP`).
3. Đóng gói danh sách cầu thủ + `CURRENT_SALARY_CAP` (300) + `current_patch_version`.
4. `PromptGroundingInjector` tiêm bối cảnh Patch/Lương trần vào Prompt Template.
5. Gọi bất đồng bộ `AICoachService.getUnifiedRecommendation()`.
6. AI Engine tính toán `Compatibility_Score = (0.5 * Pos) + (0.3 * Traits) + (0.2 * Foot)`.
7. Trả về kết quả JSON dạng 3 Thẻ cấu trúc (*Card Sơ đồ, Card Chỉ số Chiến thuật, Card Kỹ năng HLV*).
8. Render mượt mượt kết quả lên UI Console.

---

### [SECTION] Business Rules
- **BR-GAME-01:** Tổng Lương 11 cầu thủ không được vượt quá `CURRENT_SALARY_CAP` (`300 BP`).
- **BR-AI-05:** AI Engine luôn được tiêm bối cảnh Lương trần 300 và Patch mới nhất.
- **BR-UI-08:** Kết quả phân tách thành 3 khối Thẻ UI riêng biệt.

---

### [SECTION] Side Effects
- **Cache:** Lưu kết quả tư vấn AI vào Session Cache để tránh gọi lại API khi bộ khung cầu thủ không đổi.

---

### [SECTION] Input

**Request Body (`UnifiedAICoachRequestDto`):**
```json
{
  "currentSalaryCap": 300,
  "squadPlayers": [
    { "slotId": "slot_st", "playerId": "p_shevchenko_24ucl", "name": "A. Shevchenko", "position": "ST", "salary": 28 },
    { "slotId": "slot_cam", "playerId": "p_gullit_icon", "name": "R. Gullit", "position": "CAM", "salary": 28 }
  ]
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "AI Coach tư vấn đội hình thành công",
  "code": 200,
  "data": {
    "recommendedFormation": {
      "formationId": "4-2-3-1",
      "name": "4-2-3-1 Quốc Dân Tối Ưu",
      "compatibilityScore": 96
    },
    "teamTactic": {
      "buildUpSpeed": 68,
      "passingStyle": 45,
      "defensivePressure": 60,
      "defensiveWidth": 50
    },
    "individualInstructions": {
      "ST": ["AR1 - Chạy chỗ xé nách", "SR1 - Xẻ nách"],
      "CAM": ["PF1 - Tự do", "SC1 - Vào vòng cấm khi tạt"]
    },
    "managerSkills": [
      { "skillName": "Thâm nhập vòng cấm", "stars": 3, "description": "Tăng tốc độ xâm nhập cho CAM/ST" },
      { "skillName": "Tốc độ thâm nhập", "stars": 3, "description": "Tăng khả năng tăng tốc khi phản công" }
    ]
  }
}
```

#### Error Codes
- `400` - Bad Request: Tổng điểm Lương vượt quá trần `300 BP` hoặc danh sách cầu thủ không hợp lệ.
- `503` - Service Unavailable: AI API Engine quá tải hoặc hết Quota.

---

## [FUNCTION] AIBudgetScout
Label: [AICoachService.getBudgetScout]  
API: POST /api/v1/ai-coach/scout  

---

### [SECTION] Business Description
Chức năng cho phép người dùng chọn vị trí thi đấu và nhập khoảng giá tiền BP mong muốn -> AI Coach tự động lọc và gợi ý danh sách Top 3 cầu thủ hợp meta nhất vừa túi tiền và không bị quá Lương.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng đã nhập `minBpPrice`, `maxBpPrice` và `targetPosition`.

---

### [SECTION] Main Flow
1. Người dùng nhập khoảng giá BP (VD: 20B - 50B) và chọn vị trí ST trên Toolbar.
2. Client gửi request `AICoachService.getBudgetScout()`.
3. Lọc danh sách cầu thủ có `bpPrice` nằm trong khoảng `[minBpPrice, maxBpPrice]`.
4. AI đánh giá ưu/nhược điểm meta của từng cầu thủ.
5. Trả về danh sách Top 3 cầu thủ phù hợp nhất kèm thông số Lương và đặc tính ẩn.

---

### [SECTION] Business Rules
- **BR-SEARCH-03:** Cầu thủ được trả về phải thỏa mãn `minBpPrice <= Price <= maxBpPrice` và `Salary <= CURRENT_SALARY_CAP`.

---

### [SECTION] Input

**Request Body (`AIBudgetScoutRequestDto`):**
```json
{
  "targetPosition": "ST",
  "minBpPrice": 20000000000,
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
  "message": "Gợi ý cầu thủ theo ngân sách thành công",
  "code": 200,
  "data": [
    {
      "playerId": "p_shevchenko_24ucl",
      "name": "A. Shevchenko",
      "season": "24UCL",
      "salary": 27,
      "heightCm": 183,
      "weakFoot": "5/5",
      "keyMetaTraits": ["Sút xa ZD bá đạo", "Tốc độ xé nách"],
      "estimatedBpPrice": "35B BP",
      "scoutReason": "Tiền đạo cắm chạy chỗ xé nách cực hay, hai chân 5-5 chuẩn meta trong tầm tiền 35B"
    }
  ]
}
```

---

## [FUNCTION] ManageUserSquads
Label: [SquadService.manageSquad]  
API: POST /api/v1/squads/manage  

---

### [SECTION] Business Description
Chức năng cho phép người dùng thực hiện các thao tác Quản lý Đội hình cá nhân (CRUD): Lưu đội hình hiện tại, Đổi tên đội hình, Nhân bản bản sao (Duplicate) và Xóa đội hình không sử dụng. Dữ liệu được bảo tồn trong Browser LocalStorage.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng đã xếp ít nhất 1 cầu thủ vào Sân bóng 2D.

---

### [SECTION] Main Flow
1. Người dùng chọn thao tác (Save / Rename / Duplicate / Delete) trên Squad Action Toolbar.
2. Validate hành động:
   - *Save:* Tổng Lương <= 300, 11 cầu thủ không trùng tên.
   - *Rename:* Tên không rỗng, không quá 50 ký tự.
   - *Duplicate:* Thêm tiền tố `"Bản sao của [Tên_Cũ]"`.
3. Ghi dữ liệu vào Browser LocalStorage (`key: "fco_user_squads"`).
4. Trả về thông báo thành công và cập nhật danh sách Squad Grid UI.

---

### [SECTION] Business Rules
- **BR-SQUAD-10:** Mỗi người dùng được lưu trữ tối đa 10 đội hình trong LocalStorage.
- **BR-UI-07:** Nếu tổng Lương > 300, vô hiệu hóa (disable) nút Lưu Đội Hình.

---

### [SECTION] Input

**Request Body (`ManageSquadRequestDto`):**
```json
{
  "action": "DUPLICATE",
  "squadId": "sq_123456",
  "newSquadName": "Bản sao của Đội hình Cày Rank 4-2-3-1"
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "Nhân bản đội hình thành công",
  "code": 200,
  "data": {
    "squadId": "sq_789012",
    "squadName": "Bản sao của Đội hình Cày Rank 4-2-3-1",
    "formationId": "4-2-3-1",
    "totalSalary": 295,
    "createdAt": 1784803200000
  }
}
```

---

## [FUNCTION] ComparePlayersSideBySide
Label: [PlayerService.comparePlayers]  
API: POST /api/v1/players/compare  

---

### [SECTION] Business Description
Chức năng cho phép người dùng chọn 2 đến 3 cầu thủ để hiển thị Cửa sổ Modal so sánh đối đầu Side-by-Side các cột chỉ số, thể hình, chân thuận, mức Lương và giá BP dự kiến.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng đã tích chọn từ 2 đến 3 cầu thủ trong danh sách Player DB.

---

### [SECTION] Main Flow
1. Người dùng tích chọn 2-3 cầu thủ trên Player DB View -> Bấm "So sánh Đối đầu".
2. Client gửi request `PlayerService.comparePlayers(playerIds)`.
3. Lấy dữ liệu chi tiết của các cầu thủ từ `META_PLAYERS` JSON Store.
4. Trả về ma trận so sánh các thuộc tính.
5. Mở Modal hiển thị các cột so sánh song song Side-by-Side.

---

### [SECTION] Input

**Request Body (`ComparePlayersRequestDto`):**
```json
{
  "playerIds": ["p_gullit_icon", "p_shevchenko_24ucl"]
}
```

---

### [SECTION] Output

#### 200 - Thành công
```json
{
  "status": 1,
  "message": "So sánh cầu thủ thành công",
  "code": 200,
  "data": {
    "comparisonMatrix": [
      { "attribute": "Tên cầu thủ", "player1": "Ruud Gullit", "player2": "A. Shevchenko" },
      { "attribute": "Mức Lương", "player1": 28, "player2": 27 },
      { "attribute": "Chiều cao / Cân nặng", "player1": "191 cm / 88 kg", "player2": "183 cm / 78 kg" },
      { "attribute": "Kỹ năng Chân", "player1": "5/5 (Hai chân như một)", "player2": "5/5 (Hai chân như một)" },
      { "attribute": "Đặc tính Meta", "player1": "Sút xa ZD, Thể chất, Tranh chấp", "player2": "Chạy chỗ xé nách, Sút ZD" }
    ]
  }
}
```

---

# GHI CHÚ

- Tài liệu FSD v1.0.0 này là đặc tả chi tiết 100% cho 5 Chức năng cốt lõi của Version 1.0.0 MVP.

---

END OF FSD DOCUMENT v1.0.0
