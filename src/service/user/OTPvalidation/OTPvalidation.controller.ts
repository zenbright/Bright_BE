import * as OTPvaldiationService from './OTPvalidation.service';

export async function OTPvalidationController(req: any, res: any, next: any) {
    OTPvaldiationService.OTPvaldiationService(req, res, next);
}
