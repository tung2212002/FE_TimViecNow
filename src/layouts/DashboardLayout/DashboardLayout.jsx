import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DashboardLayout.module.scss';
import { Header, SideBar } from '../components/Business';

const cx = classNames.bind(styles);

const DashboardLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <SideBar />
            {children}
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
