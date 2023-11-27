import * as EmailVerificationService from './emailVerification.service';

export async function emailVerificationController(req: any, res: any, next: any) {
    EmailVerificationService.emailVerificationService(req, res, next);
}
