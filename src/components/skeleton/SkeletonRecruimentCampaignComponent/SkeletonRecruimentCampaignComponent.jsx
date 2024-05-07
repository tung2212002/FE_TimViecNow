import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './SkeletonRecruimentCampaignComponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonRecruimentCampaignComponent = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('col-1')}>
                <Skeleton count={1} height={160} />
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
            <div className={cx('col-5')}>
                <Skeleton count={1} height={160} />
            </div>
            <div className={cx('col-6')}>
                <Skeleton count={1} height={160} />
            </div>
        </div>
    );
};

export default SkeletonRecruimentCampaignComponent;
