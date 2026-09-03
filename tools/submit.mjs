#!/usr/bin/env node
/**
 * Đường lùi khi MCP chưa cấu hình được.
 *
 * Bình thường bạn nộp bằng `agy_lab_submit(...)` ngay trong IDE. Script này chỉ
 * dùng khi kết nối MCP hỏng — nó gọi đúng endpoint đó.
 *
 *   npm run submit -- --module agy-ba-pha --answer 54000
 *
 * Token đọc từ biến môi trường AGY_TOKEN, hoặc .agents/mcp_config.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const moduleId = get('module');
const answer = get('answer');
const baseUrl = get('url') ?? process.env.AGY_BASE_URL ?? 'http://localhost:3000';

if (!moduleId || !answer) {
  console.error('Dùng: npm run submit -- --module <id> --answer <số>');
  process.exit(1);
}

let token = process.env.AGY_TOKEN;
if (!token) {
  try {
    const cfg = JSON.parse(fs.readFileSync(path.join('.agents', 'mcp_config.json'), 'utf8'));
    token = cfg.mcpServers?.['agy-lab']?.headers?.Authorization?.replace(/^Bearer\s+/i, '');
  } catch {
    /* không sao — báo lỗi bên dưới */
  }
}
if (!token || token === '<TOKEN>') {
  console.error('Chưa có token. Đặt AGY_TOKEN, hoặc điền vào .agents/mcp_config.json.');
  process.exit(1);
}

const res = await fetch(`${baseUrl}/api/module/${moduleId}/external-submit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  body: JSON.stringify({ answer }),
});
const body = await res.json().catch(() => ({}));

if (!res.ok) {
  console.error(`❌ ${res.status}: ${body.error ?? 'lỗi không rõ'}`);
  process.exit(1);
}
if (body.correct) {
  console.log(`✅ Đã ghi nhận. Module ${moduleId} hoàn thành.`);
} else {
  console.error(`❌ ${body.message} (lần thử thứ ${body.attempts})`);
  process.exit(1);
}
