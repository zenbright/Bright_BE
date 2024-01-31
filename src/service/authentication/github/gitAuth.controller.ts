import * as GitAuthService from './gitAuth.service';

export async function loginWithGitHubController(req: any, res: any, next: any) {
    try {
        GitAuthService.loginWithGitHubService(req, res, next);
    } catch (error) {
        return res.RH.error(error);
    }
}