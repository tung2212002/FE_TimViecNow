import React from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaBell, FaComments, FaChevronDown, FaRegHeart, FaLaptopCode } from 'react-icons/fa';
import {
    FaMagnifyingGlass,
    FaListCheck,
    FaRegFileLines,
    FaStarOfDavid,
    FaChalkboardUser,
    FaScaleBalanced,
    FaChartColumn,
    FaRegCircleUp,
    FaArrowRightFromBracket,
} from 'react-icons/fa6';
import { IoBriefcaseOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { LiaMedalSolid } from 'react-icons/lia';
import { RiFileUserLine } from 'react-icons/ri';
import { TbFilePencil, TbFileCheck, TbUserSquare, TbFileCertificate, TbCoins, TbPigMoney, TbGift, TbEye, TbSettings } from 'react-icons/tb';
import { BiBuildings, BiShieldX, BiEnvelope, BiLockAlt } from 'react-icons/bi';

import styles from './HeaderComponent.module.scss';
import { icons, gifs, images } from '../../assets';
import { selectAuth } from '../../redux/features/auth/authSlide';
import { logoutService } from '../../services/authService';
import { logout } from '../../redux/features/auth/authSlide';
import NavBarMenuComponent from '../NavBarMenuComponent/NavBarMenuComponent';
import NavBarMenuItemComponent from '../NavBarMenuItemComponent/NavBarMenuItemComponent';
import route from '../../constants/route';

const cx = classNames.bind(styles);

const HeaderComponent = () => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        logoutService().then(() => {
            dispatch(logout());
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
                    to: '/',
                },
                {
                    icon: FaRegHeart,
                    label: 'Việc làm đã lưu',
                    to: '/',
                    addHr: true,
                },
                {
                    icon: FaListCheck,
                    label: 'Việc làm phù hợp',
                    to: route.MATCHING_JOBS,
                    badgeId: 2,
                    size: 'lg',
                },
                {
                    icon: FaLaptopCode,
                    label: 'Việc làm IT',
                    to: '/',
                    badgeId: 1,
                    size: 'lg',
                },
                {
                    icon: LiaMedalSolid,
                    label: 'Việc làm Senior',
                    to: '/',
                    badgeId: 1,
                },
            ],
        },
        {
            label: 'Hồ sơ & CV',
            to: route.SUBPAGE,
            subItems: [
                {
                    icon: RiFileUserLine,
                    label: 'Quản lý CV',
                    to: '/',
                },
                {
                    icon: FaRegFileLines,
                    label: 'Quản lý Cover Letter',
                    to: '/',
                    addHr: true,
                },
                {
                    icon: RiFileUserLine,
                    label: 'Mẫu CV',
                    to: '/',
                },
                {
                    icon: FaRegFileLines,
                    label: 'Mẫu Cover Letter',
                    to: '/',
                    addHr: true,
                },
                {
                    icon: RiFileUserLine,
                    label: 'Dịch vụ tư vấn CV',
                    to: '/',
                },
                {
                    icon: TbFilePencil,
                    label: 'Hướng dẫn viết CV theo ngành nghề',
                    to: '/',
                    badgeId: 1,
                },
                {
                    icon: TbFileCheck,
                    label: 'Thư viện CV theo ngành nghề',
                    to: '/',
                    badgeId: 1,
                    addHr: true,
                },
                {
                    icon: TbUserSquare,
                    label: 'CVNow Profile',
                    to: '/',
                    badgeId: 1,
                },
            ],
        },
        {
            label: 'Công ty',
            to: route.SUBPAGE,
            subItems: [
                {
                    icon: BiBuildings,
                    label: 'Danh sách công ty',
                    to: '/',
                },
                {
                    icon: FaStarOfDavid,
                    label: 'Top công ty',
                    to: '/',
                },
            ],
        },
        {
            label: 'Phát triển sự nghiệp',
            to: '/',
            subItems: [
                {
                    icon: FaChalkboardUser,
                    label: 'Trắc nghiệm tính cách MBTI',
                    to: '/',
                    size: 'lg',
                },
                {
                    icon: FaChalkboardUser,
                    label: 'Trắc nghiệm MI',
                    to: '/',
                    size: 'lg',
                    addHr: true,
                },
                {
                    icon: TbFileCertificate,
                    label: 'TVNow Contest',
                    to: '/',
                },
                {
                    icon: TbFilePencil,
                    label: 'TVNow Skills',
                    to: '/',
                    badgeId: 1,
                },
            ],
        },
        {
            label: 'Công cụ',
            to: '/',
            subItems: [
                {
                    icon: FaScaleBalanced,
                    label: 'Tính lương Gross/Net',
                    to: '/',
                    size: 'lg',
                },
                {
                    icon: FaChartColumn,
                    label: 'Tính thuế thu nhập cá nhân',
                    to: '/',
                    size: 'lg',
                    addHr: true,
                },
                {
                    icon: TbCoins,
                    label: 'Tính lãi suất kép',
                    to: '/',
                },
                {
                    icon: TbPigMoney,
                    label: 'Lập kế hoạch tiết kiệm',
                    to: '/',
                    addHr: true,
                },
                {
                    icon: BiShieldX,
                    label: 'Tính bảo hiểm thất nghiệp',
                    to: '/',
                },
                {
                    icon: IoShieldCheckmarkOutline,
                    label: 'Tính bảo hiểm xã hội một lần',
                    to: '/',
                },
            ],
        },
        {
            label: 'Mở quà - Đón lợi thế',
            to: '/',
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
        <header className={cx('wrapper')}>
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
                            <NavLink to={item.to} className={cx('link')} activeclassname={cx('active')}>
                                <div className={cx('label')}>{item.label}</div>
                                {item.icon && <img className={cx('icon')} src={item.icon} alt="gift" />}
                            </NavLink>
                            {item.subItems && (
                                <div className={cx('menu')}>
                                    <NavBarMenuComponent key={index}>
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
                                    </NavBarMenuComponent>
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
                            <a to="/login" className={cx('link')}>
                                <FaComments className={cx('icon', 'comments')} />
                            </a>
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
                                <NavBarMenuComponent>
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
                                </NavBarMenuComponent>
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
                        <Link to={route.JOB_SEARCH}>
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

export default HeaderComponent;
