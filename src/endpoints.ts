import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import GoogleAuthRoute from './service/authentication/google/googleAuth.route'
import googleprofileRoutes from "./service/authentication/google/googleProfileAuth.route";
const router = Router();

router.use('/auth', [GitAuthRoute, GoogleAuthRoute]);

// router.use('/profile', [googleprofileRoutes]);

export default router;