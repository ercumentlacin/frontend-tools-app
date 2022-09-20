import { app } from './app';
import http from 'http';

const server = http.createServer(app);

const PORT = process.env.PORT ?? 5000;

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
