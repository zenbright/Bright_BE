import express from 'express';
import path from 'path';

const staticRoutes = express.Router();
const __dirname = path.resolve();

staticRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/service/authentication/github/index.html'));
});

staticRoutes.get('/realtimeChat.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/service/user/realtimeChat/realtimeChat-FE/realtimeChat.css'));
});

staticRoutes.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/service/user/realtimeChat/realtimeChat-FE/main.js'));
});

staticRoutes.get('/realtimeChat', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/service/user/realtimeChat/realtimeChat-FE/realtimeChat.html'));
});

export default staticRoutes;
