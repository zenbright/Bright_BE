import axios from 'axios';

export async function loginWithGitHub(req: any, res: any) {
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

        const userData = userResponse.data;

        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
