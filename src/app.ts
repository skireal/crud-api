import http from 'http';
import 'dotenv/config';
import { handleRequest } from './utils/httpServer';

const PORT = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

if (process.env.TEST_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

function startServer(serverPort: number) {
  server.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
  });
}

function stopServer() {
  server.close();
}

export { startServer, stopServer };
