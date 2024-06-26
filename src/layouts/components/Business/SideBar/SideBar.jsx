import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FaQuestionCircle, FaShieldAlt, FaRegFileAlt, FaRegUserCircle, FaUserCircle, FaChartBar, FaShoppingCart } from 'react-icons/fa';
import { FaAnglesRight, FaRegGem, FaGem, FaClockRotateLeft, FaFileInvoice, FaGear } from 'react-icons/fa6';
import { IoGridOutline, IoBriefcaseOutline, IoBriefcase, IoGrid, IoGiftSharp } from 'react-icons/io5';
import { LuGift, LuShoppingCart, LuBadgePercent, LuUserSquare2 } from 'react-icons/lu';
import { RiRobot2Line, RiRobot2Fill, RiAdvertisementLine, RiAdvertisementFill, RiShieldUserFill, RiShieldUserLine } from 'react-icons/ri';
import { PiMagicWandBold, PiMagicWandFill } from 'react-icons/pi';
import { TbFileInvoice, TbBellExclamation, TbBellFilled } from 'react-icons/tb';
import { GoGear } from 'react-icons/go';
import { MdOutlineMarkEmailUnread, MdMarkEmailUnread } from 'react-icons/md';
import { BiSolidBadgeDollar } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { HiOutlineUserGroup } from 'react-icons/hi2';

import styles from './SideBar.module.scss';
import path from '@constants/path';
import { images } from '@assets';
import { selectUser, selectUserRole } from '@redux/features/authUser/authSlide';
import { groupRole, role } from '@constants';

const cx = classNames.bind(styles);

const SideBar = () => {
    const location = useLocation();
    const user = useSelector(selectUser);
    const userRole = useSelector(selectUserRole);

    const mathPath = () => {
        return location.pathname + (location.search ? location.search : '');
    };

    const useDocumentTitle = (title) => {
        document.title = title;
    };

    const [notification, setNotification] = useState({
        aiSuggest: 1,
        system: 30,
    });

    const listMenu = [
        {
            id: 1,
            name: 'Bảng tin',
            path: path.DASHBOARD_HOME,
            icon: IoGridOutline,
            iconActive: IoGrid,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 2,
            name: 'TVNow Rewards',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: FaRegGem,
            iconActive: FaGem,
            roles: groupRole.BUSINESS,
        },
        {
            id: 3,
            name: 'Đổi quà',
            path: path.DASHBOARD_PROFILE,
            icon: LuGift,
            iconActive: IoGiftSharp,
            roles: groupRole.BUSINESS,
        },
        {
            id: 4,
            name: 'Now AI - Đề xuất',
            path: path.DASHBOARD_PROFILE,
            icon: RiRobot2Line,
            notification: notification.aiSuggest,
            iconActive: RiRobot2Fill,
            roles: groupRole.BUSINESS,
        },
        {
            id: 5,
            hr: true,
        },
        {
            id: 6,
            name: 'Chiến dịch tuyển dụng',
            path: path.DASHBOARD_RECRUIREMENT_CAMPAIGNS,
            icon: IoBriefcaseOutline,
            iconActive: IoBriefcase,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 7,
            name: 'Tin tuyển dụng',
            path: path.DASHBOARD_POST_JOB,
            icon: FaRegFileAlt,
            iconActive: FaRegFileAlt,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 8,
            name: 'Quản lý CV',
            path: path.DASHBOARD_SEARCH,
            icon: FaRegUserCircle,
            iconActive: FaUserCircle,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 9,
            name: 'Báo cáo tuyển dụng',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: FaChartBar,
            iconActive: FaChartBar,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 10,
            hr: true,
        },
        {
            id: 11,
            name: 'Mua dịch vụ',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: LuShoppingCart,
            iconActive: FaShoppingCart,
            roles: groupRole.BUSINESS,
        },
        {
            id: 12,
            name: 'Dịch vụ của tôi',
            path: path.DASHBOARD_INVOICE,
            icon: PiMagicWandBold,
            iconActive: PiMagicWandFill,
            roles: groupRole.BUSINESS,
        },
        {
            id: 13,
            name: 'Mã ưu đãi',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: LuBadgePercent,
            iconActive: BiSolidBadgeDollar,
            roles: groupRole.BUSINESS,
        },
        {
            id: 14,
            name: 'Theo dõi đơn hàng',
            path: path.DASHBOARD_CART,
            icon: TbFileInvoice,
            iconActive: FaFileInvoice,
            roles: groupRole.BUSINESS,
        },
        {
            id: 15,
            name: 'Quản lí người dùng',
            path: path.DASHBOARD_HOME,
            icon: HiOutlineUserGroup,
            iconActive: HiUserGroup,
        },
        {
            id: 16,
            name: 'Quản lý nhà tuyển dụng',
            path: path.DASHBOARD_HOME,
            icon: RiShieldUserLine,
            iconActive: RiShieldUserFill,
        },
        {
            id: 17,
            name: 'Quản lí nội dung',
            path: path.DASHBOARD_HOME,
            icon: RiAdvertisementLine,
            iconActive: RiAdvertisementFill,
        },
        {
            id: 18,
            hr: true,
        },
        {
            id: 19,
            name: 'Lịch sử hoạt động',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: FaClockRotateLeft,
            iconActive: FaClockRotateLeft,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 20,
            name: 'Cài đặt tài khoản',
            path: path.DASHBOARD_SETTING_INFO,
            icon: GoGear,
            iconActive: FaGear,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 21,
            hr: true,
        },
        {
            id: 22,
            name: 'Thông báo hệ thống',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: TbBellExclamation,
            notification: notification.system,
            iconActive: TbBellFilled,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 23,
            name: 'Hộp thư hỗ trợ',
            path: path.DASHBOARD_ACCOUNT_SETTING,
            icon: MdOutlineMarkEmailUnread,
            iconActive: MdMarkEmailUnread,
            roles: groupRole.BUSINESS_ADMIN,
        },
        {
            id: 24,
            hr: true,
        },
    ];

    useEffect(() => {
        listMenu.forEach((item) => {
            if (item.path === mathPath()) {
                useDocumentTitle(item.name);
            }
        });
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('sidebar__header')}>
                    <div className={cx('sidebar__header-content')}>
                        <div className={cx('sidebar__header-content-info')}>
                            <div className={cx('user-avatar')}>
                                <Link to={path.DASHBOARD_ACCOUNT_SETTING} className={cx('user-info-name')}>
                                    <img src={user?.avatar || images.avatar_default} alt="avatar" className={cx('user-avatar-img')} />
                                </Link>
                            </div>
                            <div className={cx('user-info')}>
                                <Link to={path.DASHBOARD_ACCOUNT_SETTING} className={cx('user-info-name')}>
                                    <span className={cx('user-name')}>{user?.full_name}</span>
                                </Link>
                                <span className={cx('user-role')}>
                                    {userRole === role.BUSINESS ? 'Employer' : groupRole.BUSINESS_ADMIN.includes(userRole) ? 'Admin' : 'User'}
                                </span>
                                {userRole === role.BUSINESS && (
                                    <div className={cx('user-verify')}>
                                        Tài khoản xác thực: <span className={cx('user-verify-level')}>Cấp 1/5</span>{' '}
                                        <span className={cx('user-verify-icon')}>
                                            <FaQuestionCircle className={cx('icon')} />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {userRole === role.BUSINESS && (
                            <div className={cx('sidebar__header-content-verify')}>
                                <Link className={cx('btn-verify-link')} to={path.DASHBOARD_EKYC}>
                                    <div className={cx('btn-verify')}>
                                        <FaShieldAlt className={cx('icon')} />
                                        <span className={cx('text')}>
                                            Xác thực tài khoản điện tử
                                            <FaAnglesRight className={cx('icon-right')} />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('sidebar__body')}>
                    <ul className={cx('sidebar__body-list')}>
                        <hr className={cx('hr')} />
                        {listMenu.map((item) => {
                            if (item.hr) {
                                return <hr className={cx('hr')} key={item.id} />;
                            }
                            if (item.roles && !item.roles.includes(userRole)) {
                                return null;
                            }
                            return (
                                <li key={item.id} className={cx('sidebar__body-item', { isActive: item.path === mathPath() })}>
                                    <div className={cx('item')}>
                                        <Link to={item.path} className={cx('item-link')}>
                                            <div className={cx('item-icon')}>
                                                <span className={cx('icon-container')}>
                                                    {item.path === mathPath() ? (
                                                        <item.iconActive className={cx('icon')} />
                                                    ) : (
                                                        <item.icon className={cx('icon')} />
                                                    )}
                                                </span>
                                            </div>
                                            <div className={cx('item-text')}>
                                                <span className={cx('text')}>{item.name}</span>
                                            </div>
                                            {item.notification && item.notification > 0 && (
                                                <span className={cx('notification')}>
                                                    <span className={cx('notification-count')}>{item.notification}</span>
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={cx('sidebar__footer')}>
                    <span className={cx('footer-content')}>
                        <div className={cx('footer-contnet-version')}>Version 1.0.0</div>
                        <div className={cx('footer-contnet-copy')}>© 2021 TVNow.vn. All rights reserved</div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
