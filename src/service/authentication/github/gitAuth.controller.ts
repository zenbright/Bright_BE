import * as GitAuthService from './gitAuth.service';

export async function loginWithGitHub(req: any, res: any) {
    GitAuthService.loginWithGitHub(req, res);
}
