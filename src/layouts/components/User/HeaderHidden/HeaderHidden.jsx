import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FaChevronDown, FaRegHeart, FaLaptopCode, FaBars } from 'react-icons/fa';
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
import { IoBriefcaseOutline, IoCloseSharp, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { LiaMedalSolid } from 'react-icons/lia';
import { RiFileUserLine } from 'react-icons/ri';
import { TbFilePencil, TbFileCheck, TbUserSquare, TbFileCertificate, TbCoins, TbPigMoney, TbGift, TbEye, TbSettings } from 'react-icons/tb';
import { BiBuildings, BiShieldX, BiEnvelope, BiLockAlt } from 'react-icons/bi';

import styles from './HeaderHidden.module.scss';
import { gifs, images } from '../../../../assets';
import { selectAuth } from '../../../../redux/features/auth/authSlide';
import { logoutService } from '../../../../services/authService';
import { logout } from '../../../../redux/features/auth/authSlide';
import NavBar from '../NavBar/NavBar';
import { NavBarMenuItemComponent } from '../../../../components';
import route from '../../../../constants/route';

const cx = classNames.bind(styles);

const HeaderHidden = () => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    const [dropdownId, setDropdownId] = useState(null);
    const [show, setShow] = useState(false);

    const idItemAuth = 0;

    const handleLogout = () => {
        logoutService().then(() => {
            dispatch(logout());
        });
    };

    // const navItems = [
    //     {
    //         id: 1,
    //         label: 'Việc làm',
    //         to: route.JOB_SEARCH,
    //         subItems: [
    //             {
    //                 icon: FaMagnifyingGlass,
    //                 label: 'Tìm việc làm',
    //                 to: route.JOB_SEARCH,
    //                 size: 'lg',
    //                 addHr: true,
    //             },
    //             {
    //                 icon: IoBriefcaseOutline,
    //                 label: 'Việc làm đã ứng tuyển',
    //                 to: route.APPLIED_JOBS,
    //             },
    //             {
    //                 icon: FaRegHeart,
    //                 label: 'Việc làm đã lưu',
    //                 to: route.SAVED_JOBS,
    //                 addHr: true,
    //             },
    //             {
    //                 icon: FaListCheck,
    //                 label: 'Việc làm phù hợp',
    //                 to: route.MATCHING_JOBS,
    //                 badgeId: 2,
    //                 size: 'lg',
    //             },
    //             // {
    //             //     icon: FaLaptopCode,
    //             //     label: 'Việc làm IT',
    //             //     to: '/',
    //             //     badgeId: 1,
    //             //     size: 'lg',
    //             // },
    //             // {
    //             //     icon: LiaMedalSolid,
    //             //     label: 'Việc làm Senior',
    //             //     to: '/',
    //             //     badgeId: 1,
    //             // },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         label: 'Hồ sơ & CV',
    //         to: route.SUBPAGE,
    //         subItems: [
    //             {
    //                 icon: RiFileUserLine,
    //                 label: 'Quản lý CV',
    //                 to: '/',
    //             },
    //             // {
    //             //     icon: FaRegFileLines,
    //             //     label: 'Quản lý Cover Letter',
    //             //     to: '/',
    //             //     addHr: true,
    //             // },
    //             // {
    //             //     icon: RiFileUserLine,
    //             //     label: 'Mẫu CV',
    //             //     to: '/',
    //             // },
    //             // {
    //             //     icon: FaRegFileLines,
    //             //     label: 'Mẫu Cover Letter',
    //             //     to: '/',
    //             //     addHr: true,
    //             // },
    //             // {
    //             //     icon: RiFileUserLine,
    //             //     label: 'Dịch vụ tư vấn CV',
    //             //     to: '/',
    //             // },
    //             {
    //                 icon: TbFilePencil,
    //                 label: 'Hướng dẫn viết CV theo ngành nghề',
    //                 to: '/',
    //                 badgeId: 1,
    //             },
    //             // {
    //             //     icon: TbFileCheck,
    //             //     label: 'Thư viện CV theo ngành nghề',
    //             //     to: '/',
    //             //     badgeId: 1,
    //             //     addHr: true,
    //             // },
    //             // {
    //             //     icon: TbUserSquare,
    //             //     label: 'CVNow Profile',
    //             //     to: '/',
    //             //     badgeId: 1,
    //             // },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         label: 'Công ty',
    //         to: route.SUBPAGE,
    //         subItems: [
    //             {
    //                 icon: BiBuildings,
    //                 label: 'Danh sách công ty',
    //                 to: '/',
    //             },
    //             {
    //                 icon: FaStarOfDavid,
    //                 label: 'Top công ty',
    //                 to: '/',
    //             },
    //         ],
    //     },
    //     {
    //         id: 4,
    //         label: 'Phát triển sự nghiệp',
    //         to: '/',
    //         subItems: [
    //             {
    //                 icon: FaChalkboardUser,
    //                 label: 'Trắc nghiệm tính cách MBTI',
    //                 to: '/',
    //                 size: 'lg',
    //             },
    //             {
    //                 icon: FaChalkboardUser,
    //                 label: 'Trắc nghiệm MI',
    //                 to: '/',
    //                 size: 'lg',
    //                 addHr: true,
    //             },
    //             {
    //                 icon: TbFileCertificate,
    //                 label: 'TVNow Contest',
    //                 to: '/',
    //             },
    //             {
    //                 icon: TbFilePencil,
    //                 label: 'TVNow Skills',
    //                 to: '/',
    //                 badgeId: 1,
    //             },
    //         ],
    //     },
    //     {
    //         id: 5,
    //         label: 'Công cụ',
    //         to: '/',
    //         subItems: [
    //             {
    //                 icon: FaScaleBalanced,
    //                 label: 'Tính lương Gross/Net',
    //                 to: '/',
    //                 size: 'lg',
    //             },
    //             {
    //                 icon: FaChartColumn,
    //                 label: 'Tính thuế thu nhập cá nhân',
    //                 to: '/',
    //                 size: 'lg',
    //                 addHr: true,
    //             },
    //             {
    //                 icon: TbCoins,
    //                 label: 'Tính lãi suất kép',
    //                 to: '/',
    //             },
    //             {
    //                 icon: TbPigMoney,
    //                 label: 'Lập kế hoạch tiết kiệm',
    //                 to: '/',
    //                 addHr: true,
    //             },
    //             {
    //                 icon: BiShieldX,
    //                 label: 'Tính bảo hiểm thất nghiệp',
    //                 to: '/',
    //             },
    //             {
    //                 icon: IoShieldCheckmarkOutline,
    //                 label: 'Tính bảo hiểm xã hội một lần',
    //                 to: '/',
    //             },
    //         ],
    //         icon: gifs.gift_menu,
    //     },
    //     // { id: 6, label: 'Mở quà - Đón lợi thế', to: '/', icon: gifs.gift_menu },
    // ];

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
                // {
                //     icon: FaLaptopCode,
                //     label: 'Việc làm IT',
                //     to: '/',
                //     badgeId: 1,
                //     size: 'lg',
                // },
                // {
                //     icon: LiaMedalSolid,
                //     label: 'Việc làm Senior',
                //     to: '/',
                //     badgeId: 1,
                // },
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
                // {
                //     icon: FaRegFileLines,
                //     label: 'Quản lý Cover Letter',
                //     to: '/',
                //     addHr: true,
                // },
                // {
                //     icon: RiFileUserLine,
                //     label: 'Mẫu CV',
                //     to: '/',
                // },
                // {
                //     icon: FaRegFileLines,
                //     label: 'Mẫu Cover Letter',
                //     to: '/',
                //     addHr: true,
                // },
                // {
                //     icon: RiFileUserLine,
                //     label: 'Dịch vụ tư vấn CV',
                //     to: '/',
                // },
                {
                    icon: TbFilePencil,
                    label: 'Hướng dẫn viết CV theo ngành nghề',
                    to: '/',
                    badgeId: 1,
                },
                // {
                //     icon: TbFileCheck,
                //     label: 'Thư viện CV theo ngành nghề',
                //     to: '/',
                //     badgeId: 1,
                //     addHr: true,
                // },
                // {
                //     icon: TbUserSquare,
                //     label: 'CVNow Profile',
                //     to: '/',
                //     badgeId: 1,
                // },
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
        // {
        //     label: 'Mở quà - Đón lợi thế',
        //     to: '/',
        //     icon: gifs.gift_menu,
        // },
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

    const handleDropdown = (id) => {
        if (dropdownId === id) {
            setDropdownId(null);
        } else {
            setDropdownId(id);
        }
    };

    return (
        <div className={cx('wrapper', show && 'down')}>
            <div className={cx('navbar-mobile')} onClick={() => setShow(!show)}>
                {!show ? <FaBars className={cx('icon-menu', 'bars')} /> : <IoCloseSharp className={cx('icon-menu', 'close')} />}
            </div>
            <div className={cx('container')}>
                {auth.isAuth && (
                    <div className={cx('nav-item', 'item', dropdownId === idItemAuth && 'show')} onClick={() => handleDropdown(idItemAuth)}>
                        <div className={cx('content', 'account-content')}>
                            <div className={cx('container-nav', 'account')}>
                                <NavLink to={route.HOMEPAGE} className={cx('link', 'account-link')} activeclassname={cx('active')}>
                                    <img
                                        className={cx('avatar')}
                                        src={auth.user.picture_path !== '-1' ? auth.user.picture_path : images.avatar_default}
                                        alt="avatar"
                                    />
                                    <div className={cx('info')}>
                                        <span className={cx('name')}>{auth.user.full_name}</span>
                                        <span className={cx('detail')}>
                                            Mã ứng viên: #<span className={cx('code')}>{auth.user.id}</span>
                                        </span>
                                        <span className={cx('email')}>{auth.user.email}</span>
                                    </div>
                                </NavLink>
                            </div>

                            <button className={cx('btn-expand', dropdownId === idItemAuth && 'active')}>
                                <FaChevronDown className={cx('icon-expand')} />
                            </button>
                        </div>
                        <div className={cx('menu')}>
                            <NavBar styles={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '20px' }}>
                                {accountItems.map((subItem, subIndex) => (
                                    <NavBarMenuItemComponent
                                        key={subIndex}
                                        icon={subItem.icon}
                                        label={subItem.label}
                                        to={subItem.to}
                                        badgeId={subItem.badgeId}
                                        size={subItem.size}
                                        addHr={subItem.addHr}
                                        handleClick={subItem.onClick}
                                    />
                                ))}
                            </NavBar>
                        </div>
                    </div>
                )}
                {!auth.isAuth && <h2 className={cx('title')}>Dành cho ứng viên</h2>}
                {!auth.isAuth && (
                    <div className={cx('nav-item', 'item')}>
                        <div className={cx('content')}>
                            <div className={cx('container-nav')}>
                                <NavLink to={route.JOB_SEARCH} className={cx('link')} activeclassname={cx('active')}>
                                    Đăng ký thành viên mới
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {!auth.isAuth && (
                    <div className={cx('nav-item', 'item')}>
                        <div className={cx('content')}>
                            <div className={cx('container-nav')}>
                                <NavLink to={route.LOGIN} className={cx('link')} activeclassname={cx('active')}>
                                    Đăng nhập
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}

                {navItems.map((item, index) => (
                    <div className={cx('nav-item', 'item', dropdownId === item.id && 'show')} key={index} onClick={() => handleDropdown(item.id)}>
                        <div className={cx('content')}>
                            <div className={cx('container-nav')}>
                                <NavLink to={item.to} className={cx('link')} activeclassname={cx('active')}>
                                    {item.label}
                                    {item.icon && <img className={cx('icon')} src={item.icon} alt="gift" />}
                                </NavLink>
                            </div>
                            {item.subItems && (
                                <button className={cx('btn-expand', dropdownId === item.id && 'active')}>
                                    <FaChevronDown className={cx('icon-expand')} />
                                </button>
                            )}
                        </div>
                        {item.subItems && (
                            <div className={cx('menu')}>
                                <NavBar key={index} styles={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '20px' }}>
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
                    </div>
                ))}

                {!auth.isAuth && <h2 className={cx('title')}>Dành cho nhà tuyển dụng</h2>}
                {!auth.isAuth && (
                    <div className={cx('nav-item', 'item')}>
                        <div className={cx('content')}>
                            <div className={cx('container-nav')}>
                                <NavLink to={route.MANAGER_REGISTER} className={cx('link')} activeclassname={cx('active')} target="_blank">
                                    Đăng tuyển & tìm hồ sơ
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderHidden;
