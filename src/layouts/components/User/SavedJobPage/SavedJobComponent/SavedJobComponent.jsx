import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { FaChevronRight } from 'react-icons/fa6';
import { LuTrash } from 'react-icons/lu';

import styles from './SavedJobComponent.module.scss';
import slugConvert from '@utils/convert/slugConvert';
import path from '@constants/path';
import route from '@constants/route';
import { icons } from '@assets';
import { convertSalary } from '@utils/convert/convertSalary';
import { convertDateTime, convertTimeAgo } from '@utils/convert/convertTimeUtil';

const cx = classNames.bind(styles);

const SavedJobComponent = ({ job }) => {
    const [isSave, setIsSave] = useState(job.is_apply === 'false');
    const setProvince = [];
    const displayLocation = {};
    job?.locations?.forEach((location) => {
        if (!setProvince.includes(location.province?.name)) {
            setProvince.push(location.province.name);
        }
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo-container')}>
                    <a href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`} target="_blank" rel="noreferrer" className={cx('logo-link')}>
                        <img className={cx('logo')} src={job.company?.logo || icons.icon_default_logo_company} alt="logo" />
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
                            <div className={cx('title-container')}>
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
                                        {job.company.name.toUpperCase()}
                                    </a>
                                </TippyText>
                                <label className={cx('time-saved')}>Đã lưu: {convertDateTime(job.created_at)}</label>
                            </div>
                            <div className={cx('salary')}>
                                <label className={cx('label')}>{convertSalary(job?.salary_type, job?.min_salary, job?.max_salary)}</label>
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

                            <label className={cx('tag', 'update')}>Cập nhật {convertTimeAgo(job.updated_at)} trước</label>
                        </div>
                        <div className={cx('action-block')}>
                            <a
                                className={cx('btn', 'apply')}
                                href={`${path.JOB_SEARCH_DETAIL}/${job.id}/${slugConvert(job.title)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className={cx('text')}>Ứng tuyển</span>
                            </a>
                            <button className={cx('btn', 'save')} onClick={() => setIsSave(!isSave)}>
                                <LuTrash className={cx('icon')} />
                                {isSave ? 'Bỏ lưu' : 'Đã lưu'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SavedJobComponent.propTypes = {
    job: PropTypes.object.isRequired,
};

export default SavedJobComponent;
