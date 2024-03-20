import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './JobSearchDetailCategoryComponent.module.scss';

const cx = classNames.bind(styles);

const JobSearchDetailCategoryComponent = ({ job }) => {
    const listItem = [
        {
            id: 1,
            label: 'Ngành nghề',
            value: job.job_category,
        },
        {
            id: 2,
            label: 'Kỹ năng cần có',
            value: job.required_skills,
        },
        {
            id: 3,
            label: 'Kỹ năng nên có',
            value: job.related_skills,
        },
        {
            id: 4,
            label: 'Khu vực',
            value: job.location,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {listItem.map((item) => (
                    <div key={item.id} className={cx('item')}>
                        <div className={cx('label')}>{item.label}</div>
                        <div className={cx('tags')}>
                            {Array.isArray(item.value)
                                ? item.value.map((value, index) => (
                                      <a key={index} className={cx('tag')} href="/">
                                          {value.name}
                                      </a>
                                  ))
                                : item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

JobSearchDetailCategoryComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSearchDetailCategoryComponent;
