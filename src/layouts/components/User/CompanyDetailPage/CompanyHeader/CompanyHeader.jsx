import { useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaUsers } from 'react-icons/fa';
import { FaPlus, FaGlobe, FaBuilding } from 'react-icons/fa6';

import styles from './CompanyHeader.module.scss';
import { images } from '@assets';

const cx = classNames.bind(styles);

const CompanyHeader = ({ company }) => {
    const [follow, setFollow] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('banner')}>
                    <img src={company.banner} alt={company.name} className="img-banner" />
                </div>
                <div className={cx('logo')}>
                    <div className={cx('box-logo')}>
                        <img src={company.logo || images.avatar_default} alt={company.name} className="img-logo" />
                    </div>
                </div>
                <div className={cx('detail')}>
                    <div className={cx('box-detail')}>
                        <h1 className={cx('name')}>{company.name}</h1>
                        <div className={cx('sub-detail')}>
                            {company.label && (
                                <div className={cx('label', `${company.label.name}`)}>
                                    <label>{company.label.name}</label>
                                </div>
                            )}
                            {company.website && (
                                <div className={cx('website', 'detail-box')}>
                                    <span className={cx('icon-box')}>
                                        <FaGlobe className={cx('icon')} />
                                    </span>
                                    <a href={company.website} target="_blank" rel="noreferrer" className={cx('text')} title={company.website}>
                                        {company.website}
                                    </a>
                                </div>
                            )}
                            {company.scale && (
                                <div className={cx('scale', 'detail-box')}>
                                    <span className={cx('icon-box')}>
                                        <FaBuilding className={cx('icon')} />
                                    </span>
                                    <span className={cx('text')}>{company.scale} nhân viên</span>
                                </div>
                            )}

                            {company.follower && (
                                <div className={cx('follower', 'detail-box')}>
                                    <span className={cx('icon-box')}>
                                        <FaUsers className={cx('icon')} />
                                    </span>
                                    <span className={cx('text')}>{company.follower} người theo dõi</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('box-follow')}>
                        {follow ? (
                            <button className={cx('btn-follow', 'active')} onClick={() => setFollow(false)}>
                                Đang theo dõi
                            </button>
                        ) : (
                            <button className={cx('btn-follow')} onClick={() => setFollow(true)}>
                                <FaPlus className={cx('icon')} />
                                Theo dõi công ty
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

CompanyHeader.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyHeader;
