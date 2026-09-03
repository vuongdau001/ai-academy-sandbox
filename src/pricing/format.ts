/**
 * Định dạng tiền VND.
 *
 * Hàm này viết đã lâu và không đẹp: nó vừa làm tròn, vừa chèn dấu phân cách,
 * vừa gắn đơn vị, lại nhận thêm cờ `short` mà chỉ một chỗ dùng tới.
 * Hiện có 9 chỗ gọi nó, nằm trong 5 file (7 chỗ ngoài test), cộng một bản
 * sao chép logic riêng ở web/index.html.
 */
export function formatCurrency(amount: number, short?: boolean): string {
  let n = amount;
  if (n < 0) n = 0;
  n = Math.round(n);
  if (short === true) {
    if (n >= 1000000) {
      return String(Math.round((n / 1000000) * 10) / 10) + 'tr';
    }
    if (n >= 1000) {
      return String(Math.round(n / 1000)) + 'k';
    }
  }
  let s = '';
  const str = String(n);
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    s = str[i] + s;
    count++;
    if (count % 3 === 0 && i !== 0) s = '.' + s;
  }
  return s + 'đ';
}
