import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './JobSummary.module.scss';
import { icons } from '@assets';
import { convertSalary } from '@utils/convert/convertSalary';
import { Experience } from '@constants';

const cx = classNames.bind(styles);

const JobSummary = ({ job }) => {
    const employmentTypes = {
        full_time: 'Toàn thời gian',
        part_time: 'Bán thời gian',
        internship: 'Thực tập',
        contract: 'Hợp đồng',
        freelance: 'Tự do',
        temporary: 'Tạm thời',
        remote: 'Làm việc từ xa',
    };

    const gender = {
        male: 'Nam',
        female: 'Nữ',
        other: 'Không yêu cầu',
    };

    const listItem = [
        {
            id: 1,
            icon: icons.icon_award,
            title: 'Cấp bậc',
            value: convertSalary(job?.salary_type, job?.min_salary, job?.max_salary),
        },
        {
            id: 2,
            icon: icons.icon_time,
            title: 'Kinh nghiệm',
            value: Experience[job?.job_experience_id]?.name || null,
        },
        {
            id: 3,
            icon: icons.icon_user_group,
            title: 'Sô lượng tuyển',
            value: job.quantity || 'Không giới hạn',
        },
        {
            id: 4,
            icon: icons.icon_bag,
            title: 'Hình thức làm việc',
            value: employmentTypes[job.employment_type] || 'Không xác định',
        },
        {
            id: 5,
            icon: icons.icon_user,
            title: 'Giới tính',
            value: gender[job.gender_requirement] || 'Không yêu cầu',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Thông tin chung</h2>
                <div className={cx('content')}>
                    {listItem.map((item) => (
                        <div key={item.id} className={cx('item')}>
                            <div className={cx('icon-container')}>
                                <img src={item.icon} alt="icon" className={cx('icon')} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('label')}>{item.title}</div>
                                <div className={cx('value')}>{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

JobSummary.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSummary;
