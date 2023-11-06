import * as SaveImageService from "./saveImage/saveImage.service";
import * as GetImageService from "./getImage/getImage.service";

export function saveImageController(req: any, res: any, next: any) {
  SaveImageService.saveImageService(req, res, next);
}

export function getImageController(req: any, res: any, next: any) {
  GetImageService.getImageService(req, res, next);
}
