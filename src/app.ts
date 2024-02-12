import http from 'http';
import 'dotenv/config';
import { handleRequest } from './utils/httpServer.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
