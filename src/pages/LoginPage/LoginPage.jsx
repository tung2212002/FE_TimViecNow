import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

import { MdEmail } from 'react-icons/md';
import { BsShieldLockFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaLinkedin, FaUser } from 'react-icons/fa';

import styles from './LoginPage.module.scss';
import { loginGoogleService, loginService, registerService } from '@services/user/authService';
import { login } from '@redux/features/authUser/authSlide';
import route from '@constants/route';
import useDocumentTitle from '@hooks/useDocumentTitle';
import regexValidator from '@utils/regexValidator';
import { addToast, removeToast } from '@redux/features/toast/toastSlice';
import { Spinner } from '@components/common';

const cx = classNames.bind(styles);

const LoginPage = () => {
    const dispatch = useDispatch();
    const isLogin = !(window.location.pathname === route.REGISTER);

    useDocumentTitle(isLogin ? 'Đăng nhập' : 'Đăng ký');

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState({
        showPassword: false,
        showConfirmPassword: false,
    });
    const [showPolicy, setShowPolicy] = useState(false);
    const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);
    const [account, setAccount] = useState({
        email: '',
        password: '',
    });

    const [accountRegister, setAccountRegister] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleAddToast = (title, message, type) => {
        const newToast = {
            id: Math.random().toString(36).slice(2),
            title,
            message,
            type,
        };
        dispatch(addToast(newToast));
        setTimeout(() => {
            dispatch(removeToast(newToast.id));
        }, 3000);
    };

    const handleSetLoading = (value) => {
        setLoading(value);
    };

    const handleLogin = () => {
        if (!account.email || !account.password) {
            setMessage('Vui lòng nhập đầy đủ thông tin');
            setLoading(false);
            return;
        }

        if (!regexValidator.EMAIL.test(account.email)) {
            setMessage('Email không hợp lệ');
            setLoading(false);
            return;
        }

        if (!regexValidator.PASSWORD.test(account.password)) {
            setMessage('Mật khẩu không hợp lệ');
            setLoading(false);
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
                    setLoading(false);
                } else if (res.status === 401) {
                    setMessage('Mật khẩu không chính xác');
                    setLoading(false);
                } else if (res.status === 404) {
                    setMessage('Tài khoản không tồn tại');
                    setLoading(false);
                }
            })
            .catch((err) => {
                setMessage('Lỗi không xác định');
                setLoading(false);
                console.log(err);
            });
    };

    const handleRegister = () => {
        setLoading(true);
        if (!accountRegister.full_name || !accountRegister.email || !accountRegister.password || !accountRegister.confirm_password) {
            setMessage('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (!regexValidator.EMAIL.test(accountRegister.email)) {
            setMessage('Email không hợp lệ');
            return;
        }

        if (!regexValidator.PASSWORD.test(accountRegister.password)) {
            setMessage('Mật khẩu không hợp lệ');
            return;
        }

        if (accountRegister.password !== accountRegister.confirm_password) {
            setMessage('Mật khẩu không trùng khớp');
            return;
        }

        if (!regexValidator.FULLNAME.test(accountRegister.full_name)) {
            setMessage('Họ và tên không hợp lệ');
            return;
        }

        const data = {
            full_name: accountRegister.full_name,
            email: accountRegister.email,
            password: accountRegister.password,
            confirm_password: accountRegister.confirm_password,
        };

        registerService(data)
            .then((res) => {
                if (res.status === 201) {
                    dispatch(login(res.data.data));
                } else if (res.status === 409) {
                    setMessage('Email đã tồn tại');
                    setLoading(false);
                } else if (res.status === 400) {
                    setMessage('Email hoặc mật khẩu không hợp lệ');
                    setLoading(false);
                }
            })
            .catch((err) => {
                setMessage('Lỗi không xác định');
                setLoading(false);
                console.log(err);
            });
    };

    const handleLoginGoogle = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            const body = {
                access_token: tokenResponse.access_token,
            };
            loginGoogleService(body)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(login(res.data.data));
                    } else if (res.status === 400) {
                        handleAddToast('Thông báo', 'Đã có lỗi xảy ra', 'error');
                    } else if (res.status === 401) {
                        handleAddToast('Thông báo', 'Mã token không hợp lệ', 'error');
                    } else if (res.status === 404) {
                        handleAddToast('Thông báo', 'Tài khoản không tồn tại', 'error');
                    }
                })
                .catch((err) => {
                    handleAddToast('Thông báo', 'Lỗi không xác định', 'error');
                    console.log(err);
                });
        },
    });

    useEffect(() => {
        loading && handleLogin();
    }, [loading]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-container')}>
                <div className={cx('auth-inner')}>
                    <div className={cx('auth-form')}>
                        <div className={cx('header')}>
                            <h2 className={cx('title')}>{isLogin ? 'Chào mừng bạn quay trở lại' : 'Chào mừng bạn đến với TVNow'}</h2>
                            <div className={cx('desc')}>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội nghề nghiệp lý tưởng</div>
                        </div>
                        <div className={cx('body')}>
                            <div className={cx('alert', { show: message })}>
                                <p className={cx('text')}>{message}</p>
                            </div>
                            {isLogin ? (
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
                                            Mật khẩu
                                        </label>
                                        <div className={cx('input-wrapper')}>
                                            <BsShieldLockFill className={cx('icon', 'password')} />
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
                                        <button type="button" className={cx('btn')} onClick={() => handleSetLoading(true)} disabled={loading}>
                                            {loading ? <Spinner color="#fff" /> : 'Đăng nhập'}
                                        </button>
                                        <p className={cx('desc')}>Hoặc đăng nhập bằng</p>
                                    </div>
                                    <div className={cx('form-group', 'social-login', { disabled: !isAcceptPolicy })}>
                                        <button type="button" className={cx('btn', 'btn-google')} disabled={!isAcceptPolicy} onClick={handleLoginGoogle}>
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
                            ) : (
                                <form className={cx('form')}>
                                    <div className={cx('form-group', 'form-group-email')}>
                                        <label htmlFor="full-name" className={cx('label')}>
                                            Họ và tên
                                        </label>
                                        <div className={cx('input-wrapper')}>
                                            <FaUser className={cx('icon', 'full-name', 'email')} />
                                            <input
                                                type="text"
                                                id="full-name"
                                                name="full-name"
                                                className={cx('input')}
                                                placeholder="Họ và tên"
                                                value={accountRegister.full_name}
                                                onChange={(e) => {
                                                    setAccountRegister({ ...accountRegister, full_name: e.target.value });
                                                    setMessage('');
                                                }}
                                            />
                                        </div>
                                    </div>
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
                                                value={accountRegister.email}
                                                onChange={(e) => {
                                                    setAccountRegister({ ...accountRegister, email: e.target.value });
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
                                                type={!showPassword.showPassword ? 'password' : 'text'}
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                className={cx('input')}
                                                placeholder="Mật khẩu"
                                                value={accountRegister.password}
                                                onChange={(e) => {
                                                    setAccountRegister({ ...accountRegister, password: e.target.value });
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
                                    <div className={cx('form-group', 'form-group-password')}>
                                        <label htmlFor="password" className={cx('label')}>
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className={cx('input-wrapper')}>
                                            <BsShieldLockFill className={cx('icon', 'password')} />
                                            <input
                                                type={!showPassword.showConfirmPassword ? 'password' : 'text'}
                                                autoComplete="off"
                                                id="confirm_password"
                                                name="confirm_password"
                                                className={cx('input')}
                                                placeholder="Nhập lại mật khẩu"
                                                value={accountRegister.confirm_password}
                                                onChange={(e) => {
                                                    setAccountRegister({ ...accountRegister, confirm_password: e.target.value });
                                                    setMessage('');
                                                }}
                                            />
                                            <button
                                                className={cx('icon-show')}
                                                onClick={() => setShowPassword({ ...showPassword, showConfirmPassword: !showPassword.showConfirmPassword })}
                                                type="button"
                                            >
                                                {!showPassword.showConfirmPassword ? (
                                                    <FaEyeSlash className={cx('icon-eye', 'eye-slash')} />
                                                ) : (
                                                    <FaEye className={cx('icon-eye', 'eye')} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className={cx('form-group', 'policy')}>
                                        <div className={cx('checkbox-wrapper')}>
                                            <input
                                                type="checkbox"
                                                id="accept-policy"
                                                name="accept-policy"
                                                className={cx('checkbox')}
                                                onChange={() => setShowPolicy(!showPolicy)}
                                            />
                                            <label htmlFor="accept-policy" className={cx('label-checkbox')} />
                                        </div>
                                        <p className={cx('desc')}>
                                            <label className={cx('label')} htmlFor="accept-policy">
                                                Tôi đã đọc và đồng ý với{' '}
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
                                    <div className={cx('form-group', 'login')}>
                                        <button
                                            type="button"
                                            className={cx('btn', { disabled: !showPolicy })}
                                            onClick={handleRegister}
                                            disabled={!showPolicy || loading}
                                        >
                                            {loading ? <Spinner color="#fff" /> : 'Đăng ký'}
                                        </button>
                                        <p className={cx('desc')}>Hoặc đăng nhập bằng</p>
                                    </div>
                                    <div className={cx('form-group', 'social-login', { disabled: !isAcceptPolicy })}>
                                        <button type="button" className={cx('btn', 'btn-google')} disabled={!isAcceptPolicy} onClick={handleLoginGoogle}>
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
                            )}
                            <div className={cx('options')}>
                                <div className={cx('option')}>
                                    <span className={cx('text')}>{isLogin ? 'Bạn chưa có tài khoản? ' : 'Bạn đã có tài khoản? '}</span>
                                    <a className={cx('link', 'register')} href={isLogin ? route.REGISTER : route.LOGIN}>
                                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
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
