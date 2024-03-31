import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './StatisticItemComponent.module.scss';

const cx = classNames.bind(styles);

const StatisticItemComponent = ({ title, value, icon, color, background }) => {
    return (
        <div className={cx('wrapper')} style={{ color: color, background: background }}>
            <div className={cx('info')}>
                <div className={cx('value')}>{value}</div>
                <h5 className={cx('title')}>{title}</h5>
            </div>

            <div className={cx('icon-container')}>
                <span className={cx('icon')}>{icon}</span>
            </div>
        </div>
    );
};

StatisticItemComponent.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.node,
    color: PropTypes.string,
    background: PropTypes.string,
};

export default StatisticItemComponent;
