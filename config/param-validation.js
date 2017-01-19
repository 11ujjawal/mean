import Joi from 'joi';

export default {
    createUser: {
        body: {
            username: Joi.string().required(),
            name: Joi.string().required()
        }
    },
    updateUser: {
        body: {
            username: Joi.string().required(),
            name: Joi.string().required()
        },
        params: {
            userId: Joi.string().required()
        }
    }
};
