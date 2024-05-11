import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Proptypes from 'prop-types';

import { FaCamera } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import { PiWarningCircle } from 'react-icons/pi';
import { FaCaretDown } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';

import styles from './CreateCompany.module.scss';
import { icons } from '../../../../../../assets';
import { EditorComponent, InputSelectorMultiComponent, SelectionComponent } from '../../../../../../components/common';
import { listScale } from '../../../../../../constants';
import { getListFieldService } from '../../../../../../services/fieldService';
import regexValidator from '../../../../../../utils/regexValidator';
import { createCompanyService, updateCompanyService } from '../../../../../../services/businessCompanyService';
import useToast from '../../../../../../hooks/useToast';
import { selectBusiness, updateBusinessSubInfo } from '../../../../../../redux/features/authBusiness/authSlide';
import { settingBusinessState } from '../../../../../../constants';

const cx = classNames.bind(styles);

const CreateCompany = ({ setActiveTab }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectBusiness);
    const [isGetFiled, setIsGetFiled] = useState(true);
    const [listField, setListField] = useState([]);
    const refFile = useRef(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [logo, setLogo] = useState(user?.company?.logo || null);
    const { handleAddToast } = useToast();

    const [company, setCompany] = useState({
        logo: null,
        email: user?.company?.email || '',
        tax_code: user?.company?.tax_code || '',
        website: user?.company?.website || '',
        scale: user?.company?.scale || -1,
        name: user?.company?.name || '',
        fields: user?.company?.fields?.map((item) => item.id) || [],
        address: user?.company?.address || '',
        phone_number: user?.company?.phone_number || '',
        company_short_description: user?.company?.company_short_description || '',
        type: user?.company?.type || 'company',
    });

    const [error, setError] = useState({
        tax_code: '',
        scale: '',
        email: '',
        name: '',
        fields: '',
        address: '',
        phone_number: '',
    });

    const requiredFields = ['tax_code', 'scale', 'name', 'fields', 'address', 'phone_number', 'email'];

    const handleSetTaxCode = (e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        setError({ ...error, tax_code: '' });
        setCompany({
            ...company,
            tax_code: e.target.value,
        });
    };

    const handleSetScale = (value) => {
        setCompany({
            ...company,
            scale: value,
        });
    };

    const handleSetField = (value) => {
        setCompany({
            ...company,
            fields: value,
        });
    };

    const handleSetPhoneNumber = (e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        setError({ ...error, phone_number: '' });
        setCompany({
            ...company,
            phone_number: value,
        });
    };

    const handleOnChangeFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCompany({
            ...company,
            logo: file,
        });
    };

    const handleClickUpload = () => {
        refFile.current.click();
    };

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        if (requiredFields.includes(name)) {
            setError({ ...error, [name]: '' });
        }
        setCompany({ ...company, [name]: value });
    };

    const handleValidation = (e) => {
        const { name, value } = e.target;
        let newError = '';
        switch (name) {
            case 'tax_code':
                newError = value.length !== 10 ? 'Mã số thuế không hợp lệ' : '';
                break;
            case 'email':
                newError = value?.trim().length === 0 ? 'Email không được để trống' : !value.match(regexValidator.EMAIL) ? 'Email không hợp lệ' : '';
                break;
            case 'phone_number':
                newError =
                    value?.trim().length === 0
                        ? 'Số điện thoại không được để trống'
                        : !value.match(regexValidator.REGEX_PHONE_NUMBER)
                        ? 'Số điện thoại không hợp lệ'
                        : '';
                break;
            case 'name':
                newError = value.length === 0 ? 'Tên công ty không được để trống' : '';
                break;
            case 'address':
                newError = value.length === 0 ? 'Địa chỉ công ty không được để trống' : '';
                break;
            case 'scale':
                newError = value === -1 ? 'Quy mô công ty không được để trống' : '';
                break;
            case 'fields':
                newError = value.length === 0 ? 'Lĩnh vực hoạt động không được để trống' : '';
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
            case 'tax_code':
                return value?.trim().length === 10;
            case 'email':
                return value?.trim().length !== 0 && value?.match(regexValidator.EMAIL);
            case 'phone_number':
                return value?.trim().length !== 0 && value?.match(regexValidator.REGEX_PHONE_NUMBER);
            case 'name':
                return value.length !== 0;
            case 'address':
                return value.length !== 0;
            case 'scale':
                return value !== -1;
            case 'fields':
                return value.length !== 0;

            default:
                return false;
        }
    };
    const handleSetCompanyDescription = (value) => {
        setCompany({
            ...company,
            company_short_description: value,
        });
    };

    const handelCreateCompany = () => {
        const body = new FormData();
        for (const key in company) {
            if (company[key] === null || company[key] === '' || company[key].length === 0) continue;
            if (key === 'fields') {
                company[key].forEach((item) => {
                    body.append('fields', item);
                });
                continue;
            }
            body.append(key, company[key]);
        }

        createCompanyService(body)
            .then((res) => {
                if (res.status === 201) {
                    dispatch(updateBusinessSubInfo({ company: res.data.data }));
                    setActiveTab(settingBusinessState.INFO);
                    handleAddToast('Thành công', 'Tạo công ty thành công', 'success');
                } else if (res.status === 400) {
                    handleAddToast('Thất bại', 'Dữ liệu không hợp lệ', 'error');
                } else if (res.status === 409) {
                    handleAddToast('Thất bại', 'Công ty đã tồn tại', 'error');
                } else if (res.status === 403) {
                    handleAddToast('Thất bại', 'Bạn đã có công ty trước đó', 'error');
                }
            })
            .catch((err) => {
                handleAddToast('Thất bại', 'Có lỗi, Thử lại sau', 'error');
            });
    };

    const handleUpdateCompany = () => {
        const body = new FormData();
        for (const key in company) {
            if (company[key] === null || company[key] === '' || company[key].length === 0) continue;
            if (key === 'fields') {
                company[key].forEach((item) => {
                    body.append('fields', item);
                });
                continue;
            }
            body.append(key, company[key]);
        }
        updateCompanyService(user?.company?.id, body)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(updateBusinessSubInfo({ company: res.data.data }));
                    setActiveTab(settingBusinessState.INFO);
                    handleAddToast('Thành công', 'Cập nhật thành công', 'success');
                } else if (res.status === 400) {
                    handleAddToast('Thất bại', 'Dữ liệu không hợp lệ', 'error');
                } else if (res.status === 404) {
                    handleAddToast('Thất bại', 'Không tìm thấy công ty', 'error');
                }
            })
            .catch((err) => {
                handleAddToast('Thất bại', 'Có lỗi, Thử lại sau', 'error');
            });
    };

    useEffect(() => {
        const check = requiredFields.map((item) => handleValidationOnChange(item, company[item]));

        setCanSubmit(!(check.includes(false) || check.includes(null)));
    }, [company]);

    useEffect(() => {
        if (canSubmit) {
            setError({ ...error, isError: false });
        } else {
            setError({ ...error, isError: true });
        }
    }, [canSubmit]);

    useEffect(() => {
        if (!company.logo) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogo(e.target.result);
        };
        reader.readAsDataURL(company.logo);
    }, [company.logo]);

    useEffect(() => {
        getListFieldService()
            .then((res) => {
                if (res.status === 200) {
                    setListField(res.data.data);
                    setIsGetFiled(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('form-group-logo')}>
                    <div className={cx('input-box')}>
                        <img src={logo || icons.icon_default_logo_company} alt="logo" className={cx('logo')} />
                        <input type="file" className={cx('input')} hidden onChange={handleOnChangeFile} ref={refFile} accept="image/*" />
                        <button className={cx('btn-upload')} onClick={handleClickUpload} type="button">
                            <FaCamera className={cx('icon')} />
                        </button>
                    </div>
                </div>
                <div className={cx('form-group-logo')}>
                    <p className={cx('label')}>Logo công ty</p>
                </div>
                <div className={cx('form-group-type')}>
                    <div className={cx('input-type-picker', { active: company.type === 'company' })}>
                        <input
                            type="radio"
                            name="type"
                            id="type1"
                            className={cx('input')}
                            value={'company'}
                            onChange={handleChangeInput}
                            checked={company.type === 'company'}
                        />
                        <label htmlFor="type1" className={cx('label')}>
                            <span className={cx('label-text')}>Công ty</span>
                        </label>
                    </div>
                    <div className={cx('input-type-picker', { active: company.type === 'household' })}>
                        <input
                            type="radio"
                            name="type"
                            id="type2"
                            className={cx('input')}
                            value={'household'}
                            onChange={handleChangeInput}
                            checked={company.type === 'household'}
                        />
                        <label htmlFor="type2" className={cx('label')}>
                            <span className={cx('label-text')}>Hộ kinh doanh</span>
                        </label>
                    </div>
                </div>
                <div className={cx('form-group-warning')}>
                    <div className={cx('message-warning')}>
                        <IoIosWarning className={cx('icon')} />
                        <div className={cx('message')}>
                            <span className={cx('message-content')}>
                                Vui lòng nhập đúng
                                <span className={cx('message-highlight')}> Mã số thuế doanh nghiệp </span>
                                trên
                                <span className={cx('message-highlight')}>
                                    {company.type === 'company' ? ' Giấy chứng nhận đăng ký kinh doanh' : ' Giấy chứng nhận đăng ký hộ kinh doanh'}
                                </span>
                                <br />
                                {company.type === 'company' && (
                                    <span className={cx('message-description')}>
                                        Bạn có thể tra cứu Mã số thuế doanh nghiệp{' '}
                                        <a href="https://masothue.com/" target="_blank" rel="noreferrer" className={cx('message-link')}>
                                            tại đây
                                        </a>
                                        .
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('form-group-flex')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="tax_code">
                                <span>{company.type === 'company' ? 'Mã số thuế' : 'Mã số thuế người đại diện'}</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="tax_code"
                                    name="tax_code"
                                    className={cx('input')}
                                    placeholder={company.type === 'company' ? 'Mã số thuế' : 'Mã số thuế người đại diện'}
                                    value={company.tax_code}
                                    onChange={handleSetTaxCode}
                                    onBlur={handleValidation}
                                    maxLength={10}
                                />
                                {error.tax_code && <PiWarningCircle className={cx('icon-warning')} />}
                            </div>
                            {error.tax_code && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.tax_code}</div>
                                </div>
                            )}
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="website">
                                <span>Website</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    className={cx('input')}
                                    value={company.website}
                                    onChange={handleChangeInput}
                                    placeholder="https://"
                                />
                            </div>
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="scale">
                                <span>Quy mô</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select')}>
                                            <div className={cx('container-select')}>
                                                <span className={cx('result')}>
                                                    {listScale.find((item) => item === company.scale) || 'Chọn quy mô công ty'}
                                                    {listScale.find((item) => item === company.scale) && ' nhân viên'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {listScale.map((item, index) => (
                                                <li key={index} className={cx('item', { active: item === company.scale })} onClick={() => handleSetScale(item)}>
                                                    <span className={cx('text')}>{item} nhân viên</span>
                                                    {item === company.scale && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={listScale.find((item) => item === company.scale)}
                                    maxHeight={'230px'}
                                    styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                    styleButton={{ marginRight: '10px' }}
                                    styleInput={{ fontWeight: '400' }}
                                />
                            </div>
                            {error.scale && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.scale}</div>
                                </div>
                            )}
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="email">
                                <span>Email</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className={cx('input')}
                                    value={company.email}
                                    onChange={handleChangeInput}
                                    placeholder="Nhập email công ty"
                                    onBlur={handleValidation}
                                />
                                {error.email && <PiWarningCircle className={cx('icon-warning')} />}
                            </div>
                            {error.email && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.email}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="name">
                                <span>{company.type === 'company' ? 'Tên công ty' : 'Tên người hộ kinh doanh'}</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={cx('input')}
                                    value={company.name}
                                    onChange={handleChangeInput}
                                    placeholder="Nhập tên công ty"
                                    onBlur={handleValidation}
                                    disabled={user.company}
                                />
                                {error.name && <PiWarningCircle className={cx('icon-warning')} />}
                            </div>
                            {error.name && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.name}</div>
                                </div>
                            )}
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="field">
                                <span>Lĩnh vực hoạt động</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                {!isGetFiled ? (
                                    <InputSelectorMultiComponent
                                        placeholder={'Chọn lĩnh vực hoạt động'}
                                        options={listField}
                                        value={company.fields}
                                        setValue={handleSetField}
                                        styleInput={{ paddingTop: '7px', paddingBottom: '7px', fontWeight: '400' }}
                                        maxOption={10}
                                    />
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </div>
                            <div className={cx('message-error')}>
                                <div className={cx('message')}>{error.fields}</div>
                            </div>
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="address">
                                <span>Địa chỉ công ty</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={cx('input')}
                                    value={company.address}
                                    onChange={handleChangeInput}
                                    placeholder="Nhập địa chỉ công ty"
                                    onBlur={handleValidation}
                                />
                                {error.address && <PiWarningCircle className={cx('icon-warning')} />}
                            </div>
                            {error.address && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.address}</div>
                                </div>
                            )}
                        </div>
                        <div className={cx('form-group-item')}>
                            <label className={cx('label')} htmlFor="phone">
                                <span>Số điện thoại</span>
                                <span className={cx('required')}> *</span>
                            </label>
                            <div className={cx('input-box')}>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone_number"
                                    className={cx('input')}
                                    maxLength={10}
                                    value={company.phone_number}
                                    onChange={handleSetPhoneNumber}
                                    placeholder="Nhập số điện thoại"
                                    onBlur={handleValidation}
                                />
                                {error.phone_number && <PiWarningCircle className={cx('icon-warning')} />}
                            </div>
                            {error.phone_number && (
                                <div className={cx('message-error')}>
                                    <div className={cx('message')}>{error.phone_number}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('form-group-editor')}>
                    <label className={cx('label')} htmlFor="company_short_description">
                        <span>Mô tả công ty</span>
                    </label>
                    <EditorComponent contentHTML={company.company_short_description} setContentHTML={handleSetCompanyDescription} />
                </div>
                <div className={cx('form-group-submit')}>
                    {user?.company && (
                        <button type="button" className={cx('btn-cancel')} onClick={() => setActiveTab(3)}>
                            Hủy
                        </button>
                    )}
                    <button
                        type="button"
                        className={cx('btn-submit', { disable: error.isError || !canSubmit })}
                        onClick={user?.company ? handleUpdateCompany : handelCreateCompany}
                        disabled={error.isError || !canSubmit}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

CreateCompany.propTypes = {
    setActiveTab: Proptypes.func,
};
export default CreateCompany;
