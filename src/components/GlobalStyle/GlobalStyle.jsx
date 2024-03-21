import PropTypes from 'prop-types';

function GlobalStyles({ children }) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node,
};

export default GlobalStyles;
