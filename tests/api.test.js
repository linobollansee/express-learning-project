const request = require('supertest');
const app = require('../src/app');

describe('API /users', () => {
  it('returns health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('lists users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('creates a user and gets it back', async () => {
    const newUser = { name: 'Test User', email: 'test@example.com' };
    const create = await request(app).post('/api/users').send(newUser);
    expect(create.statusCode).toBe(201);
    expect(create.body.id).toBeDefined();
    const id = create.body.id;
    const get = await request(app).get(`/api/users/${id}`);
    expect(get.statusCode).toBe(200);
    expect(get.body.email).toBe(newUser.email);
  });
});
