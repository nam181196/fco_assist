# [DOC] Kế Hoạch & Bộ Test Case Nghiệm Thu v3.0.0 (Acceptance Test Specification)

## 📌 Tổng Quan DỰ ÁN v3.0.0
- **Phiên bản:** `v3.0.0`
- **Mục tiêu nghiệm thu:** Xác nhận hoạt động chính xác của các tính năng:
  1. Ràng buộc Duy nhất 1 Tên Cầu thủ trên Sơ đồ Đội hình (Unique Player Squad Rule).
  2. Tự động Thích ứng Vị trí Động cho trọn bộ 27 vị trí FO4 (`SW`, `LWB`, `RWB`, `LAM`, `RAM`, `LF`, `RF`, `LS`, `RS`...).
  3. Render Thẻ Cầu thủ & Logo Mùa giải Chuẩn Game 100% từ `vn.fifaaddict.com`.

---

## 🧪 BỘ TEST CASE NGHIỆM THU (TEST SPECIFICATION v3.0.0)

### 🟢 Nhóm 1: Ràng Buộc Duy Nhất 1 Tên Cầu Thủ (TC-31)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-31.1** | Disable thẻ trùng tên trong Drawer | 1. Xếp `Cristiano Ronaldo [25TY]` vào vị trí ST.<br>2. Mở Drawer chọn cầu thủ cho vị trí khác. | Tất cả thẻ `CR7 CC`, `CR7 IPRM`, `CR7 ICONTM` trong Drawer tự động bị mờ (Disabled) kèm nhãn *"Đã có bản thể [Mùa] trên sân"*. | PASS ✅ |
| **TC-31.2** | Chặn kéo thả thẻ trùng tên | 1. Kéo thả một thẻ cầu thủ đã trùng tên với 1 trong 10 cầu thủ trên sân vào slot. | Thao tác gán bị từ chối, thẻ quay về vị trí cũ và hiển thị Toast màu cam thông báo trùng tên. | PASS ✅ |
| **TC-31.3** | Thay thế thẻ chính slot đó | 1. Bấm vào slot đang chứa `Cristiano Ronaldo [25TY]`.<br>2. Chọn `Cristiano Ronaldo [IPRM]`. | Cho phép đổi phiên bản mùa giải trực tiếp trên chính slot đó mà không bị chặn. | PASS ✅ |

---

### 🔵 Nhóm 2: Tự Động Thích Ứng Vị Trí Động 27 Roles (TC-32)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-32.1** | Chuyển vị trí Thòng (`SW`) | 1. Kéo thẻ cầu thủ xuống sát khung thành sau hàng hậu vệ trung tâm ($Y \ge 80\%, X \in 40-60\%$). | Nhãn vị trí trên thẻ lập tức đổi thành **Thòng (`SW`)**. | PASS ✅ |
| **TC-32.2** | Chuyển vị trí Hậu vệ cánh dâng cao | 1. Kéo thẻ ra mép đường biên ngang của hàng vệ ($Y \ge 68\%, X \le 18\%$ hoặc $X > 82\%$). | Nhãn vị trí lập tức đổi thành **`LWB` / `RWB`**. | PASS ✅ |
| **TC-32.3** | Chuyển vị trí Tiền vệ tấn công dạt cánh | 1. Kéo thẻ vào vùng tiền vệ tấn công lệch cánh ($Y \in 20-34\%, X \in 18-38\%$). | Nhãn vị trí lập tức đổi thành **`LAM` / `RAM`**. | PASS ✅ |
| **TC-32.4** | Chuyển vị trí Tiền đạo lệch & Tiền đạo cặp | 1. Kéo thẻ vào vùng tiền đạo dạt hoặc cặp ($Y < 20\%$). | Nhãn vị trí chuyển chính xác thành **`LF` / `RF`** hoặc **`LS` / `RS`** / **`ST`**. | PASS ✅ |
| **TC-32.5** | Chuyển vị trí Thủ môn (`GK`) | 1. Kéo thẻ xuống sát vùng vòng cấm thủ môn ($Y \ge 88\%$). | Nhãn vị trí lập tức đổi thành **`GK`**. | PASS ✅ |

---

### 🟡 Nhóm 3: Hiển Thị Visual Thẻ Cầu Thủ FIFAAddict (TC-33)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-33.1** | Render Ảnh Chân Dung Cầu Thủ | 1. Quan sát thẻ cầu thủ trên Sân bóng, Player DB & Modal So sánh. | Hiển thị sắc nét hình chân dung thật từ FIFAAddict CDN. | PASS ✅ |
| **TC-33.2** | Render Logo Mùa Giải | 1. Quan sát góc thẻ cầu thủ. | Hiển thị chính xác logo mùa giải (`26TY`, `IPRM`, `ICONTM`, `EU24`...). | PASS ✅ |
| **TC-33.3** | Khai trừ chữ "BP" đằng sau Lương | 1. Kiểm tra nhãn Lương trên thẻ. | Hiển thị dạng số nguyên `Lương 37`, `Lương 34` (KHÔNG có chữ BP). | PASS ✅ |
| **TC-33.4** | Cơ chế Fallback khi ảnh lỗi | 1. Thử nghiệm với thẻ có avatar bị mất mạng/lỗi 404. | Tự động render avatar mặc định bóng người và badge tên mùa dạng văn bản. | PASS ✅ |

---

### 🟠 Nhóm 4: Kiểm Biên Dịch & Tương Thích Ngược (TC-34)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-34.1** | Production Build Verification | 1. Chạy lệnh `npx vite build`. | Biên dịch thành công 100% không có lỗi JSX/Syntax. | PASS ✅ |
| **TC-34.2** | Dual Theme & 2D/3D Compatibility | 1. Chuyển đổi Dark/Light Mode & Sân 2D/3D. | Mọi tính năng v1.0.0 và v2.0.0 hoạt động ổn định 100%. | PASS ✅ |
