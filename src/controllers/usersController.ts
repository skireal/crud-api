import { IncomingMessage, ServerResponse } from 'http';
import {
  getUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from '../services/userService.js';

export const getUsers = async (_req: IncomingMessage, res: ServerResponse) => {
  const users = getUsersService();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (
    !id.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    )
  ) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }

  const user = getUserByIdService(id);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);
      const newUser = createUserService(userData);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request data' }));
    }
  });
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (
    !id.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    )
  ) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);
      const updatedUser = updateUserService(id, userData);
      if (!updatedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid request data' }));
    }
  });
};

export const deleteUser = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string,
) => {
  if (
    !id.match(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
    )
  ) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID format' }));
    return;
  }

  const isDeleted = deleteUserService(id);
  if (!isDeleted) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(204);
  res.end();
};
