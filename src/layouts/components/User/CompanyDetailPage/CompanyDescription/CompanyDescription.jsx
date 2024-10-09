import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './CompanyDescription.module.scss';

const cx = classNames.bind(styles);

const CompanyDescription = ({ company }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Giới thiệu về công ty</h2>
                <div className={cx('body')}>
                    <p className={cx('content')} dangerouslySetInnerHTML={{ __html: company.company_short_description }} />
                </div>
            </div>
        </div>
    );
};

CompanyDescription.propTypes = {
    company: PropTypes.object.isRequired,
};

export default CompanyDescription;
