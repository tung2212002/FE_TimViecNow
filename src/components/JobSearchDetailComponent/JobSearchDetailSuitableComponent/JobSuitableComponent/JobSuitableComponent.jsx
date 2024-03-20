import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';

import { FaRegHeart, FaHeart } from 'react-icons/fa6';

import path from '../../../../constants/path';
import styles from './JobSuitableComponent.module.scss';
import slugConvert from '../../../../utils/slugCovnert';

const cx = classNames.bind(styles);

const JobSuitableComponent = ({ job }) => {
    const location = job.location.map((item) => item.name).join(', ');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <div className={cx('logo-container')}>
                        <a className={cx('logo-link')} href={job.company.url} target="_blank" rel="noreferrer">
                            <img className={cx('logo')} src={job.company.logo_url} alt="logo" />
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
                        <div className={cx('tag')}>{job.salary}</div>
                        <TippyText allowHTML={true} content={<div dangerouslySetInnerHTML={{ __html: job.cities }} />} placement="top" zIndex={9999}>
                            <div className={cx('tag')}>{location}</div>
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
