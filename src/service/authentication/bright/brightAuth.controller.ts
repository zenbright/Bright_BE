import * as LogInService from './login/login.service';
import * as SignUpService from './signUp/signUp.service';

export function brightAuthentication(req: any, res: any, next: any) {
    const { action } = req.params;

    if (action === 'login') {
        LogInService.loginWithBright(req, res, next);
    } else {
        SignUpService.signUpBrigthAccount(req, res, next);
    }
}
