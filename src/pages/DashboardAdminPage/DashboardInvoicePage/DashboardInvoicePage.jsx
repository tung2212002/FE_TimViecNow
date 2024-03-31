import classNames from 'classnames/bind';

import styles from './DashboardInvoicePage.module.scss';
import { images } from '../../../assets';
import path from '../../../constants/path';

const cx = classNames.bind(styles);

const DashboardInvoicePage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-modal')}></div>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <h6 className={cx('breadcrumb')}>Dịch vụ của tôi</h6>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-list')}>
                        <div className={cx('box-image')}>
                            <img src={images.invoice_service_empty} alt="invoice" className={cx('image')} />
                            <p className={cx('text')}>Bạn chưa có dịch vụ nào trong tài khoản</p>
                            <div className={cx('button')}>
                                <a href={path.DASHBOARD_CART} className={cx('button-link')}>
                                    Thêm dịch vụ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardInvoicePage;
