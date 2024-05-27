import classNames from 'classnames/bind';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

import styles from './SkeletonChartLabelComponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonChartLabelComponent = ({ scale = 1 }) => {
    return (
        <div className={cx('wrapper')} style={{ transform: `scale(${scale})` }}>
            <SkeletonTheme baseColor="#628b80" highlightColor="#959595">
                <div className={cx('row')}>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                    <div className={cx('col')}>
                        <Skeleton count={1} height={'10px'} />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
};

SkeletonChartLabelComponent.propTypes = {
    scale: PropTypes.any,
};

export default SkeletonChartLabelComponent;
