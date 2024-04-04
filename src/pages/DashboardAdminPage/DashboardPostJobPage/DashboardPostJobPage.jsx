import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { IoInformationCircleOutline } from 'react-icons/io5';
import { FaCircleXmark, FaWandMagicSparkles, FaCircleInfo, FaMinus, FaPlus } from 'react-icons/fa6';
import { PiWarningCircle } from 'react-icons/pi';
import { FaRegCalendar } from 'react-icons/fa';

import styles from './DashboardPostJobPage.module.scss';
import { icons } from '../../../assets';
import path from '../../../constants/path';
import { InputSelectorComponent, InputSelectorMultiComponent } from '../../../components/common';
import {
    addLocation,
    selectError,
    selectPostJob,
    setCampaignId,
    setDeadline,
    setJobDescription,
    setQuantity,
    setRecruitmentPositionTitle,
    setTypesJob,
} from '../../../redux/features/postJob/postJobSlide';
import { JobLocation, JobGeneralRequirements, JobDetailRequirements, JobInfoContact } from '../../../layouts/components/Business/PostJobPage';

const cx = classNames.bind(styles);

const DashboardPostJobPage = () => {
    const dispatch = useDispatch();
    const info = useSelector(selectPostJob);
    const error = useSelector(selectError);

    const fakeData = [
        {
            id: 1,
            value: 'Nhân viên kinh doanh',
        },
        {
            id: 2,
            value: 'Kỹ sư phần mềm',
        },
        {
            id: 3,
            value: 'Kỹ sư phần cứng',
        },
        {
            id: 4,
            value: 'Kế toán',
        },
    ];

    const job = useSelector(selectPostJob);

    const handleStCampaign = (value) => {
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

    const handleSetPosition = (value) => {
        dispatch(setRecruitmentPositionTitle(value));
    };

    const handleSetDescription = (value) => {
        if (value.length <= 50) dispatch(setJobDescription(value));
    };

    const handleSetTypeJob = (value) => {
        dispatch(setTypesJob(value));
    };
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
                                    console.log(job);
                                }}
                            >
                                Lưu nháp
                            </button>
                            <button className={cx('button', 'button-post')}>Lưu & Đăng tin</button>
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
                                                        value={job.job_description}
                                                        onChange={(e) => {
                                                            handleSetDescription(e.target.value);
                                                        }}
                                                    />
                                                    <span className={cx('input-box-right')}>
                                                        <span className={cx('input-box-right-icon')}>
                                                            <FaCircleXmark className={cx('icon-circle-xmark')} />
                                                            <span className={cx('input-box-right-text')}>{job.job_description?.length || 0}/50</span>
                                                        </span>
                                                        <PiWarningCircle className={cx('icon-warning')} />
                                                    </span>
                                                </div>
                                                {error.job_description && (
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
                                                                <span className={cx('text')}>{job.job_description.substring(0, 50)}</span>
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
                                                                <span className={cx('text', 'highlight')}>{job.job_description}</span>
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
                                                <InputSelectorComponent
                                                    placeholder={'Chọn chiến dịch'}
                                                    options={fakeData}
                                                    value={job.campaign_id}
                                                    setValue={handleStCampaign}
                                                    // value={campaign}
                                                    // setValue={(value) => setCampaign(value)}
                                                    isRequired={true}
                                                    styleInput={{ width: '100%' }}
                                                />
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
                                                <InputSelectorComponent
                                                    placeholder={'VD: Nhân viên Marketing, Designer, ...'}
                                                    options={fakeData}
                                                    value={job.position}
                                                    setValue={handleSetPosition}
                                                    styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                />
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
                                                <InputSelectorMultiComponent
                                                    placeholder={'Chọn ngành nghề'}
                                                    options={fakeData}
                                                    value={job.type_job}
                                                    setValue={handleSetTypeJob}
                                                    styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                />
                                                {error.type_job && (
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
                                                {job.location.map((item) => (
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
