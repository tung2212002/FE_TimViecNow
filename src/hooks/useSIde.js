import { useEffect, useState } from 'react';

const useSide = () => {
    const getInitialSide = () => {
        const currentPath = window.location.pathname;
        return currentPath.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate';
    };

    const [side, setSide] = useState(getInitialSide);

    useEffect(() => {
        const updateSide = () => {
            const currentPath = window.location.pathname;
            const newSide = currentPath.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate';
            setSide(newSide);
        };

        window.addEventListener('popstate', updateSide);

        return () => {
            window.removeEventListener('popstate', updateSide);
        };
    }, []);

    return side;
};

export default useSide;
