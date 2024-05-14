import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

import styles from './JobItemComponent.module.scss';
import DetailCompanyTooltipComponent from '../DetailCompanyTooltipComponent/DetailCompanyTooltipComponent';
import slugConvert from '../../utils/slugCovnert';
import { convertSalary } from '../../utils/convertSalary';

const cx = classNames.bind(styles);

const JobItemComponent = ({ job, reponsive = false }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeJob = () => {
        setIsLiked(!isLiked);
    };

    const setProvince = [];
    const displayLocation = {};

    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div className={cx('wrapper', { reponsive })}>
            <div className={cx('cvo-flex')}>
                <a href={`viec-lam/chi-tiet/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('box-logo')}>
                    <div className={cx('box-company-logo')}>
                        <div className={cx('avatar')}>
                            <img
                                className={cx('img')}
                                src={job.company.logo}
                                alt={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                                title={`${job.company.name} tuyển dụng tại Tìm Việc Now`}
                            />
                        </div>
                    </div>
                </a>
                <div className={cx('box-title')}>
                    <h3 className={cx('title')}>
                        <Tippy
                            render={(attrs) => (
                                <div {...attrs}>
                                    <DetailCompanyTooltipComponent job={job} />
                                </div>
                            )}
                            interactive
                            placement="top"
                            delay={300}
                            arrow={false}
                            zIndex={9999}
                            appendTo={() => document.body}
                        >
                            <a href={`viec-lam/chi-tiet/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('title-link')}>
                                <strong className={cx('title-text')}>{job.title}</strong>
                            </a>
                        </Tippy>
                    </h3>
                    <TippyText content={job.company.name} maxWidth="200px">
                        <a href={`viec-lam/chi-tiet/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('company-name')}>
                            {job.company.name}
                        </a>
                    </TippyText>
                    <div className={cx('box-footer')}>
                        <div className={cx('job-info')}>
                            <div className={cx('salary')}>
                                <span className={cx('text-salary')}>{convertSalary(job.salary_type, job.min_salary, job.max_salary)} </span>
                            </div>
                            {setProvince.length > 0 && (
                                <div className={cx('address')}>
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
                                        <a
                                            href={`viec-lam/chi-tiet/${job.id}/${slugConvert(job.title)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cx('title-link')}
                                        >
                                            {setProvince.length <= 2 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`}
                                        </a>
                                    </TippyText>
                                </div>
                            )}
                        </div>
                        <div className={cx('like-job')}>
                            <button className={cx('btn-like')} onClick={handleLikeJob}>
                                {isLiked ? <IoHeartSharp className={cx('icon-like', 'icon-active')} /> : <IoHeartOutline className={cx('icon-like')} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobItemComponent.propTypes = {
    job: PropTypes.object,
    reponsive: PropTypes.bool,
};

export default JobItemComponent;
