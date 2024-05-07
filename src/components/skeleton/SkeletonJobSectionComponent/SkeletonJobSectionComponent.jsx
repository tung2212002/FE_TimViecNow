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
                <Skeleton count={1} height={20} width={260} />
                <Skeleton count={1} height={20} width={240} />
                <div className={cx('right-col-row')}>
                    <Skeleton count={1} height={16} width={60} />
                    <Skeleton count={1} height={16} width={60} />
                </div>
            </div>
        </div>
    );
};

export default SkeletonJobSectionComponent;
