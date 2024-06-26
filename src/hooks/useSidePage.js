import { useEffect, useState } from 'react';
import { sideType } from '../constants';

const useSidePage = () => {
    const handleGetSide = () => {
        const currentPath = window.location.pathname;
        return currentPath.startsWith('/tuyen-dung/app') ? sideType.BUSINESS : sideType.USER;
    };

    const getInitialSide = () => {
        return handleGetSide();
    };

    const [side, setSide] = useState(getInitialSide);

    useEffect(() => {
        const updateSide = () => {
            const newSide = handleGetSide();
            setSide(newSide);
        };

        window.addEventListener('popstate', updateSide);

        return () => {
            window.removeEventListener('popstate', updateSide);
        };
    }, []);

    return side;
};

export default useSidePage;
