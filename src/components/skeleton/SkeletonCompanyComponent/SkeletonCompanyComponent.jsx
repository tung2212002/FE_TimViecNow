import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PropTypes from 'prop-types';

import styles from './SkeletonCompanyComponent.module.scss';

const cx = classNames.bind(styles);

const SkeletonCompanyComponent = ({ scale = 1 }) => {
    return (
        <div className={cx('wrapper')} style={{ transform: `scale(${scale})` }}>
            <div className={cx('left-col')}>
                <Skeleton count={1} height={120} width={120} />
            </div>
            <div className={cx('right-col')}>
                <Skeleton count={1} height={30} className={cx('right-col-item')} />
                <Skeleton count={1} height={30} className={cx('right-col-item')} />
                <div className={cx('right-col-row')}>
                    <div className={cx('right-col-row-item')}>
                        <Skeleton count={1} height={24} className={cx('row-item')} />
                    </div>
                    <div className={cx('right-col-row-item')}>
                        <Skeleton count={1} height={24} className={cx('row-item')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

SkeletonCompanyComponent.propTypes = {
    scale: PropTypes.any,
};

export default SkeletonCompanyComponent;
