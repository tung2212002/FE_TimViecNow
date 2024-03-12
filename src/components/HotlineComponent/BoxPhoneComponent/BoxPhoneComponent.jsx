import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import styles from './BoxPhoneComponent.module.scss';

const cx = classNames.bind(styles);

const BoxPhoneComponent = ({ full_name, phone }) => {
    return (
        <a className={cx('wrapper')} href={`tel:${phone}`}>
            {full_name ? <FaPhoneAlt className={cx('icon-phone')} /> : <MdEmail className={cx('icon-phone')} />}
            <span className={cx('phone-number')}>{phone}</span>
            {full_name && (
                <span className={cx('outer-dot')}>
                    <span className={cx('dot')}></span>
                </span>
            )}
            {full_name && <span className={cx('full-name')}>{full_name}</span>}
        </a>
    );
};

BoxPhoneComponent.propTypes = {
    full_name: PropTypes.string,
    phone: PropTypes.string,
};

export default BoxPhoneComponent;
