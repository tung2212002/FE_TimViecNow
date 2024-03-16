import classNames from 'classnames/bind';

import styles from './JobSearchPage.module.scss';
import JobSearchHeaderComponent from '../../components/JobSearchHeaderComponent/JobSearchHeaderComponent';
import SectionFeatureJobComponent from '../../components/SectionFeatureJobComponent/SectionFeatureJobComponent';
import JobTripleBannerSlide from '../../components/JobTripleBannerSlide/JobTripleBannerSlide';
import VerticalBannerComponent from '../../components/VerticalBannerComponent/VerticalBannerComponent';
import TopJobSlideComponent from '../../components/TopJobSlideComponent/TopJobSlideComponent';
import HotlineComponent from '../../components/HotlineComponent/HotlineComponent';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const cx = classNames.bind(styles);

const JobSearchPage = () => {
    useDocumentTitle('TVNow - Tìm kiếm việc làm ngay');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <JobSearchHeaderComponent />
                <SectionFeatureJobComponent />
                <JobTripleBannerSlide />
                <div className={cx('wrapper-job-list')}>
                    <div className={cx('container-job-list')}>
                        <div className={cx('job-list')}>
                            <SectionFeatureJobComponent reponsive={true} number={8} />
                        </div>
                        <div className={cx('banner')}>
                            <VerticalBannerComponent />
                        </div>
                    </div>
                </div>
                <TopJobSlideComponent />
                <HotlineComponent />
            </div>
        </div>
    );
};

export default JobSearchPage;
