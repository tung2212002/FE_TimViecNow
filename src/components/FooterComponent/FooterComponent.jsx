import classNames from 'classnames/bind';

import styles from './FooterComponent.module.scss';

const cx = classNames.bind(styles);

const FooterComponent = () => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </footer>
    );
};

export default FooterComponent;
