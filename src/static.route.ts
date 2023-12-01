// route
import express from "express";
import path from "path";
import userCredentials from "./models/userCredentials";
import Group from "./models/group";
import Message from "./models/message";

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
      "src/service/user/sendMessage/sendMessage-FE/sendMessage.css",
    ),
  );
});

staticRoutes.get("/:userId/:groupId/main.js", (req, res) => {
  const userId = req.params.userId;
  const groupId = req.params.groupId;

  res.sendFile(
    path.join(__dirname, "src/service/user/sendMessage/sendMessage-FE/main.js"),
  );
});

staticRoutes.get("/:userId/:groupId/sendMessage", async (req, res) => {
  validateUserGroupId(req, res);

  res.sendFile(
    path.join(
      __dirname,
      "src/service/user/sendMessage/sendMessage-FE/sendMessage.html",
    ),
  );
});

staticRoutes.get("/getGroup/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findOne({ groupId: groupId });
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

staticRoutes.get("/getMessages/:msgId", async (req, res) => {
  try {
    const msgId = req.params.msgId;
    const message = await Message.findOne({ messageId: msgId });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function validateUserGroupId(req: any, res: any) {
  const { userId, groupId } = req.params;
  try {
    const user = await userCredentials.findOne({ userId: userId });
    const group = await Group.findOne({ groupId: groupId });

    if (!user || !group) {
      return res.status(404).send("User or group not found");
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export default staticRoutes;
