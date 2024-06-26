import { sideType } from '@constants';
import { logoutService } from '@services/user/authService';
import { logoutBusinessService } from '@services/business/businessAuthService';
import { getInfoService } from '@services/user/userService';
import { getInfoBusinessService } from '@services/business/businessService';

const functionService = (side) => {
    if (side === sideType.USER) {
        return {
            getInfoService: getInfoService,
            logoutService: logoutService,
        };
    } else if (side === sideType.BUSINESS) {
        return {
            getInfoService: getInfoBusinessService,
            logoutService: logoutBusinessService,
        };
    }
};

export default functionService;
