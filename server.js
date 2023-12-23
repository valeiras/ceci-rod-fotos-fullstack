import app from './app.js';
import http from 'http';

const port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log(`Server listening on port: ${port}`);
