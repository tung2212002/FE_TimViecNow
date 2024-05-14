import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLock, FaUser, FaFile, FaBuilding } from 'react-icons/fa';

import styles from './SiderBar.module.scss';
import path from '../../../../../constants/path';

const cx = classNames.bind(styles);

const SiderBar = ({ active }) => {
    const listGroup = [
        {
            id: 1,
            icon: FaLock,
            value: 'Đổi mật khẩu',
            path: path.DASHBOARD_SETTING_PASSWORD,
        },
        {
            id: 2,
            icon: FaUser,
            value: 'Thông tin cá nhân',
            path: path.DASHBOARD_SETTING_INFO,
        },
        {
            id: 3,
            icon: FaFile,
            value: 'Giấy phép kinh doanh',
            path: path.DASHBOARD_SETTING_BUSINESS_LICENSE,
        },
        {
            id: 4,
            icon: FaBuilding,
            value: 'Thông tin công ty',
            path: path.DASHBOARD_SETTING_COMPANY,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            {listGroup.map((item) => (
                <div key={item.id} className={cx('item', { active: active === item.id })}>
                    <Link to={item.path} className={cx('item-link')}>
                        <item.icon className={cx('icon')} />
                        <span className={cx('value')}>{item.value}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

SiderBar.propTypes = {
    active: PropTypes.number,
};

export default SiderBar;
