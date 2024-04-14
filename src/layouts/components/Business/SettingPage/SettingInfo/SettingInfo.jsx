import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { HiCheck } from 'react-icons/hi2';
import { FaCaretDown } from 'react-icons/fa6';

import styles from './SettingInfo.module.scss';
import { selectBusiness, updateBusinessInfo } from '../../../../../redux/features/authBusiness/authSlide';
import { images } from '../../../../../assets';
import useToast from '../../../../../hooks/useToast';
import { SelectionComponent } from '../../../../../components/common';
import { listGender, listWorkPosition } from '../../../../../constants';
import path from '../../../../../constants/path';
import { updateBusinessService } from '../../../../../services/businessService';

const cx = classNames.bind(styles);

const SettingInfo = () => {
    const ref = useRef(null);
    const user = useSelector(selectBusiness);
    const dispatch = useDispatch();

    const { handleAddToast } = useToast();

    const [avatar, setAvatar] = useState(user?.avatar || images.avatar_default);

    const [data, setData] = useState({
        avatar: null,
        full_name: user?.full_name || '',
        gender: user?.gender || '',
        work_position: listWorkPosition.find((item) => item.name == user?.work_position)?.value || '',
        skype: user?.skype || '',
    });

    const [error, setError] = useState({
        full_name: false,
        work_position: false,
    });

    const handleClickFile = () => {
        ref.current.click();
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
            handleAddToast('Error', 'File ảnh quá lớn', 'error');
            return;
        }
        setData({ ...data, avatar: file });
    };

    const handleSetName = (e) => {
        setData({ ...data, full_name: e.target.value });
        if (e.target.value?.trim()?.length < 4 || e.target.value?.trim()?.length > 50) {
            setError({ ...error, full_name: true });
        } else {
            setError({ ...error, full_name: false });
        }
    };

    const handleSetGender = (value) => {
        setData({ ...data, gender: value });
    };

    const handleSetWorkPosition = (value) => {
        setData({ ...data, work_position: value });
    };

    const handleSetSkype = (e) => {
        setData({ ...data, skype: e.target.value });
    };

    const handleSetNumberPhone = (e) => {
        return;
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!data.full_name) {
            setError({ ...error, full_name: true });
            return;
        }
        if (!data.work_position) {
            setError({ ...error, work_position: true });
            return;
        }
        setError({ full_name: false, work_position: false });

        const formData = new FormData();
        for (const key in data) {
            if (key === 'work_position') {
                const value = listWorkPosition.find((item) => item.value === data[key])?.name;
                if (value !== user.work_position) {
                    formData.append(key, listWorkPosition.find((item) => item.value === data[key])?.name);
                }
            } else {
                if (data[key] !== user[key]) formData.append(key, data[key]);
            }
        }

        updateBusinessService(user.id, formData)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(updateBusinessInfo({ user: res.data.data }));
                    handleAddToast('Success', 'Cập nhật thông tin thành công', 'success');
                    setAvatar(res.data.data.avatar);
                } else if (res.status === 400) {
                    handleAddToast('Error', 'Dữ liệu không hợp lệ', 'error');
                } else {
                    handleAddToast('Error', 'Cập nhật thông tin thất bại', 'error');
                }
            })
            .catch((error) => {
                handleAddToast('Error', error.response.data.message, 'error');
            });

        return;
    };

    useEffect(() => {
        if (data.avatar) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(data.avatar);
        }
    }, [data.avatar]);

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('form-title')}>Cập nhật thông tin cá nhân</div>
                <div className={cx('form-group')}>
                    <div className={cx('form-col')}>
                        <div className={cx('form-col-avatar')}>
                            <label className={cx('label')}>Avatar</label>
                            <div className={cx('avatar')}>
                                <img src={avatar || user?.avatar} alt="avatar" className={cx('avatar-img')} />
                            </div>
                            <input type="file" className={cx('input-file')} accept="image/*" hidden ref={ref} onChange={handleChangeFile} />
                            <button type="button" className={cx('button')} onClick={handleClickFile}>
                                Đổi avatar
                            </button>
                        </div>
                    </div>
                    <div className={cx('form-col')}>
                        <div className={cx('form-col-item')}>
                            <label className={cx('label')}>Email: {user.email}</label>
                        </div>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('form-col')}>
                        <div className={cx('form-col-item', { error: error.full_name })}>
                            <label className={cx('label')}>Họ và tên</label>
                            <input type="text" className={cx('input-name', 'input')} onChange={handleSetName} value={data.full_name} />
                            <div className={cx('error-text')}>Họ và tên độ dài từ 4 đến 50 ký tự</div>
                        </div>
                    </div>
                    <div className={cx('form-col')}>
                        <div className={cx('form-col-item')}>
                            <label className={cx('label')}>Giới tính</label>
                            <SelectionComponent
                                header={() => (
                                    <div className={cx('header-select')}>
                                        <div className={cx('container-select')}>
                                            <span className={cx('result')}>
                                                {listGender.find((item) => item.value === data.gender)?.name || '-- Chọn giới tính --'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                body={() => (
                                    <ul className={cx('ul-select')}>
                                        {listGender.map((item) => (
                                            <li
                                                key={item.id}
                                                className={cx('item', { active: item.value === data.gender })}
                                                onClick={() => handleSetGender(item.value)}
                                            >
                                                <span className={cx('text')}>{item.name}</span>
                                                {item.value === data.gender && <HiCheck className={cx('icon-check')} />}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                icon={() => <FaCaretDown className={cx('icon-care')} />}
                                itemSelect={listGender.find((item) => item.value === data.gender)?.name}
                                maxHeight={'230px'}
                                styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                styleButton={{ marginRight: '10px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('form-col')}>
                        <label className={cx('label')} htmlFor="phone_number">
                            Số điện thoại
                        </label>

                        <div className={cx('input-box')}>
                            <input
                                type="text"
                                className={cx('input')}
                                id="phone_number"
                                placeholder="Nhập số điện thoại"
                                value={user?.phone_number}
                                onChange={handleSetNumberPhone}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={cx('form-col')}>
                        <label className={cx('label')} htmlFor="work-position">
                            Vị tri
                        </label>
                        <div className={cx('input-box')}>
                            <SelectionComponent
                                header={() => (
                                    <div className={cx('header-select')}>
                                        <div className={cx('container-select')}>
                                            <span className={cx('result')}>
                                                {listWorkPosition.find((item) => item.value === data.work_position)?.name || 'Chọn vị trí'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                body={() => (
                                    <ul className={cx('ul-select')}>
                                        {listWorkPosition.map((item) => (
                                            <li
                                                key={item.id + item.value}
                                                className={cx('item', { active: item.value === data.work_position })}
                                                onClick={() => handleSetWorkPosition(item.value)}
                                            >
                                                <span className={cx('text')}>{item.name}</span>
                                                {item.value === data.work_position && <HiCheck className={cx('icon-check')} />}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                icon={() => <FaCaretDown className={cx('icon-care')} />}
                                itemSelect={listWorkPosition.find((item) => item.value === data.work_position)?.name}
                                maxHeight={'230px'}
                                styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                styleButton={{ marginRight: '10px' }}
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <p className={cx('title-group')}>
                    <b>Thông tin thêm</b>
                </p>
                <div className={cx('form-row')}>
                    <label className={cx('label')} htmlFor="skype">
                        Skype
                    </label>
                    <div className={cx('input-box')}>
                        <input type="text" className={cx('input')} id="skype" placeholder="Nhập tài khoản Skype" value={data.skype} onChange={handleSetSkype} />
                    </div>
                </div>
                <div className={cx('form-button')}>
                    <Link to={path.DASHBOARD_HOME} className={cx('button-cancel')}>
                        Hủy
                    </Link>
                    <button className={cx('button-save', { disable: error.full_name || error.work_position })} onClick={handleSave}>
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingInfo;
