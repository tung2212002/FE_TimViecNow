import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaMessage } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';

import styles from './AppliedJobComponent.module.scss';
import slugConvert from '@utils/convert/slugConvert';
import path from '@constants/path';
import { convertSalary } from '@utils/convert/convertSalary';
import { convertDateTime } from '@utils/convert/convertTimeUtil';
import { icons } from '@assets';

const cx = classNames.bind(styles);

const AppliedJobComponent = ({ cv }) => {
    const statusItem = {
        published: 'Đã ứng tuyển',
        pending: 'Chờ phản hồi',
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-container')}>
                    <img className={cx('logo')} src={cv.company?.logo || icons.icon_default_logo_company} alt="logo" />
                </div>
                <div className={cx('info-container')}>
                    <div className={cx('title-block')}>
                        <div className={cx('title')}>
                            <a
                                href={`${path.JOB_SEARCH_DETAIL}/${cv.job.id}/${slugConvert(cv.job.title)}`}
                                target="_blank"
                                rel="noreferrer"
                                className={cx('title-link')}
                            >
                                {cv.job.title}
                            </a>
                        </div>
                        <div className={cx('salary')}>
                            <label className={cx('label')}>{convertSalary(cv.job.salary_type, cv.job.min_salary, cv.job.max_salary)}</label>
                        </div>
                    </div>
                    <div className={cx('company-name')}>
                        <a
                            href={path.COMPANY_DETAIL + '/' + cv.company.id + '/' + slugConvert(cv.company.name)}
                            target="_blank"
                            rel="noreferrer"
                            className={cx('company-link')}
                        >
                            {cv.company?.name.toUpperCase()}
                        </a>
                    </div>
                    <div className={cx('job-applied-date')}>
                        <span className={cx('date')}>Thời gian ứng tuyển: {convertDateTime(cv.job.created_at)}</span>
                    </div>
                    <div className={cx('box-footer')}>
                        <div className={cx('job-applied-date')}>
                            CV đã ứng tuyển:{' '}
                            <a href={cv.cv} target="_blank" rel="noreferrer" className={cx('cv-link')}>
                                CV tải lên
                            </a>
                        </div>
                        <div className={cx('action-block')}>
                            <a
                                className={cx('btn', 'apply')}
                                href={`${path.JOB_SEARCH_DETAIL}/${cv.job.id}/${slugConvert(cv.job.title)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaMessage className={cx('icon')} />
                                <span className={cx('text')}>Nhắn tin</span>
                            </a>
                            <a className={cx('btn', 'apply')} href={cv.cv} target="_blank" rel="noreferrer">
                                <FaEye className={cx('icon')} />
                                <span className={cx('text')}>Xem CV</span>
                            </a>
                        </div>
                    </div>
                    <div className={cx('box-cv-status')}>
                        <div className={cx('cv-status-text')}>
                            Trạng thái: <span className={cx('applied')}>{statusItem[cv.status]}</span>
                        </div>
                        <div className={cx('cv-status-time')}>Vào lúc: {convertDateTime(cv.created_at)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AppliedJobComponent.propTypes = {
    cv: PropTypes.object.isRequired,
};

export default AppliedJobComponent;
