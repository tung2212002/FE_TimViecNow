import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DashboardSettingPage.module.scss';
import {
    CardSettingInfo,
    SettigBusinessLicense,
    SettingCompany,
    SettingInfo,
    SettingPassword,
    SiderBar,
} from '../../../layouts/components/Business/SettingPage';
import route from '../../../constants/route';
import path from '../../../constants/path';

const cx = classNames.bind(styles);

const DashboardSettingPage = () => {
    const [active, setActive] = useState(1);
    const location = useLocation();

    const useDocumentTitle = (title) => {
        document.title = title;
    };

    useEffect(() => {
        const pathname = location.pathname;
        switch (pathname) {
            case path.DASHBOARD_SETTING_PASSWORD:
                setActive(1);
                useDocumentTitle('Thay đổi mật khẩu');
                break;
            case path.DASHBOARD_SETTING_INFO:
                setActive(2);
                useDocumentTitle('Cập nhật thông tin cá nhân');
                break;
            case path.DASHBOARD_SETTING_BUSINESS_LICENSE:
                setActive(3);
                useDocumentTitle('Cập nhật giấy phép kinh doanh');
                break;
            case path.DASHBOARD_SETTING_COMPANY:
                setActive(4);
                useDocumentTitle('Cập nhật thông tin công ty');
                break;
            default:
                break;
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <div className={cx('breadcrumb-box-title')}>
                        <h6 className={cx('breadcrumb')}>Quản lý chiến dịch tuyển dụng</h6>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-wrapper')}>
                        <div className={cx('sidebar')}>
                            <SiderBar active={active} />
                        </div>
                        <div className={cx('nav-link')}>
                            <div to={route.DASHBOARD_SETTING_PASSWORD} className={cx('link', { active: active === 1 })}>
                                <SettingPassword />
                            </div>
                            <div to={route.DASHBOARD_SETTING_INFO} className={cx('link', { active: active === 2 })}>
                                <CardSettingInfo />
                                <SettingInfo />
                            </div>
                            <div to={route.DASHBOARD_SETTING_BUSINESS_LICENSE} className={cx('link', { active: active === 3 })}>
                                <SettigBusinessLicense />
                            </div>
                            <div to={route.DASHBOARD_SETTING_COMPANY} className={cx('link', { active: active === 4 })}>
                                <SettingCompany />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSettingPage;
