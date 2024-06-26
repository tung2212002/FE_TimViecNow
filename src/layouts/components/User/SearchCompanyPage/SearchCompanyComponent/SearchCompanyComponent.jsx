import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { FaLocationArrow, FaInfo } from 'react-icons/fa';
import { LuDot } from 'react-icons/lu';

import styles from './SearchCompanyComponent.module.scss';
import path from '@constants/path';
import slugConvert from '@utils/convert/slugConvert';

const cx = classNames.bind(styles);

const SearchCompanyComponent = ({ company }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <a
                    href={`${path.COMPANY_DETAIL}/${company.id}/${slugConvert(company.name)}`}
                    className={cx('company-logo-container')}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={company.logo} alt={company.name} className={cx('company-logo')} />
                </a>
                <div className={cx('company-info')}>
                    <div className={cx('company-info-name')}>
                        <strong>
                            <a
                                className={cx('company-info-name-text')}
                                href={`${path.COMPANY_DETAIL}/${company.id}/${slugConvert(company.name)}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {company.name}
                            </a>
                        </strong>
                        <span className={cx('company-active-job')}>
                            <LuDot className={cx('company-active-job-icon')} />
                            Đang tuyển {company?.total_active_jobs || 0} vị trí
                        </span>
                    </div>
                    <div className={cx('company-info-location')}>
                        <div className={cx('company-info-icon-container')}>
                            <FaLocationArrow className={cx('company-info-location-icon', 'icon')} />
                        </div>
                        <span className={cx('company-info-location-span')}>
                            <span className={cx('company-info-location-text')}>Trụ sở chính : </span> {company.address}
                        </span>
                    </div>
                    {company.company_short_description && (
                        <div className={cx('company-info-intro')}>
                            <div className={cx('company-info-icon-container')}>
                                <FaInfo className={cx('company-info-intro-icon', 'icon')} />
                            </div>
                            <span className={cx('company-info-intro-text')}>{company.company_short_description}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

SearchCompanyComponent.propTypes = {
    company: PropTypes.object.isRequired,
};

export default SearchCompanyComponent;
