import * as ReadChecklistItemsService from "./readChecklistItems.service";

export async function readChecklistItemsController(req: any, res: any, next: any) {
  ReadChecklistItemsService.readChecklistsItemService(req, res, next);
}