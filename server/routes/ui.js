import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('dist/client/index.html');
});

export default router;
