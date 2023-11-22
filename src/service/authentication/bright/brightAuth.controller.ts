import * as LogInService from './login/login.service';
import * as SignUpService from './signUp/signUp.service';
import * as RefreshService from './refreshToken/refreshToken.service'
import * as LogoutService from './logout/logout.service'

export function brightAuthentication(req: any, res: any, next: any) {
    const { action } = req.params;

    if (action === 'login') {
        LogInService.loginWithBright(req, res, next);
    } else if (action === 'signup'){
        SignUpService.signUpBrigthAccount(req, res, next);
    }
}

export function brightRefreshandLogout (req: any, res: any, next: any) {
    const {action} = req.params;
    
    if (action === 'refresh') {
        RefreshService.RefreshToken(req, res, next);
    } else if (action === 'logout'){
        LogoutService.logoutwithBright(req, res, next);
    }
}