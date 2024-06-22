import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRightLong } from 'react-icons/fa6';

import styles from './NavBarMenuItemComponent.module.scss';
import { bageNavbarMenu } from '@constants';

const cx = classNames.bind(styles);

const NavBarMenuItemComponent = ({ icon: IconComponent, label, to, ...props }) => {
    const { badgeId, size, addHr, handleClick } = props;

    return handleClick ? (
        <div className={cx('wrapper', addHr && 'add-hr')} onClick={props.handleClick}>
            <div className={cx('link')}>
                <div className={cx('label')}>
                    <IconComponent className={cx('icon', `icon-${size}`)} />
                    <span className={cx('text')}>{label}</span>
                    {badgeId && <div className={cx('badge', `badge-${badgeId}`)}>{bageNavbarMenu.find((item) => item.id === badgeId).text}</div>}
                </div>
                <div className={cx('control')}>
                    <FaArrowRightLong className={cx('icon')} />
                </div>
            </div>
        </div>
    ) : (
        <div className={cx('wrapper', addHr && 'add-hr')}>
            <Link to={to}>
                <div className={cx('link')}>
                    <div className={cx('label')}>
                        <IconComponent className={cx('icon', `icon-${size}`)} />
                        <span className={cx('text')}>{label}</span>
                        {badgeId && <div className={cx('badge', `badge-${badgeId}`)}>{bageNavbarMenu.find((item) => item.id === badgeId).text}</div>}
                    </div>
                    <div className={cx('control')}>
                        <FaArrowRightLong className={cx('icon')} />
                    </div>
                </div>
            </Link>
        </div>
    );
};

NavBarMenuItemComponent.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    badgeId: PropTypes.number,
    size: PropTypes.string,
    addHr: PropTypes.bool,
    handleClick: PropTypes.func,
};

export default NavBarMenuItemComponent;
