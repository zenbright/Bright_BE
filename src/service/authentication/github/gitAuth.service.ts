import axios from 'axios';
import userCredentials from '../../../models/userCredentials';
import userInfo from '../../../models/userInfo';
import mongoose from 'mongoose';
import * as Formatter from '../../utils/formatter';

export async function loginWithGitHub(req: any, res: any, next: any) {
    try {
        const { code } = req.body;
        const { GITHUB_ID, GITHUB_SECRET } = process.env;

        // Get user access token
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', null, {
            params: { client_id: GITHUB_ID, client_secret: GITHUB_SECRET, code },
            headers: { accept: 'application/json' },
        });

        const access_token = tokenResponse.data.access_token;

        // Fetch user data using access token
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`,
            },
        });

        // get data from github
        const userData = userResponse.data;

        if (!userData) {
            return res.status(400).json({ error: 'Invalid Access Token!' });
        }

        // Check if user already exists in database
        const userCred = await userCredentials.findOne({ account: userData.login });

        // If user cred found
        if (userCred) {
            const userDataMongo = await userInfo.findOne({ _id: userCred.userId });
            return res.json(userDataMongo);
        }

        const newUserInfo = new userInfo({
            fullname: userData.name,
            email: {
                address: userData.email,
                isVerified: userData.email ? true : false,
            },
            social: {
                github: userData.html_url,
            },
            profileImage: await Formatter.imageToBase64FromURL(userData.avatar_url),
            userCredentialId: new mongoose.Types.ObjectId(),
        });

        // Create new credential
        const newCredential = new userCredentials({
            account: userData.login,
            password: userData.login,
            userId: newUserInfo._id,
            provider: 'github',
        });

        newUserInfo.userCredentialId = newCredential._id;
        
        await Promise.all([newUserInfo.save(), newCredential.save()]);
        return res.json(newUserInfo);
    } catch (error) {
        next(error);
    }
}
