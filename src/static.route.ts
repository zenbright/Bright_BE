import express from "express";
import path from "path";
import userCredentials from "./models/userCredentialsModel";

const staticRoutes = express.Router();
const __dirname = path.resolve();

staticRoutes.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "src/service/authentication/github/index.html"),
  );
});

staticRoutes.get("/:userId/userState.js", (req, res) => {
  res.sendFile(path.join(__dirname, "src/service/userState/userState.js"));
});

staticRoutes.get("/:userId/userState", async (req, res) => {
  validateUserId(req, res);
  res.sendFile(path.join(__dirname, "src/service/userState/userState.html"));
});

async function validateUserId(req: any, res: any) {
  const { userId } = req.params;
  try {
    const user = await userCredentials.findOne({ userId: userId });

    if (!user) {
      return res.status(404).send("User or group not found");
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export default staticRoutes;
