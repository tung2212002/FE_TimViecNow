import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FaPlus } from 'react-icons/fa6';

import styles from './CompanyRelateComponent.module.scss';
import path from '@constants/path';
import slugConvert from '@utils/convert/slugConvert';

const cx = classNames.bind(styles);

const CompanyRelateComponent = ({ company }) => {
    return (
        <a className={cx('wrapper')} href={path.COMPANY_DETAIL + '/' + company.id + '/' + slugConvert(company.name)} target="_blank" rel="noreferrer">
            <div className={cx('box-logo')}>
                {company.label && <label className={cx('label')}>{company.label.name}</label>}

                <a href={path.COMPANY_DETAIL + '/' + company.id + '/' + slugConvert(company.name)} target="_blank" rel="noreferrer" className={cx('logo-link')}>
                    <img src={company.logo} alt="logo" className={cx('logo')} />
                </a>
            </div>

            <div className={cx('box-info')}>
                <TippyText content={company.name} placement="top" zIndex={9999} maxWidth={300}>
                    <a
                        href={path.COMPANY_DETAIL + '/' + company.id + '/' + slugConvert(company.name)}
                        target="_blank"
                        rel="noreferrer"
                        className={cx('company-name')}
                    >
                        <h3 className={cx('name')}>
                            <span className={cx('text')}>{company.name}</span>
                        </h3>
                    </a>
                </TippyText>
                <label className={cx('job-count')}>{company.total_active_jobs} công việc</label>
            </div>
            <div className={cx('box-action')}>
                <button className={cx('btn-follow')}>
                    {company?.is_followed ? (
                        <span className={cx('followed')}>Đang theo dõi</span>
                    ) : (
                        <span>
                            <FaPlus className={cx('icon')} />
                            Theo dõi
                        </span>
                    )}
                </button>
            </div>
        </a>
    );
};

CompanyRelateComponent.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyRelateComponent;
