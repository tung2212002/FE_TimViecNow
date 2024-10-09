import React, { useState } from 'react';
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
    const [zoomSidebar, setZoomSidebar] = useState(true);

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
            <Header setZoomSidebar={setZoomSidebar} zoomSidebar={zoomSidebar} />
            <SideBar zoomSidebar={zoomSidebar} />
            <BackTopAdminComponent />
            <div className={cx('content', zoomSidebar ? 'sidebar-zoom' : 'sidebar-unzoom')}>{children}</div>
        </div>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
