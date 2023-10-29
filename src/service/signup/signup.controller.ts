import * as SignUpService from "./signup.service";

export async function signupController(req: any, res: any) {
  SignUpService.signupService(req, res);
}
