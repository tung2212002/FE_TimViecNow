import classNames from 'classnames/bind';

import styles from './DashboardAdminPage.module.scss';
import DashboardHomeSlide from '../../../components/DashboardAdmin/DashboardHomeSlide/DashboardHomeSlide';
import DashboardStatistics from '../../../components/DashboardAdmin/DashboardHomeStatistics/DashboardStatistics';
import DashboardHomeMember from '../../../components/DashboardAdmin/DashboardHomeMember/DashboardHomeMember';

const cx = classNames.bind(styles);

const DashboardAdminPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-modal')}></div>
            <div className={cx('container')}>
                <div className={cx('banner')} />
                <div className={cx('content')}>
                    <h4 className={cx('title')}>Bảng tin</h4>
                    <div className={cx('content-slide')}>
                        <DashboardHomeSlide />
                    </div>
                    <div className={cx('content-list')}>
                        <div className={cx('column', 'statistics')}>
                            <div className={cx('statistics-content')}>
                                <DashboardStatistics />
                            </div>
                        </div>

                        <div className={cx('column', 'member')}>
                            <div className={cx('member-content')}>
                                <DashboardHomeMember />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdminPage;
