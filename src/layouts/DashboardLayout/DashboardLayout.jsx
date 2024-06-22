import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import styles from './DashboardLayout.module.scss';
import { Header, SideBar } from '../components/Business';
import { selectToastList } from '@redux/features/toast/toastSlice';
import { Toast } from '@components/common';
import { BackTopAdminComponent } from '@components';

const cx = classNames.bind(styles);

const DashboardLayout = ({ children }) => {
    const listToast = useSelector(selectToastList);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className={cx('wrapper')}>
            {listToast.length > 0 && (
                <div className={cx('toast')}>
                    <div className={cx('toast-content')}>
                        {listToast.map((toast) => (
                            <Toast key={toast.id} title={toast.title} message={toast.message} type={toast.type} />
                        ))}
                    </div>
                </div>
            )}
            <Header />
            <SideBar />
            <BackTopAdminComponent />
            {children}
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
