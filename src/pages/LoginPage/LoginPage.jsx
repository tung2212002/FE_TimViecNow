import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { MdEmail } from 'react-icons/md';
import { BsShieldLockFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

import styles from './LoginPage.module.scss';
import { useState } from 'react';
import { loginService } from '../../services/authService';
import { login, updateUserInfo } from '../../redux/features/auth/authSlide';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);
    const [account, setAccount] = useState({
        email: '',
        password: '',
    });

    const regex = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!regex.email.test(account.email)) {
            setMessage('Email không hợp lệ');
            return;
        }

        if (!regex.password.test(account.password)) {
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
                    dispatch(login(res.data));
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setMessage('Email hoặc mật khẩu không đúng');
                } else if (err.response.status === 404) {
                    setMessage('Tài khoản không tồn tại');
                } else {
                    setMessage('Lỗi không xác định');
                }
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-container')}>
                <div className={cx('auth-inner')}>
                    <div className={cx('auth-form')}>
                        <div className={cx('header')}>
                            <h2 className={cx('title')}>Chào mừng bạn quay trở lại</h2>
                            <div className={cx('desc')}>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội nghề nghiệp lý tưởng</div>
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
                                        <MdEmail className={cx('icon', 'email')} />
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
                                        Password
                                    </label>
                                    <div className={cx('input-wrapper')}>
                                        <BsShieldLockFill className={cx('icon', 'password')} />
                                        <input
                                            type={!showPassword ? 'password' : 'text'}
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
                                        <button className={cx('icon-show')} onClick={() => setShowPassword(!showPassword)} type="button">
                                            {!showPassword ? (
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
                                    <p className={cx('desc')}>Hoặc đăng nhập bằng</p>
                                </div>
                                <div className={cx('form-group', 'social-login', { disabled: !isAcceptPolicy })}>
                                    <button type="button" className={cx('btn', 'btn-google')} disabled={!isAcceptPolicy}>
                                        <FaGoogle className={cx('icon', 'google')} />
                                        <span className={cx('text')}>Google</span>
                                    </button>
                                    <button type="button" className={cx('btn', 'btn-facebook')} disabled={!isAcceptPolicy}>
                                        <FaFacebook className={cx('icon', 'facebook')} />
                                        <span className={cx('text')}>Facebook</span>
                                    </button>
                                    <button type="button" className={cx('btn', 'btn-linkedin')} disabled={!isAcceptPolicy}>
                                        <FaLinkedin className={cx('icon', 'linkedin')} />
                                        <span className={cx('text')}>LinkedIn</span>
                                    </button>
                                </div>
                                <div className={cx('form-group', 'policy')}>
                                    <div className={cx('checkbox-wrapper')}>
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            className={cx('checkbox')}
                                            onChange={() => setIsAcceptPolicy(!isAcceptPolicy)}
                                        />
                                        <label htmlFor="remember" className={cx('label-checkbox')} />
                                    </div>
                                    <p className={cx('desc')}>
                                        <label className={cx('label')} htmlFor="remember">
                                            Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với{' '}
                                            <a className={cx('link')} href="/" target="_blank" rel="noreferrer">
                                                Điều khoản dịch vụ
                                            </a>{' '}
                                            và{' '}
                                            <a className={cx('link')} href="/" target="_blank" rel="noreferrer">
                                                Chính sách bảo mật
                                            </a>{' '}
                                            của TVNow
                                        </label>
                                    </p>
                                </div>
                            </form>
                            <div className={cx('options')}>
                                <div className={cx('option')}>
                                    <span className={cx('text')}>Bạn chưa có tài khoản? </span>
                                    <a href="/" className={cx('link', 'register')} target="_blank" rel="noreferrer">
                                        Đăng ký ngay
                                    </a>
                                </div>
                            </div>
                            <div className={cx('support-center')}>
                                <p className={cx('title')}>Bạn gặp khó khăn khi tạo tài khoản</p>
                                <p className={cx('desc')}>
                                    Vui lòng gọi tới số
                                    <a className={cx('link')} href="tel:123 456 789">
                                        {' '}
                                        123 456 789{' '}
                                    </a>
                                    để được hỗ trợ
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={cx('copy-right')}>© 2024 TVNow.vn - Bản quyền thuộc về TVNow</p>
            </div>
            <div className={cx('banner')}>
                <div className={cx('banner-abs')}>
                    <h1 className={cx('title')}>
                        Tiếp lợi thế
                        <br />
                        Nối thành công
                    </h1>
                    <p className={cx('desc')}>TVNow - Hệ sinh thái nhân sự tiên phong ứng dụng công nghệ tại Việt Nam</p>
                </div>
                <div className={cx('banner-bg')} />
                <div className={cx('bg-right-arrow')} />
            </div>
        </div>
    );
};

export default LoginPage;
