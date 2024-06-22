import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { FaFlag, FaArrowRight, FaChevronRight } from 'react-icons/fa6';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FaLightbulb } from 'react-icons/fa';

import styles from './DashboardPostCampaignPage.module.scss';
import { images } from '@assets';
import path from '@constants/path';
import { createCampaignService } from '@services/campaignService';
import { addToast, removeToast } from '@redux/features/toast/toastSlice';

const cx = classNames.bind(styles);

const DashboardPostCampaignPage = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [title, setTitle] = useState('');

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

    const handleCreateCampaign = () => {
        if (title.length < 6 || title.length > 255) {
            return;
        }
        const body = {
            title,
        };
        createCampaignService(body)
            .then((res) => {
                if (res.status === 201) {
                    handleAddToast('Tạo chiến dịch tuyển dụng thành công', '', 'success');
                    navigate(path.DASHBOARD_POST_JOB + '?campaign_id=' + res.data.data.id);
                } else {
                    handleAddToast('Tạo chiến dịch tuyển dụng thất bại', '', 'error');
                }
            })
            .catch((err) => {
                handleAddToast('Tạo chiến dịch tuyển dụng thất bại', '', 'error');
                console.log(err);
            });
    };

    useEffect(() => {
        const listenrUnfocus = () => {
            if (title.length < 6 || title.length > 255) {
                setError(true);
            } else {
                setError(false);
            }
        };
        if (inputRef.current) {
            inputRef.current.addEventListener('blur', listenrUnfocus);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('blur', listenrUnfocus);
            }
        };
    }, [title]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('left-content')}>
                        <img src={images.banner_campaign} alt="banner_campaign" className={cx('banner')} />
                        <div className={cx('description')}>
                            Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu tuyển dụng khác nhau. Chiến dịch tuyển
                            dụng là nơi tổng hợp các hoạt động khác nhau của một đợt tuyển dụng được thực hiện trên nền tảng TopCV
                        </div>
                        <div className={cx('btn-campaign')}>
                            <Link to={path.DASHBOARD_RECRUIREMENT_CAMPAIGNS_CREATE}>
                                <span className={cx('btn')}>Tìm hiểu thêm</span>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('right-content')}>
                        <div className={cx('right-content-header')}>
                            <span className={cx('icon')}>
                                <FaFlag className={cx('icon-flag')} />
                            </span>
                        </div>
                        <div className={cx('right-content-title')}>Tạo chiến dịch tuyển dụng của bạn</div>
                        <div className={cx('right-content-body')}>
                            <div className={cx('right-content-body-title')}>
                                Tên chiến dịch tuyển dụng
                                <span className={cx('required')}> *</span>
                            </div>
                            <div className={cx('right-content-body-input', { error })}>
                                <div className={cx('wrapper-input')}>
                                    <input
                                        type="text"
                                        className={cx('input')}
                                        placeholder="VD: Tuyển dụng nhân viên Marketing tháng 10..."
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            if (e.target.value.length < 6 || e.target.value.length > 255) {
                                                setError(true);
                                            } else {
                                                setError(false);
                                            }
                                        }}
                                        ref={inputRef}
                                    />
                                    <RiErrorWarningLine className={cx('icon-error')} />
                                </div>
                                <div className={cx('error-message')}>Tên chiến dịch tuyển dụng từ 6 đến 255 ký tự</div>
                            </div>
                            <button className={cx('btn-create')} onClick={handleCreateCampaign}>
                                Tiếp theo
                                <FaArrowRight className={cx('icon-arrow')} />
                            </button>
                        </div>
                        <div className={cx('right-content-footer')}>
                            <div className={cx('footer-title')}>
                                <span className={cx('icon')}>
                                    <FaLightbulb className={cx('icon-lightbulb')} />
                                </span>
                                Tài liệu bạn nên xem
                            </div>
                            <div className={cx('footer-description')}>
                                Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh nghiệp trên TopCV. Hãy
                                chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng.
                            </div>
                            <div className={cx('footer-link')}>
                                <a href="/" target="_blank" rel="noreferrer" className={cx('link')}>
                                    Khái niệm Chiến dịch tuyển dụng
                                    <FaChevronRight className={cx('icon-chevron')} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPostCampaignPage;
