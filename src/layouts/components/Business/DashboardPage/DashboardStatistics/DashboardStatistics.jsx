import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { CiBullhorn } from 'react-icons/ci';
import { FaRegFilePowerpoint, FaRegFileAlt } from 'react-icons/fa';
import { TbFileImport } from 'react-icons/tb';
import { FaCircleInfo } from 'react-icons/fa6';
import { IoBriefcaseOutline } from 'react-icons/io5';

import styles from './DashboardStatistics.module.scss';
import path from '../../../../../constants/path';
import StatisticComponent from './StatisticComponent/StatisticComponent';
import { images } from '../../../../../assets';

const cx = classNames.bind(styles);

const DashboardStatistics = () => {
    const statistics = [
        {
            id: 1,
            title: 'Chiến dịch đang mở',
            value: '2',
            icon: CiBullhorn,
            color: '#2d7cf1',
            background: '#ebf3ff',
            url: path.DASHBOARD_CAMPAIGN,
        },
        {
            id: 2,
            title: 'CV tiếp cận',
            value: '4',
            icon: FaRegFilePowerpoint,
            color: '#00b14f',
            background: '#f5fff9',

            url: path.DASHBOARD_CV_MANAGEMENT,
        },
        {
            id: 3,
            title: 'Tin tuyển dụng hiển thị',
            value: '2',
            icon: FaRegFileAlt,
            color: '#e5b500',
            background: '#fffae9',
            url: path.DASHBOARD_CAMPAIGN_PUSHING,
        },
        {
            id: 4,
            title: 'CV ứng tuyển mới',
            value: '2',
            icon: TbFileImport,
            color: '#da4538',
            background: '#fff3f2',

            url: path.DASHBOARD_CAMPAIGN_CV,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h5 className={cx('title')}>Hiệu quả tuyển dụng</h5>
                    <Tippy
                        render={(attrs) => (
                            <div className={cx('tooltip')} {...attrs}>
                                <div className={cx('tooltip-content')}>
                                    <div className={cx('tooltip-title')}>Số liệu cập nhật theo ngày</div>
                                </div>
                            </div>
                        )}
                        interactive
                        placement="right-start"
                        delay={300}
                        arrow={true}
                        zIndex={9999}
                        offset={[0, 10]}
                        appendTo={() => document.body}
                    >
                        <div className={cx('icon')}>
                            <FaCircleInfo className={cx('icon-info')} />
                        </div>
                    </Tippy>
                </div>
                <div className={cx('content')}>
                    {statistics.map((item) => (
                        <Link to={path.DASHBOARD_CAMPAIGN} key={item.id} className={cx('content-item')} style={{ background: item.background }}>
                            <StatisticComponent title={item.title} value={item.value} icon={<item.icon />} color={item.color} background={item.background} />
                        </Link>
                    ))}
                </div>
                <div className={cx('chart-recruitment')}>
                    <img src={images.chart_recruitment} alt="chart-recruitment" className={cx('img')} />
                    <div className={cx('chart-recruitment-info')}>
                        <span className={cx('info-title')}>Chưa có thông tin để hiện thị</span>
                    </div>
                </div>
                <hr />
                <div to={path.DASHBOARD_CAMPAIGN} className={cx('view-all')}>
                    <div className={cx('view-all-content')}>
                        <Link to={path.DASHBOARD_CAMPAIGN} className={cx('view-all-text')}>
                            <IoBriefcaseOutline className={cx('icon')} />
                            QUẢN LÝ CHIẾN DỊCH TUYỂN DỤNG
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStatistics;
