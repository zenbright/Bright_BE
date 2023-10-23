import * as GoogleAuthService from './googleAuth.service';

export async function loginWithGoogle(req: any, res: any) {
    GoogleAuthService.loginWithGoogle(req, res);
}
