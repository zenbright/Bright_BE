import express from "express";
import path from "path";
import userCredentials from "./models/userCredentialsModel";
import Group from "./models/groupModel";

const staticRoutes = express.Router();
const __dirname = path.resolve();

staticRoutes.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src/service/authentication/github/index.html"),
  );
});

staticRoutes.get("/:userId/:groupId/sendMessage.css", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "src/service/realtimechat/message/sendMessage/sendMessage-FE/sendMessage.css",
    ),
  );
});

staticRoutes.get("/:userId/:groupId/main.js", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "src/service/realtimechat/message/sendMessage/sendMessage-FE/main.js",
    ),
  );
});

staticRoutes.get("/:userId/:groupId/webrtc.js", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "src/service/realtimechat/message/sendMessage/sendMessage-FE/webrtc.js",
    ),
  );
});

staticRoutes.get("/:userId/:groupId/video-call.js", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "src/service/realtimechat/message/sendMessage/sendMessage-FE/video-call.js",
    ),
  );
});

staticRoutes.get("/:userId/:groupId/sendMessage", async (req, res) => {
  validateUserGroupId(req, res);

  res.sendFile(
    path.join(
      __dirname,
      "src/service/realtimechat/message/sendMessage/sendMessage-FE/sendMessage.html",
    ),
  );
});

async function validateUserGroupId(req: any, res: any) {
  const { userId, groupId } = req.params;
  try {
    const user = await userCredentials.findOne({ userId: userId });
    const group = await Group.findOne({ _id: groupId });

    if (!user || !group) {
      return res.status(404).send("User or group not found");
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export default staticRoutes;
