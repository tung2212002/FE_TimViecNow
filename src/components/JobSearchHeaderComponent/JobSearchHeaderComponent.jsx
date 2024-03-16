import classNames from 'classnames/bind';

import styles from './JobSearchHeaderComponent.module.scss';
import { SearchSalaryComponent, SearchExpComponent, SearchJobSearchHeaderComponent } from '../common';
import JobSearchBannerSlide from './JobSearchBannerSlide/JobSearchBannerSlide';
import { images } from '../../assets';

const cx = classNames.bind(styles);

const JobSearchHeaderComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-title')}>
                    <h1 className={cx('title')}>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
                    <p className={cx('desc')}>
                        Tiếp cận
                        <span className={cx('highlight')}> 1,000+ </span>
                        tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam.
                    </p>
                </div>
                <div className={cx('box-search')}>
                    <SearchJobSearchHeaderComponent />
                    <div className={cx('group-box')}>
                        <SearchExpComponent />
                        <SearchSalaryComponent />
                    </div>
                    <div className={cx('box-filter')}>
                        <button className={cx('btn-filter')}>Tìm kiếm</button>
                    </div>
                </div>
                <div className={cx('box-work')}>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Vị trí chờ bạn khám phá</span>
                        <span className={cx('quantity')}>4.321</span>
                    </div>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Việc làm mới nhất</span>
                        <span className={cx('quantity')}>321</span>
                    </div>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Cập nhật lúc</span>
                        <span className={cx('quantity')}>16:56 01/01/2024</span>
                    </div>
                </div>
                <JobSearchBannerSlide />
            </div>
            <img src={images.robot} alt="" className={cx('img-robot', 'img-back')} />
            <img src={images.bg_left} alt="" className={cx('bg-left', 'img-back')} />
            <img src={images.bg_right} alt="" className={cx('bg-right', 'img-back')} />
            <img src={images.bg_left_tablet} alt="" className={cx('bg-left-tablet', 'img-back')} />
            <img src={images.bg_right_tablet} alt="" className={cx('bg-right-tablet', 'img-back')} />
        </div>
    );
};

export default JobSearchHeaderComponent;
