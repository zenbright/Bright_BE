import * as DeleteAccountService from './deleteAccount.service';

// Should include the 'next' function, it simply means that the next function to run.
// In the service, we run the next function if there is an error in our APIs
// The next function has been configured to run automatically by the application so no need to specify which function
// just pass 'next' 
export async function deleteAccountController(req: any, res: any, next: any) {
    DeleteAccountService.deleteAccountService(req, res, next);
}