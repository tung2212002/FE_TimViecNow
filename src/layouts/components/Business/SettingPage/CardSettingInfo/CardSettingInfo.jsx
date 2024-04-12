import classNames from 'classnames/bind';

import styles from './CardSettingInfo.module.scss';
import { icons } from '../../../../../assets';
import { Link } from 'react-router-dom';
import path from '../../../../../constants/path';

const cx = classNames.bind(styles);

const CardSettingInfo = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('auth-level')}>
                    <div className={cx('auth-level-title')}>
                        Tài khoản xác thực:
                        <span className={cx('auth-level-value')}> Cấp 3/5</span>
                    </div>
                    <div className={cx('auth-level-content')}>
                        <div className={cx('auth-level-content-item')}>
                            <div className={cx('auth-level-content-icon')}>
                                <img src={icons.icon_star} alt="icon_star" className={cx('icon')} />
                            </div>
                            <div className={cx('auth-level-content-text')}>
                                <span className={cx('auth-level-content-text-title')}>Nâng cấp tài khoản: </span>
                                Để đạt
                                <span className={cx('auth-level-content-text-value')}> cấp 4/5</span>, Quý khách cần
                                <span className={cx('auth-level-content-text-value')}> được duyệt Giấy phép kinh doanh.</span>
                            </div>
                        </div>
                        <div className={cx('auth-level-content-item')}>
                            <div className={cx('auth-level-content-icon')}>
                                <img src={icons.icon_heart} alt="icon_star" className={cx('icon')} />
                            </div>
                            <div className={cx('auth-level-content-text')}>
                                <span className={cx('auth-level-content-text-title')}>Quyền lợi: </span>
                                Khi đạt <span className={cx('auth-level-content-text-value')}> cấp 4/5</span>,
                                <span className={cx('auth-level-content-text-value')}>
                                    {' '}
                                    nhà tuyển dụng có thể đăng tin tuyển dụng, tìm kiếm CV và xem CV ứng viên từ công cụ tìm kiếm CV không giới hạn.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('auth-level-button')}>
                        <Link to={path.DASHBOARD_SETTING_BUSINESS_LICENSE} className={cx('btn-link', 'btn')}>
                            Cập nhật thông tin xác thực
                        </Link>
                        <a href="/" className={cx('link')}>
                            Tìm hiểu thêm
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSettingInfo;
