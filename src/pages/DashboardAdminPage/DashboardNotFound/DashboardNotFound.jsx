import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './DashboardNotFound.module.scss';
import { images } from '../../../assets';
import path from '../../../constants/path';

const cx = classNames.bind(styles);

const DashboardNotFound = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img src={images.not_found} alt="not-found" className={cx('not-found')} />
                <p className={cx('description')}>Liên kết bạn đang truy cập không tồn tại. Hãy kiểm tra lại.</p>
                <Link to={path.DASHBOARD_HOME} className={cx('back-home')}>
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default DashboardNotFound;
