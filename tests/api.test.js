// Import the supertest library to make HTTP requests to our app in tests
const request = require('supertest');
// Import the Express app to be tested
const app = require('../src/app');

// Group tests related to the /users API endpoints
describe('API /users', () => {

  // Test the health check endpoint
  it('returns health', async () => {
    // Send a GET request to /api/health
    const res = await request(app).get('/api/health');
    // Expect the response status code to be 200 OK
    expect(res.statusCode).toBe(200);
    // Expect the response body to have a "status" property equal to "ok"
    expect(res.body.status).toBe('ok');
  });

  // Test listing all users
  it('lists users', async () => {
    // Send a GET request to /api/users
    const res = await request(app).get('/api/users');
    // Expect the response status code to be 200 OK
    expect(res.statusCode).toBe(200);
    // Expect the response body to be an array (list of users)
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test creating a new user and retrieving it
  it('creates a user and gets it back', async () => {
    // Define a new user object
    const newUser = { name: 'Test User', email: 'test@example.com' };

    // Send a POST request to /api/users with the new user data
    const create = await request(app).post('/api/users').send(newUser);
    // Expect the response status code to be 201 Created
    expect(create.statusCode).toBe(201);
    // Expect the response body to include an "id" property
    expect(create.body.id).toBeDefined();

    // Store the newly created user's ID
    const id = create.body.id;
    // Send a GET request to /api/users/:id to retrieve the user
    const get = await request(app).get(`/api/users/${id}`);
    // Expect the response status code to be 200 OK
    expect(get.statusCode).toBe(200);
    // Expect the retrieved user's email to match the original newUser email
    expect(get.body.email).toBe(newUser.email);
  });

});
