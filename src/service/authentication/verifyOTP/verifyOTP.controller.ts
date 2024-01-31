import * as VerifyOTPService from './verifyOTP.service';

export async function verifyOTPController(req: any, res: any, next: any) {
    VerifyOTPService.verifyOTPService(req, res, next);
}
