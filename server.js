import app from './app';
import http from 'http';

http.createServer(app).listen(process.env.PORT);
