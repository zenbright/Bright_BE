import userInfo from "../../models/userInfo";

export async function getAllUser(req: any, res: any, next: any) {
    try {
        const user = await userInfo.find();
        if(!user) return res.status(204).json({ 'message': 'No user found' });
        res.json(user)
    } catch(err) {
        next(err);
    }
}