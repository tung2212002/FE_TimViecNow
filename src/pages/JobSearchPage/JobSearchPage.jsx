import classNames from 'classnames/bind';

import styles from './JobSearchPage.module.scss';
import { JobSearchHeader } from '@layouts/components/User/JobSearchPage';
import { VerticalBanner, JobTripleBannerSlide, Hotline, FeatureJob, TopJobSlide } from '@layouts/components/User';
import useDocumentTitle from '@hooks/useDocumentTitle';

const cx = classNames.bind(styles);

const JobSearchPage = () => {
    useDocumentTitle('TVNow - Tìm kiếm việc làm ngay');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <JobSearchHeader />
                <FeatureJob />
                <JobTripleBannerSlide />
                <div className={cx('wrapper-job-list')}>
                    <div className={cx('container-job-list')}>
                        <div className={cx('job-list')}>
                            <FeatureJob reponsive={true} number={8} />
                        </div>
                        <div className={cx('banner')}>
                            <VerticalBanner />
                        </div>
                    </div>
                </div>
                <TopJobSlide />
                <Hotline />
            </div>
        </div>
    );
};

export default JobSearchPage;
