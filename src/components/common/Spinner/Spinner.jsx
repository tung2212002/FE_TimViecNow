import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Spinner.module.scss';

const cx = classNames.bind(styles);

const Spinner = ({ size = 'small', color = '#ab8cff', speed: speed = '2s' }) => {
    const spinnerStyle = {
        width: size === 'small' ? '20px' : size === 'medium' ? '40px' : '60px',
        height: size === 'small' ? '20px' : size === 'medium' ? '40px' : '60px',
        borderWidth: size === 'small' ? '3px' : size === 'medium' ? '5px' : '8px',
        borderColor: color,
        animationDuration: speed,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('spinner')} style={spinnerStyle}></div>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.string,
    speed: PropTypes.string,
};

export default Spinner;
