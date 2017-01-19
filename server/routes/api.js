import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user';

const router = express.Router();

router.route('/user')
    .get(userCtrl.list)
    .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/user/:userId')
    .get(userCtrl.get)
    .put(validate(paramValidation.updateUser), userCtrl.update);

export default router;
