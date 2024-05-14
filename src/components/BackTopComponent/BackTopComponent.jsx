import { useState, useEffect } from 'react';
import styles from './BackTopComponent.module.scss';
import classNames from 'classnames/bind';

import { FaArrowUp } from 'react-icons/fa';

const cx = classNames.bind(styles);

const BackTopComponent = () => {
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
            <div className={cx('text')}>TOP</div>
        </button>
    );
};

export default BackTopComponent;
