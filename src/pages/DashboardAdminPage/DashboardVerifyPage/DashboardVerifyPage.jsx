import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { FaRegPaperPlane } from 'react-icons/fa';

import styles from './DashboardVerifyPage.module.scss';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { images } from '@assets';
import { selectUser, updateInfo } from '@redux/features/authUser/authSlide';
import { sendVerifyService, verifyCodeService } from '@services/business/verifyService';
import useToast from '@hooks/useToast';
import { getInfoBusinessService } from '@services/business/businessService';
import path from '@constants/path';

const cx = classNames.bind(styles);

const DashboardVerifyPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [data, setData] = useState({
        code: '',
        session_id: '',
    });
    const { handleAddToast } = useToast();
    const navigate = useNavigate();

    useDocumentTitle('Cài đặt tài khoản');

    const handleSetVerifyCode = (value) => {
        if (!isNaN(value)) {
            setData({
                ...data,
                code: value,
            });
        }
    };

    const handleGetUserInfo = () => {
        getInfoBusinessService()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(updateInfo({ user: response.data.data }));
                    navigate(path.DASHBOARD_HOME);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handelVerify = () => {
        verifyCodeService(data)
            .then((response) => {
                if (response.status === 200) {
                    handleGetUserInfo();
                    handleAddToast('Thành công', 'Xác thực email thành công', 'success');
                } else if (response.status === 400) {
                    handleAddToast('Cảnh báo', 'Vui lòng thử lại sau 5 phút', 'warning');
                } else if (response.status === 404) {
                    handleAddToast('Thất bại', 'Mã xác thực không đúng', 'error');
                } else {
                    handleAddToast('Thất bại', 'Xác thực email thất bại', 'error');
                }
            })
            .catch((error) => {
                handleAddToast('Thất bại', 'Xác thực thất bại, thử lại sau', 'error');
            });
    };

    const handleResend = () => {
        const data = {
            type: 'email',
        };
        sendVerifyService(data)
            .then((response) => {
                if (response.status === 200) {
                    setData({
                        ...data,
                        session_id: response.data.data.session_id,
                    });
                    handleAddToast('Thành công', 'Gửi lại email xác thực thành công', 'success');
                } else if (response.status === 400) {
                    handleAddToast('Cảnh báo', 'Vui lòng thử lại sau 5 phút', 'warning');
                } else {
                    handleAddToast('Thất bại', 'Gửi lại email xác thực thất bại', 'error');
                }
            })
            .catch((error) => {
                handleAddToast('Thất bại', 'Thử lại sau', 'error');
            });
    };

    useEffect(() => {
        const body = {
            type: 'email',
        };
        sendVerifyService(body)
            .then((response) => {
                if (response.status === 200) {
                    setData({
                        ...data,
                        session_id: response.data.data.session_id,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (user?.is_verified_email) {
            navigate(path.DASHBOARD_HOME);
        }
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <div className={cx('breadcrumb-box-title')}>
                        <h6 className={cx('breadcrumb')}>Xác thực email nhà tuyển dụng của bạn</h6>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-wrapper')}>
                        <img src={images.verify_email} alt="verify-email" className={cx('img')} />
                        <p className={cx('description')}>
                            Mã xác thực email tài khoản đã được gửi đến email
                            <strong> {user?.email}</strong> của bạn.
                        </p>
                        <p className={cx('description')}>
                            Vui lòng kiểm tra hộp thư, bao gồm cả mục
                            <strong> Promotions (Quảng cáo) </strong>,<strong> Spam (Thư rác) </strong>và<strong> Update (Cập nhật)</strong>
                        </p>
                        <br />
                        <div className={cx('input-verify')}>
                            <input
                                type="text"
                                className={cx('input')}
                                placeholder="Gồm 6 chữ số"
                                maxLength={6}
                                value={data.code}
                                onChange={(e) => handleSetVerifyCode(e.target.value)}
                            />
                            <button className={cx('btn-verify', { disabled: data?.code?.length !== 6 })} onClick={handelVerify}>
                                Xác thực
                            </button>
                        </div>
                        <p className={cx('description')}>Bạn cũng có thể yêu cầu hệ thống gửi lại email xác thực</p>
                        <button className={cx('btn-resend')} onClick={handleResend}>
                            <FaRegPaperPlane className={cx('icon')} />
                            Gửi lại
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardVerifyPage;
