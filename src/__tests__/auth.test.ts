const request = require('supertest')
import app from '../app';

describe('-- AUTH API TESTS', () => {
  it('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: "Tester Govind",
        email: "test@gmail.com",
        password: "Test@123",
        role: "admin",
      })
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  })


  it('GET /api/auth/login -> should log user in', async () => {

    await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'test@gmail.com', password: 'Test@123'
    });
    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: "test@gmail.com",
        password: "Test@123",
      })
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  })

  it('GET /api/auth/login -> TEST INCORRECT CREDS(email)', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'test@gmail.com', password: '12345'
    });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: "xyz@gmail.com",
        password: "Test@123",
      })
    expect(res.status).toBe(400);
  })

    it('GET /api/auth/login -> TEST INCORRECT CREDS(passowrd)', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'test@gmail.com', password: '12345'
    });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: "test@gmail.com",
        password: "xyz@123",
      })
    expect(res.status).toBe(400);
  })

  it('POST /api/auth/register → should fail if user exists', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'bob@example.com', password: '12345'
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'bob@example.com', password: '12345'
    });
    expect(res.status).toBe(400);
  });

})