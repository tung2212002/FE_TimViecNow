import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { FaRegHeart, FaHeart, FaChevronRight } from 'react-icons/fa6';

import styles from './JobSuggest.module.scss';
import slugConvert from '@utils/slugCovnert';
import path from '@constants/path';
import route from '@constants/route';
import { icons } from '@assets';
import { convertSalary } from '@utils/convertSalary';
import { convertDateFuture, convertTimeAgo } from '@utils/convertTimeUtil';

const cx = classNames.bind(styles);

const JobSuggest = ({ job, numberStyle = 0, zoomOut = false, zoomOutId }) => {
    const deadline = (new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24);
    const [isSave, setIsSave] = useState(job.is_apply === 'false');
    const setProvince = [];
    const displayLocation = {};
    job.locations?.forEach((location) => {
        if (!setProvince.includes(location.province.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div
            className={cx(
                'wrapper',
                deadline > 15 && `wrapper-1`,
                numberStyle && `wrapper-${numberStyle}`,
                zoomOut && `zoom-out`,
                zoomOutId === job.id && `zoom`,
            )}
        >
            <div className={cx('container')}>
                <div className={cx('logo-container')}>
                    <a href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('logo-link')}>
                        <img className={cx('logo')} src={job.company?.logo} alt="logo" />
                        {job.is_job_flash && (
                            <Tippy
                                render={(attrs) => (
                                    <div className={cx('tooltip')} {...attrs}>
                                        <div className={cx('tooltip-text')}>
                                            Tin đăng được NTD tương tác thường xuyên trong 24 giờ qua |
                                            <a href={route.HOMEPAGE} target="_blank" rel="noreferrer" className={cx('link')}>
                                                {' '}
                                                Xem tất cả
                                            </a>
                                            <FaChevronRight className={cx('icon', 'chevron')} />
                                        </div>
                                    </div>
                                )}
                                interactive
                                placement="top"
                                delay={100}
                                arrow={true}
                                zIndex={9999}
                                appendTo={() => document.body}
                            >
                                <div className={cx('flash')}>
                                    <img src={icons.icon_flash} alt="flash" className={cx('icon')} />
                                </div>
                            </Tippy>
                        )}
                    </a>
                </div>
                <div className={cx('info-container')}>
                    <div className={cx('content')}>
                        <div className={cx('title-block')}>
                            <div>
                                <TippyText content={job.title} placement="top">
                                    <h3 className={cx('title')}>
                                        <a
                                            href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cx('title-link')}
                                        >
                                            {job.title}
                                        </a>
                                    </h3>
                                </TippyText>
                                <TippyText content={job.company.name} placement="top">
                                    <a
                                        href={path.COMPANY_DETAIL + '/' + job.company.id + '/' + slugConvert(job.company.name)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cx('company-link')}
                                    >
                                        {job.company.name}
                                    </a>
                                </TippyText>
                            </div>
                            <div className={cx('salary')}>
                                <label className={cx('label')}>{convertSalary(job.salary_type, job.min_salary, job.max_salary)}</label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('tag-block')}>
                            {setProvince?.length > 0 && (
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
                                    <label className={cx('tag', 'location')}>
                                        {setProvince.length <= 2 ? setProvince.join(', ') : `${setProvince[0]} & ${setProvince.length - 1} nơi khác`}
                                    </label>
                                </TippyText>
                            )}
                            <label className={cx('tag', 'deadline')}>
                                Còn <strong>{convertDateFuture(job.deadline)?.split(' ')[0]} </strong>
                                {convertDateFuture(job.deadline)?.split(' ')[1]} để ứng tuyển
                            </label>
                            <label className={cx('tag', 'update')}>Cập nhật {convertTimeAgo(job.updated_at)} trước</label>
                        </div>
                        <div className={cx('action-block')}>
                            <a
                                className={cx('btn', 'apply')}
                                href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className={cx('icon')}>Ứng tuyển</span>
                            </a>
                            <button className={cx('btn', 'save')} onClick={() => setIsSave(!isSave)}>
                                {isSave ? <FaHeart className={cx('icon')} /> : <FaRegHeart className={cx('icon', 'save')} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

JobSuggest.propTypes = {
    job: PropTypes.object.isRequired,
    numberStyle: PropTypes.number,
    zoomOut: PropTypes.bool,
    zoomOutId: PropTypes.number,
};

export default JobSuggest;
