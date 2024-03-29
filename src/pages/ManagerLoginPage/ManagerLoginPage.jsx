import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { PiLockOpenBold } from 'react-icons/pi';
import { FaEye, FaEyeSlash, FaRegEnvelope } from 'react-icons/fa';

import styles from './ManagerLoginPage.module.scss';
import { loginService } from '../../services/authService';
import { login } from '../../redux/features/auth/authSlide';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import regexValidator from '../../utils/regexValidator';
import path from '../../constants/path';
import { icons } from '../../assets/index';

const cx = classNames.bind(styles);

const ManagerLoginPage = () => {
    const dispatch = useDispatch();

    useDocumentTitle('Đăng nhập | Smart Recruitment Platform - TVNow');

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState({
        showPassword: false,
        showConfirmPassword: false,
    });

    const [account, setAccount] = useState({
        email: '',
        password: '',
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (!account.email || !account.password) {
            setMessage('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (!regexValidator.EMAIL.test(account.email)) {
            setMessage('Email không hợp lệ');
            return;
        }

        if (!regexValidator.PASSWORD.test(account.password)) {
            setMessage('Mật khẩu không hợp lệ');
            return;
        }

        const data = {
            email: account.email,
            password: account.password,
        };

        loginService(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(login(res.data.data));
                } else if (res.status === 400) {
                    setMessage('Email hoặc mật khẩu không hợp lệ');
                } else if (res.status === 401) {
                    setMessage('Mật khẩu không chính xác');
                } else if (res.status === 404) {
                    setMessage('Tài khoản không tồn tại');
                }
            })
            .catch((err) => {
                setMessage('Lỗi không xác định');
                console.log(err);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-container')}>
                <div className={cx('auth-inner')}>
                    <div className={cx('auth-form')}>
                        <div className={cx('logo')}>
                            <div className={cx('logo-wrapper')}>
                                <img src={icons.logo} alt="logo" className={cx('img')} />
                            </div>
                        </div>
                        <div className={cx('header')}>
                            <h2 className={cx('title')}>Chào mừng bạn đã quay trở lại</h2>
                            <div className={cx('desc')}>Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng</div>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('alert', { show: message })}>
                                <p className={cx('text')}>{message}</p>
                            </div>

                            <form className={cx('form')}>
                                <div className={cx('form-group', 'form-group-email')}>
                                    <label htmlFor="email" className={cx('label')}>
                                        Email
                                    </label>
                                    <div className={cx('input-wrapper')}>
                                        <FaRegEnvelope className={cx('icon', 'email')} />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={cx('input')}
                                            placeholder="Email"
                                            value={account.email}
                                            onChange={(e) => {
                                                setAccount({ ...account, email: e.target.value });
                                                setMessage('');
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={cx('form-group', 'form-group-password')}>
                                    <label htmlFor="password" className={cx('label')}>
                                        Mật khẩu
                                    </label>
                                    <div className={cx('input-wrapper')}>
                                        <PiLockOpenBold className={cx('icon', 'password')} />
                                        <input
                                            type={!showPassword.showPassword ? 'password' : 'text'}
                                            autoComplete="off"
                                            id="password"
                                            name="password"
                                            className={cx('input')}
                                            placeholder="Mật khẩu"
                                            value={account.password}
                                            onChange={(e) => {
                                                setAccount({ ...account, password: e.target.value });
                                                setMessage('');
                                            }}
                                        />
                                        <button
                                            className={cx('icon-show')}
                                            onClick={() => setShowPassword({ ...showPassword, showPassword: !showPassword.showPassword })}
                                            type="button"
                                        >
                                            {!showPassword.showPassword ? (
                                                <FaEyeSlash className={cx('icon-eye', 'eye-slash')} />
                                            ) : (
                                                <FaEye className={cx('icon-eye', 'eye')} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('form-group', 'forgot-password')}>
                                    <a href="/" className={cx('link')}>
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className={cx('form-group', 'login')}>
                                    <button type="submit" className={cx('btn')} onClick={handleLogin}>
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>

                            <div className={cx('options')}>
                                <div className={cx('option')}>
                                    <span className={cx('text')}>Chưa có tài khoản?</span>{' '}
                                    <Link to={path.MANAGER_REGISTER} className={cx('link', 'register')}>
                                        <span className={cx('link', 'register')}>Đăng ký ngay</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('auth-footer')}>
                    <p className={cx('copy-right')}>© 2024 TVNow.vn - Bản quyền thuộc về TVNow</p>
                </div>
            </div>
            <div className={cx('banner')}>
                <div className={cx('banner-abs')}>
                    <h1 className={cx('title')}>
                        Track your funnel with <span className={cx('highlight')}>Report</span>
                    </h1>
                    <p className={cx('desc')}>TVNow - Hệ sinh thái nhân sự tiên phong ứng dụng công nghệ tại Việt Nam</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerLoginPage;
