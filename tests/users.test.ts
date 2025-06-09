import request from 'supertest';
import app from '../src/index';

describe('Users API', () => {
  it('GET /api/users - should return a list of 10 seeded users', async () => {
    const response = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(10);
  });

  it('GET /api/users/1 - should return a single user', async () => {
    const response = await request(app).get('/api/users/1').expect(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Leanne Graham');
  });

  it('GET /api/users/99999 - should return 404 for a non-existent user', async () => {
    await request(app).get('/api/users/99999').expect(404);
  });

  const newUser = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '1-2-3',
    website: 'test.com',
    company: {
      name: 'Test Inc',
      catchPhrase: 'Testing',
      bs: 'tester',
    },
    address: {
      street: 'Test St',
      suite: 'Apt 1',
      city: 'Testville',
      zipcode: '12345',
      geo: {
        lat: '0',
        lng: '0',
      },
    },
  };

  let createdUserId: number;

  it('POST /api/users - should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    createdUserId = response.body.id;
  });

  it('PUT /api/users/:id - should update a user', async () => {
    const updatedData = {
      name: 'Updated Test User',
    };

    const response = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.id).toBe(createdUserId);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('DELETE /api/users/:id - should delete a user', async () => {
    await request(app).delete(`/api/users/${createdUserId}`).expect(204);
  });

  it('GET /api/users/:id - should return 404 for a deleted user', async () => {
    await request(app).get(`/api/users/${createdUserId}`).expect(404);
  });
}); 