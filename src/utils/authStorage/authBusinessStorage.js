import { getLocalItem, setLocalItem, updateLocalItem, removeLocalItem } from '@utils/localStorageUtils';

const BUSINESS_TOKEN_KEY = 'business_token';
const BUSINESS_KEY = 'business';

const getLocalBusinessToken = () => getLocalItem(BUSINESS_TOKEN_KEY);

const getLocalBusinessRefreshToken = () => getLocalBusinessToken()?.refresh_token;

const getLocalBusinessAccessToken = () => getLocalBusinessToken()?.access_token;

const setLocalBusinessToken = (token) => setLocalItem(BUSINESS_TOKEN_KEY, token);

const updateLocalBusinessAccessToken = (token) => {
    updateLocalItem(BUSINESS_TOKEN_KEY, { access_token: token });
};

const updateLocalBusinessToken = (token) => setLocalBusinessToken(token);

const getLocalBusiness = () => getLocalItem(BUSINESS_KEY);

const setLocalBusiness = (business) => setLocalItem(BUSINESS_KEY, business);

const updateLocalBusinessInfo = (business) => {
    updateLocalItem(BUSINESS_KEY, business);
};

const removeLocalBusinessToken = () => removeLocalItem(BUSINESS_TOKEN_KEY);

const removeLocalBusiness = () => removeLocalItem(BUSINESS_KEY);

const removeAllBusiness = () => {
    removeLocalBusinessToken();
    removeLocalBusiness();
};

export {
    getLocalBusinessToken,
    getLocalBusinessRefreshToken,
    getLocalBusinessAccessToken,
    setLocalBusinessToken,
    updateLocalBusinessAccessToken,
    updateLocalBusinessToken,
    getLocalBusiness,
    setLocalBusiness,
    updateLocalBusinessInfo,
    removeLocalBusinessToken,
    removeLocalBusiness,
    removeAllBusiness,
};
