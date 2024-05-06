import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './CompanyRecruitment.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getListJobSerivce } from '../../../../../services/jobService';
import JobSuggest from '../../JobDetailPage/JobDetailBody/JobSuggest/JobSuggest';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const cx = classNames.bind(styles);

const CompanyRecruitment = ({ company }) => {
    const ref = useRef(null);

    const [jobInfo, setJobInfo] = useState({
        job: [],
        total: null,
        page: 1,
        fetchPage: 1,
        currentJob: [],
    });

    const handlePrevPage = () => {
        setJobInfo((prev) => ({
            ...prev,
            page: prev.page - 1,
        }));

        const element = ref.current;
        element.scrollIntoView({ behavior: 'smooth' });
    };

    const handleNextPage = () => {
        setJobInfo((prev) => ({
            ...prev,
            page: prev.page + 1,
        }));

        const element = ref.current;
        element.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (jobInfo.page < jobInfo.fetchPage) {
            setJobInfo((prev) => ({
                ...prev,
                currentJob: jobInfo.job.slice((jobInfo.page - 1) * 6, jobInfo.page * 6),
            }));
        } else {
            const params = {
                limit: 6,
                company_id: company.id,
                skip: (jobInfo.page - 1) * 6,
                sort_by: 'deadline',
            };

            getListJobSerivce(params)
                .then((res) => {
                    if (res.status === 200) {
                        setJobInfo((prev) => ({
                            ...prev,
                            job: [...prev.job, ...res.data.data.jobs],
                            total: Math.ceil(res.data.data.count / 6),
                            fetchPage: prev.fetchPage + 1,
                            currentJob: res.data.data.jobs,
                        }));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [jobInfo.page]);

    return (
        <div className={cx('wrapper')} ref={ref}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Tuyển dụng</h2>
                <div className={cx('body')}>
                    {jobInfo.currentJob.map((item, index) => (
                        <JobSuggest key={index} job={item} numberStyle={1} />
                    ))}
                    <div className={cx('footer')}>
                        <div className={cx('content-footer')}>
                            <span className={cx('btn', jobInfo.page === 1 ? 'deactive' : '')} onClick={handlePrevPage} disabled={jobInfo.page === 1}>
                                <VscChevronLeft className={cx('icon')} />
                            </span>
                            <p className={cx('text-page')}>
                                <span className={cx('number')}>{jobInfo.page}</span> / {jobInfo.total} trang
                            </p>
                            <span
                                className={cx('btn', jobInfo.page === jobInfo.total ? 'deactive' : '')}
                                onClick={handleNextPage}
                                disabled={jobInfo.page === jobInfo.total}
                            >
                                <VscChevronRight className={cx('icon')} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyRecruitment.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyRecruitment;
