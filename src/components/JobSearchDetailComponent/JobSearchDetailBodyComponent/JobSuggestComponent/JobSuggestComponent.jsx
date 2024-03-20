import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { FaRegHeart, FaHeart, FaChevronRight } from 'react-icons/fa6';

import styles from './JobSuggestComponent.module.scss';
import slugConvert from '../../../../utils/slugCovnert';
import path from '../../../../constants/path';
import route from '../../../../constants/route';
import { icons } from '../../../../assets';
import { useState } from 'react';

const cx = classNames.bind(styles);

const JobSuggestComponent = ({ job }) => {
    const [isSave, setIsSave] = useState(job.is_apply === 'false');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-container')}>
                    <a href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('logo-link')}>
                        <img className={cx('logo')} src={job.company.logo_url} alt="logo" />
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
                                    <a href={job.company.url} target="_blank" rel="noreferrer" className={cx('company-link')}>
                                        {job.company.name}
                                    </a>
                                </TippyText>
                            </div>
                            <div className={cx('salary')}>
                                <label className={cx('label')}>{job.salary}</label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('tag-block')}>
                            <TippyText content={job.short_cities} placement="top">
                                <label className={cx('tag', 'location')}>{job.short_cities}</label>
                            </TippyText>
                            <label className={cx('tag', 'deadline')}>
                                Còn <strong>{job.remain_deadline_by_day}</strong> ngày để ứng tuyển
                            </label>
                            <label className={cx('tag', 'update')}>Cập nhật {job.updated_at_str}</label>
                        </div>
                        <div className={cx('action-block')}>
                            <button className={cx('btn', 'apply')}>
                                <span className={cx('icon')}>Ứng tuyển</span>
                            </button>
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

JobSuggestComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default JobSuggestComponent;
