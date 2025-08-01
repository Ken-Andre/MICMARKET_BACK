const request = require('supertest');
const app = require('../index'); // Assurez-vous que le chemin est correct

describe('MicMarket API Tests', () => {
  it('should return health check status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'success');
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/user/register').send({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/user/login').send({
      email: 'john.doe@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should create a new product', async () => {
    const res = await request(app).post('/api/product').send({
      title: 'Test Product',
      description: 'A product for testing',
      price: 100,
      category: 'Test Category',
      brand: 'Test Brand',
      quantity: 10,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all categories', async () => {
    const res = await request(app).get('/api/category');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should upload an image', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('image', '__tests__/test-image.jpg');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('url');
  });

  // Ajoutez d'autres tests ici pour chaque fonctionnalité clé
});
