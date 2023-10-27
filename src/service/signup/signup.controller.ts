import * as SignUpService from './signup.service';


export async function signup(req: any, res: any) {
    SignUpService.signup(req, res);
}