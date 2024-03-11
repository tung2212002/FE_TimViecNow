import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './GlobalStyle.module.scss';
const cx = classNames.bind(styles);

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node,
};

export default GlobalStyles;
