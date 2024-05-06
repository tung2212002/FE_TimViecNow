import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaArrowRight } from 'react-icons/fa6';

import styles from './JobSuitable.module.scss';
import JobSuitableComponent from './JobSuitableComponent/JobSuitableComponent';
import { searchJobService } from '../../../../../services/jobService';

const cx = classNames.bind(styles);

const JobSuitable = ({ job }) => {
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        if (job && job?.categories?.length > 0) {
            const params = {
                skip: 0,
                limit: 3,
                category_id: job.categories[0].id,
                job_experience_id: job.job_experience_id,
            };
            searchJobService(params)
                .then((res) => {
                    if (res.status === 200) {
                        setJobs(res.data.data.jobs);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [job]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Gợi ý việc làm phù hợp</div>
                <div className={cx('job-list')}>{jobs && jobs?.slice(0, 3)?.map((item, index) => <JobSuitableComponent key={index} job={item} />)}</div>
                <a href="/tim-kiem" className={cx('link')} target="_blank" rel="noreferrer">
                    <span className={cx('text')}>Xem thêm công việc</span>
                    <span className={cx('icon')}>
                        <FaArrowRight className={cx('icon-arrow')} />
                    </span>
                </a>
            </div>
        </div>
    );
};

JobSuitable.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSuitable;
