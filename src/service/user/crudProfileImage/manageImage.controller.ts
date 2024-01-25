import * as SaveUserProfileImageService from "./saveImage/saveImage.service";
import * as GetUserProfileImageService from "./getImage/getImage.service";

export function userProfileImageController(req: any, res: any, next: any) {
  const { action } = req.params;

  if (action === 'get') {
    GetUserProfileImageService.getUserProfileImageService(req, res, next);
  } else {
    SaveUserProfileImageService.saveUserProfileImageService(req, res, next);
  }
}