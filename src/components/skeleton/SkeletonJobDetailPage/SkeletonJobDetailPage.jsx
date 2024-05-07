import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './SkeletonJobDetailPage.module.scss';

const cx = classNames.bind(styles);

const SkeletonJobDetailPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-col')}>
                <div className={cx('box-path')}>
                    <Skeleton count={1} height={30} className={cx('path-item')} />
                </div>
                <div className={cx('box-header')}>
                    <Skeleton count={1} height={30} className={cx('header-1')} />
                    <Skeleton count={1} height={30} className={cx('header-2')} />
                    <Skeleton count={1} height={30} className={cx('header-3')} />
                    <Skeleton count={1} height={30} className={cx('header-4')} />
                </div>
                <div className={cx('box-header')}>
                    <Skeleton count={1} height={200} className={cx('header-1')} />
                    <Skeleton count={1} height={200} className={cx('header-1')} />
                    <Skeleton count={1} height={200} className={cx('header-1')} />
                </div>
            </div>
            <div className={cx('right-col')}>
                <div className={cx('box-company')}>
                    <div className={cx('box-company-header')}>
                        <Skeleton count={1} height={90} width={90} />
                        <div className={cx('box-company-header-right')}>
                            <Skeleton count={1} height={30} className={cx('company-name')} />
                            <Skeleton count={1} height={30} className={cx('company-name')} />
                        </div>
                    </div>
                    <div className={cx('box-company-description')}>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                    </div>
                </div>
                <div className={cx('box-info')}>
                    <div className={cx('box-info-description')}>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                    </div>
                </div>
                <div className={cx('box-info')}>
                    <div className={cx('box-info-description')}>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                        <div className={cx('description')}>
                            <Skeleton count={1} height={20} className={cx('description')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonJobDetailPage;
