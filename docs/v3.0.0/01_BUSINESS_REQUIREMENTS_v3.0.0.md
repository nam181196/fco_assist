# [BRD] Tài Liệu Yêu Cầu Nghiệp Vụ - Version 3.0.0
*(Business Requirements Document - FCO Assist v3.0.0)*

## 1. MỤC TIÊU PHIÊN BẢN v3.0.0
Phiên bản **v3.0.0** tập trung giải quyết 3 bài toán lớn về quy tắc thi đấu, tính chân thực của giao diện và trải nghiệm tương tác sơ đồ đội hình:
1. **Ràng buộc Duy nhất 1 Tên Cầu Thủ trong Sơ Đồ Đội Hình (Unique Player Squad Constraint):** Đảm bảo tính thực tế của game FO4/FCO - trong đội hình 11 cầu thủ không thể tồn tại 2 phiên bản mùa giải khác nhau của cùng 1 tên cầu thủ (Ví dụ: Đã dùng CR7 26TY thì không được dùng thêm CR7 CC hay CR7 IPRM).
2. **Cập nhật Vị trí Động khi Kéo thả (Smart Dynamic Position Adaptation):** Khi kéo thả cầu thủ sang khu vực khác trên sân, vị trí hiển thị trên thẻ phải tự động chuyển đổi tương ứng theo tọa độ khu vực (Ví dụ: Kéo cầu thủ gốc ST xuống khu vực thủ môn thì vị trí tự động chuyển thành GK).
3. **Giao diện Thẻ Cầu thủ Chuẩn Game FO4/FCO (Authentic FIFAAddict Card Visuals):** Tích hợp hình ảnh chân dung cầu thủ (Player Avatar) và Logo Mùa giải (Season Badge) từ `vn.fifaaddict.com`, mang lại giao diện thiết kế sống động, chân thực 100% như trong game.

---

## 2. PHẠM VI & YÊU CẦU NGHIỆP VỤ CHI TIẾT (REQUIREMENTS SCOPE)

### BRD-3.1: Quy Tắc Duy Nhất 1 Tên Cầu Thủ (Unique Player Rule)
- **Mô tả:** Đội hình thi đấu chính thức (11 vị trí) chỉ được phép sử dụng duy nhất 1 thẻ bài đại diện cho 1 tên cầu thủ.
- **Quy tắc kiểm tra:**
  - Khi gán cầu thủ vào 1 vị trí trên sân: Hệ thống kiểm tra tên chuẩn hóa (`normalized_name`) của cầu thủ mới với 10 cầu thủ còn lại trên sân.
  - Nếu tên đã tồn tại: Hệ thống chặn hành động gán, hiển thị thông báo toast: *"Cầu thủ '[Tên]' đã có mặt trong đội hình (Thẻ [Mùa])"*.
  - Trong danh sách chọn cầu thủ (Drawer/Modal): Tự động đánh dấu hoặc làm mờ các cầu thủ bị trùng tên với cầu thủ đang có trên sân.

### BRD-3.2: Tự Động Chuyển Vị Trí Theo Tọa Độ Kéo Thả (Smart Position Mapping)
- **Mô tả:** Khi kéo thả cầu thủ tự do trên sân 2D/3D, vị trí thi đấu (`role` / `position`) của cầu thủ tại slot đó phải tự động thích ứng theo vùng tọa độ mới.
- **Ma trận phân vùng tọa độ mặt sân:**
  - **Vùng Y (0% - 20%):** Vùng Tiền đạo ➔ `ST` (Middle), `LW` (Left), `RW` (Right), `CF` (Center-Low).
  - **Vùng Y (20% - 40%):** Vùng Tiền vệ tấn công ➔ `CAM` (Middle), `LM` (Left), `RM` (Right).
  - **Vùng Y (40% - 60%):** Vùng Tiền vệ trung tâm ➔ `CM` / `LCM` / `RCM`.
  - **Vùng Y (60% - 75%):** Vùng Tiền vệ phòng ngự ➔ `CDM` / `LDM` / `RDM`.
  - **Vùng Y (75% - 90%):** Vùng Hậu vệ ➔ `CB` / `LCB` / `RCB`, `LB` (Left), `RB` (Right), `LWB` / `RWB`.
  - **Vùng Y (90% - 100%):** Vùng Vòng cấm Thủ môn ➔ `GK`.

### BRD-3.3: Tích Hợp Hình Ảnh Thẻ Chuẩn Game FO4/FCO từ FIFAAddict
- **Mô tả:** Hiển thị thẻ cầu thủ với hình chân dung thật (Player Avatar) và Logo Mùa giải (Season Logo) thu thập từ `vn.fifaaddict.com`.
- **Thành phần giao diện thẻ mới:**
  - **Ảnh chân dung cầu thủ (Avatar):** `https://fo4.garena.in.th/database/fo4db/assets/players/p{uid}.png` hoặc fallback CDN FIFAAddict.
  - **Logo Mùa giải (Season Badge):** `https://fo4.garena.in.th/database/fo4db/assets/season/{season}.png`.
  - **Khung thẻ Card Frame:** Thiết kế bo góc glassmorphism hiệu ứng phát sáng gradient theo OVR (Tím 120+, Vàng 110+, Xanh 100+).

---

## 3. TIÊU CHÍ NGHIỆM THU VERSION 3.0.0 (ACCEPTANCE CRITERIA)
1. **[AC-3.1]** Thêm CR7 25TY vào ST -> Drawer chọn cầu thủ tự động disable các thẻ CR7 CC, CR7 IPRM, CR7 ICONTM.
2. **[AC-3.2]** Kéo thẻ từ vị trí ST xuống khu vực khung thành GK -> Nhãn vị trí lập tức đổi từ ST thành GK.
3. **[AC-3.3]** Thẻ cầu thủ ở Sân bóng và DB hiển thị hình chân dung chuẩn và logo mùa giải chính xác.
