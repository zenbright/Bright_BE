import { Router } from "express";
import * as searchUserController from "./searchUser.controller";
import { IPSpamChecker, APIValidator } from "../../..";

const router = Router();

router.post(
  "/searchUser",
  IPSpamChecker.checkIpSpamServer("/utils/user"),
  APIValidator.userSearchValidator,
  searchUserController.searchUserController,
);

export default router;
