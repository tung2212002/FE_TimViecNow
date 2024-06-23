import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaChevronRight } from 'react-icons/fa6';

import styles from './JobSearchDetailPage.module.scss';
import useDocumentTitle from '@hooks/useDocumentTitle';
import {
    JobDetailBody,
    JobDetailHeader,
    JobHeader,
    CompanySummary,
    JobCategory,
    JobReport,
    JobSuitable,
    TabCompany,
    JobSummary,
} from '@layouts/components/User/JobDetailPage';
import { SEO } from '@layouts/components/User';
import { getJobSerivce } from '@services/user/jobService';
import path from '@constants/path';
import { SkeletonJobDetailPage } from '@components/skeleton';

const cx = classNames.bind(styles);

const JobSearchDetailPage = () => {
    const params = useParams();
    const { id } = params;
    const [job, setJob] = useState(null);

    const [state, setState] = useState('info');

    const handleScrollToTopBody = () => {
        const detailBody = document.getElementById('job-search-detail-body');
        detailBody.scrollIntoView({ behavior: 'smooth' });
    };

    const handleToInfo = () => {
        setState('info');
        handleScrollToTopBody();
    };

    const handleToCompany = () => {
        setState('company');
        handleScrollToTopBody();
    };

    const handleToRelated = () => {
        setState('related');
        handleScrollToTopBody();
    };

    useDocumentTitle('TVNow - Tìm kiếm việc làm ngay');

    useEffect(() => {
        if (id) {
            getJobSerivce(id)
                .then((res) => {
                    if (res.status === 200) {
                        setJob(res.data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <JobDetailHeader />

            {job ? (
                <div className={cx('container')}>
                    <div className={cx('job-path')}>
                        <Link to="/">
                            <span className={cx('job-path-item')}>Trang chủ</span>
                        </Link>
                        <FaChevronRight className={cx('job-path-icon')} />
                        <Link to={path.JOB_SEARCH}>
                            <span className={cx('job-path-item')}>Tìm kiếm việc làm</span>
                        </Link>
                        <FaChevronRight className={cx('job-path-icon')} />
                        <span className={cx('job-path-name')}>{job.title}</span>
                    </div>
                    <div className={cx('job-detail')}>
                        <div className={cx('job-detail-body')}>
                            <div className={cx('job-detail-left')}>
                                <JobHeader job={job} />
                                <TabCompany handleToInfo={handleToInfo} handleToCompany={handleToCompany} handleToRelated={handleToRelated} state={state} />
                                <JobDetailBody job={job} state={state} />
                            </div>
                            <div className={cx('job-detail-right')}>
                                <CompanySummary company={job.company} />
                                <JobSummary job={job} />
                                <JobCategory job={job} />
                                <JobSuitable job={job} />
                                <JobReport />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <SkeletonJobDetailPage />
                </div>
            )}

            <div className={cx('seo')}>
                <SEO />
            </div>
        </div>
    );
};

export default JobSearchDetailPage;
