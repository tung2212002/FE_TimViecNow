import { sideType } from '../../constants';
import {
    removeLocalBusiness,
    removeLocalBusinessToken,
    setLocalBusiness,
    setLocalBusinessToken,
    updateLocalBusinessInfo,
    updateLocalBusinessToken,
    getLocalBusinessAccessToken,
    getLocalBusinessRefreshToken,
    getLocalBusinessToken,
    removeAllBusiness,
    updateLocalBusinessAccessToken,
} from '../authStorage/authBusinessStorage';
import {
    getLocalRefreshToken,
    getLocalToken,
    removeAll,
    updateLocalAccessToken,
    removeLocalToken,
    removeLocalUser,
    setLocalToken,
    setLocalUser,
    updateLocalToken,
    updateLocalUserInfo,
    getLocalAccessToken,
} from '../authStorage/authLocalStorage';

const functionLocal = (side) => {
    if (side === sideType.USER) {
        return {
            getLocalToken: getLocalToken,
            getLocalAccessToken: getLocalAccessToken,
            getLocalRefreshToken: getLocalRefreshToken,
            removeLocalToken: removeLocalToken,
            removeLocalUser: removeLocalUser,
            removeAll: removeAll,
            setLocalToken: setLocalToken,
            setLocalUser: setLocalUser,
            updateLocalUserInfo: updateLocalUserInfo,
            updateLocalToken: updateLocalToken,
            updateLocalAccessToken: updateLocalAccessToken,
        };
    } else if (side === sideType.BUSINESS) {
        return {
            getLocalToken: getLocalBusinessToken,
            getLocalAccessToken: getLocalBusinessAccessToken,
            getLocalRefreshToken: getLocalBusinessRefreshToken,
            removeLocalToken: removeLocalBusinessToken,
            removeLocalUser: removeLocalBusiness,
            removeAll: removeAllBusiness,
            setLocalToken: setLocalBusinessToken,
            setLocalUser: setLocalBusiness,
            updateLocalUserInfo: updateLocalBusinessInfo,
            updateLocalToken: updateLocalBusinessToken,
            updateLocalAccessToken: updateLocalBusinessAccessToken,
        };
    }
};

export default functionLocal;
