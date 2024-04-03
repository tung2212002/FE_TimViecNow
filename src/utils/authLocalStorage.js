const getLocalToken = () => {
    const localToken = localStorage.getItem('token');
    return localToken ? JSON.parse(localToken) : null;
};

const getLocalRefreshToken = () => {
    const localToken = getLocalToken();
    return localToken?.refresh_token;
};

const getLocalAccessToken = () => {
    const localToken = getLocalToken();
    return localToken?.access_token;
};

const setLocalToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
};

const updateLocalAccessToken = (token) => {
    const localToken = getLocalToken();
    if (localToken) {
        localToken.accessToken = token;
        localStorage.setItem('token', JSON.stringify(localToken));
    } else {
        localStorage.setItem('token', JSON.stringify({ access_token: token }));
    }
};

const updateLocalToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
};

const getLocalUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const setLocalUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const updateLocalUserInfo = (user) => {
    const localUser = getLocalUser();
    const newLocalUser = { ...localUser, ...user };
    localStorage.setItem('user', JSON.stringify(newLocalUser));
};

const removeLocalToken = () => {
    localStorage.removeItem('token');
};

const removeLocalUser = () => {
    localStorage.removeItem('user');
};

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
