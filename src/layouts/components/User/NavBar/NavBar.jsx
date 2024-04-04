import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './NavBar.module.scss';

const cx = classNames.bind(styles);

const NavBar = ({ children, styles }) => {
    return (
        <div className={cx('wrapper')} style={styles}>
            {children}
        </div>
    );
};

NavBar.propTypes = {
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
};

export default NavBar;
