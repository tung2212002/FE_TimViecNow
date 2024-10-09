import React from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { FaBell, FaComments, FaChevronDown, FaRegHeart } from 'react-icons/fa';
import {
    FaMagnifyingGlass,
    FaListCheck,
    FaStarOfDavid,
    FaChalkboardUser,
    FaScaleBalanced,
    FaChartColumn,
    FaRegCircleUp,
    FaArrowRightFromBracket,
} from 'react-icons/fa6';
import { IoBriefcaseOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { RiFileUserLine } from 'react-icons/ri';
import { TbFilePencil, TbFileCertificate, TbCoins, TbPigMoney, TbGift, TbEye, TbSettings } from 'react-icons/tb';
import { BiBuildings, BiShieldX, BiEnvelope, BiLockAlt } from 'react-icons/bi';

import styles from './Header.module.scss';
import { icons, gifs, images } from '@assets';
import { logoutService } from '@services/user/authService';
import { logout, selectAuthUser } from '@redux/features/authUser/authSlide';
import NavBar from '../NavBar/NavBar';
import { NavBarMenuItemComponent } from '@components';
import route from '@constants/route';

const cx = classNames.bind(styles);

const Header = ({ positionHeader }) => {
    const auth = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = '/' + location.pathname.split('/')[1];

    const handleLogout = () => {
        logoutService().then(() => {
            dispatch(logout());
        });
    };

    const handleScroll = () => {
        // smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const navItems = [
        {
            label: 'Việc làm',
            to: route.JOB_SEARCH,
            subItems: [
                {
                    icon: FaMagnifyingGlass,
                    label: 'Tìm việc làm',
                    to: route.JOB_SEARCH,
                    size: 'lg',
                    addHr: true,
                },
                {
                    icon: IoBriefcaseOutline,
                    label: 'Việc làm đã ứng tuyển',
                    to: route.APPLIED_JOBS,
                },
                {
                    icon: FaRegHeart,
                    label: 'Việc làm đã lưu',
                    to: route.SAVED_JOBS,
                    addHr: true,
                },
                {
                    icon: FaListCheck,
                    label: 'Việc làm phù hợp',
                    to: route.MATCHING_JOBS,
                    badgeId: 2,
                    size: 'lg',
                },
            ],
        },
        {
            label: 'Hồ sơ & CV',
            to: route.MANAGER_CV,
            subItems: [
                {
                    icon: RiFileUserLine,
                    label: 'Quản lý CV',
                    to: route.MANAGER_CV,
                },
                {
                    icon: TbFilePencil,
                    label: 'Hướng dẫn viết CV theo ngành nghề',
                    to: '/1',
                    badgeId: 1,
                },
            ],
        },
        {
            label: 'Công ty',
            to: route.COMPANY,
            subItems: [
                {
                    icon: BiBuildings,
                    label: 'Danh sách công ty',
                    to: route.COMPANY,
                },
                {
                    icon: FaStarOfDavid,
                    label: 'Top công ty',
                    to: route.COMPANY,
                },
            ],
        },
        // {
        //     label: 'Phát triển sự nghiệp',
        //     to: '/',
        //     subItems: [
        //         {
        //             icon: FaChalkboardUser,
        //             label: 'Trắc nghiệm tính cách MBTI',
        //             to: '/',
        //             size: 'lg',
        //         },
        //         {
        //             icon: FaChalkboardUser,
        //             label: 'Trắc nghiệm MI',
        //             to: '/',
        //             size: 'lg',
        //             addHr: true,
        //         },
        //         {
        //             icon: TbFileCertificate,
        //             label: 'TVNow Contest',
        //             to: '/',
        //         },
        //         {
        //             icon: TbFilePencil,
        //             label: 'TVNow Skills',
        //             to: '/',
        //             badgeId: 1,
        //         },
        //     ],
        // },
        {
            label: 'Công cụ',
            to: route.TOOL,
            subItems: [
                {
                    icon: FaScaleBalanced,
                    label: 'Tính lương Gross/Net',
                    to: '/1',
                    size: 'lg',
                },
                {
                    icon: FaChartColumn,
                    label: 'Tính thuế thu nhập cá nhân',
                    to: '/2',
                    size: 'lg',
                    addHr: true,
                },
                {
                    icon: TbCoins,
                    label: 'Tính lãi suất kép',
                    to: '/3',
                },
                {
                    icon: TbPigMoney,
                    label: 'Lập kế hoạch tiết kiệm',
                    to: '/4',
                    addHr: true,
                },
                {
                    icon: BiShieldX,
                    label: 'Tính bảo hiểm thất nghiệp',
                    to: '/5',
                },
                {
                    icon: IoShieldCheckmarkOutline,
                    label: 'Tính bảo hiểm xã hội một lần',
                    to: '/6',
                },
                {
                    icon: FaChalkboardUser,
                    label: 'Trắc nghiệm tính cách MBTI',
                    to: '/7',
                    size: 'lg',
                },
                {
                    icon: FaChalkboardUser,
                    label: 'Trắc nghiệm MI',
                    to: '/8',
                    size: 'lg',
                    addHr: true,
                },
                {
                    icon: TbFileCertificate,
                    label: 'TVNow Contest',
                    to: '/9',
                },
                {
                    icon: TbFilePencil,
                    label: 'TVNow Skills',
                    to: '/10',
                    badgeId: 1,
                },
            ],
            icon: gifs.gift_menu,
        },
    ];

    const accountItems = [
        {
            label: 'Cài đặt thông tin cá nhân',
            to: '/',
            icon: TbSettings,
        },
        {
            label: 'Nâng cấp tài khoản Vip',
            to: '/',
            icon: FaRegCircleUp,
        },
        {
            label: 'Kích hoạt quà tặng',
            to: '/',
            icon: TbGift,
            addHr: true,
        },
        {
            label: 'Nhà tuyển dụng theo dõi hồ sơ',
            to: '/',
            icon: TbEye,
        },
        {
            label: 'Cài đặt gợi ý việc làm',
            to: '/',
            icon: TbSettings,
        },
        {
            label: 'Cài đặt nhận email',
            to: '/',
            icon: BiEnvelope,
            addHr: true,
        },
        {
            label: 'Cài đặt bảo mật',
            to: '/',
            icon: IoShieldCheckmarkOutline,
        },
        {
            label: 'Đổi mật khẩu',
            to: '/',
            icon: BiLockAlt,
            addHr: true,
        },
        {
            label: 'Đăng xuất',
            to: '/',
            icon: FaArrowRightFromBracket,
            onClick: handleLogout,
        },
    ];

    return (
        <header className={cx('wrapper')} style={{ position: positionHeader ? positionHeader : '' }}>
            <div className={cx('container')}>
                <div className={cx('navbar-left')}>
                    <h1 className={cx('logo-wrapper')}>
                        <a className={cx('link', 'logo-link')} href={route.HOMEPAGE}>
                            <img className={cx('logo-img')} src={icons.logo} alt="Tìm việc Now TVN" title="Tìm việc Now tuyển dụng tại Việt Nam" />
                        </a>
                    </h1>
                </div>
                <ul className={cx('navbar-mid')}>
                    {navItems.map((item, index) => (
                        <li key={index} className={cx('item', 'nav-item')}>
                            <Link
                                to={item.to}
                                className={cx('link', [item.to, ...item.subItems.map((subItem) => subItem.to)].includes(path) ? 'active' : '')}
                                onClick={handleScroll}
                            >
                                <div className={cx('label')}>{item.label}</div>
                                {item.icon && <img className={cx('icon')} src={item.icon} alt="gift" />}
                            </Link>
                            {item.subItems && (
                                <div className={cx('menu')}>
                                    <NavBar key={index}>
                                        {item.subItems.map((subItem, subIndex) => (
                                            <NavBarMenuItemComponent
                                                key={subIndex}
                                                icon={subItem.icon}
                                                label={subItem.label}
                                                to={subItem.to}
                                                badgeId={subItem.badgeId}
                                                size={subItem.size}
                                                addHr={subItem.addHr}
                                            />
                                        ))}
                                    </NavBar>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
                {auth.isAuth ? (
                    <ul className={cx('navbar-right')}>
                        <li className={cx('item')}>
                            <a to="/login" className={cx('link')}>
                                <FaBell className={cx('icon', 'bell')} />
                            </a>
                        </li>
                        <li className={cx('item')}>
                            <Link to={route.CHAT} className={cx('link')}>
                                <FaComments className={cx('icon', 'comments')} />
                            </Link>
                        </li>
                        <li className={cx('avatar-container')}>
                            <div className={cx('avatar-bg')}>
                                <a to="/login" className={cx('avatar-link')}>
                                    <img className={cx('avatar')} src={images.avatar_default} alt="avatar" />
                                    <span className={cx('text')}>{auth.user?.full_name}</span>
                                    <FaChevronDown className={cx('icon', 'chevron-down')} />
                                </a>
                            </div>
                            <div className={cx('account-menu')}>
                                <NavBar>
                                    {accountItems.map((item, index) => (
                                        <NavBarMenuItemComponent
                                            key={index}
                                            icon={item.icon}
                                            label={item.label}
                                            to={item.to}
                                            addHr={item.addHr}
                                            handleClick={item.onClick}
                                        />
                                    ))}
                                </NavBar>
                            </div>
                        </li>
                    </ul>
                ) : (
                    <ul className={cx('navbar-right')}>
                        <Link to={route.LOGIN}>
                            <li className={cx('btn', 'login-btn')}>
                                <span className={cx('text')}>Đăng nhập</span>
                            </li>
                        </Link>
                        <Link to={route.REGISTER}>
                            <li className={cx('btn', 'register-btn')}>
                                <span className={cx('text')}>Đăng ký</span>
                            </li>
                        </Link>
                        <Link to={route.MANAGER_REGISTER} target="_blank">
                            <li className={cx('btn', 'post-job-btn')}>
                                <span className={cx('text')}>Đăng tuyển và tìm hồ sơ</span>
                            </li>
                        </Link>
                    </ul>
                )}
            </div>
        </header>
    );
};

Header.propTypes = {
    positionHeader: PropTypes.string,
};

export default Header;
