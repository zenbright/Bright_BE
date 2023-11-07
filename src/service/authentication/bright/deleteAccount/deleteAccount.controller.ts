import * as DeleteAccountService from './deleteAccount.service';

export async function deleteAccountController(req: any, res: any) {
    DeleteAccountService.deleteAccountService(req, res);
}