import * as LogInService from './login.service';

export function loginController(req: any, res: any) {
  LogInService.loginService(req, res);
}
