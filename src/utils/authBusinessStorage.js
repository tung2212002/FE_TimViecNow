const getLocalBusinessToken = () => {
    const localToken = localStorage.getItem('business_token');
    return localToken ? JSON.parse(localToken) : null;
};

const getLocalBusinessRefreshToken = () => {
    const localToken = getLocalBusinessToken();
    return localToken?.refresh_token;
};

const getLocalBusinessAccessToken = () => {
    const localToken = getLocalBusinessToken();
    return localToken?.access_token;
};

const setLocalBusinessToken = (token) => {
    localStorage.setItem('business_token', JSON.stringify(token));
};

const updateLocalBusinessAccessToken = (token) => {
    const localToken = getLocalBusinessToken();
    if (localToken) {
        localToken.access_token = token;
        localStorage.setItem('business_token', JSON.stringify(localToken));
    } else {
        localStorage.setItem('business_token', JSON.stringify({ access_token: token }));
    }
};

const updateLocalBusinessToken = (token) => {
    localStorage.setItem('business_token', JSON.stringify(token));
};

const getLocalBusiness = () => {
    const business = localStorage.getItem('business');
    return business ? JSON.parse(business) : null;
};

const setLocalBusiness = (business) => {
    localStorage.setItem('business', JSON.stringify(business));
};

const updateLocalBusinessInfo = (business) => {
    const localBusiness = getLocalBusiness();
    const newLocalBusiness = { ...localBusiness, ...business };
    localStorage.setItem('business', JSON.stringify(newLocalBusiness));
};

const removeLocalBusinessToken = () => {
    localStorage.removeItem('business_token');
};

const removeLocalBusiness = () => {
    localStorage.removeItem('business');
};

const removeAllBusiness = () => {
    removeLocalBusinessToken();
    removeLocalBusiness();
};

export {
    getLocalBusinessToken,
    getLocalBusinessRefreshToken,
    getLocalBusinessAccessToken,
    updateLocalBusinessAccessToken,
    setLocalBusinessToken,
    updateLocalBusinessToken,
    updateLocalBusinessInfo,
    getLocalBusiness,
    setLocalBusiness,
    removeLocalBusinessToken,
    removeLocalBusiness,
    removeAllBusiness,
};
