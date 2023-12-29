import * as GitAuthService from './gitAuth.service';

export async function loginWithGitHubController(req: any, res: any, next: any) {
    GitAuthService.loginWithGitHubService(req, res, next);
}
