import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './NavBarMenuComponent.module.scss';

const cx = classNames.bind(styles);

const NavBarMenuComponent = ({ children, styles }) => {
    return (
        <div className={cx('wrapper')} style={styles}>
            {children}
        </div>
    );
};

NavBarMenuComponent.propTypes = {
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
};

export default NavBarMenuComponent;
