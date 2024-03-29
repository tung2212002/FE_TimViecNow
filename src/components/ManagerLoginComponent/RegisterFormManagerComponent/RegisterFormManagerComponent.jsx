import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaRegEnvelope, FaRegUser, FaCaretDown, FaRegBuilding } from 'react-icons/fa';
import { PiLockBold, PiWarningCircle, PiPhone, PiUserGearBold } from 'react-icons/pi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { TbBuildingCommunity, TbBuilding } from 'react-icons/tb';
import { HiCheck } from 'react-icons/hi';

import styles from './RegisterFormManagerComponent.module.scss';
import { SelectionComponent } from '../../common';
import path from '../../../constants/path';
import regexValidator from '../../../utils/regexValidator';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RegisterFormManagerComponent = () => {
    const [state, setState] = useState({
        isAgree: false,
        canSubmit: false,
    });
    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirm_password: '',
        fullname: '',
        gender: '',
        phone_number: '',
        company: '',
        work_position: '',
        work_location: '',
        district: '',
        location: '',
        account_skype: '',
    });
    const requiredFields = ['email', 'password', 'confirm_password', 'fullname', 'phone_number', 'company', 'work_position', 'work_location', 'gender'];
    const [error, setError] = useState({
        email: '',
        password: '',
        confirm_password: '',
        fullname: '',
        phone_number: '',
        company: '',
        work_position: '',
        work_location: '',
        district: '',
        location: '',
        gender: '.',
        isError: true,
    });

    const positionList = [
        { value: '0', name: 'Nhân viên' },
        { value: '1', name: 'Trưởng nhóm' },
        { value: '2', name: 'Phó phòng' },
        { value: '3', name: 'Trưởng phòng' },
        { value: '4', name: 'Phó giám đốc' },
        { value: '5', name: 'Giám đốc' },
        { value: '6', name: 'Tổng giám đốc' },
    ];
    const provinceList = [
        { value: '1', name: 'Hà Nội' },
        { value: '2', name: 'Hồ Chí Minh' },
        { value: '3', name: 'Bình Dương' },
        { value: '4', name: 'Bắc Ninh' },
        { value: '5', name: 'Đồng Nai' },
        { value: '6', name: 'Hưng Yên' },
        { value: '7', name: 'Hải Dương' },
        { value: '8', name: 'Đà Nẵng' },
        { value: '9', name: 'Hải Phòng' },
        { value: '10', name: 'An Giang' },
        { value: '11', name: 'Bà Rịa-Vũng Tàu' },
        { value: '12', name: 'Bắc Giang' },
        { value: '13', name: 'Bắc Kạn' },
        { value: '14', name: 'Bạc Liêu' },
        { value: '15', name: 'Bến Tre' },
        { value: '16', name: 'Bình Định' },
        { value: '17', name: 'Bình Phước' },
        { value: '18', name: 'Bình Thuận' },
        { value: '19', name: 'Cà Mau' },
        { value: '20', name: 'Cần Thơ' },
        { value: '21', name: 'Cao Bằng' },
        { value: '22', name: 'Cửu Long' },
        { value: '23', name: 'Đắk Lắk' },
        { value: '24', name: 'Đắc Nông' },
        { value: '25', name: 'Điện Biên' },
        { value: '26', name: 'Đồng Tháp' },
        { value: '27', name: 'Gia Lai' },
        { value: '28', name: 'Hà Giang' },
        { value: '29', name: 'Hà Nam' },
        { value: '30', name: 'Hà Tĩnh' },
        { value: '31', name: 'Hậu Giang' },
        { value: '32', name: 'Hoà Bình' },
        { value: '33', name: 'Khánh Hoà' },
        { value: '34', name: 'Kiên Giang' },
        { value: '35', name: 'Kon Tum' },
        { value: '36', name: 'Lai Châu' },
        { value: '37', name: 'Lâm Đồng' },
        { value: '38', name: 'Lạng Sơn' },
        { value: '39', name: 'Lào Cai' },
        { value: '40', name: 'Long An' },
        { value: '41', name: 'Miền Bắc' },
        { value: '42', name: 'Miền Nam' },
        { value: '43', name: 'Miền Trung' },
        { value: '44', name: 'Nam Định' },
        { value: '45', name: 'Nghệ An' },
        { value: '46', name: 'Ninh Bình' },
        { value: '47', name: 'Ninh Thuận' },
        { value: '48', name: 'Phú Thọ' },
        { value: '49', name: 'Phú Yên' },
        { value: '50', name: 'Quảng Bình' },
        { value: '51', name: 'Quảng Nam' },
        { value: '52', name: 'Quảng Ngãi' },
        { value: '53', name: 'Quảng Ninh' },
        { value: '54', name: 'Quảng Trị' },
        { value: '55', name: 'Sóc Trăng' },
        { value: '56', name: 'Sơn La' },
        { value: '57', name: 'Tây Ninh' },
        { value: '58', name: 'Thái Bình' },
        { value: '59', name: 'Thái Nguyên' },
        { value: '60', name: 'Thanh Hoá' },
        { value: '61', name: 'Thừa Thiên Huế' },
        { value: '62', name: 'Tiền Giang' },
        { value: '63', name: 'Toàn Quốc' },
        { value: '64', name: 'Trà Vinh' },
        { value: '65', name: 'Tuyên Quang' },
        { value: '66', name: 'Vĩnh Long' },
        { value: '67', name: 'Vĩnh Phúc' },
        { value: '68', name: 'Yên Bái' },
        { value: '100', name: 'Nước Ngoài' },
    ];

    const districtList = [
        {
            value: 301,
            title: 'D\u1ea7u Ti\u1ebfng',
            name: 'D\u1ea7u Ti\u1ebfng - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'dau-tieng-binh-duong',
        },
        {
            value: 302,
            title: 'Ph\u00fa Gi\u00e1o',
            name: 'Ph\u00fa Gi\u00e1o - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'phu-giao-binh-duong',
        },
        {
            value: 303,
            title: 'D\u0129 An',
            name: 'D\u0129 An - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'di-an-binh-duong',
        },
        {
            value: 304,
            title: 'Thu\u1eadn An',
            name: 'Thu\u1eadn An - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'thuan-an-binh-duong',
        },
        {
            value: 305,
            title: 'T\u00e2n Uy\u00ean',
            name: 'T\u00e2n Uy\u00ean - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'tan-uyen-binh-duong',
        },
        {
            value: 306,
            title: 'B\u1ebfn C\u00e1t',
            name: 'B\u1ebfn C\u00e1t - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'ben-cat-binh-duong',
        },
        {
            value: 307,
            title: 'Th\u1ee7 D\u1ea7u M\u1ed9t',
            name: 'Th\u1ee7 D\u1ea7u M\u1ed9t - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'thu-dau-1-binh-duong',
        },
        {
            value: 6810,
            title: 'B\u1eafc T\u00e2n Uy\u00ean',
            name: 'B\u1eafc T\u00e2n Uy\u00ean - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'bac-tan-uyen-binh-duong',
        },
        {
            value: 6811,
            title: 'B\u00e0u B\u00e0ng',
            name: 'B\u00e0u B\u00e0ng - B\u00ecnh D\u01b0\u01a1ng',
            alias: 'bau-bang-binh-duong',
        },
    ];

    const handleSubmit = () => {
        console.log('info', info);
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
                newError = value.trim().length === 0 ? 'Email không được để trống' : !value.match(regexValidator.EMAIL) ? 'Email không hợp lệ' : '';
                break;
            case 'password':
                newError =
                    value.trim().length === 0
                        ? 'Mật khẩu không được để trống'
                        : value.length < 8 || value.length > 16
                        ? 'Mật khẩu từ 8 đến 16 ký tự'
                        : !value.match(regexValidator.PASSWORD)
                        ? 'Mật khẩu cần chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 số và 1 ký tự đặc biệt'
                        : '';
                break;
            case 'confirm_password':
                newError =
                    value.trim().length === 0
                        ? 'Mật khẩu không được để trống'
                        : value.length < 8 || value.length > 16
                        ? 'Mật khẩu từ 8 đến 16 ký tự'
                        : value !== info.password
                        ? 'Nhập lại mật khẩu không đúng'
                        : '';
                break;
            case 'fullname':
                newError =
                    value.trim().length === 0
                        ? 'Họ và tên không được để trống'
                        : value.trim().length < 3 || value.trim().length > 50
                        ? 'Họ và tên từ 3 đến 50 ký tự'
                        : !value.match(regexValidator.FULLNAME)
                        ? 'Họ và tên không hợp lệ'
                        : '';
                break;
            case 'phone_number':
                newError =
                    value.trim().length === 0
                        ? 'Số điện thoại không được để trống'
                        : !value.match(regexValidator.REGEX_PHONE_NUMBER)
                        ? 'Số điện thoại không hợp lệ'
                        : '';
                break;
            case 'company':
                newError = value.length === 0 ? 'Tên công ty không được để trống' : '';
                break;
            case 'work_position':
                newError = value.length === 0 ? 'Vị trí công tác không được để trống' : '';
                break;
            case 'work_location':
                newError = value.length === 0 ? 'Địa điểm làm việc không được để trống' : '';
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
                return value.trim().length !== 0 && value.match(regexValidator.EMAIL);
            case 'password':
                return (
                    value.trim().length !== 0 &&
                    value.length >= 8 &&
                    value.length <= 16 &&
                    value.match(regexValidator.PASSWORD) &&
                    value === info.confirm_password
                );
            case 'confirm_password':
                return value.trim().length !== 0 && value === info.password;
            case 'fullname':
                return value.trim().length !== 0 && value.trim().length >= 3 && value.trim().length <= 50 && value.match(regexValidator.FULLNAME);
            case 'phone_number':
                return value.trim().length !== 0 && value.match(regexValidator.REGEX_PHONE_NUMBER);
            case 'company':
                return value.length !== 0;
            case 'work_position':
                return value.length !== 0;
            case 'work_location':
                return value.length !== 0;
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
                                <label className={cx('form-group-input-label')} htmlFor="fullname">
                                    Họ và tên
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('form-group-input-container')}>
                                    <div className={cx('input-container')}>
                                        <FaRegUser className={cx('icon')} />
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            placeholder="Họ và tên"
                                            autoComplete="off"
                                            value={info.fullname}
                                            onChange={handleChangeInput}
                                            onBlur={handleValidation}
                                        />
                                        {error.fullname && <PiWarningCircle className={cx('icon-warning')} />}
                                    </div>
                                    <div className={cx('invalid-feedback')}>
                                        <div className={cx('invalid-feedback-text')}>{error.fullname}</div>
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
                                <label className={cx('form-group-input-label')} htmlFor="company">
                                    Tên công ty
                                    <span className={cx('note')}>*</span>
                                </label>
                                <div className={cx('form-group-input-container')}>
                                    <div className={cx('input-container')}>
                                        <FaRegBuilding className={cx('icon')} />
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Tên công ty"
                                            value={info.company}
                                            onChange={handleChangeInput}
                                            onBlur={handleValidation}
                                        />
                                        {error.company && <PiWarningCircle className={cx('icon-warning')} />}
                                    </div>
                                    <div className={cx('invalid-feedback')}>
                                        <div className={cx('invalid-feedback-text')}>{error.company}</div>
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
                                                        {positionList.find((item) => item.value === info.work_position)?.name || 'Chọn vị trí công tác'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {positionList.map((item) => (
                                                    <li
                                                        key={item.value}
                                                        className={cx('item', { active: item.value === info.work_position })}
                                                        onClick={() => setInfo({ ...info, work_position: item.value })}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>

                                                        {item.value === info.work_position && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <FaCaretDown className={cx('icon-care')} />}
                                        itemSelect={positionList.find((item) => item.value === info.work_position)?.name || 'Chọn vị trí công tác'}
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
                                                    {provinceList.find((item) => item.value === info.work_location)?.name || 'Chọn tỉnh/thành phổ'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {provinceList.map((item) => (
                                                <li
                                                    key={item.value}
                                                    className={cx('item', { active: item.value === info.work_location })}
                                                    onClick={() => setInfo({ ...info, work_location: item.value })}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>

                                                    {item.value === info.work_location && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={provinceList.find((item) => item.value === info.work_location)?.name || 'Chọn tỉnh/thành phổ'}
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
                                        <div className={cx('header-select', { disable: info.work_location === '100' || info.work_location === '' })}>
                                            <div className={cx('container-select')}>
                                                <TbBuildingCommunity className={cx('icon')} />
                                                <span className={cx('result')}>
                                                    {districtList.find((item) => item.value === info.district)?.name || 'Chọn quận/huyện'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() =>
                                        info.work_location === '100' || info.work_location === '' ? null : (
                                            <ul className={cx('ul-select')}>
                                                {districtList.map((item) => (
                                                    <li
                                                        key={item.value}
                                                        className={cx('item', { active: item.value === info.district })}
                                                        onClick={() => setInfo({ ...info, district: item.value })}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>
                                                        {item.value === info.district && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={districtList.find((item) => item.value === info.district)?.name || 'Chọn quận/huyện'}
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

export default RegisterFormManagerComponent;
