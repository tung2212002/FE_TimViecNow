import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './ManagerRegisterPage.module.scss';
import Modal from '../../components/common/Modal/Modal';
import { icons, images } from '../../assets';
import path from '../../constants/path';
import { hideModal, showModal } from '../../redux/features/modal/modalSlice';
import PolicyManagerComponent from '../../components/ManagerLoginComponent/PolicyManagerComponent/PolicyManagerComponent';
import RegisterFormManagerComponent from '../../components/ManagerLoginComponent/RegisterFormManagerComponent/RegisterFormManagerComponent';
const cx = classNames.bind(styles);

const ManagerRegisterPage = () => {
    const dispatch = useDispatch();
    dispatch(showModal());

    const handleCloseModal = () => {
        dispatch(hideModal());
    };
    return (
        <div className={cx('wrapper')}>
            <Modal cancel={false}>
                <div className={cx('modal-container')}>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-header')}>
                            <div className={cx('modal-text')}>
                                <h5 className={cx('title')}>Chào bạn,</h5>
                                <p className={cx('content')}>
                                    Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
                                    <img className={cx('icon-ring')} src={icons.icon_ring} alt="icon-ring" />
                                </p>
                            </div>
                        </div>
                        <div className={cx('modal-body')}>
                            <div className={cx('modal-body-description')}>
                                Để tối ưu tốt nhất cho trải nghiệm của bạn với TopCV,
                                <br />
                                vui lòng lựa chọn nhóm phù hợp nhất với bạn.
                            </div>
                            <div className={cx('modal-body-content')}>
                                <div className={cx('modal-body-item')}>
                                    <img src={images.bussiness} alt="bussiness" className={cx('modal-body-item-img', 'bussiness')} />
                                    <br />
                                    <a className={cx('modal-body-item-text')} onClick={handleCloseModal}>
                                        Tôi là nhà tuyển dụng
                                    </a>
                                </div>
                                <div className={cx('modal-body-item')}>
                                    <img src={images.student} alt="student" className={cx('modal-body-item-img', 'student')} />
                                    <br />
                                    <a href={path.HOMEPAGE} className={cx('modal-body-item-text')}>
                                        Tôi là ứng viên tìm việc
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-header')}>
                        <img src={icons.logo} alt="logo" className={cx('content-header-logo')} />
                        <h2 className={cx('content-header-title')}>Đăng ký tài khoản Nhà tuyển dụng</h2>
                        <span className={cx('content-header-subtitle')}>Cùng tạo dựng lợi thế cho doanh nghiệp!.</span>
                    </div>
                    <div className={cx('content-body-policy')}>
                        <PolicyManagerComponent />
                    </div>
                    <div className={cx('content-form')}>
                        <RegisterFormManagerComponent />
                    </div>
                    <div className={cx('content-footer')}></div>
                </div>

                <div className={cx('img-right')}>
                    <div className={cx('img-container')}>
                        <img src={images.banner_manager_login} alt="banner" className={cx('img-right-banner')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerRegisterPage;
