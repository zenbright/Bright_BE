import * as SearchUserService from "./searchUser.service";

export function searchUserController(req: any, res: any, next: any) {
  SearchUserService.searchUserService(req, res, next);
}
