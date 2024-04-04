import classNames from 'classnames/bind';

import styles from './Sticky.module.scss';

const cx = classNames.bind(styles);

const Sticky = () => {
    return <div className={cx('wrapper')}>Sticky</div>;
};

export default Sticky;
