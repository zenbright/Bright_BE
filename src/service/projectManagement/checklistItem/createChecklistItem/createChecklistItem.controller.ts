import * as CreateChecklistItemService from "./createChecklistItem.service";

export async function createChecklistItemController(req: any, res: any, next: any) {
  CreateChecklistItemService.createChecklistItemService(req, res, next);
}