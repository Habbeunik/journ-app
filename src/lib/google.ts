import { OAuth2Client } from 'google-auth-library';

const googleClientId = process.env.GOOGLE_CLIENT_ID;

const googleOAuth2 = new OAuth2Client(googleClientId);

export default googleOAuth2;
