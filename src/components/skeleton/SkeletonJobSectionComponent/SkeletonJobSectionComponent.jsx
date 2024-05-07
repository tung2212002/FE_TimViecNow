import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './SkeletonJobSectionComponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonJobSectionComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-col')}>
                <Skeleton count={1} height={80} width={80} />
            </div>
            <div className={cx('right-col')}>
                <div className={cx('box-title')}>
                    <Skeleton count={1} height={20} className={cx('title')} />
                </div>
                <div className={cx('box-description')}>
                    <Skeleton count={1} height={20} className={cx('description')} />
                </div>
                <div className={cx('right-col-row')}>
                    <div className={cx('box-item')}>
                        <Skeleton count={1} height={16} className={cx('item-title')} />
                    </div>
                    <div className={cx('box-item')}>
                        <Skeleton count={1} height={16} className={cx('item-title')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonJobSectionComponent;
