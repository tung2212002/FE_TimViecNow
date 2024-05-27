import classNames from 'classnames/bind';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

import styles from './SkeletonChartComponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonChartComponent = ({ scale = 1 }) => {
    return (
        <div className={cx('wrapper')} style={{ transform: `scale(${scale})` }}>
            <SkeletonTheme baseColor="#628b80" highlightColor="#959595">
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
                <div className={cx('col')}>
                    <Skeleton count={1} width={40} height={'100%'} />
                </div>
            </SkeletonTheme>
        </div>
    );
};

SkeletonChartComponent.propTypes = {
    scale: PropTypes.any,
};

export default SkeletonChartComponent;
