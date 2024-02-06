import { OAuth2Client } from "google-auth-library";

const googleClientId =
  "513766464886-fbjcceo4gp7mm3eo57s24mjgakhpa2n7.apps.googleusercontent.com";

const googleOAuth2 = new OAuth2Client(googleClientId);

export default googleOAuth2;
