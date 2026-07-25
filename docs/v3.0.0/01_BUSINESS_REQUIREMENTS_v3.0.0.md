# TÀI LIỆU YÊU CẦU NGHIỆP VỤ (BRD) v3.0.0 - FCO META TACTICS & AI SOLUTION ENGINE

| Thông tin        | Chi tiết                 |
| :--------------- | :----------------------- |
| **Dự án**        | FCO Meta Tactics & AI Solution Engine |
| **Phiên bản**    | **3.0.0 (PROPOSED DRAFT - REVISED)** |
| **Ngày cập nhật**| 25/07/2026               |
| **Trạng thái**   | DRAFT / PENDING USER APPROVAL |
| **Tác giả**      | Senior Business Analyst (BA) & Project Manager (PM) |

---

## LỊCH SỬ THAY ĐỔI

| Version | Ngày | Người sửa | Mô tả thay đổi |
| :--- | :--- | :--- | :--- |
| 1.0.0 | 24/07/2026 | Senior BA & PM | Phiên bản MVP v1.0.0 (APPROVED): Tích hợp Vision, Personas, Use Cases, Lương trần FCO 300+, Dynamic Salary Cap, Real-time AI Auto-Grounding, Dual Theme (Dark/Light Mode), Frontend UI/UX Business Rules. |
| 2.0.0 | 24/07/2026 | Senior BA & PM | Nâng cấp v2.0.0 (APPROVED): Đồng bộ 2,306 thẻ chuẩn FIFAAddict, Kéo thả vị trí Sơ đồ Độc lạ, Sân bóng 2D/3D, Chế độ Đấu 1v1 vs Giả Lập GLXH & AI Engine Giải thích Lý do Chiến thuật. Chuẩn hóa Lương số. |
| 3.0.0 | 25/07/2026 | Senior BA & PM | **Bổ sung & Nâng cấp v3.0.0 (REVISED DRAFT)**: Ràng buộc Duy nhất 1 Tên Cầu thủ trên Sơ đồ Đội hình (Unique Player Squad Rule), Tự động Cập nhật Vị trí Động mở rộng đầy đủ các vị trí dị (`SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`), Tích hợp Ảnh chân dung & Logo Mùa giải Chuẩn Game từ `vn.fifaaddict.com`. |

---

## 1. TỔNG QUAN DỰ ÁN (v3.0.0)

Dự án ứng dụng Web hỗ trợ game thủ **FC Online (FCO)** xây dựng đội hình, quản lý squad và tối ưu chiến thuật thông minh nhằm nâng cao hiệu suất thi đấu. Trở thành Nền tảng Trợ lý AI và Tra cứu Chiến thuật Số 1 cho game thủ FCO tại Việt Nam và quốc tế.

- **Mục đích (v3.0.0):** 
  1. **Nâng cao tính thực tế của quy tắc xếp đội hình:** Đảm bảo 1 đội hình thi đấu chính thức (11 vị trí) chỉ sử dụng **1 phiên bản duy nhất của 1 tên cầu thủ** (Ví dụ: Đã chọn `Cristiano Ronaldo [26TY]` ở ST thì không được chọn thêm `Cristiano Ronaldo [CC]` hay `Cristiano Ronaldo [IPRM]` ở các vị trí khác trên sân).
  2. **Cập nhật Vị trí Động Nâng Cao (Smart Pitch Position Adaptation - Expanded Roles):** Bổ sung trọn bộ các vị trí thi đấu chuyên sâu & độc dị của FO4/FCO bao gồm: **Thòng (`SW`)**, **Hậu vệ cánh dâng cao (`LWB`, `RWB`)**, **Tiền vệ tấn công lệch cánh (`LAM`, `RAM`)**, **Tiền đạo lệch (`LF`, `RF`)**, **Tiền đạo cặp (`LS`, `RS`)**. Vị trí trên thẻ tự động chuyển đổi chuẩn xác theo tọa độ mặt sân `(gridX %, gridY %)`.
  3. **Visual Thẻ Cầu Thủ Chuẩn Game 100%:** Hiển thị thẻ cầu thủ với hình chân dung thật (Player Avatar) và Logo Mùa giải (Season Badge Logo) thu thập chuẩn từ `vn.fifaaddict.com`.

- **Giá trị nghiệp vụ:** 
  - **Tuân thủ Luật Đội hình Game:** Loại bỏ triệt để sơ hở xếp trùng lặp tên cầu thủ, giúp sơ đồ xuất ra hoàn toàn hợp lệ để sử dụng trực tiếp trong game FO4/FCO.
  - **Hỗ trợ Sơ đồ Độc Dị Chuyên Sâu (Advanced Tactical Formations):** Phủ sóng trọn bộ vị trí thi đấu chuyên sâu (`SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`), giúp game thủ xây dựng mọi biến tấu sơ đồ đỉnh cao (4-2-2-2 kép, 3-5-2 dạt biên, 5-3-2 thòng SW...).
  - **Giao diện Đẳng cấp Chuẩn Game (In-Game Aesthetic):** Mang lại trải nghiệm thị giác sống động với hình ảnh chân dung và logo mùa giải chính hãng.

- **Đối tượng người dùng (Personas v3.0.0):** 
  - *Persona 1 - Minh (Rank Pusher - 24 tuổi):* Cần xếp đội hình chuẩn 100% luật game không bị trùng tên cầu thủ giữa các mùa giải khác nhau.
  - *Persona 2 - Nam (Tactics Innovator - 22 tuổi):* Thích kéo thả cầu thủ biến tấu trên sân và muốn nhãn vị trí hiển thị chuẩn tới từng vị trí dị như `SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LS`, `RS`.
  - *Persona 3 - Hoàng (Visual Enthusiast - 28 tuổi):* Đề cao thẩm mỹ giao diện, muốn thẻ cầu thủ phải có đầy đủ hình chân dung và logo mùa giải chuẩn như trong game.

---

## 2. VẤN ĐỀ & CƠ HỘI (PROBLEMS & OPPORTUNITIES)

### Các vấn đề (Problems)
1. **Sơ đồ hiện tại cho phép chọn nhiều mùa của cùng 1 tên cầu thủ**: Người dùng có thể vô tình xếp cả CR7 26TY và CR7 CC trong cùng 1 đội hình 11 người. Điều này vi phạm luật đội hình của FO4/FCO.
2. **Thiếu các vị trí thi đấu chuyên sâu & dị (`SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`)**: Hệ thống trước đây chỉ có các vị trí cơ bản (`ST`, `CAM`, `CM`, `CDM`, `CB`, `GK`). Nhiều sơ đồ Meta đỉnh cao như 4-2-2-2 với `LAM/RAM`, cặp tiền đạo `LS/RS`, hay sơ đồ 5 hậu vệ với `SW/LWB/RWB` không được hiển thị chính xác mã vị trí.
3. **Thẻ cầu thủ thiếu hình chân dung và logo mùa giải**: Giao diện thẻ hiện tại mới chỉ hiển thị chữ và khung màu đơn giản, chưa tái hiện được thần thái chân dung cầu thủ và bộ nhận diện mùa giải đặc trưng của FIFAAddict.

### Các cơ hội (Opportunities)
- **Engine Kiểm soát Ràng buộc Tên Cầu Thủ (Unique Player Rule Engine)**: Tự động vô hiệu hóa/làm mờ các thẻ trùng tên trong Drawer chọn cầu thủ và phát Toast cảnh báo trực quan.
- **Thuật toán Phân Vùng Vị Trí Toàn Diện (Full-Spectrum Position Mapper)**: Tính toán tọa độ `(gridX %, gridY %)` khi thả thẻ để quy đổi ra trọn bộ vị trí FO4/FCO: `GK`, `SW`, `CB`, `LCB`, `RCB`, `LB`, `RB`, `LWB`, `RWB`, `CDM`, `LDM`, `RDM`, `CM`, `LCM`, `RCM`, `CAM`, `LAM`, `RAM`, `LM`, `RM`, `ST`, `LS`, `RS`, `CF`, `LF`, `RF`, `LW`, `RW`.
- **FIFAAddict Asset Renderer**: Tích hợp CDN hình chân dung cầu thủ và logo mùa giải chính hãng.

---

## 3. MỤC TIÊU DỰ ÁN & KPIS ĐO LƯỜNG (v3.0.0)

- **Độ chính xác Ràng buộc Đội hình (100% Squad Rule Compliance):** 0% trường hợp trùng tên cầu thủ tồn tại trên cùng một sơ đồ đội hình thi đấu.
- **Bao phủ Vị trí Thi đấu (Position Coverage):** 100% các mã vị trí chuyên sâu của FO4 (`SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`) được phân vùng và hiển thị chính xác.
- **Phản hồi Thích ứng Vị trí (Position Adaptation Speed):** Vị trí trên thẻ cập nhật tức thì trong `< 16ms` ngay khi kết thúc thao tác thả thẻ (Drag End).
- **Tỷ lệ Tải Asset Hình ảnh (Image Asset Render Rate):** > 98% thẻ cầu thủ hiển thị đầy đủ hình chân dung và logo mùa giải với cơ chế Fallback mượt mượt khi mất mạng.

---

## 4. PHẠM VI DỰ ÁN & YÊU CẦU NGHIỆP VỤ CHI TIẾT

### FR-3.1: Quy Tắc Ràng Buộc 1 Cầu Thủ Duy Nhất Trên Sơ Đồ (Unique Player Squad Rule)
- **Nghiệp vụ:** Một sơ đồ 11 cầu thủ chỉ được chứa duy nhất 1 bản thể đại diện cho tên của cầu thủ đó.
- **Chi tiết kiểm soát:**
  1. Khi người dùng bấm vào 1 vị trí trên sân để mở Drawer chọn cầu thủ: Tất cả các thẻ cầu thủ trong danh sách có `name` trùng với 10 cầu thủ đang có trên sân sẽ tự động chuyển sang trạng thái `Disabled` (Mờ 50% + Nhãn *"Đã có bản thể [Mùa] trên sân"*).
  2. Khi kéo thả cầu thủ từ bên ngoài vào sân: Nếu trùng tên cầu thủ đã có, hệ thống hủy thao tác gán và phát Toast cảnh báo màu cam: *"Cầu thủ '[Tên]' đã có mặt trong đội hình (Thẻ [Mùa])"*.

### FR-3.2: Tự Động Thích Ứng Vị Trí Động Mở Rộng (Smart Pitch Position Adaptation - Full Spectrum)
- **Nghiệp vụ:** Tự động quy đổi tọa độ `(gridX %, gridY %)` khi thả thẻ trên sân 2D/3D thành trọn bộ mã vị trí chuyên sâu của FO4/FCO.
- **Chi tiết phân vùng tọa độ nâng cao `(gridX %, gridY %)`:**
  - **Y >= 88%:** Vùng Thủ môn ➔ `GK`.
  - **Y 80% - 87% (Khu vực sát khung thành):** 
    - Nếu X trong khoảng `40% - 60%` và nằm phía sau hàng hậu vệ ➔ **Thòng (`SW`)**.
    - Nếu X ngoài khoảng trung tâm ➔ `CB` / `LCB` / `RCB`.
  - **Y 68% - 79% (Vùng Hậu vệ & Cánh dâng cao):**
    - `LWB` (X <= 18% - Hậu vệ trái dâng cao), `LB` (18% < X <= 30%).
    - `LCB` (30% < X <= 42%), `CB` (42% < X <= 58%), `RCB` (58% < X <= 70%).
    - `RB` (70% < X <= 82%), `RWB` (X > 82% - Hậu vệ phải dâng cao).
  - **Y 52% - 67% (Vùng Tiền vệ phòng ngự):**
    - `LDM` (X <= 35%), `CDM` (35% < X <= 65%), `RDM` (X > 65%).
  - **Y 35% - 51% (Vùng Tiền vệ trung tâm):**
    - `LCM` (X <= 35%), `CM` (35% < X <= 65%), `RCM` (X > 65%).
  - **Y 20% - 34% (Vùng Tiền vệ tấn công & Cánh):**
    - `LM` (X <= 18%), `LAM` (18% < X <= 38% - Tiền vệ tấn công trái).
    - `CAM` (38% < X <= 62% - Tiền vệ tấn công trung tâm).
    - `RAM` (62% < X <= 82% - Tiền vệ tấn công phải), `RM` (X > 82%).
  - **Y < 20% (Vùng Tiền đạo & Tiền đạo dạt):**
    - `LW` (X <= 22% - Tiền đạo cánh trái).
    - `LF` (22% < X <= 36% - Tiền đạo lệch trái).
    - `LS` (36% < X <= 48% - Tiền đạo cặp trái), `ST` (48% < X <= 52% - Tiền đạo trung tâm duy nhất), `RS` (52% < X <= 64% - Tiền đạo cặp phải).
    - `RF` (64% < X <= 78% - Tiền đạo lệch phải).
    - `RW` (X > 78% - Tiền đạo cánh phải).

### FR-3.3: Hiển Thị Thẻ Cầu Thủ Chuẩn Game 100% từ FIFAAddict
- **Nghiệp vụ:** Tích hợp hình ảnh chân dung thật và logo mùa giải chính thức từ FIFAAddict.
- **Cấu trúc asset:**
  - **Player Avatar:** `https://vn.fifaaddict.com/fo4db/assets/players/p{uid}.png` (Fallback avatar mặc định nếu ảnh lỗi).
  - **Season Logo Badge:** `https://vn.fifaaddict.com/fo4db/assets/season/{season_code}.png`.
  - **Giao diện thẻ:** Giữ nguyên hiển thị OVR, chỉ số Lương số (không có chữ BP), tên cầu thủ và vị trí mới tương ứng.

---

## 5. ĐÁNH GIÁ TÁC ĐỘNG VỚI CÁC PHIÊN BẢN CŨ (IMPACT ANALYSIS)

| Thành phần / Tính năng phiên bản cũ | Mức độ tác động | Chi tiết đánh giá & Tương thích ngược |
|:---|:---:|:---|
| **v1.0.0 - Dual Theme (Dark/Light Mode)** | **KHÔNG ẢNH HƯỞNG** | Ảnh thẻ cầu thủ và logo mùa giải được thiết kế lớp nền trong suốt (PNG), hiển thị hoàn hảo trên cả 2 chế độ Dark Mode và Light Mode. |
| **v1.0.0 - Quản lý Trần Lương (Salary Cap 300)** | **KHÔNG ẢNH HƯỞNG** | Quy tắc kiểm soát tổng Lương <= 300 và loại bỏ chữ "BP" giữ nguyên 100%. |
| **v2.0.0 - Sân bóng 2D / 3D Perspective Toggle** | **KHÔNG ẢNH HƯỞNG** | Thuật toán Mapper vị trí bổ sung các vùng `SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS` trên hệ tọa độ phần trăm `(gridX %, gridY %)` chuẩn hóa, hoạt động chính xác đồng nhất ở cả 2D và 3D. |
| **v2.0.0 - Chế độ Đấu 1v1 vs Giả Lập GLXH** | **KHÔNG ẢNH HƯỞNG** | Giữ nguyên các bộ lọc và quy tắc tư vấn chiến thuật riêng biệt cho 2 chế độ đấu. |
| **v2.0.0 - AI Engine Giải thích Lý do Chiến thuật** | **KHÔNG ẢNH HƯỞNG** | AI Coach nhận dạng thêm các mã vị trí chuyên sâu (`SW`, `LAM`, `RAM`, `LS`, `RS`...) để đề xuất chiến thuật chính xác hơn. |
| **v2.0.0 - Dữ liệu 2,306 Thẻ Cầu Thủ Chuẩn FIFAAddict** | **KHÔNG ẢNH HƯỞNG** | Giữ nguyên 2,306 thẻ độc bản đã được khử trùng lặp 100%, chỉ bổ sung thêm trường `avatarUrl` và `seasonBadgeUrl`. |

➔ **Kết luận:** Phiên bản **v3.0.0 KHÔNG CÓ BREAKING CHANGES**, hoàn toàn tương thích ngược với dữ liệu và tính năng của v1.0.0 và v2.0.0.

---

## 6. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)

1. **[AC-3.1]** Xếp `Cristiano Ronaldo [25TY]` vào ST ➔ Mở Drawer chọn cầu thủ thấy tất cả các thẻ `CR7 CC`, `CR7 IPRM`, `CR7 ICONTM` bị làm mờ (disabled) và không cho chọn.
2. **[AC-3.2]** Kéo thả thẻ xuống sát khung thành sau hàng hậu vệ ➔ Vị trí trên thẻ chuyển đổi thành **Thòng (`SW`)**.
3. **[AC-3.3]** Kéo thả thẻ ra sát đường biên ngang hàng hậu vệ ➔ Vị trí trên thẻ chuyển đổi thành **`LWB` / `RWB`**.
4. **[AC-3.4]** Kéo thả thẻ vào vùng tiền vệ tấn công lệch cánh ➔ Vị trí trên thẻ chuyển đổi thành **`LAM` / `RAM`**.
5. **[AC-3.5]** Kéo thả thẻ vào vùng tiền đạo nanh dạt lệch ➔ Vị trí trên thẻ chuyển đổi thành **`LF` / `RF`** hoặc cặp tiền đạo **`LS` / `RS`**.
6. **[AC-3.6]** Thẻ cầu thủ trên Sân bóng, Player DB và Modal So sánh hiển thị hình chân dung nét và logo mùa giải chính hãng từ FIFAAddict.
7. **[AC-3.7]** Không gây lỗi trên các tính năng v1.0.0 và v2.0.0 (Chế độ Sáng/Tối, Lương trần 300, Sân 2D/3D, Chế độ đấu 1v1/GLXH).
