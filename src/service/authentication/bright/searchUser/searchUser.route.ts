import { Router } from 'express';
import * as searchUserController from './searchUser.controller'
import { IPSpamChecker, APIValidator } from '../../../..';

const router = Router();

router.post('/searchUser',
    IPSpamChecker.checkIpSpamServer('/auth/searchUser'), 
    APIValidator.brightAccountValidator, 
    searchUserController.searchUserController, 
);

export default router;