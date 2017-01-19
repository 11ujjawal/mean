import path from 'path';
import express from 'express';
import apiRoutes from './api';
import uiRoutes from './ui';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
});

router.use('/api', apiRoutes);

export default router;
