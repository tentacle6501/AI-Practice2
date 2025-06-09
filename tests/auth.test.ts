import request from 'supertest';
import app from '../src/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth API', () => {
  afterAll(async () => {
    // Clean up the created user
    try {
      await prisma.user.delete({
        where: {
          email: 'test.user@example.com',
        },
      });
    } catch (error) {
      // Ignore errors if user wasn't created or already deleted
    }
    await prisma.$disconnect();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      username: 'testuser',
      email: 'test.user@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
    expect(res.body.email).toBe('test.user@example.com');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Another User',
      username: 'anotheruser',
      email: 'test.user@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should log in an existing user and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test.user@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not log in with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test.user@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
}); 