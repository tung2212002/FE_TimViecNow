import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './NavBarMenuComponent.module.scss';

const cx = classNames.bind(styles);

const NavBarMenuComponent = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

NavBarMenuComponent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NavBarMenuComponent;
