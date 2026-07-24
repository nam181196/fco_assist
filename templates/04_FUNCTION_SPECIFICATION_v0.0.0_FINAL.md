# ĐẶC TẢ CHỨC NĂNG MODULE - <MODULE_NAME>

| Thông tin        | Chi tiết                 |
| :--------------- | :----------------------- |
| **Dự án**        | {{PROJECT_NAME}}         |
| **Module**       | <MODULE_NAME>            |
| **Phiên bản**    | {{VERSION}}              |
| **Ngày cập nhật**| {{DATE}}                 |
| **Trạng thái**   | {{STATUS}}               |
| **Tác giả**      | {{AUTHOR}}               |

---

## LỊCH SỬ THAY ĐỔI
| Version | Ngày         | Người sửa  | Mô tả thay đổi  |
| :------ | :----------- | :--------- | :-------------- |
| 1.0.0   | {{DATE}}     | {{AUTHOR}} | Phiên bản đầu tiên |
| ...     | ...          | ...        | ...             |

---

# CÁC CHỨC NĂNG

<!-- Thứ tự: CRUD cơ bản trước (Create → Read list → Read detail → Update → Delete),
     business logic phức tạp sau, internal/batch operation cuối cùng. -->

## [FUNCTION] <FUNCTION_NAME>
Label: [<Class>.<method>]

API: <METHOD> <ENDPOINT>

---

### [SECTION] Business Description
<Mô tả 2-4 câu: (1) function này làm gì, (2) business value, (3-4) điểm đặc biệt hoặc constraint quan trọng>

---

### [SECTION] Actor
- <Tác nhân 1>
- <Tác nhân 2>

---

### [SECTION] Preconditions
- <Điều kiện 1>
- <Điều kiện 2>

---

### [SECTION] Main Flow
1. Nhận request tại `<endpoint>`.
2. Validate input: <các điều kiện validate>.
3. Gọi <ServiceClass>.<method>().
4. Thực thi business logic:
    - <Bước 1>
    - <Bước 2>
5. Lưu trữ dữ liệu (nếu cần).
6. Map sang <ResponseDTO>.
7. Trả về HTTP <STATUS_CODE>.

---

### [SECTION] Business Rules
- **<Tên rule>:** <Mô tả điều kiện + hệ quả cụ thể>
- **<Tên rule>:** <Mô tả điều kiện + hệ quả cụ thể>

---

### [SECTION] Side Effects
- **Database:** <INSERT/UPDATE/DELETE bảng nào, trạng thái gì>
- **External call:** <Gọi service nào, bất đồng bộ hay đồng bộ>
- **Cache:** <Thay đổi cache hay không>
- **Event/Queue:** <Publish event nào nếu có>

---

### [SECTION] Input

**Request Body (`<DtoName>`):**
```json
{
  "<trường>": "<kiểu_dữ_liệu> — <mô tả và validation>",
  "<trường>": "<kiểu_dữ_liệu> — <mô tả, optional nếu không bắt buộc>"
}
```

---

### [SECTION] Output

#### <STATUS_CODE> - Thành công
```json
{
  "status": 1,
  "message": "<message>",
  "code": <STATUS_CODE>,
  "data": {
    "<trường>": "<kiểu — mô tả, truy vết về bảng DB>"
  }
}
```

#### Error Codes
- `400` - Bad Request: <Mô tả>
- `401` - Unauthorized: Chưa xác thực
- `403` - Forbidden: Không có quyền truy cập
- `404` - Not Found: <Mô tả>
- `500` - Internal Server Error: Lỗi hệ thống không xác định

---

# GHI CHÚ

- Mỗi chức năng nên **độc lập và tự chứa**.
- Tránh việc lặp lại logic giữa các chức năng.
- Tài liệu này dùng cho **con người đọc**.
- Đối với các dự án Spec-driven, hãy chuyển đổi tài liệu này thành:
    - openapi.json
    - rules.json
    - mapping.json
    - scenarios.json
    - test_cases.json

---

END OF TEMPLATE
