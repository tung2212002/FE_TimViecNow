import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { IoInformationCircleOutline } from 'react-icons/io5';
import { FaCircleXmark, FaWandMagicSparkles, FaCircleInfo, FaMinus, FaPlus } from 'react-icons/fa6';
import { PiWarningCircle } from 'react-icons/pi';
import { FaRegCalendar } from 'react-icons/fa';

import styles from './DashboardPostJobPage.module.scss';
import { icons } from '@assets';
import path from '@constants/path';
import { InputSelectorComponent, InputSelectorMultiComponent } from '@components/common';
import {
    addLocation,
    selectError,
    selectPostJob,
    setCampaignId,
    setDeadline,
    setError,
    setQuantity,
    setTitleJob,
    setCategories,
    setJobLocation,
} from '@redux/features/postJob/postJobSlide';
import { JobLocation, JobGeneralRequirements, JobDetailRequirements, JobInfoContact } from '@layouts/components/Business/PostJobPage';
import { getCampaignByIdService, getListCampaignService } from '@services/campaignService';
import { getListJobPositionService } from '@services/positionService';
import { getListCategoryService } from '@services/categoryService';
import regexValidator from '@utils/regexValidator';
import useToast from '@hooks/useToast';
import { createBusinessJobService } from '@services/businessJobService';
import { selectCampaign, setCampaign } from '@redux/features/campaign/campaignSilde';
import { selectCategory, selectJobPosition, setCategory, setJobPosition } from '@redux/features/config/configSilde';
import { selectBusiness } from '@redux/features/authBusiness/authSlide';

const cx = classNames.bind(styles);

const DashboardPostJobPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const info = useSelector(selectPostJob);
    const error = useSelector(selectError);
    const user = useSelector(selectBusiness);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const campaign_id = query.get('campaign_id');

    const campaigns = useSelector(selectCampaign);
    const jobPositions = useSelector(selectJobPosition);
    const jobCategories = useSelector(selectCategory);

    const [loading, setLoading] = useState({
        post: false,
        draft: false,
    });
    const [isLoadPosition, setIsLoadPosition] = useState(jobPositions ? false : true);
    const [isLoadCategories, setIsLoadCategories] = useState(jobCategories ? false : true);
    const [isLoadCampaign, setIsLoadCampaign] = useState(campaigns ? false : true);
    const { handleAddToast } = useToast();

    const job = useSelector(selectPostJob);

    const handleSetCampaign = (value) => {
        dispatch(setCampaignId(value));
    };

    const handleSetQuantity = (value) => {
        if (!isNaN(value) && value >= 1) {
            dispatch(setQuantity(value));
        }
    };

    const handleAddLocation = () => {
        dispatch(addLocation());
    };

    const handleSetJobLocation = (value) => {
        dispatch(setJobLocation(value));
    };

    const handleSetTitle = (value) => {
        if (error.title) {
            dispatch(setError({ ...error, title: false }));
        }
        if (value.length <= 50) dispatch(setTitleJob(value));
    };

    const handleSetCategories = (value) => {
        dispatch(setCategories(value));
    };

    const validateEmail = (email) => {
        return regexValidator.EMAIL.test(email);
    };

    const handleValidate = () => {
        if (job.title.length < 6 || job.title.length > 50) {
            dispatch(setError({ ...error, title: true }));
            handleAddToast('Cảnh báo', 'Tiêu đề tin từ 6 đến 50 ký tự', 'warning');
            return;
        } else if (job.job_description?.trim() === '') {
            dispatch(setError({ ...error, job_description: true }));
            handleAddToast('Cảnh báo', 'Mô tả công việc không được để trống', 'warning');
            return;
        } else if (job.salary_type !== 'deal' && job.salary_to === 0) {
            dispatch(setError({ ...error, salary_to: true }));
            handleAddToast('Cảnh báo', 'Mức lương không được để trống', 'warning');
            return;
        } else if (job.locations.length === 0) {
            dispatch(setError({ ...error, location: true }));
            handleAddToast('Cảnh báo', 'Khu vực làm việc không được để trống', 'warning');
            return;
        } else if (job.job_requirement?.trim() === '') {
            dispatch(setError({ ...error, job_requirement: true }));
            handleAddToast('Cảnh báo', 'Yêu cầu công việc không được để trống', 'warning');
            return;
        } else if (job.job_benefit?.trim() === '') {
            dispatch(setError({ ...error, job_benefit: true }));
            handleAddToast('Cảnh báo', 'Quyền lợi được hưởng không được để trống', 'warning');
            return;
        } else if (job.deadline === '') {
            dispatch(setError({ ...error, deadline: true }));
            handleAddToast('Cảnh báo', 'Hạn nộp hồ sơ không được để trống', 'warning');
            return;
        } else if (job.full_name_contact?.trim() === '') {
            dispatch(setError({ ...error, full_name_contact: true }));
            handleAddToast('Cảnh báo', 'Tên người nhận CV không được để trống', 'warning');
            return;
        } else if (job.phone_contact?.trim() === '') {
            dispatch(setError({ ...error, phone_contact: true }));
            handleAddToast('Cảnh báo', 'Số điện thoại người nhận CV không được để trống', 'warning');
            return;
        } else if (job.email_contact.length === 0) {
            dispatch(setError({ ...error, email_contact: true }));
            handleAddToast('Cảnh báo', 'Email nhận hồ sơ không được để trống', 'warning');
            return;
        } else if (job.categories.length === 0) {
            dispatch(setError({ ...error, categories: true }));
            handleAddToast('Cảnh báo', 'Ngành nghề không được để trống', 'warning');
            return;
        } else if (job.job_experience === -1) {
            dispatch(setError({ ...error, job_experience: true }));
            handleAddToast('Cảnh báo', 'Kinh nghiệm không được để trống', 'warning');
            return;
        }

        job.email_contact.forEach((email) => {
            if (!validateEmail(email)) {
                dispatch(setError({ ...error, email_contact: true }));
                handleAddToast('Cảnh báo', 'Email liên hệ không hợp lệ', 'warning');
                return;
            }
        });

        return true;
    };

    const handlePostRequest = (body) => {
        createBusinessJobService(body)
            .then((res) => {
                if (res.status === 201) {
                    handleAddToast('Thành công', 'Đăng tin tuyển dụng thành công', 'success');
                    navigate(path.DASHBOARD_RECRUIREMENT_CAMPAIGNS);
                } else if (res.status === 401) {
                    handleAddToast('Cảnh báo', 'Đã có lỗi xảy ra', 'warning');
                    setLoading({ ...loading, post: false });
                } else if (res.status === 400) {
                    handleAddToast('Cảnh báo', 'Dữ liệu không hợp lệ', 'warning');
                    setLoading({ ...loading, post: false });
                } else if (res.status === 409) {
                    handleAddToast('Cảnh báo', 'Chiến dịch đã có tin tuyển dụng', 'warning');
                    setLoading({ ...loading, post: false });
                } else if (res.status === 500) {
                    handleAddToast('Cảnh báo', 'Đã có lỗi xảy ra', 'warning');
                    setLoading({ ...loading, post: false });
                }
            })
            .catch((err) => {
                console.log(err);
                handleAddToast('Cảnh báo', 'Đã có lỗi xảy ra', 'warning');
                setLoading({ ...loading, post: false });
            });
    };

    const handleSetPost = () => {
        handleAddToast('Thông báo', 'Đang xử lý, vui lòng chờ trong giây lát', 'info');
        setLoading({ ...loading, post: true });
    };

    const handleSubmit = () => {
        if (handleValidate()) {
            const locations = [];
            job.locations.forEach((loc) => {
                const province_id = loc?.province !== -1 ? loc.province : null;

                loc?.district?.forEach((dis) => {
                    const district_id = dis.district !== -1 ? dis.district : null;
                    const description = dis.description;

                    locations.push({
                        province_id: province_id,
                        district_id: district_id,
                        description: description,
                    });
                });
            });
            const body = Object.assign({}, job, { locations: locations });
            for (const key in body) {
                if (key === 'salary_type') {
                    body[key] = body[key].toLowerCase();
                } else if (body[key] === null || body[key] === undefined || body[key] === -1) {
                    delete body[key];
                }
            }

            handlePostRequest(body);
        }
    };

    useEffect(() => {
        if (campaign_id) {
            getCampaignByIdService(campaign_id)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCampaignId(res.data.data.id));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [campaign_id]);

    useEffect(() => {
        if (!campaigns) {
            const params = {
                business_id: user.id,
            };
            getListCampaignService(params)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCampaign(res.data.data.campaigns));
                        setIsLoadCampaign(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        !jobPositions &&
            getListJobPositionService()
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setJobPosition(res.data.data));
                        setIsLoadPosition(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        !jobCategories &&
            getListCategoryService()
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCategory(res.data.data));
                        setIsLoadCategories(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
    }, []);

    useEffect(() => {
        loading.post && handleSubmit();
    }, [loading.post]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('auth-modal')}></div>
            <div className={cx('container')}>
                <div className={cx('breadcrumb-box')}>
                    <div className={cx('breadcrumb-box-title')}>
                        <h6 className={cx('breadcrumb')}>Đăng tin tuyển dụng</h6>
                        <div className={cx('breadcrumb-box-subtitle')}>
                            <IoInformationCircleOutline className={cx('icon')} />
                            <a href={path.DASHBOARD_HOME} className={cx('breadcrumb-link')}>
                                Quy định đăng tin
                            </a>
                        </div>
                    </div>
                    <div className={cx('breadcrumb-box-button')}>
                        <div className={cx('button-list')}>
                            <button
                                className={cx('button', 'button-save-draft')}
                                onClick={() => {
                                    // console.log(job);
                                }}
                                disabled={loading.draft || loading.post}
                            >
                                Lưu nháp
                            </button>
                            <button className={cx('button', 'button-post')} onClick={handleSetPost} disabled={loading.post || loading.draft}>
                                Lưu & Đăng tin
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-list')}>
                        <div className={cx('box-content')}>
                            <div className={cx('box-content-item')}>
                                <div className={cx('item-title')}>
                                    <h6 className={cx('title')}>Thông tin chung</h6>
                                </div>
                                <div className={cx('item-content')}>
                                    <div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-title">
                                                Tiêu đề tin
                                            </label>
                                            <span className={cx('required')}>*</span>
                                            <div className={cx('input-box')}>
                                                <div className={cx('input-box-item')}>
                                                    <input
                                                        type="text"
                                                        id="job-title"
                                                        name="job-title"
                                                        className={cx('input')}
                                                        placeholder="Nhập tiêu đề tin"
                                                        value={job.title}
                                                        onChange={(e) => {
                                                            handleSetTitle(e.target.value);
                                                        }}
                                                    />
                                                    <span className={cx('input-box-right')}>
                                                        <span className={cx('input-box-right-icon')}>
                                                            <FaCircleXmark
                                                                className={cx('icon-circle-xmark', { active: job.title.length > 0 })}
                                                                onClick={() => handleSetTitle('')}
                                                            />
                                                            <span className={cx('input-box-right-text')}>{job.title?.length || 0}/50</span>
                                                        </span>
                                                        <PiWarningCircle className={cx('icon-warning')} />
                                                    </span>
                                                </div>
                                                {error.title && (
                                                    <div className={cx('input-box-feedback')}>
                                                        <div className={cx('feedback-text')}>Tiêu đề tin từ 6 đến 50 ký tự</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label', 'label-secondary')} htmlFor="job-title-show">
                                                Tiêu đề hiển thị trên
                                                <img src={icons.icon_logo_text} alt="logo-text" className={cx('icon-logo-text')} />
                                            </label>
                                            <div className={cx('box-content-flex')}>
                                                <div className={cx('box-content-job-type')}>
                                                    <div className={cx('job-type')}>
                                                        <div className={cx('job-type-icon')}>
                                                            <img src={icons.icon_check_mark} alt="check-mark" className={cx('icon-check-mark')} />
                                                        </div>
                                                        <div className={cx('job-type-title')}>Tin cơ bản</div>
                                                        <div className={cx('job-type-text')}>
                                                            <label className={cx('label')} htmlFor="normal">
                                                                <span className={cx('text')}>{job.title.substring(0, 50)}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className={cx('job-type-description')}>
                                                        <p className={cx('description')}>
                                                            <span>
                                                                Tiêu đề giới hạn
                                                                <b className={cx('description-bold')}> 50 ký tự </b>
                                                                và không chứa các từ khóa liên quan đến
                                                                <b className={cx('description-bold')}> thu nhập </b>
                                                                hoặc
                                                                <b className={cx('description-bold')}> địa điểm </b>.
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={cx('box-content-job-type')}>
                                                    <div className={cx('job-type')}>
                                                        <div className={cx('job-type-title', 'job-top')}>
                                                            <FaWandMagicSparkles className={cx('icon-magic')} />
                                                            Tin Now Jobs
                                                        </div>
                                                        <div className={cx('job-type-text')}>
                                                            <label className={cx('label')} htmlFor="nơ-job">
                                                                <span className={cx('text', 'highlight')}>{job.title}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className={cx('job-type-description')}>
                                                        <p className={cx('description')}>
                                                            <span>
                                                                Tiêu đề có thể dài tới
                                                                <b className={cx('description-bold')}> 255 ký tự </b>.
                                                                <span className={cx('service')}> Kích hoạt dịch vụ</span>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-content-group')}>
                                        <label className={cx('label')} htmlFor="job-campaign">
                                            Chiến dịch
                                            <TippyText
                                                maxWidth={200}
                                                content="Nếu không chọn chiến dịch, hệ thống sẽ tự động tạo chiến dịch tương ứng với tiêu đề tin"
                                                placement="top"
                                                className={cx('tooltip-box')}
                                            >
                                                <span className={cx('tooltip')}>
                                                    <FaCircleInfo className={cx('icon-info')} />
                                                </span>
                                            </TippyText>
                                        </label>
                                        <div className={cx('select-box')}>
                                            <div className={cx('select-box-item')}>
                                                {!isLoadCampaign && campaigns ? (
                                                    <InputSelectorComponent
                                                        placeholder={'Chọn chiến dịch'}
                                                        options={campaigns.filter((item) => item.job === null)}
                                                        value={job.campaign_id}
                                                        setValue={handleSetCampaign}
                                                        isRequired={true}
                                                        styleInput={{ width: '100%' }}
                                                    />
                                                ) : (
                                                    <div className={cx('spinner')}>
                                                        <Skeleton width={600} height={33.5} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-content-flex')}>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-position">
                                                Vị trí tuyển dụng
                                                <span className={cx('required')}>*</span>
                                                <TippyText content="Thông tin này sẽ giúp gợi ý ứng viên phù hợp chính xác hơn" placement="top">
                                                    <span className={cx('tooltip')}>
                                                        <FaCircleInfo className={cx('icon-info')} />
                                                    </span>
                                                </TippyText>
                                            </label>
                                            <div className={cx('input-box')}>
                                                {!isLoadPosition ? (
                                                    <InputSelectorComponent
                                                        placeholder={'VD: Nhân viên Marketing, Designer, ...'}
                                                        options={jobPositions}
                                                        value={job.job_location}
                                                        setValue={handleSetJobLocation}
                                                        styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                    />
                                                ) : (
                                                    <div className={cx('spinner')}>
                                                        <Skeleton width={300} height={33.5} />
                                                    </div>
                                                )}
                                                {error.position && (
                                                    <div className={cx('input-box-feedback')}>
                                                        <div className={cx('feedback-text')}>Vị trí tuyển dụng không được để trống</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-type">
                                                Ngành nghề
                                                <span className={cx('required')}>*</span>
                                            </label>
                                            <div className={cx('input-box')}>
                                                {!isLoadCategories ? (
                                                    <InputSelectorMultiComponent
                                                        placeholder={'Chọn ngành nghề'}
                                                        options={jobCategories}
                                                        value={job.categories}
                                                        setValue={handleSetCategories}
                                                        styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                    />
                                                ) : (
                                                    <div className={cx('spinner')}>
                                                        <Skeleton width={300} height={33.5} />
                                                    </div>
                                                )}
                                                {error.categories && (
                                                    <div className={cx('input-box-feedback')}>
                                                        <div className={cx('feedback-text')}>Ngành nghề không được để trống</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-content-flex')}>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="deadline">
                                                Hạn nộp hồ sơ
                                                <span className={cx('required')}>*</span>
                                            </label>
                                            <div className={cx('input-box')}>
                                                <div className={cx('input-box-item', 'input-date')}>
                                                    <FaRegCalendar className={cx('icon-calendar')} />
                                                    <input
                                                        type="date"
                                                        id="deadline"
                                                        name="deadline"
                                                        className={cx('date')}
                                                        onChange={(e) => {
                                                            dispatch(setDeadline(e.target.value));
                                                        }}
                                                        value={info.deadline}
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                                {error.deadline && (
                                                    <div className={cx('input-box-feedback')}>
                                                        <div className={cx('feedback-text')}>Vị trí tuyển dụng không được để trống</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-quantity">
                                                Số lượng tuyển
                                                <span className={cx('required')}>*</span>
                                            </label>
                                            <div className={cx('input-box')}>
                                                <div className={cx('input-box-item', 'input-quantity')}>
                                                    <button className={cx('action', 'action-sub')} onClick={() => handleSetQuantity(info.quantity - 1)}>
                                                        <FaMinus className={cx('icon-action', 'icon-minus')} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        id="job-quantity"
                                                        name="job-quantity"
                                                        className={cx('input')}
                                                        maxLength={4}
                                                        onChange={(e) => {
                                                            handleSetQuantity(e.target.value);
                                                        }}
                                                        value={info.quantity}
                                                    />
                                                    <button className={cx('action', 'action-add')} onClick={() => handleSetQuantity(info.quantity + 1)}>
                                                        <FaPlus className={cx('icon-action', 'icon-plus')} />
                                                    </button>
                                                </div>

                                                {error.quantity && (
                                                    <div className={cx('input-box-feedback')}>
                                                        <div className={cx('feedback-text')}>Ngành nghề không được để trống</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-content-group')}>
                                        <label className={cx('label')} htmlFor="location">
                                            Khu vực làm việc
                                            <span className={cx('required')}>*</span>
                                        </label>
                                        <div className={cx('select-box')}>
                                            <div>
                                                {job.locations.map((item) => (
                                                    <JobLocation key={item.id} location_id={item.id} />
                                                ))}
                                                <button className={cx('select-button')} onClick={handleAddLocation}>
                                                    <FaPlus className={cx('icon-plus')} />
                                                    Thêm khu vực
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('box-content-item')}>
                                <JobGeneralRequirements />
                            </div>
                            <div className={cx('box-content-item')}>
                                <JobDetailRequirements />
                            </div>
                            <div className={cx('box-content-item')}>
                                <JobInfoContact />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPostJobPage;
