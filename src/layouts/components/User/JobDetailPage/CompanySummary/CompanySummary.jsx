import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { FaUserGroup, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { TiLocation } from 'react-icons/ti';

import styles from './CompanySummary.module.scss';

const cx = classNames.bind(styles);

const CompanySummary = ({ company }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('company-info')}>
                    <div className={cx('info')}>
                        <a href={company.url} target="_blank" rel="noreferrer" className={cx('company-logo')}>
                            <img src={company.logo_url} alt="logo" className={cx('logo')} />
                        </a>
                        <TippyText content={company.name} placement="top" zIndex={9999} maxWidth={300}>
                            <h2 className={cx('company-name')}>
                                <a href={company.url} target="_blank" rel="noreferrer" className={cx('name')}>
                                    {company.name}
                                </a>
                            </h2>
                        </TippyText>
                    </div>
                    <div className={cx('company-scale')}>
                        <div className={cx('scale-title')}>
                            <div className={cx('icon-container')}>
                                <FaUserGroup className={cx('icon')} />
                            </div>
                            Quy mô:
                        </div>
                        <div className={cx('scale-value')}>{company.scale} nhân viên</div>
                    </div>
                    <div className={cx('company-scale')}>
                        <div className={cx('scale-title')}>
                            <div className={cx('icon-container')}>
                                <TiLocation className={cx('icon')} />
                            </div>
                            Địa điểm:
                        </div>
                        <TippyText content={company.location} placement="top" zIndex={9999} maxWidth={300}>
                            <div className={cx('scale-value')}>{company.location}</div>
                        </TippyText>
                    </div>
                </div>
                <div className={cx('company-link')}>
                    <a href={company.url} target="_blank" rel="noreferrer" className={cx('link')}>
                        Xem trang công ty
                    </a>
                    <FaArrowUpRightFromSquare className={cx('icon')} />
                </div>
            </div>
        </div>
    );
};

CompanySummary.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanySummary;
