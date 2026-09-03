# tools/report — cố ý để trống

Thư mục này **trống có chủ đích**.

Ở module `agy-mot-cau-mot-app` bạn sẽ giao cho agent đúng một câu và để nó dựng
một báo cáo đọc `data/orders.csv`, lọc theo `zone_code` và ngưỡng `subtotal`,
rồi cộng trường `fee` của các đơn phù hợp.

Tới module `agy-database`, chính công cụ này được nâng cấp để đọc thẳng từ
`data/shipping.db` thay vì file CSV tĩnh.

Đừng viết gì vào đây trước khi tới module đó.
