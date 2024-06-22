import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SettingPassword.module.scss';
import regexValidator from '@utils/regexValidator';
import { PiWarningCircle } from 'react-icons/pi';
import path from '@constants/path';
import { changePasswordBusinessService } from '@services/businessAuthService';
import useToast from '@hooks/useToast';

const cx = classNames.bind(styles);

const SettingPassword = () => {
    const [data, setData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [error, setError] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
        isError: true,
    });

    const [state, setState] = useState({
        canSubmit: false,
    });

    const { handleAddToast } = useToast();

    const handleChangePassword = () => {
        changePasswordBusinessService(data)
            .then((response) => {
                if (response.status === 200) {
                    handleAddToast('Thành công', 'Cập nhật mật khẩu thành công', 'success');
                    setData({
                        old_password: '',
                        new_password: '',
                        confirm_password: '',
                    });
                } else if (response.status === 401) {
                    handleAddToast('Thất bại', 'Mật khẩu cũ không chính xác', 'error');
                } else if (response.status === 400) {
                    handleAddToast('Thất bại', 'Kiểm tra lại mật khẩu', 'error');
                } else if (response.status === 409) {
                    handleAddToast('Thất bại', 'Mật khẩu mới cần khác mật khẩu cũ', 'error');
                } else {
                    handleAddToast('Thất bại', 'Thử lại sau', 'error');
                }
            })
            .catch((error) => {
                handleAddToast('Thất bại', 'Thử lại sau', 'error');
            });
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        if (Object.keys(error).includes(name)) {
            setError({ ...error, [name]: '' });
        }
        setData({ ...data, [name]: value });
    };

    const handleValidation = (e) => {
        const { name, value } = e.target;

        let newError = '';
        switch (name) {
            case 'old_password':
                newError =
                    value?.trim().length === 0
                        ? 'Mật khẩu không được để trống'
                        : value.length < 8 || value.length > 16
                        ? 'Mật khẩu từ 8 đến 16 ký tự'
                        : !value.match(regexValidator.PASSWORD)
                        ? 'Mật khẩu cần chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt'
                        : '';
                break;
            case 'new_password':
                newError =
                    value?.trim().length === 0
                        ? 'Mật khẩu không được để trống'
                        : value.length < 8 || value.length > 16
                        ? 'Mật khẩu từ 8 đến 16 ký tự'
                        : !value.match(regexValidator.PASSWORD)
                        ? 'Mật khẩu cần chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt'
                        : '';
                break;
            case 'confirm_password':
                newError = value?.trim().length === 0 ? 'Mật khẩu không được để trống' : value !== data.new_password ? 'Nhập lại mật khẩu không đúng' : '';
                break;
            default:
                break;
        }
        if (newError) {
            setError({ ...error, [name]: newError, isError: true });
        }
    };

    const handleValidationOnChange = (name, value) => {
        switch (name) {
            case 'old_password':
                return value?.trim().length !== 0 && value.length >= 8 && value.length <= 16 && value.match(regexValidator.PASSWORD);
            case 'new_password':
                return (
                    value?.trim().length !== 0 &&
                    value.length >= 8 &&
                    value.length <= 16 &&
                    value.match(regexValidator.PASSWORD) &&
                    value === data.confirm_password
                );
            case 'confirm_password':
                return value?.trim().length !== 0 && value === data.new_password;
            default:
                return false;
        }
    };

    useEffect(() => {
        const check = Object.keys(data).map((item) => handleValidationOnChange(item, data[item]));
        setState({ ...state, canSubmit: !(check.includes(false) || check.includes(null)) });
    }, [data]);

    useEffect(() => {
        if (state.canSubmit) {
            setError({ ...error, isError: false });
        } else {
            setError({ ...error, isError: true });
        }
    }, [state.canSubmit]);

    return (
        <div className={cx('wrapper')}>
            <form className={cx('container')}>
                <div className={cx('header')}>Thay đổi mật khẩu</div>
                <div className={cx('body')}>
                    <div className={cx('body-item')}>
                        <label className={cx('label')} htmlFor="old_password">
                            <span>Mật khẩu hiện tại</span>
                        </label>
                        <div className={cx('input-box')}>
                            <input
                                type="password"
                                id="old_password"
                                name="old_password"
                                className={cx('input')}
                                value={data.old_password}
                                onChange={handleOnchange}
                                placeholder="Nhập mật khẩu hiện tại"
                                onBlur={handleValidation}
                                autoComplete="off"
                            />
                            {error.old_password && <PiWarningCircle className={cx('icon-warning')} />}
                            {error.old_password && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.old_password}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('body-item')}>
                        <label className={cx('label')} htmlFor="new_password">
                            <span>Mật khẩu mới</span>
                        </label>
                        <div className={cx('input-box')}>
                            <input
                                type="password"
                                id="new_password"
                                name="new_password"
                                className={cx('input')}
                                value={data.new_password}
                                onChange={handleOnchange}
                                placeholder="Nhập mật khẩu mới"
                                onBlur={handleValidation}
                                autoComplete="off"
                            />
                            {error.new_password && <PiWarningCircle className={cx('icon-warning')} />}
                            {error.new_password && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.new_password}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('body-item')}>
                        <label className={cx('label')} htmlFor="confirm_password">
                            <span>Nhập lại mật khẩu</span>
                        </label>
                        <div className={cx('input-box')}>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                className={cx('input')}
                                value={data.confirm_password}
                                onChange={handleOnchange}
                                placeholder="Nhập lại mật khẩu hiện tại"
                                onBlur={handleValidation}
                                autoComplete="off"
                            />
                            {error.confirm_password && <PiWarningCircle className={cx('icon-warning')} />}
                            {error.confirm_password && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.confirm_password}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('body-item')}>
                        <div className={cx('label')}></div>
                        <div className={cx('input-box')}>
                            <Link type="button" className={cx('button', 'cancel')} to={path.DASHBOARD_HOME}>
                                Hủy
                            </Link>
                            <button type="button" className={cx('button', 'save')} disabled={!state.canSubmit || error.isError} onClick={handleChangePassword}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingPassword;
