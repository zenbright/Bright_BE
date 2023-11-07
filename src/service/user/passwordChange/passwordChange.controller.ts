import * as PasswordChangeService from './passwordChange.service';

export async function passwordChangeController(req: any, res: any, next: any) {
    PasswordChangeService.passwordChangeService(req, res, next);
}
