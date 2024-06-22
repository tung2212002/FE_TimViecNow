import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import { FaArrowUp } from 'react-icons/fa';

import styles from './BackTopAdminComponent.module.scss';

const cx = classNames.bind(styles);

const BackTopAdminComponent = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleBackTop = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleBackTop);
        return () => {
            window.removeEventListener('scroll', handleBackTop);
        };
    }, []);

    return (
        <button onClick={scrollToTop} className={cx('btn', isVisible ? 'visible' : '')}>
            <FaArrowUp className={cx('icon')} />
            <div className={cx('text')}>Về đầu trang</div>
        </button>
    );
};

export default BackTopAdminComponent;
