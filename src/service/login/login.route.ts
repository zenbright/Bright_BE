import * as logInController from "./login.controller";

var express = require("express");
var app = express();

app.post(
  "/login/post",
  //   IPSpamChecker.checkIpSpamServer("/auth/login"), // Check IP spam
  // TODO: Validate request body
  logInController.loginController, 
);

export default app;
