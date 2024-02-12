import { IncomingMessage, ServerResponse } from 'http';
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/usersController';

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const [, , resource, id] = url?.split('/') || [];

  if (method === 'GET' && resource === 'users' && id) {
    return getUserById(req, res, id);
  } else if (method === 'GET' && resource === 'users') {
    return getUsers(req, res);
  } else if (method === 'POST' && resource === 'users') {
    return createUser(req, res);
  } else if (method === 'PUT' && resource === 'users' && id) {
    return updateUser(req, res, id);
  } else if (method === 'DELETE' && resource === 'users' && id) {
    return deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};
