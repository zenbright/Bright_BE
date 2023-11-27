import * as DeleteAccountService from "./deleteAccount.service";

export async function deleteAccountController(req: any, res: any, next: any) {
  DeleteAccountService.deleteAccountService(req, res, next);
}
