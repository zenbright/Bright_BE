import * as SaveDeviceTokenService from './saveDeviceToken.service';

export async function saveDeviceTokenController(req: any, res: any, next: any) {
    SaveDeviceTokenService.saveDeviceTokenService(req, res, next);
}
