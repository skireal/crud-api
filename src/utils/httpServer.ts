import { IncomingMessage, ServerResponse } from 'http';
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController.js';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const [, , resource, id] = url?.split('/') || [];

  if (method === 'GET' && resource === 'api/users' && id) {
    return getUserById(req, res, id);
  } else if (method === 'GET' && resource === 'api/users') {
    return getUsers(req, res);
  } else if (method === 'POST' && resource === 'api/users') {
    return createUser(req, res);
  } else if (method === 'PUT' && resource === 'api/users' && id) {
    return updateUser(req, res, id);
  } else if (method === 'DELETE' && resource === 'api/users' && id) {
    return deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};
