import * as SaveImageService from "./saveImage/saveImage.service";
import * as GetImageService from "./getImage/getImage.service";

export function userProfileImageController(req: any, res: any, next: any) {
  const { action } = req.params;

  if (action === 'get') {
    GetImageService.getImageService(req, res, next);
  } else {
    SaveImageService.saveImageService(req, res, next);
  }
}