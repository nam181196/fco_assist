# [DOC] Kế Hoạch & Bộ Test Case Nghiệm Thu v2.0.0 (Acceptance Test Specification)

## 📌 Tổng Quan DỰ ÁN v2.0.0
- **Phiên bản:** `v2.0.0`
- **Mục tiêu nghiệm thu:** Xác nhận hoạt động chính xác của các tính năng 3D Pitch Perspective, Free Drag-and-Drop, Game Mode (1v1 vs GLXH), Bộ dữ liệu chuẩn 100% FIFAAddict (2,306 thẻ độc bản), Tra cứu & So sánh Side-by-Side.

---

## 🧪 BỘ TEST CASE NGHIỆM THU (TEST SPECIFICATION)

### 🟢 Nhóm 1: Cơ Sở Dữ Liệu Cầu Thủ FIFAAddict & Hiển Thị (TC-01)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-01.1** | Đồng bộ dữ liệu mùa giải chuẩn | 1. Mở tab "Tra Cứu & So Sánh".<br>2. Mở dropdown mùa giải. | Hiển thị đủ 123 mùa giải chuẩn với số lượng thẻ thật. Không có dữ liệu ảo. | PASS ✅ |
| **TC-01.2** | Chuẩn xác Mùa & Lương theo FIFAAddict | 1. Chọn mùa `IPRM`.<br>2. Kiểm tra danh sách cầu thủ. | - Có Ronaldo Nazário (Lương 37, OVR 133).<br>- KHÔNG có CR7, Zidane, Mbappé trong mùa `IPRM`. | PASS ✅ |
| **TC-01.3** | Khai trừ chữ "BP" khỏi Lương | 1. Xem thẻ cầu thủ trên sân và DB.<br>2. Kiểm tra nhãn Lương. | Hiển thị `Lương 37`, `Lương 34` (KHÔNG có chữ "BP" đằng sau). Chữ "BP" chỉ dùng cho Giá TTCN. | PASS ✅ |
| **TC-01.4** | Khử trùng lặp thẻ (Deduplication) | 1. Tìm từ khóa "Klose" hoặc "Marchisio".<br>2. Kiểm tra các thẻ hiển thị. | Mỗi mùa giải chỉ có DUY NHẤT 1 thẻ cho cầu thủ đó. 0% lặp x2/x3. | PASS ✅ |
| **TC-01.5** | Nút liên kết Live FIFAAddict | 1. Bấm vào nút `FIFAAddict ↗` trên thẻ hoặc thanh tìm kiếm. | Mở đúng trang chi tiết cầu thủ trên `vn.fifaaddict.com` ở tab mới. | PASS ✅ |

---

### 🔵 Nhóm 2: Sân Bóng 2D/3D & Kéo Thả Tự Do (TC-02)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-02.1** | Chuyển đổi Góc Nhìn 2D / 3D | 1. Bấm nút toggle `Sân Bóng 2D/3D` trên Toolbar. | Sân nghiêng 35 độ theo góc nhìn 3D stadium, có họa tiết vạch cỏ dọc, lưới khung thành. | PASS ✅ |
| **TC-02.2** | Kéo thả Cầu thủ Tự do (Free Drag) | 1. Giữ chuột/bằng tay vào thẻ cầu thủ trên sân.<br>2. Rê đến vị trí bất kỳ và thả. | Thẻ cầu thủ di chuyển mượt mà và cố định đúng vị trí mới thả (Tọa độ gridX/gridY lưu chuẩn). | PASS ✅ |
| **TC-02.3** | Đặt lại Sơ đồ (Reset Positions) | 1. Kéo thả cầu thủ xáo trộn.<br>2. Bấm nút `Đặt lại vị trí`. | Tất cả cầu thủ quay về vị trí sơ đồ mặc định của formation đang chọn. | PASS ✅ |

---

### 🟡 Nhóm 3: Chế Độ Đấu & AI Coach Console Engine (TC-03)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-03.1** | Switch Chế độ Xếp Hạng 1v1 / GLXH | 1. Bấm nút chuyển `Xếp Hạng 1v1` ↔ `Giả Lập GLXH`. | Nút toggle đổi trạng thái active, AI Coach cập nhật context phân tích theo chế độ đấu. | PASS ✅ |
| **TC-03.2** | Kiểm soát Trần Lương 300 | 1. Xếp 11 cầu thủ tổng lương <= 300.<br>2. Đổi cầu thủ khiến tổng lương > 300. | Khi quá 300: Hiện thanh cảnh báo Đỏ `VI PHẠM LƯƠNG TRẦN`, chặn nút Lưu và cảnh báo AI. | PASS ✅ |
| **TC-03.3** | AI Coach Đề xuất 4 Card Meta | 1. Bấm `Nhờ AI Coach Phân Tích & Giải Thích`. | AI trả về kết quả 4 Card: *Sơ đồ*, *Chiến thuật đội*, *Kỹ năng HLV*, *Giải thích Rationale*. | PASS ✅ |

---

### 🟣 Nhóm 4: Tra Cứu & So Sánh Đối Đầu Side-by-Side (TC-04)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-04.1** | Bộ lọc Đa tiêu chí | 1. Nhập tên, chọn Vị trí, Mùa giải, Lương max. | Danh sách kết quả lọc chính xác theo tất cả tiêu chí cùng lúc. | PASS ✅ |
| **TC-04.2** | Tích chọn So sánh (Tối đa 3) | 1. Bấm `Chọn So Sánh` trên 3 cầu thủ khác nhau.<br>2. Thử chọn cầu thủ thứ 4. | 3 cầu thủ đổi trạng thái xanh `Đã Tích Chọn`. Cầu thủ thứ 4 báo thông báo giới hạn max 3. | PASS ✅ |
| **TC-04.3** | Modal Bảng So sánh Side-by-Side | 1. Bấm nút `So Sánh đối đầu (3/3)`. | Hiển thị Ma trận bảng so sánh đặt song song 3 cầu thủ theo từng chỉ số (Tên, Mùa, Lương, Vị trí, Chân, Giá...). | PASS ✅ |

---

### 🟠 Nhóm 5: Đóng Gói Build & Hiệu Năng System (TC-05)

| Mã Case | Tên Test Case | Các Bước Thực Hiện | Kết Quả Kỳ Vọng | Trạng Thái |
|:---|:---|:---|:---|:---:|
| **TC-05.1** | Biên dịch Production Bundle | 1. Chạy lệnh `npx vite build`. | Biên dịch thành công 100% không có lỗi JSX / Syntax / Asset. | PASS ✅ |
| **TC-05.2** | Git Repository Sync | 1. Kiểm tra git status & log. | Tất cả commit đã được đẩy sạch lên branch `feature/v2.0.0-upgrade`. | PASS ✅ |
