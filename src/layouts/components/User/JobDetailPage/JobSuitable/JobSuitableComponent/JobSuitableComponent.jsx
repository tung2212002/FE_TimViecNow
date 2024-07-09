import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';

import { FaRegHeart, FaHeart } from 'react-icons/fa6';

import styles from './JobSuitableComponent.module.scss';
import path from '@constants/path';
import slugConvert from '@utils/convert/slugConvert';
import { convertSalary } from '@utils/convert/convertSalary';
import { icons } from '@assets';

const cx = classNames.bind(styles);

const JobSuitableComponent = ({ job }) => {
    const setProvince = [];
    const displayLocation = {};

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('logo-container')}>
                        <a
                            className={cx('logo-link')}
                            href={path.COMPANY_DETAIL + '/' + job.company.id + '/' + slugConvert(job.company.name)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img className={cx('logo')} src={job.company.logo || icons.icon_default_logo_company} alt="logo" />
                        </a>
                    </div>
                    <div className={cx('detail')}>
                        <TippyText content={job.title} placement="top" zIndex={9999} maxWidth={300}>
                            <a className={cx('title')} href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer">
                                {job.title}
                            </a>
                        </TippyText>
                        <TippyText content={job.company.name} placement="top" zIndex={9999} maxWidth={300}>
                            <a className={cx('company-name')} href={job.company.url} target="_blank" rel="noreferrer">
                                {job.company.name}
                            </a>
                        </TippyText>
                    </div>
                </div>
                <div className={cx('tags')}>
                    <div className={cx('list')}>
                        <div className={cx('tag')}>{convertSalary(job.salary_type, job.min_salary, job.max_salary)}</div>
                        <TippyText
                            content={job?.locations?.map((location, index) => {
                                const shouldHide = displayLocation[location.province.name] && !location.description;
                                displayLocation[location.province.name] = true;

                                return (
                                    !shouldHide && (
                                        <div key={index} className={cx('text')} style={{ fontSize: '12px' }}>
                                            - {location.province.name} {location.district && ` : ${location.district.name}`}
                                        </div>
                                    )
                                );
                            })}
                            placement="top"
                        >
                            <div className={cx('tag')}>
                                {setProvince.length <= 2 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`}
                            </div>
                        </TippyText>
                    </div>
                    <TippyText content={job.is_save ? 'Bỏ lưu' : 'Lưu'} placement="top" zIndex={9999}>
                        <button className={cx('like')}>{job.is_save ? <FaHeart className={cx('icon')} /> : <FaRegHeart className={cx('icon')} />}</button>
                    </TippyText>
                </div>
            </div>
        </div>
    );
};

JobSuitableComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSuitableComponent;
