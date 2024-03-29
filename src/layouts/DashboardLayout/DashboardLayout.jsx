import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DashboardLayout.module.scss';
import { HeaderDashBoardComponent } from '../../components/Header';
import SideBarDashboardComponent from '../../components/SideBar/SideBarDashboardComponent/SideBarDashboardComponent';

const cx = classNames.bind(styles);

const DashboardLayout = ({ children }) => {
    return (
        <div className={cx('dashboard-layout')}>
            <HeaderDashBoardComponent />
            <SideBarDashboardComponent />
            {children}
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
