import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { BiSolidDollarCircle } from 'react-icons/bi';
import { FaLocationDot } from 'react-icons/fa6';

import styles from './GeneralJobFilter.module.scss';
import slugConvert from '@utils/convert/slugConvert';
import path from '@constants/path';
import { convertSalary } from '@utils/convert/convertSalary';

const cx = classNames.bind(styles);

const GeneralJobFilter = ({ job }) => {
    const setProvince = [];
    const displayLocation = {};

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div className={cx('wrapper')}>
            <a href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('title')}>
                {job.title}
            </a>
            <div className={cx('job-info')}>
                <div className={cx('salary')}>
                    <BiSolidDollarCircle className={cx('icon')} />
                    <span className={cx('text')}> {convertSalary(job.salary_type, job.min_salary, job.max_salary)}</span>
                </div>
                {setProvince.length > 0 && (
                    <div className={cx('address')}>
                        <FaLocationDot className={cx('icon')} />
                        <TippyText
                            content={job?.locations?.map((location, index) => {
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
                            maxWidth="200px"
                        >
                            <a href={`/viec-lam/chi-tiet/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('text')}>
                                {setProvince.length <= 2 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`}
                            </a>
                        </TippyText>
                    </div>
                )}
            </div>
        </div>
    );
};

GeneralJobFilter.propTypes = {
    job: PropTypes.object.isRequired,
};

export default GeneralJobFilter;
