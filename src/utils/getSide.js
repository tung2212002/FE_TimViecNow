import { sideType } from '../constants';

const getSide = () => {
    const currentPath = window.location.pathname;
    return currentPath.startsWith('/tuyen-dung/app') ? sideType.BUSINESS : sideType.USER;
};

export default getSide;
