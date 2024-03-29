import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import { FaBookmark, FaCartShopping, FaPencil } from 'react-icons/fa6';
import { FaCommentDots, FaQuestionCircle, FaBell, FaCaretDown } from 'react-icons/fa';

import styles from './HeaderDashBoardComponent.module.scss';
import path from '../../../constants/path';
import { FaBars } from 'react-icons/fa6';
import { icons, images } from '../../../assets';

const cx = classNames.bind(styles);

const HeaderDashBoardComponent = () => {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [pathActive, setPathActive] = useState(location.pathname + (location.search ? location.search : ''));

    const useDocumentTitle = (title) => {
        document.title = title;
    };

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
        setPathActive(location.pathname + (location.search ? location.search : ''));
        switch (location.pathname + (location.search ? location.search : '')) {
            case path.DASHBOARD_ADMIN:
                useDocumentTitle('HR Insider');
                break;
            case path.DASHBOARD_POST:
                useDocumentTitle('Đăng tin');
                break;
            case path.DASHBOARD_SEARCH:
                useDocumentTitle('Tìm CV');
                break;
            case path.DASHBOARD_CART:
                useDocumentTitle('Giỏ hàng');
                break;
            case path.DASHBOARD_HOME:
                useDocumentTitle('Trang chủ');
                break;
            default:
                useDocumentTitle('Trang chủ');
                break;
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
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

export default HeaderDashBoardComponent;
