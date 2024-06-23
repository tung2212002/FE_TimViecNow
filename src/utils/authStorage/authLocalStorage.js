import { getLocalItem, setLocalItem, updateLocalItem, removeLocalItem } from '@utils/localStorageUtils';

const USER_TOKEN_KEY = 'token';
const USER_KEY = 'user';

const getLocalToken = () => getLocalItem(USER_TOKEN_KEY);

const getLocalRefreshToken = () => getLocalToken()?.refresh_token;

const getLocalAccessToken = () => getLocalToken()?.access_token;

const setLocalToken = (token) => setLocalItem(USER_TOKEN_KEY, token);

const updateLocalAccessToken = (token) => {
    updateLocalItem(USER_TOKEN_KEY, { access_token: token });
};

const updateLocalToken = (token) => setLocalToken(token);

const getLocalUser = () => getLocalItem(USER_KEY);

const setLocalUser = (user) => setLocalItem(USER_KEY, user);

const updateLocalUserInfo = (user) => {
    updateLocalItem(USER_KEY, user);
};

const removeLocalToken = () => removeLocalItem(USER_TOKEN_KEY);

const removeLocalUser = () => removeLocalItem(USER_KEY);

const removeAll = () => {
    removeLocalToken();
    removeLocalUser();
};

export {
    getLocalToken,
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    setLocalToken,
    updateLocalToken,
    updateLocalUserInfo,
    getLocalUser,
    setLocalUser,
    removeLocalToken,
    removeLocalUser,
    removeAll,
};
