import express from "express";
import path from "path";
// import { getDeviceToken } from "./service/authentication/bright/login/getDeviceToken.js";

const staticRoutes = express.Router();
const __dirname = path.resolve();

staticRoutes.get("/:userInfoId/getDeviceToken", async (req, res) => {
  const userInfoId = req.params.userInfoId;
  // Set a cookie with userInfoId
  if (req.cookies) {
    req.cookies.userInfoId = userInfoId;
    console.log("Cookie set:", req.cookies);
  } else {
    console.error("req.cookies is undefined. Unable to set userInfoId.");
    res.status(500).send("Internal Server Error");
    return;
  }
  // await getDeviceToken();
});

staticRoutes.post("/saveDeviceToken", (req, res) => {
  const { deviceToken } = req.body;
  console.log("document.cookie: ", document.cookie);
  //   console.log("Received userInfoId:", userInfoId);
  // Save the device token to your database or perform other actions
  console.log("Received device token:", deviceToken);

  res.status(200).send("Device token received successfully.");
});

export default staticRoutes;
