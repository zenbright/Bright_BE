import { loginService } from "./login.service";

export function loginController(req: any, res: any) {
  console.log("Controller: Received a login request");
  loginService(req, res);
}
