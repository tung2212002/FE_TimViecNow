import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaRegEnvelope, FaRegUser, FaCaretDown, FaRegBuilding } from 'react-icons/fa';
import { PiLockBold, PiWarningCircle, PiPhone, PiUserGearBold } from 'react-icons/pi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { TbBuildingCommunity, TbBuilding } from 'react-icons/tb';
import { HiCheck } from 'react-icons/hi';

import styles from './RegisterForm.module.scss';
import { SelectionComponent } from '../../../../../components/common';
import path from '../../../../../constants/path';
import regexValidator from '../../../../../utils/regexValidator';
import { getListDistrictService, getListProvinceService } from '../../../../../services/locationService';
import { registerBusinessService } from '../../../../../services/businessAuthService';
import { login, selectBusiness } from '../../../../../redux/features/authBusiness/authSlide';
import { addToast, removeToast } from '../../../../../redux/features/toast/toastSlice';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isAgree: false,
        canSubmit: false,
    });
    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirm_password: '',
        full_name: '',
        gender: '',
        phone_number: '',
        company_name: '',
        work_position: '',
        district_id: -1,
        province_id: -1,
        account_skype: '',
        work_location: '',
    });
    const requiredFields = ['email', 'password', 'confirm_password', 'full_name', 'phone_number', 'company_name', 'work_position', 'province_id', 'gender'];
    const [error, setError] = useState({
        email: '',
        password: '',
        confirm_password: '',
        full_name: '',
        phone_number: '',
        company_name: '',
        work_position: '',
        district_id: -1,
        province_id: -1,
        gender: '.',
        isError: true,
    });

    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);

    const positionList = [
        { value: '0', name: 'Nhân viên' },
        { value: '1', name: 'Trưởng nhóm' },
        { value: '2', name: 'Phó phòng' },
        { value: '3', name: 'Trưởng phòng' },
        { value: '4', name: 'Phó giám đốc' },
        { value: '5', name: 'Giám đốc' },
        { value: '6', name: 'Tổng giám đốc' },
    ];

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

    const handleSubmit = () => {
        const data = new FormData();
        for (let key in info) {
            if (key === 'district_id') {
                data.append(key, info[key] === -1 ? '' : info[key]);
                continue;
            }
            data.append(key, info[key]);
        }

        registerBusinessService(data)
            .then((res) => {
                if (res.status === 201) {
                    dispatch(login(res.data.data));
                } else if (res.status === 409) {
                    handleAddToast('Cảnh báo', 'Email đã tồn tại', 'warning');
                } else if (res.status === 400) {
                    handleAddToast('Cảnh báo', 'Dữ liệu không hợp lệ', 'warning');
                }
            })
            .catch((err) => {
                handleAddToast('Lỗi', 'Lỗi không xác định', 'error');
                console.log(err);
            });
    };

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm_password: false,
    });

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        if (requiredFields.includes(name)) {
            setError({ ...error, [name]: '' });
        }
        setInfo({ ...info, [name]: value });
    };

    const handleValidation = (e) => {
        const { name, value } = e.target;

        let newError = '';
        switch (name) {
            case 'email':
                newError = value?.trim().length === 0 ? 'Email không được để trống' : !value.match(regexValidator.EMAIL) ? 'Email không hợp lệ' : '';
                break;
            case 'password':
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
                newError =
                    value?.trim().length === 0
                        ? 'Mật khẩu không được để trống'
                        : value.length < 8 || value.length > 16
                        ? 'Mật khẩu từ 8 đến 16 ký tự'
                        : value !== info.password
                        ? 'Nhập lại mật khẩu không đúng'
                        : '';
                break;
            case 'full_name':
                newError =
                    value?.trim().length === 0
                        ? 'Họ và tên không được để trống'
                        : value?.trim().length < 3 || value?.trim().length > 50
                        ? 'Họ và tên từ 3 đến 50 ký tự'
                        : !value.match(regexValidator.FULLNAME)
                        ? 'Họ và tên không hợp lệ'
                        : '';
                break;
            case 'phone_number':
                newError =
                    value?.trim().length === 0
                        ? 'Số điện thoại không được để trống'
                        : !value.match(regexValidator.REGEX_PHONE_NUMBER)
                        ? 'Số điện thoại không hợp lệ'
                        : '';
                break;
            case 'company_name':
                newError = value.length === 0 ? 'Tên công ty không được để trống' : '';
                break;
            case 'work_position':
                newError = value.length === 0 ? 'Vị trí công tác không được để trống' : '';
                break;
            case 'province_id':
                newError = value === -1 ? 'Địa điểm làm việc không được để trống' : '';
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
            case 'email':
                return value?.trim().length !== 0 && value.match(regexValidator.EMAIL);
            case 'password':
                return (
                    value?.trim().length !== 0 &&
                    value.length >= 8 &&
                    value.length <= 16 &&
                    value.match(regexValidator.PASSWORD) &&
                    value === info.confirm_password
                );
            case 'confirm_password':
                return value?.trim().length !== 0 && value === info.password;
            case 'full_name':
                return value?.trim().length !== 0 && value?.trim().length >= 3 && value?.trim().length <= 50 && value.match(regexValidator.FULLNAME);
            case 'phone_number':
                return value?.trim().length !== 0 && value.match(regexValidator.REGEX_PHONE_NUMBER);
            case 'company_name':
                return value.length !== 0;
            case 'work_position':
                return value.length !== 0;
            case 'province_id':
                return value !== -1;
            case 'gender':
                return value.length !== 0;
            default:
                return false;
        }
    };

    useEffect(() => {
        const check = requiredFields.map((item) => handleValidationOnChange(item, info[item]));

        setState({ ...state, canSubmit: !(check.includes(false) || check.includes(null)) });
    }, [info]);

    useEffect(() => {
        if (state.canSubmit) {
            setError({ ...error, isError: false });
        } else {
            setError({ ...error, isError: true });
        }
    }, [state.canSubmit]);

    useEffect(() => {
        getListProvinceService()
            .then((res) => {
                if (res.status === 200) {
                    setProvince(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (info.province_id === 100 || info.province_id === -1) return;
        const params = {
            province_id: info.province_id,
        };
        getListDistrictService(params)
            .then((res) => {
                if (res.status === 200) {
                    setDistrict(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [info.province_id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('form')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-title')}>
                            <span className={cx('form-group-title-text')}>Tài khoản</span>
                        </div>
                        <div className={cx('form-group-input')}>
                            <label className={cx('form-group-input-label')} htmlFor="email">
                                Email đăng nhập
                                <span className={cx('note')}>*</span>
                            </label>
                            <div className={cx('form-group-input-container')}>
                                <div className={cx('input-container')}>
                                    <FaRegEnvelope className={cx('icon')} />
                                    <input
                                        className={cx('input')}
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        value={info.email}
                                        onChange={handleChangeInput}
                                        onBlur={handleValidation}
                                    />
                                    {error.email && <PiWarningCircle className={cx('icon-warning')} />}
                                </div>
                                <div className={cx('invalid-feedback')}>
                                    <div className={cx('invalid-feedback-text')}>{error.email}</div>
                                </div>
                                <div className={cx('warning')}>
                                    Trường hợp bạn đăng ký tài khoản bằng email không phải email tên miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị
                                    giới hạn quyền mua hoặc sử dụng.
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-input')}>
                            <label className={cx('form-group-input-label')} htmlFor="password">
                                Mật khẩu
                                <span className={cx('note')}>*</span>
                            </label>
                            <div className={cx('form-group-input-container')}>
                                <div className={cx('input-container')}>
                                    <PiLockBold className={cx('icon')} />
                                    <input
                                        className={cx('input')}
                                        type={showPassword.password ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Mật khẩu ( từ 8 đến 16 ký tự )"
                                        autoComplete="off"
                                        value={info.password}
                                        onChange={handleChangeInput}
                                        onBlur={handleValidation}
                                    />
                                    <span className={cx('icon-eye')} onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}>
                                        {showPassword.password ? <FaRegEyeSlash className={cx('eye')} /> : <FaRegEye className={cx('eye')} />}
                                    </span>
                                    {error.password && <PiWarningCircle className={cx('icon-warning')} />}
                                </div>
                                <div className={cx('invalid-feedback')}>
                                    <div className={cx('invalid-feedback-text')}>{error.password}</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-input')}>
                            <label className={cx('form-group-input-label')} htmlFor="confirm_password">
                                Xác nhận mật khẩu
                                <span className={cx('note')}>*</span>
                            </label>
                            <div className={cx('form-group-input-container')}>
                                <div className={cx('input-container')}>
                                    <PiLockBold className={cx('icon')} />
                                    <input
                                        className={cx('input')}
                                        type={showPassword.confirm_password ? 'text' : 'password'}
                                        id="confirm_password"
                                        name="confirm_password"
                                        placeholder="Nhập lại mật khẩu"
                                        autoComplete="off"
                                        value={info.confirm_password}
                                        onChange={handleChangeInput}
                                        onBlur={handleValidation}
                                    />
                                    <span
                                        className={cx('icon-eye')}
                                        onClick={() => setShowPassword({ ...showPassword, confirm_password: !showPassword.confirm_password })}
                                    >
                                        {showPassword.confirm_password ? <FaRegEyeSlash className={cx('eye')} /> : <FaRegEye className={cx('eye')} />}
                                    </span>
                                    {error.confirm_password && <PiWarningCircle className={cx('icon-warning')} />}
                                </div>
                                <div className={cx('invalid-feedback')}>
                                    <div className={cx('invalid-feedback-text')}>{error.confirm_password}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-title')}>
                            <span className={cx('form-group-title-text')}>Thông tin nhà tuyển dụng</span>
                        </div>
                        <div className={cx('form-group-flex')}>
                            <div className={cx('form-group-input')}>
                                <label className={cx('form-group-input-label')} htmlFor="full_name">
                                    Họ và tên
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('form-group-input-container')}>
                                    <div className={cx('input-container')}>
                                        <FaRegUser className={cx('icon')} />
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            id="full_name"
                                            name="full_name"
                                            placeholder="Họ và tên"
                                            autoComplete="off"
                                            value={info.full_name}
                                            onChange={handleChangeInput}
                                            onBlur={handleValidation}
                                        />
                                        {error.full_name && <PiWarningCircle className={cx('icon-warning')} />}
                                    </div>
                                    <div className={cx('invalid-feedback')}>
                                        <div className={cx('invalid-feedback-text')}>{error.full_name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-group-gender')}>
                                <label className={cx('form-group-input-label')}>
                                    Giới tính
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('group-gender')}>
                                    <div className={cx('gender')}>
                                        <input type="radio" className={cx('input-radio')} id="male" name="gender" value={'male'} onChange={handleChangeInput} />
                                        <label className={cx('label-radio')} htmlFor="male">
                                            <span className={cx('label-radio-text')}>Nam</span>
                                        </label>
                                    </div>
                                    <div className={cx('gender')}>
                                        <input
                                            type="radio"
                                            className={cx('input-radio')}
                                            id="female"
                                            name="gender"
                                            value={'female'}
                                            onChange={handleChangeInput}
                                        />
                                        <label className={cx('label-radio')} htmlFor="female">
                                            <span className={cx('label-radio-text')}>Nữ</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-input')}>
                            <label className={cx('form-group-input-label')} htmlFor="phone_number">
                                Số điện thoại cá nhân
                                <span className={cx('note')}>*</span>
                            </label>
                            <div className={cx('form-group-input-container')}>
                                <div className={cx('input-container')}>
                                    <PiPhone className={cx('icon')} />
                                    <input
                                        className={cx('input', 'input-phone')}
                                        id="phone_number"
                                        name="phone_number"
                                        type="number"
                                        placeholder="Số điện thoại cá nhân"
                                        autoComplete="off"
                                        value={info.phone_number}
                                        onChange={handleChangeInput}
                                        onBlur={handleValidation}
                                    />
                                    {error.phone_number && <PiWarningCircle className={cx('icon-warning')} />}
                                </div>
                                <div className={cx('invalid-feedback')}>
                                    <div className={cx('invalid-feedback-text')}>{error.phone_number}</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-flex')}>
                            <div className={cx('form-group-input')}>
                                <label className={cx('form-group-input-label')} htmlFor="company_name">
                                    Tên công ty
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('form-group-input-container')}>
                                    <div className={cx('input-container')}>
                                        <FaRegBuilding className={cx('icon')} />
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            id="company_name"
                                            name="company_name"
                                            placeholder="Tên công ty"
                                            value={info.company_name}
                                            onChange={handleChangeInput}
                                            onBlur={handleValidation}
                                        />
                                        {error.company_name && <PiWarningCircle className={cx('icon-warning')} />}
                                    </div>
                                    <div className={cx('invalid-feedback')}>
                                        <div className={cx('invalid-feedback-text')}>{error.company_name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('form-group-input')}>
                                <label className={cx('form-group-input-label')}>
                                    Vị trí công tác
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('form-group-input-container')}>
                                    <SelectionComponent
                                        header={() => (
                                            <div className={cx('header-select')}>
                                                <div className={cx('container-select')}>
                                                    <PiUserGearBold className={cx('icon')} />
                                                    <span className={cx('result')}>
                                                        {(info.work_position !== '' && info.work_position) || 'Chọn vị trí công tác'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {positionList.map((item) => (
                                                    <li
                                                        key={item.value}
                                                        className={cx('item', { active: item.name === info.work_position })}
                                                        onClick={() => setInfo({ ...info, work_position: item.name })}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>

                                                        {item.name === info.work_position && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <FaCaretDown className={cx('icon-care')} />}
                                        itemSelect={(info.work_position !== '' && info.work_position) || 'Chọn vị trí công tác'}
                                        maxHeight={'230px'}
                                        styleDropdown={{ right: '0', left: 'auto', top: '72px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-flex', 'work-location')}>
                            <div className={cx('form-group-input')}>
                                <label className={cx('form-group-input-label')}>
                                    Địa điểm làm việc
                                    <span className={cx('note')}>*</span>
                                </label>

                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select')}>
                                            <div className={cx('container-select')}>
                                                <TbBuilding className={cx('icon')} />
                                                <span className={cx('result')}>
                                                    {province.find((item) => item.id === info.province_id)?.name || 'Chọn tỉnh/thành phổ'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {province.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.id === info.province_id })}
                                                    onClick={() => setInfo({ ...info, province_id: item.id })}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>

                                                    {item.id === info.province_id && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={province.find((item) => item.id === info.province_id)?.name || 'Chọn tỉnh/thành phổ'}
                                    maxHeight={'230px'}
                                    styleDropdown={{ right: '0', left: 'auto', top: '72px', borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
                                />
                            </div>
                            <div className={cx('form-group-input')}>
                                <label className={cx('form-group-input-label')}>
                                    Quận/Huyện
                                    <span className={cx('note')}>*</span>
                                </label>

                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select', { disable: info.province_id === 100 || info.province_id === -1 })}>
                                            <div className={cx('container-select')}>
                                                <TbBuildingCommunity className={cx('icon')} />
                                                <span className={cx('result')}>
                                                    {district.find((item) => item.id === info.district_id)?.name || 'Chọn quận/huyện'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() =>
                                        info.province_id === 100 || info.province_id === -1 || district.length === 0 ? null : (
                                            <ul className={cx('ul-select')}>
                                                {district.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className={cx('item', { active: item.id === info.district_id })}
                                                        onClick={() => setInfo({ ...info, district_id: item.id })}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>
                                                        {item.id === info.district_id && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={district.find((item) => item.id === info.district_id)?.name || 'Chọn quận/huyện'}
                                    maxHeight={'230px'}
                                    styleDropdown={{ right: '0', left: 'auto', top: '72px' }}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group-input')}>
                            <label className={cx('form-group-input-label')} htmlFor="account_skype">
                                Skype
                            </label>
                            <div className={cx('form-group-input-container')}>
                                <div className={cx('input-container')}>
                                    <input
                                        className={cx('input', 'input-skype')}
                                        id="account_skype"
                                        name="account_skype"
                                        placeholder="Tài khoản Skype"
                                        autoComplete="off"
                                        value={info.account_skype}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group-checkbox')}>
                            <div className={cx('checkbox')}>
                                <input
                                    type="checkbox"
                                    className={cx('input-checkbox')}
                                    id="policy"
                                    onChange={() => setState({ ...state, isAgree: !state.isAgree })}
                                />
                                <label className={cx('label-checkbox')} htmlFor="policy"></label>
                            </div>
                            <span className={cx('label-checkbox-text')}>
                                Tôi đồng ý với{' '}
                                <a href="/" target="_blank" className={cx('label-checkbox-link')}>
                                    Điều khoản dịch vụ
                                </a>{' '}
                                của TVNow
                            </span>
                        </div>
                        <div className={cx('submit')}>
                            <button
                                type="button"
                                className={cx('btn-submit', { disable: error.isError || !state.canSubmit || !state.isAgree })}
                                onClick={handleSubmit}
                            >
                                Hoàn tất
                            </button>
                        </div>
                        <div className={cx('option')}>
                            <span className={cx('option-text')}>
                                Đã có tài khoản?{' '}
                                <Link to={path.MANAGER_LOGIN} className={cx('option-link')}>
                                    <span className={cx('option-link')}>Đăng nhập ngay</span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('auth-footer')}>
                    <p className={cx('copy-right')}>© 2024 TVNow.vn - Bản quyền thuộc về TVNow</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
