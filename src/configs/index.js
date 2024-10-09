export const API_URL = process.env.REACT_APP_API_DOMAIN_USER;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const GOOGLE_PROJECT_ID = process.env.REACT_APP_GOOGLE_PROJECT_ID;
export const GOOGLE_AUTH_URI = process.env.REACT_APP_GOOGLE_AUTH_URI;
export const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
export const URL_OAUTH2 = `${GOOGLE_AUTH_URI}/oauthchooseaccount?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
export const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;
