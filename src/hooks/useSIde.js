import { useEffect, useState } from 'react';

const useSide = () => {
    const [side, setSide] = useState('');

    useEffect(() => {
        const updateSide = () => {
            const currentPath = window.location.pathname;
            const newSide = currentPath.startsWith('/tuyen-dung/app') ? 'employer' : 'candidate';
            setSide(newSide);
        };

        updateSide();

        window.addEventListener('popstate', updateSide);

        return () => {
            window.removeEventListener('popstate', updateSide);
        };
    }, []);

    return side;
};

export default useSide;
