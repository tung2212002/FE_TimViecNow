import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLocationDot, FaBusinessTime, FaClock } from 'react-icons/fa6';

import styles from './DetailCompanyTooltipComponent.module.scss';
import { Experience } from '@constants';
import { convertDateFuture } from '@utils/convert/convertTimeUtil';
import { convertSalary } from '@utils/convert/convertSalary';
import path from '@constants/path';
import slugConvert from '@utils/convert/slugConvert';

const cx = classNames.bind(styles);

const DetailCompanyTooltipComponent = ({ job }) => {
    const displayLocation = {};
    const setProvince = [];

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-header')}>
                    <div className={cx('box-title')}>
                        <div className={cx('company-logo')}>
                            <img
                                className={cx('img')}
                                src={job.company.logo}
                                alt={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                                title={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                            />
                        </div>
                        <div className={cx('title-block')}>
                            <h2 className={cx('title')}>{job.title}</h2>
                            <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('company-name')}>
                                {job.company.name}
                            </a>
                            <label className={cx('salary')}>{convertSalary(job.salary_type, job.min_salary, job.max_salary)}</label>
                        </div>
                    </div>
                    <div className={cx('box-info')}>
                        <div className={cx('company-address')}>
                            <FaLocationDot className={cx('icon')} />
                            <span className={cx('text')}>
                                {setProvince.length <= 2 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`}
                            </span>
                        </div>
                        <div className={cx('company-exp')}>
                            <FaBusinessTime className={cx('icon')} />
                            <span className={cx('text')}>{Experience[job.job_experience_id - 1]?.name}</span>
                        </div>
                        <div className={cx('company-deadline')}>
                            <FaClock className={cx('icon')} />
                            <span className={cx('text')}>Còn {convertDateFuture(job.deadline)}</span>
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
                        <div className={cx('content-tab')}>
                            {job?.locations?.map((location, index) => {
                                const shouldHide = displayLocation[location.province.name] && !location.description;
                                displayLocation[location.province.name] = true;

                                return (
                                    !shouldHide && (
                                        <div key={index} className={cx('text')}>
                                            - {location.province.name} {location.description && ` : ${location.description}`}{' '}
                                            {location.district && ` - ${location.district.name}`}
                                        </div>
                                    )
                                );
                            })}
                        </div>
                        <h3 className={cx('title')}>Thời gian làm việc</h3>
                        {job.working_times.map((time, index) => (
                            <div key={index} className={cx('content-tab')}>
                                <div className={cx('text')}>
                                    - Thứ {time.date_from + 1} - Thứ {time.date_to + 1} (từ {time.start_time?.slice(0, 5)} - {time.end_time?.slice(0, 5)})
                                </div>
                            </div>
                        ))}
                        {job.working_time_text !== '""' && (
                            <div className={cx('content-tab')} dangerouslySetInnerHTML={{ __html: job.working_time_text }}></div>
                        )}
                    </div>
                </div>
                <div className={cx('box-footer')}>
                    <a href={job.url} target="_blank" rel="noreferrer" className={cx('btn', 'btn-apply')}>
                        Ứng tuyển
                    </a>
                    <a
                        href={path.JOB_SEARCH_DETAIL + '/' + job.id + '/' + slugConvert(job.title)}
                        target="_blank"
                        rel="noreferrer"
                        className={cx('btn', 'btn-company')}
                    >
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
