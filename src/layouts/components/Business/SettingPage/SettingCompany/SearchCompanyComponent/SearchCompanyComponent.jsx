import classNames from 'classnames/bind';

import styles from './SearchCompanyComponent.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SearchCompanyComponent = ({ company }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('company-logo')}>
                    <img src={company?.logo_url} alt="company-logo" className={cx('logo')} />
                </div>
                <div className={cx('company-info')}>
                    <p className={cx('company-name')}>
                        <a href={company?.url} target="_blank" rel="noreferrer" className={cx('company-name-link')} title={company?.name}>
                            {company?.name.toUpperCase()}
                        </a>
                    </p>
                    <div className={cx('company-tax-code')}>
                        <p className={cx('tax-code')}>MST: {company?.tax_code}</p>
                    </div>
                    <div className={cx('company-address')}>
                        <p className={cx('address')}>
                            {company?.address} | {company.size} nhân sự
                        </p>
                    </div>
                    <div className={cx('company-field')}>
                        {company?.fields &&
                            company?.fields.map((field, index) => (
                                <p key={index} className={cx('field')}>
                                    {field.name}
                                </p>
                            ))}
                    </div>
                </div>
                <div className={cx('company-action')}>
                    <button className={cx('btn')}>Chọn</button>
                </div>
            </div>
        </div>
    );
};

SearchCompanyComponent.propTypes = {
    company: PropTypes.object,
};

export default SearchCompanyComponent;
