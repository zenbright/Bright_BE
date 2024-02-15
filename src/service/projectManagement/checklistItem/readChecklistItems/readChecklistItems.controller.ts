import * as ReadChecklistItemsService from "./readChecklistItems.service";

export async function readChecklistItemsController(
  req: any,
  res: any,
  next: any,
) {
  const taskId = req.params.taskId;
  ReadChecklistItemsService.readChecklistsItemService(taskId, res, next);
}
