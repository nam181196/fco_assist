# ĐẶC TẢ CHỨC NĂNG MODULE (FSD) v3.0.0 - FCO META TACTICS & AI SOLUTION ENGINE

| Thông tin        | Chi tiết                 |
| :--------------- | :----------------------- |
| **Dự án**        | FCO Meta Tactics & AI Solution Engine |
| **Module**       | FCO Core Web Services & AI Coach Console |
| **Phiên bản**    | **3.0.0 (PROPOSED DRAFT)** |
| **Ngày cập nhật**| 25/07/2026               |
| **Trạng thái**   | DRAFT / PENDING USER APPROVAL |
| **Tác giả**      | Senior Business Analyst & FE Lead |

---

## LỊCH SỬ THAY ĐỔI

| Version | Ngày | Người sửa | Mô tả thay đổi |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 24/07/2026 | Senior BA & FE Lead | Phiên bản FSD MVP v1.0.0 (APPROVED): Đặc tả 5 chức năng MVP cốt lõi (Meta Library, AI Coach, Squad Management, Player DB & Comparison Side-by-side). |
| 2.0.0 | 24/07/2026 | Senior BA & FE Lead | Nâng cấp FSD v2.0.0 (APPROVED): Unified AI Coach Advisor V2, Budget Scout V2 (2,306 thẻ), Drag & Drop Sơ đồ Độc lạ, Pitch Canvas 2D/3D Controller. Chuẩn hóa Lương số. |
| 3.0.0 | 25/07/2026 | Senior BA & FE Lead | **Đề xuất FSD v3.0.0 (DRAFT FOR REVIEW)**: Đặc tả chi tiết 3 Chức năng thế hệ v3.0.0: `UniquePlayerSquadRuleValidator` (Ràng buộc 1 tên cầu thủ duy nhất), `SmartPitchPositionMapperEngine` (Thích ứng 27 mã vị trí FO4 chuyên sâu: `SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`...) và `FIFAAddictInGameCardVisualsRenderer` (Render chân dung cầu thủ & logo mùa giải chuẩn game). |

---

# CÁC CHỨC NĂNG NÂNG CẤP v3.0.0

## [FUNCTION 1] UniquePlayerSquadRuleValidator
Label: [useSquadStore.validateUniquePlayer]  
API: Internal State Service  

---

### [SECTION] Business Description
Chức năng kiểm soát và đảm bảo tính hợp lệ của đội hình theo luật game FO4/FCO: 11 vị trí thi đấu chính thức chỉ được sử dụng duy nhất 1 bản thể đại diện cho 1 tên cầu thủ.

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Preconditions
- Người dùng mở Drawer chọn cầu thủ hoặc thực hiện kéo thả cầu thủ từ ngoài vào sân bóng 2D/3D.

---

### [SECTION] Main Flow
1. Người dùng bấm vào 1 vị trí trên sân hoặc kéo thả cầu thủ mới vào sân.
2. Hệ thống bóc tách tên cầu thủ chuẩn hóa `candidatePlayer.normalizedName`.
3. Hệ thống quét danh sách 10 cầu thủ đang có trên 10 vị trí còn lại trên sân.
4. **Nếu tìm thấy trùng tên:**
   - Trong Drawer: Tự động chuyển thẻ bị trùng tên sang trạng thái `Disabled` (Mờ 50% + Badge *"Đã có bản thể [Mùa] trên sân"*).
   - Khi kéo thả: Hủy thao tác gán và hiển thị Toast cảnh báo màu cam: *"Cầu thủ '[Tên]' đã có mặt trong đội hình (Thẻ [Mùa])"*.
5. **Nếu không trùng tên:** Cho phép chọn/gán cầu thủ vào sơ đồ bình thường.

---

### [SECTION] Business Rules
- **BR-RULE-31:** Một đội hình 11 cầu thủ chính thức tuyệt đối không được chứa 2 thẻ bài có cùng tên cầu thủ (ví dụ không cho xếp `CR7 26TY` cùng `CR7 CC` hay `CR7 IPRM`).

---

## [FUNCTION 2] SmartPitchPositionMapperEngine
Label: [PitchBoardView.onDragEndMapper]  
API: Internal Geometry Service  

---

### [SECTION] Business Description
Engine tính toán và tự động quy đổi tọa độ thả thẻ `(gridX %, gridY %)` thành mã vị trí thi đấu chuẩn của FO4/FCO bao gồm trọn bộ 27 vị trí chuyên sâu (`GK`, `SW`, `CB`, `LCB`, `RCB`, `LB`, `RB`, `LWB`, `RWB`, `CDM`, `LDM`, `RDM`, `CM`, `LCM`, `RCM`, `CAM`, `LAM`, `RAM`, `LM`, `RM`, `ST`, `LS`, `RS`, `CF`, `LF`, `RF`, `LW`, `RW`).

---

### [SECTION] Actor
- Game thủ FCO (All Users)

---

### [SECTION] Main Flow
1. Người dùng kéo và thả thẻ cầu thủ tại vị trí bất kỳ trên mặt sân 2D hoặc 3D Perspective.
2. Sự kiện `onDragEnd` ghi nhận tọa độ phần trăm `(gridX %, gridY %)`.
3. Gọi hàm `calculatePositionFromCoords(gridX, gridY)`:
   - Phân vùng $Y \ge 88\% \rightarrow$ `GK`.
   - Phân vùng $80\% \le Y < 88\%$ và trung lộ $\rightarrow$ Thòng (`SW`).
   - Phân vùng Hậu vệ dâng cao $\rightarrow$ `LWB`, `LB`, `LCB`, `CB`, `RCB`, `RB`, `RWB`.
   - Phân vùng Tiền vệ phòng ngự $\rightarrow$ `LDM`, `CDM`, `RDM`.
   - Phân vùng Tiền vệ trung tâm $\rightarrow$ `LCM`, `CM`, `RCM`.
   - Phân vùng Tiền vệ tấn công / Cánh $\rightarrow$ `LM`, `LAM`, `CAM`, `RAM`, `RM`.
   - Phân vùng Tiền đạo $\rightarrow$ `LW`, `LF`, `LS`, `ST`, `RS`, `RF`, `RW`.
4. Cập nhật nhãn vị trí hiển thị trên thẻ và role của slot tức thì trong `< 16ms`.

---

### [SECTION] Business Rules
- **BR-POS-32:** Tọa độ thả thẻ phải được quy đổi mượt mà thành đúng 1 trong 27 mã vị trí chuyên sâu của FO4, không giữ nguyên mã vị trí cũ nếu đã bị kéo sang vùng sân khác.

---

## [FUNCTION 3] FIFAAddictInGameCardVisualsRenderer
Label: [PlayerCardComponent.renderVisuals]  
API: External FIFAAddict CDN  

---

### [SECTION] Business Description
Chức năng hiển thị thẻ cầu thủ độc bản chuẩn game 100%: Tích hợp ảnh chân dung cầu thủ (Player Avatar) và Logo Mùa giải (Season Badge Logo) từ `vn.fifaaddict.com` trên các giao diện Sân bóng, Player DB và Modal So sánh Side-by-side.

---

### [SECTION] Main Flow
1. Component render thông tin thẻ cầu thủ.
2. Tải ảnh chân dung từ `https://vn.fifaaddict.com/fo4db/assets/players/p{uid}.png`.
3. Tải logo mùa giải từ `https://vn.fifaaddict.com/fo4db/assets/season/{season}.png`.
4. Hiển thị nhãn OVR gradient, Mức Lương số (không có chữ BP) và Tên cầu thủ kèm nhãn vị trí mới.
5. Nếu ảnh bị lỗi 404: Render ảnh bóng người silhouette và badge tên mùa màu vàng kim.

---

### [SECTION] Business Rules
- **BR-CARD-33:** Lương cầu thủ chỉ hiển thị dạng số nguyên (không kèm từ "BP"). Thẻ phải hiển thị sinh động chân dung và logo mùa giải chính hãng.
