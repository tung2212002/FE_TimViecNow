import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import styles from './SkeletonManagerUsercomponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonManagerUsercomponent = () => {
    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('col-1')}>
                <Skeleton count={1} height={160} />
            </div> */}
            <div className={cx('col-1')}>
                <Skeleton circle={true} height={80} width={80} />
            </div>
            <div className={cx('col-2')}>
                <Skeleton count={1} height={160} />
            </div>
            <div className={cx('col-3')}>
                <Skeleton count={1} height={160} />
            </div>
            <div className={cx('col-4')}>
                <Skeleton count={1} height={160} />
            </div>
        </div>
    );
};

export default SkeletonManagerUsercomponent;
