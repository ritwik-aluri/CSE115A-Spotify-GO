import { authorize, refresh } from 'react-native-app-auth';

class AuthenticationHandler {
    constructor() {
        this.spotifyAuthConfig = {
            clientId: '06ebe1e48c574ed4a9f7f23124e86798',
            clientSecret: 'b07ecbfc901e4c98abe2486285c575bf',
            redirectUrl: 'com.spotifygodev://oauthredirect',
            scopes: [
                'ugc-image-upload',
                'user-read-currently-playing',
                'user-modify-playback-state',
                'user-read-private',
                'user-follow-modify',
                'user-library-modify',
                'user-read-playback-position',
                'user-read-playback-state',
                'playlist-modify-private',
                'app-remote-control',
                'user-top-read',
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
        };
    }

    async onLogin() {
        try {
            const result = await authorize(this.spotifyAuthConfig);
            console.log(result["accessToken"]);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async refreshLogin(refreshToken) {
        const result = await refresh(this.spotifyAuthConfig, {
            refreshToken: refreshToken,
        });
        return result;
    }

}

const authHandler = new AuthenticationHandler();

export default authHandler;