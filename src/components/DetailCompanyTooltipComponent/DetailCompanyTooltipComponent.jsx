import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLocationDot, FaBusinessTime, FaClock } from 'react-icons/fa6';

import styles from './DetailCompanyTooltipComponent.module.scss';
import { convertTimeAgo } from '../../utils/convertTimeUtil';

const cx = classNames.bind(styles);

const DetailCompanyTooltipComponent = ({ job }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-header')}>
                    <div className={cx('box-title')}>
                        <div className={cx('company-logo')}>
                            <img
                                className={cx('img')}
                                src={job.company.logo_url}
                                alt={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                                title={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                            />
                        </div>
                        <div className={cx('title-block')}>
                            <h2 className={cx('title')}>{job.title}</h2>
                            <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('company-name')}>
                                {job.company.name}
                            </a>
                            <label className={cx('salary')}>{job.salary}</label>
                        </div>
                    </div>
                    <div className={cx('box-info')}>
                        <div className={cx('company-address')}>
                            <FaLocationDot className={cx('icon')} />
                            <span className={cx('text')}>{job.short_cities}</span>
                        </div>
                        <div className={cx('company-exp')}>
                            <FaBusinessTime className={cx('icon')} />
                            <span className={cx('text')}>{job.job_exp}</span>
                        </div>
                        <div className={cx('company-deadline')}>
                            <FaClock className={cx('icon')} />
                            <span className={cx('text')}>{convertTimeAgo(job.deadline)}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('box-header-scroll')}></div>
                <div className={cx('box-scroll')}>
                    <div className={cx('job-info')}>
                        <h3 className={cx('title')}>Mô tả công việc</h3>
                        <div className={cx('content-tab')} dangerouslySetInnerHTML={{ __html: job.job_description }}></div>
                        <h3 className={cx('title')}>Yêu cầu ứng viên</h3>
                        <div className={cx('content-tab')} dangerouslySetInnerHTML={{ __html: job.job_requirement }}></div>
                        <h3 className={cx('title')}>Quyền lợi</h3>
                        <div className={cx('content-tab')} dangerouslySetInnerHTML={{ __html: job.job_benefit }}></div>
                        <h3 className={cx('title')}>Địa điểm làm việc</h3>
                        <div className={cx('content-tab')} dangerouslySetInnerHTML={{ __html: job.address }}></div>
                        <h3 className={cx('title')}>Thời gian làm việc</h3>
                        {job.working_times.map((time, index) => (
                            <div key={index} className={cx('content-tab')}>
                                <div className={cx('text')}>{time}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('box-footer')}>
                    <a href={job.url} target="_blank" rel="noreferrer" className={cx('btn', 'btn-apply')}>
                        Ứng tuyển
                    </a>
                    <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('btn', 'btn-company')}>
                        Xem chi tiết
                    </a>
                </div>
            </div>
        </div>
    );
};

DetailCompanyTooltipComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default DetailCompanyTooltipComponent;
