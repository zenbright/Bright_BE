import axios from 'axios';
import userCredentials from '../../../models/userCredentialsModel';
import userInfo from '../../../models/userInfoModel';
import mongoose from 'mongoose';
import * as Formatter from '../../utils/formatter';
import { CAUTION, RESPONSE_CODE, EXTERNAL_URL, PROVIDER } from '../../utils/constants';

export async function loginWithGitHubService(req: any, res: any, next: any) {
    try {
        const { code } = req.body;
        const { GITHUB_ID, GITHUB_SECRET } = process.env;

        // Get user access token
        const { data: { access_token } } = await axios.post(
            EXTERNAL_URL.GITHUB_OAUTH_GET_ACCESSTOKEN,
            null,
            {
                params: { client_id: GITHUB_ID, client_secret: GITHUB_SECRET, code },
                headers: { accept: 'application/json' },
            }
        );

        // Fetch user data using access token
        const { data: userData } = await axios.get(EXTERNAL_URL.GITHUB_OAUTH_GET_USERDATA, {
            headers: { Authorization: `token ${access_token}` },
        });

        if (!userData) {
            return res.RH.error({ status: 404, error: RESPONSE_CODE.USER_NOT_FOUND })
        }

        // Check if user already exists in database
        const userCred = await userCredentials.findOne({ account: userData.login });

        // If user cred found
        if (userCred) {
            const userDataMongo = await userInfo.findOne({ _id: userCred.userId });
            return res.RH.success(JSON.stringify(userDataMongo));
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
            password: CAUTION.DO_NOT_USE,
            userId: newUserInfo._id,
            provider: PROVIDER.GITHUB,
        });

        newUserInfo.userCredentialId = newCredential._id;

        await Promise.all([newUserInfo.save(), newCredential.save()]);

        return res.RH.success(JSON.stringify(newUserInfo));
    } catch (error) {
        next(error);
    }
}
