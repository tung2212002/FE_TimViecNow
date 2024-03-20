import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './JobSearchDetailSummaryComponent.module.scss';
import { icons } from '../../../assets';

const cx = classNames.bind(styles);

const JobSearchDetailSummaryComponent = ({ job }) => {
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
            value: job.salary,
        },
        {
            id: 2,
            icon: icons.icon_time,
            title: 'Kinh nghiệm',
            value: job.job_exp ? job.job_exp : 'Không yêu cầu',
        },
        {
            id: 3,
            icon: icons.icon_user_group,
            title: 'Sô lượng tuyển',
            value: job.number_of_vacancy ? job.number_of_vacancy : 'Không giới hạn',
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
            value: gender[job.gender] || 'Không yêu cầu',
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

JobSearchDetailSummaryComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSearchDetailSummaryComponent;
