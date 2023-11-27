import * as SendOTPService from './sendOTP.service';

export async function sendOTPController(req: any, res: any, next: any) {
    SendOTPService.sendOTPService(req, res, next);
}
