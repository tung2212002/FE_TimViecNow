import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import { FaBookmark, FaCartShopping, FaPencil } from 'react-icons/fa6';
import { FaCommentDots, FaQuestionCircle, FaBell, FaCaretDown, FaRegUser } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';

import styles from './Header.module.scss';
import path from '@constants/path';
import { icons, images } from '@assets';
import { logout } from '@redux/features/authUser/authSlide';
import { logoutBusinessService } from '@services/business/businessAuthService';
import { selectUserRole } from '@redux/features/authUser/authSlide';
import { groupRole } from '../../../../constants';

const cx = classNames.bind(styles);

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const role = useSelector(selectUserRole);
    const [showMenu, setShowMenu] = useState(false);
    const [pathActive, setPathActive] = useState(location.pathname + (location.search ? location.search : ''));
    const [process, setProcess] = useState({
        process: 0,
        isFinish: true,
    });
    const [canFinish, setCanFinish] = useState(false);
    const [shouldSpeedUp, setShouldSpeedUp] = useState(false);

    const listItem = [
        { to: path.DASHBOARD_ADMIN, icon: FaBookmark, text: 'HR Insider', roles: groupRole.BUSINESS, classIcon: 'icon-bookmark' },
        { to: path.DASHBOARD_POST, icon: FaPencil, text: 'Đăng tin', roles: groupRole.BUSINESS, classIcon: 'icon-pencil' },
        { to: path.DASHBOARD_SEARCH, icon: FaPencil, text: 'Tìm CV', roles: groupRole.BUSINESS_ADMIN, classIcon: 'icon-pencil' },
        { to: path.DASHBOARD_ADMIN, icon: FaCommentDots, text: 'Connect', roles: groupRole.BUSINESS_ADMIN, classIcon: 'icon-comment' },
        { to: path.DASHBOARD_ADMIN, icon: FaQuestionCircle, text: 'Trợ giúp', roles: groupRole.BUSINESS_ADMIN, classIcon: 'icon-question' },
        {
            to: path.DASHBOARD_ADMIN,
            icon: FaBell,
            text: '',
            badge: 1,
            roles: groupRole.BUSINESS_ADMIN,
            classIcon: 'icon-bell',
            classBadge: 'badge',
            classWrapper: 'notification',
        },
        { to: path.DASHBOARD_CART, icon: FaCartShopping, text: 'Giỏ hàng', badge: 0, roles: groupRole.BUSINESS, classIcon: 'icon-cart', classBadge: 'count' },
    ];

    const useDocumentTitle = (title) => {
        document.title = title;
    };

    const handleLogout = () => {
        logoutBusinessService().then(() => {
            dispatch(logout());
        });
    };

    useEffect(() => {
        if (canFinish) {
            setShouldSpeedUp(true);
        }
    }, [canFinish]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('menu-avatar');
            if (menu && !menu.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (process.isFinish) return;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += shouldSpeedUp ? 5 : 1;
            setProcess({
                process: currentProgress,
                isFinish: currentProgress >= 100,
            });
            if (currentProgress >= 100) {
                clearInterval(interval);
                setProcess({
                    process: 0,
                    isFinish: true,
                });
                setShouldSpeedUp(false);
                setCanFinish(false);
            }
        }, 20);

        return () => {
            clearInterval(interval);
        };
    }, [process.isFinish, shouldSpeedUp]);

    useEffect(() => {
        const pathName = location.pathname + (location.search ? location.search : '');
        const index = listItem.findIndex((item) => item.to === pathName);
        useDocumentTitle(index !== -1 ? listItem[index].text : 'Trang chủ');
        setPathActive(pathName);
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                {process.process > 0 && process.process < 100 && <div className={cx('process-bar')} style={{ width: `${process.process}%` }}></div>}
                <button className={cx('btn-menu')}>
                    <FaBars className={cx('icon', 'icon-menu')} />
                </button>
                <Link to={path.DASHBOARD_HOME} className={cx('logo-link')}>
                    <img src={icons.icon_logo_text} alt="logo" className={cx('logo')} />
                </Link>
                <div className={cx('navbar__main')}>
                    <ul className={cx('navbar__main-list')}>
                        {listItem.map((item, index) => {
                            if (item.roles.includes(role)) {
                                return (
                                    <li className={cx('navbar__main-item')} key={index}>
                                        <Link to={item.to} className={cx('navbar__main-link', { isActive: pathActive === item.to })}>
                                            <div className={cx('navbar__main-wrapper', item.classWrapper)}>
                                                <item.icon className={cx('icon', item.classIcon)} />
                                                {item.text}
                                                {item.badge !== undefined && <div className={cx(item.classBadge)}>{item.badge}</div>}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            }
                            return null;
                        })}

                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_ADMIN} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_ADMIN })}>
                                <div className={cx('navbar__main-wrapper', 'menu-avatar')} onClick={() => setShowMenu(!showMenu)}>
                                    <div className={cx('navbar__main-avatar')}>
                                        <img src={images.avatar_default} alt="avatar" className={cx('avatar')} id="menu-avatar" />
                                    </div>
                                    <FaCaretDown className={cx('icon', 'icon-down')} />
                                    <div className={cx('navbar__main-dropdown', { show: showMenu })}>
                                        <button
                                            className={cx('navbar__main-dropdown-item')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                handleLogout();
                                                setShowMenu(false);
                                            }}
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
