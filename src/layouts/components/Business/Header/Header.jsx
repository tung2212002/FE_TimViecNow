import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import { FaBookmark, FaCartShopping, FaPencil } from 'react-icons/fa6';
import { FaCommentDots, FaQuestionCircle, FaBell, FaCaretDown } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';

import styles from './Header.module.scss';
import path from '@constants/path';
import { icons, images } from '@assets';
import { logout } from '../../../../redux/features/authUser/authSlide';
import { logoutBusinessService } from '@services/business/businessAuthService';

const cx = classNames.bind(styles);

const Header = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [pathActive, setPathActive] = useState(location.pathname + (location.search ? location.search : ''));
    const [process, setProcess] = useState({
        process: 0,
        isFinish: true,
    });
    const [canFinish, setCanFinish] = useState(false);
    const [shouldSpeedUp, setShouldSpeedUp] = useState(false);

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
            setShouldSpeedUp(true); // Đặt biến trung gian để chỉ định muốn tăng tốc
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
        switch (location.pathname + (location.search ? location.search : '')) {
            case path.DASHBOARD_ADMIN:
                useDocumentTitle('HR Insider');
                setPathActive(path.DASHBOARD_ADMIN);
                break;
            case path.DASHBOARD_POST:
                useDocumentTitle('Đăng tin');
                setPathActive(path.DASHBOARD_POST);
                break;
            case path.DASHBOARD_SEARCH:
                useDocumentTitle('Tìm CV');
                setPathActive(path.DASHBOARD_SEARCH);
                break;
            case path.DASHBOARD_CART:
                useDocumentTitle('Giỏ hàng');
                setPathActive(path.DASHBOARD_CART);
                break;
            case path.DASHBOARD_HOME:
                useDocumentTitle('Trang chủ');
                setPathActive(path.DASHBOARD_HOME);
                break;
            default:
                useDocumentTitle('Trang chủ');
                setPathActive(path.DASHBOARD_HOME);
                break;
        }
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
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_ADMIN} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_ADMIN })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaBookmark className={cx('icon', 'icon-bookmark')} />
                                    HR Insider
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_POST} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_POST })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaPencil className={cx('icon', 'icon-pencil')} />
                                    Đăng tin
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_SEARCH} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_SEARCH })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaPencil className={cx('icon', 'icon-pencil')} />
                                    Tìm CV
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_ADMIN} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_ADMIN })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaCommentDots className={cx('icon', 'icon-comment')} />
                                    Connect
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_ADMIN} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_ADMIN })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaQuestionCircle className={cx('icon', 'icon-question')} />
                                    Trợ giúp
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_ADMIN} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_ADMIN })}>
                                <div className={cx('navbar__main-wrapper', 'notification')}>
                                    <FaBell className={cx('icon', 'icon-bell')} />
                                    <div className={cx('badge')}>1</div>
                                </div>
                            </Link>
                        </li>
                        <li className={cx('navbar__main-item')}>
                            <Link to={path.DASHBOARD_CART} className={cx('navbar__main-link', { isActive: pathActive === path.DASHBOARD_CART })}>
                                <div className={cx('navbar__main-wrapper')}>
                                    <FaCartShopping className={cx('icon', 'icon-cart')} />
                                    Giỏ hàng
                                    <div className={cx('count')}>0</div>
                                </div>
                            </Link>
                        </li>
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
