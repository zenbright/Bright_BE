import * as DeleteChecklistItemService from "./deleteChecklistItem.service";

export async function deleteChecklistItemController(req: any, res: any, next: any) {
  DeleteChecklistItemService.deleteChecklistItemService(req, res, next);
}