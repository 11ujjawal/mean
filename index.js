import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config/env';
import app from './config/express';

Promise.promisifyAll(mongoose);

mongoose.connect(config.db, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.db}`);
});

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port} (${config.env})`);
});

export default app;
