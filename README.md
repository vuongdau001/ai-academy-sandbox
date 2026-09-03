# AI Academy Sandbox

Repo thực hành cho track **Thực Chiến Antigravity**. Một dịch vụ tính phí giao
hàng nhỏ, có mã giảm giá, có database và một trang web.

Đây là **repo duy nhất** của cả khoá. Mọi module đều làm việc trên bản clone này —
không có workspace phụ, không có repo thứ hai.

## Bắt đầu

Mở repo trong Antigravity IDE và nhờ agent kiểm tra môi trường, cài dependency,
chạy test và mở web. Học viên không cần tự thao tác command line.

```bash
npm install
npm test          # phải xanh trước khi đi tiếp
npm run web       # mở trang tính phí ở http://localhost:5173
npm run db:reset  # dựng lại data/shipping.db từ src/db/seed.sql
```

Yêu cầu: Node 20+, và `sqlite3` nếu agent cần dựng lại database.

## Cấu trúc

```
src/pricing/     nghiệp vụ phí ship và mã giảm giá
src/db/          seed.sql cho SQLite
web/             trang nhập đơn, hiện phí ship
tools/report/    ★ trống — bạn sẽ dựng ở module đầu tiên
data/            orders.csv và shipping.db
docs/spec.md     ★ nguồn chân lý nghiệp vụ
docs/scenarios.md  ★ năm tình huống dựng sẵn, mô tả công khai
.agents/         ★ trống — bộ công cụ agent của bạn lớn dần ở đây
```

## Hai điều cần biết trước khi bắt đầu

**`docs/spec.md` là nguồn chân lý.** Khi code, test hoặc dữ liệu lệch với nó thì
spec đúng. Đây không phải quy ước hình thức — nó là chỗ neo của nhiều bài học.

**`docs/scenarios.md` mô tả năm chỗ ma sát cố ý.** Chúng không phải lỗi cần báo.
Đọc trước khi bắt đầu; cái đáng học là *agent phản ứng thế nào* khi gặp chúng.

## An toàn

Repo này công khai và không chứa dữ liệu công ty. Dùng tài khoản Google **cá
nhân** trên **máy cá nhân**. Đừng mở code dự án khách trong cùng phiên làm việc,
và đừng dán dữ liệu khách vào agent.
