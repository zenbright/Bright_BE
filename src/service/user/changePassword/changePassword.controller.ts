import * as ChangePasswordService from './changePassword.service';

export async function changePasswordController(req: any, res: any, next: any) {
    ChangePasswordService.changePasswordService(req, res, next);
}
