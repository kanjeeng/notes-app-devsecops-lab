// loadtest/script.js
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const create = http.post(`${BASE}/notes`, JSON.stringify({ title: 't', body: 'b' }), { headers: { 'Content-Type': 'application/json' }});
  check(create, { '201': r => r.status === 201 });
  const list = http.get(`${BASE}/notes`);
  check(list, { '200': r => r.status === 200 });
  sleep(Math.random() * 0.5);
}
