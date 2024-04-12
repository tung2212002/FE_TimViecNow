import classNames from 'classnames/bind';

import styles from './NotFoundPage.module.scss';

const cx = classNames.bind(styles);

const NotFoundPage = () => {
    return <div className={cx('wrapper')}>Not Found Page</div>;
};

export default NotFoundPage;
