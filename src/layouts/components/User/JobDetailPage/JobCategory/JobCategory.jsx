import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './JobCategory.module.scss';

const cx = classNames.bind(styles);

const JobCategory = ({ job }) => {
    const setProvince = [];

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    const listItem = [
        {
            id: 1,
            label: 'Ngành nghề',
            value: job.categories,
        },
        {
            id: 2,
            label: 'Kỹ năng cần có',
            value: job.must_have_skills,
        },
        {
            id: 3,
            label: 'Kỹ năng nên có',
            value: job.should_have_skills,
        },
        {
            id: 4,
            label: 'Khu vực',
            value: setProvince,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {listItem.map(
                    (item) =>
                        item.value?.length > 0 && (
                            <div key={item.id} className={cx('item')}>
                                <div className={cx('label')}>{item.label}</div>
                                <div className={cx('tags')}>
                                    {Array.isArray(item.value)
                                        ? item.value.map((value, index) => (
                                              <a key={index} className={cx('tag')} href="/">
                                                  {value.name || value}
                                              </a>
                                          ))
                                        : item.value}
                                </div>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

JobCategory.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobCategory;
