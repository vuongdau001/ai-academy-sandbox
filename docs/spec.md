# Đặc tả nghiệp vụ — Dịch vụ tính phí giao hàng

> **Đây là nguồn chân lý.** Khi code, test hoặc dữ liệu lệch với tài liệu này,
> **tài liệu này đúng**. Chỉ Product Owner mới được sửa file này.

## 1. Phạm vi

Dịch vụ tính phí giao hàng cho đơn bán lẻ nội địa, có áp mã giảm giá.

## 2. Phí giao hàng

### 2.1 Phí cơ bản

Mọi đơn chịu phí cơ bản **30.000đ**.

### 2.2 Phụ phí theo vùng

| Mã vùng | Tên | Phụ phí |
|:--|:--|--:|
| `inner` | Nội thành | 0đ |
| `suburb` | Vùng ven | 15.000đ |
| `remote` | Vùng xa | 40.000đ |

Phí cuối = phí cơ bản + phụ phí vùng.

### 2.3 Miễn phí giao hàng

Đơn hàng **từ 500.000đ trở lên**, giao **nội thành**, được **miễn phí giao hàng
hoàn toàn** — phí cuối bằng **0đ**.

Ngưỡng này không áp dụng cho vùng ven và vùng xa.

### 2.4 Giá trị đơn hợp lệ

Giá trị đơn không được âm và không vượt 50.000.000đ.

## 3. Mã giảm giá

### 3.1 Quy tắc

- Mã hết hạn thì không áp dụng được.
- `FREESHIP` giảm 100% phí giao hàng.
- `SALE10`, `SALE20` giảm theo phần trăm trên giá trị đơn.

### 3.2 Những điểm CHƯA CHỐT

> Phần này cố ý để ngỏ. Xem `docs/scenarios.md` tình huống 1.

- Nhiều mã cùng lúc có được cộng dồn không? Nếu có thì theo thứ tự nào?
- Mã giảm giá áp **trước** hay **sau** khi cộng phí giao hàng?
- Làm tròn ở bước nào, và làm tròn lên hay xuống?

## 4. Định dạng hiển thị

Tiền hiển thị theo định dạng Việt Nam: dấu chấm phân cách hàng nghìn, hậu tố `đ`.
Ví dụ `1.234.567đ`.
