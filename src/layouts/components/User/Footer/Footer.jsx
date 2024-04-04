import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </footer>
    );
};

export default Footer;
