import ChecklistItem from "../../../../models/taskChecklistItemModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function updateChecklistItemService(
  req: any,
  res: any,
  next: any,
) {
  try {
    const { itemId, name, completed } = req.body;

    const item = await ChecklistItem.findOne({
      _id: itemId,
    });

    if (!item) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    item.name = name;
    item.completed = completed;

    await item.save();
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
