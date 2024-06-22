import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLock } from 'react-icons/fa';

import styles from './JobDetailBody.module.scss';
import { showModal } from '@redux/features/modal/modalSlice';
import JobHeader from './JobHeader/JobHeader';
import path from '@constants/path';
import slugConvert from '@utils/slugCovnert';

const cx = classNames.bind(styles);

const JobDetailBody = ({ job, handleCloseDetail }) => {
    const displayLocation = {};
    const dispatch = useDispatch();
    const ref = useRef(null);

    const listDescription = [
        {
            id: 1,
            title: 'Mô tả công việc',
            content: job.job_description,
        },
        {
            id: 2,
            title: 'Yêu cầu ứng viên',
            content: job.job_requirement,
        },
        {
            id: 3,
            title: 'Quyền lợi',
            content: job.job_benefit,
        },
    ];

    const showApply = () => {
        dispatch(showModal());
    };

    useEffect(() => {
        const refCurrent = ref.current;
        if (refCurrent) {
            refCurrent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [job]);

    return (
        <div className={cx('wrapper')} id="job-search-detail-body">
            <div className={cx('container')}>
                <div className={cx('tab')}>
                    <JobHeader job={job} handleCloseDetail={handleCloseDetail} />
                </div>
                <div className={cx('body')} ref={ref}>
                    <div className={cx('title')}>Chi tiết tuyển dụng</div>
                    <div className={cx('content')}>
                        <div className={cx('description')}>
                            {listDescription.map((item) => (
                                <div className={cx('description-item')} key={item.id}>
                                    <h3 className={cx('title-item')}>{item.title}</h3>
                                    <div className={cx('content-item')} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                </div>
                            ))}
                            <div className={cx('description-item')}>
                                <h3 className={cx('title-item')}>Địa điểm làm việc</h3>
                                <div className={cx('content-item')}>
                                    {job?.locations?.map((location, index) => {
                                        const shouldHide = displayLocation[location.province.name] && !location.description;
                                        displayLocation[location.province.name] = true;

                                        return (
                                            !shouldHide && (
                                                <p key={index}>
                                                    - {location.province.name} {location.description && ` : ${location.description}`}{' '}
                                                    {location.district && ` - ${location.district.name}`}
                                                </p>
                                            )
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={cx('description-item')}>
                                <h3 className={cx('title-item')}>Thời gian làm việc</h3>
                                <div className={cx('content-item')}>
                                    {job.working_times.map((time, index) => (
                                        <p key={index}>
                                            - Thứ {time.date_from + 1} - Thứ {time.date_to + 1} (từ {time.start_time?.slice(0, 5)} -{' '}
                                            {time.end_time?.slice(0, 5)})
                                        </p>
                                    ))}
                                </div>
                                {job.working_time_text && job.working_time_text !== '""' && (
                                    <div className={cx('content-item')} dangerouslySetInnerHTML={{ __html: job.working_time_text }}></div>
                                )}
                            </div>

                            <div className={cx('description-item')}>
                                <h3 className={cx('title-item')}>Cách thức ứng tuyển</h3>
                                <div className={cx('content-item')}>
                                    Ứng viên nộp hồ sơ trực tuyến bằng cách bấm
                                    <strong> Ứng tuyển </strong>
                                    ngay dưới đây.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('action-item', 'apply')}>
                            <a
                                className={cx('action-button')}
                                href={path.JOB_SEARCH_DETAIL + '/' + job.id + '/' + slugConvert(job.title)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ứng tuyển ngay
                            </a>
                            <button className={cx('action-button')}>Lưu tin</button>
                        </div>
                        <div className={cx('action-item', 'applied', 'hidden')}>
                            <a
                                className={cx('action-button')}
                                href={path.JOB_SEARCH_DETAIL + '/' + job.id + '/' + slugConvert(job.title)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Ứng tuyển ngay
                            </a>
                            <button className={cx('action-button')}>Lưu tin</button>
                        </div>
                        <div className={cx('deadline')}>Hạn nộp hồ sơ: {job.deadline}</div>
                        <div className={cx('quantity', 'disabled')}>
                            <div className={cx('quantity-icon')}>
                                <FaLock className={cx('icon-lock')} />
                            </div>
                            <div className={cx('text')}>TVNow chưa hỗ trợ xem số lượt ứng tuyển cho việc làm này</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobDetailBody.propTypes = {
    job: PropTypes.object.isRequired,
    handleCloseDetail: PropTypes.func.isRequired,
};

export default JobDetailBody;
