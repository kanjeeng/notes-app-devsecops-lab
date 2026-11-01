// tests/app.test.js
const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => store.resetStore());

test('GET / should return health', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.body.service).toBe('notes-app');
});

test('POST /notes should create note', async () => {
  const res = await request(app)
    .post('/notes')
    .send({ title: 'A', body: 'B' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('GET /notes should list notes', async () => {
  await request(app).post('/notes').send({ title: 'X', body: 'Y' });
  const res = await request(app).get('/notes');
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('PUT /notes/:id should update note', async () => {
  const created = await request(app).post('/notes').send({ title: 't', body: 'b' });
  const res = await request(app).put(`/notes/${created.body.id}`).send({ title: 't2' });
  expect(res.status).toBe(200);
  expect(res.body.title).toBe('t2');
});

test('DELETE /notes/:id should remove note', async () => {
  const created = await request(app).post('/notes').send({ title: 't', body: 'b' });
  const res = await request(app).delete(`/notes/${created.body.id}`);
  expect(res.status).toBe(204);
});
