import path from 'path';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);

_.assign(config, {
	root: path.join(__dirname, '/..')
});

export default config;
