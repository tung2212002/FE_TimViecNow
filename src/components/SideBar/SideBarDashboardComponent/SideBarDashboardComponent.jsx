import classNames from 'classnames/bind';

import styles from './SideBarDashboardComponent.module.scss';

const cx = classNames.bind(styles);

const SideBarDashboardComponent = () => {
    return (
        <div className={cx('wrapper', 'wrapper-full')}>
            <div className={cx('container')}>
                <div className={cx('sidebar__header')}></div>
                <div className={cx('sidebar__body')}></div>
                <div className={cx('sidebar__footer')}></div>
            </div>
        </div>
    );
};

export default SideBarDashboardComponent;
