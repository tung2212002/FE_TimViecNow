import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ title, message, type = 'info' }) {
    const [progress, setProgress] = useState({
        left: 0,
        bottom: 0,
    });

    const icons = {
        info: FaInfoCircle,
        success: FaCircleCheck,
        error: FaCircleXmark,
        warning: FaExclamationCircle,
    };

    const Icon = icons[type];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev.left < 100) {
                    return { ...prev, left: prev.left + 10 };
                } else if (prev.bottom < 100) {
                    return { ...prev, bottom: prev.bottom + 2 };
                } else {
                    return { left: 0, bottom: 0 };
                }
            });
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={cx('wrapper', `wrapper-${type}`)}>
            <div className={cx('container', type)}>
                <div className={cx('icon')}>
                    <Icon className={cx(`btn-${type}`)} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>{title}</div>
                    <div className={cx('message')}>{message}</div>
                </div>
            </div>
            <div className={cx('progress', 'progress-bar-left')} style={{ height: `${progress.left}%` }}></div>
            <div className={cx('progress', 'progress-bar-bottom')} style={{ width: `${progress.bottom}%` }}></div>
        </div>
    );
}

Toast.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
};

export default Toast;
