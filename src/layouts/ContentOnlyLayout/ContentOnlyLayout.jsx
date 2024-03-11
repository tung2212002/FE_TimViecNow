import styles from './ContentOnlyLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function ContentOnlyLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

ContentOnlyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContentOnlyLayout;
