import * as UpdateChecklistItemService from "./updateChecklistItem.service";

export async function updateChecklistItemController(req: any, res: any, next: any) {
  UpdateChecklistItemService.updateChecklistItemService(req, res, next);
}