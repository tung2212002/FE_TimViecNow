import classNames from 'classnames/bind';

import styles from './CompanyInfo.module.scss';

const cx = classNames.bind(styles);

const CompanyInfo = () => {
    return <div className={cx('wrapper')}>CompanyInfo</div>;
};

export default CompanyInfo;
