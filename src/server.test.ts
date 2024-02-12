import http from 'http';
import { startServer, stopServer } from './app';

interface HttpResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}

function httpRequest(
  options: http.RequestOptions,
  data: string | null = null,
): Promise<HttpResponse> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode!,
          headers: res.headers,
          body: responseBody,
        });
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

beforeAll(() => {
  startServer(3001);
});

afterAll(() => {
  stopServer();
});

test('Get all records with a GET api/users request', async () => {
  const response = await httpRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/users',
    method: 'GET',
  });
  expect(response.statusCode).toBe(200);
});

test('A new object is created by a POST api/users request', async () => {
  const newUser = JSON.stringify({
    username: 'Test User',
    age: 30,
    hobbies: ['Reading', 'Hiking'],
    id: '111',
  });
  const response = await httpRequest(
    {
      hostname: 'localhost',
      port: 3001,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    newUser,
  );
  expect(response.statusCode).toBe(201);
});

test('With a GET api/users/{userId} request, get the created record by its id', async () => {
  const response = await httpRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/users/{userId}',
    method: 'GET',
  });
  expect(response.statusCode).toBe(200);
});

test('Update the created record with a PUT api/users/{userId} request', async () => {
  const updatedUser = JSON.stringify({
    username: 'Updated User',
    age: 31,
    hobbies: ['Cycling'],
  });
  const response = await httpRequest(
    {
      hostname: 'localhost',
      port: 3001,
      path: '/api/users/{userId}',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    updatedUser,
  );
  expect(response.statusCode).toBe(200);
});

test('Delete the created object by id with a DELETE api/users/{userId} request', async () => {
  const response = await httpRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/users/{userId}',
    method: 'DELETE',
  });
  expect(response.statusCode).toBe(204);
});

test('Trying to get a deleted object by id with a GET api/users/{userId} request', async () => {
  const response = await httpRequest({
    hostname: 'localhost',
    port: 3001,
    path: '/api/users/{userId}',
    method: 'GET',
  });
  expect(response.statusCode).toBe(404);
});
