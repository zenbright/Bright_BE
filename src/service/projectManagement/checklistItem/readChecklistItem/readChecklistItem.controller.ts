import * as ReadChecklistItemService from "./readChecklistItem.service";

export async function readChecklistItemController(req: any, res: any, next: any) {
  ReadChecklistItemService.readChecklistItemService(req, res, next);
}