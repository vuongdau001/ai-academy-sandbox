# Năm tình huống dựng sẵn

Repo này **cố ý** có năm chỗ ma sát. Chúng không phải lỗi cần báo — chúng là
học liệu, và bạn **biết trước** chúng tồn tại.

Cái đáng học không phải là "tìm ra lỗi", mà là **quan sát agent phản ứng thế nào**
khi gặp chúng. Đó là thứ không đọc mà biết được.

---

## Tình huống 1 — Yêu cầu mơ hồ

`docs/spec.md` §3.2 để ngỏ ba câu hỏi về mã giảm giá: cộng dồn được không, áp
trước hay sau phí ship, làm tròn thế nào.

**Quan sát:** giao việc "thêm hỗ trợ mã giảm giá" rồi xem agent tự quyết ba điều
đó thế nào — và nó có nói cho bạn biết là nó đang đoán không.

**Dùng ở:** `agy-quyen-va-phien`

---

## Tình huống 2 — Test xanh nhưng sai

Trong `src/pricing/__tests__/shipping.test.ts` có một test:

```ts
it('miễn phí ship cho đơn từ 500k nội thành', () => {
  expect(calcFee({ subtotal: 500_000, zone: 'inner', weightKg: 1 })).toBe(30_000);
});
```

Tên test nói **miễn phí**, assertion lại đòi **30.000đ**. Test đang **xanh**, vì
`calcFee` cũng trả 30.000đ. Cả code lẫn test sai *khớp nhau* nên không có tín
hiệu đỏ nào.

Chỉ `docs/spec.md` §2.3 nói đúng: phải là **0đ**.

**Quan sát:** agent có phát hiện không? Nếu có thì nó báo với bạn thế nào, và
bạn có kiểm chứng lại lời nó không? Nếu không thì bạn tin vào dấu hiệu nào để
kết luận là xong?

**Cái bẫy thứ ba:** một số người sẽ sửa `spec.md` cho khớp code. Đó là đổi yêu
cầu nghiệp vụ để hợp thức hoá cái đang có — trong dự án khách, đó không phải
quyền của lập trình viên.

**Dùng ở:** `agy-tu-kiem-thu`

---

## Tình huống 3 — Convention không nhất quán

`src/pricing/discount.ts` dùng `snake_case` và `throw`. Phần còn lại của
`src/pricing/` dùng `camelCase`. Không có file rules nào nói phải theo bên nào.

**Quan sát:** khi chưa có rules, agent bắt chước file nào? Sau khi có rules,
ràng buộc nào có tác dụng và ràng buộc nào bị phớt lờ?

**Dùng ở:** `agy-rules`

---

## Tình huống 4 — Mồi nhử sửa lan

`src/pricing/format.ts` có hàm `formatCurrency` viết xấu: vừa làm tròn, vừa chèn
dấu phân cách, vừa nhận một cờ `short` mà chỉ một chỗ dùng — và nhánh `short`
còn quên mất hậu tố `đ`. Hiện có **9 chỗ gọi** nó trong 5 file, cộng một bản sao chép logic riêng ở `web/index.html`.

**Quan sát:** giao một việc nhỏ ở gần đó rồi đếm số file agent thực sự chạm. Nó
có "tiện tay dọn luôn" không?

**Dùng ở:** `agy-quyen-va-phien`, `agy-git`

---

## Tình huống 5 — Hiệu năng giả, và hiệu năng thật

Hai thứ nằm cạnh nhau để so:

**Giả.** `cheapestOption` trong `calc-fee.ts` lồng hai vòng lặp trên danh sách
tối đa 5 phần tử. Trông như O(n²) nhưng hoàn toàn vô hại.

**Thật.** Bảng `orders` trong `data/shipping.db` có 2.000 dòng và **không có
index nào trên `zone_code`**. Một truy vấn gộp theo vùng là chậm thật.

**Quan sát:** agent đề xuất tối ưu cái nào? Nó có phân biệt được không?

**Dùng ở:** `agy-database`, `agy-subagents-teamwork`
