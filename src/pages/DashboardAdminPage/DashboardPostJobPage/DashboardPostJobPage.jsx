import classNames from 'classnames/bind';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import TippyText from '@tippyjs/react';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import { IoInformationCircleOutline } from 'react-icons/io5';
import { FaCircleXmark, FaWandMagicSparkles, FaCircleInfo, FaMinus, FaPlus } from 'react-icons/fa6';
import { PiWarningCircle } from 'react-icons/pi';
import { FaRegCalendar } from 'react-icons/fa';

import styles from './DashboardPostJobPage.module.scss';
import { icons, images } from '../../../assets';
import path from '../../../constants/path';
import { DashboardJpostJobSelectCampaignComponent } from '../../../components/DashboardPostJob';
import InputSelectorComponent from '../../../components/common/InputSelectorComponent/InputSelectorComponent';
import InputSelectorMultiComponent from '../../../components/common/InputSelectorMultiComponent/InputSelectorMultiComponent';

const cx = classNames.bind(styles);

const DashboardPostJobPage = () => {
    const [info, setInfo] = useState({
        title: '',
        titleShow: '',
        campaign: -1,
        position: '',
        type: [],
        deadline: '',
        quantity: 1,
    });

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

    const [job, setJob] = useState({
        position: '',
        campaign: -1,
    });

    const handleCheck = () => {
        console.log('check', job, typeJob, campaign);
    };
    const [campaign, setCampaign] = useState(-1);
    const [typeJob, setTypeJob] = useState([]);

    return (
        <div className={cx('wrapper')}>
            <button className={cx('button-check')} onClick={handleCheck}>
                Kiểm tra
            </button>
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
                            <button className={cx('button', 'button-save-draft')}>Lưu nháp</button>
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
                                                    <input type="text" id="job-title" name="job-title" className={cx('input')} placeholder="Nhập tiêu đề tin" />
                                                    <span className={cx('input-box-right')}>
                                                        <span className={cx('input-box-right-icon')}>
                                                            <FaCircleXmark className={cx('icon-circle-xmark')} />
                                                            <span className={cx('input-box-right-text')}>0/50</span>
                                                        </span>
                                                        <PiWarningCircle className={cx('icon-warning')} />
                                                    </span>
                                                </div>
                                                <div className={cx('input-box-feedback')}>
                                                    <div className={cx('feedback-text')}>Tiêu đề tin từ 6 đến 50 ký tự</div>
                                                </div>
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
                                                                <span className={cx('text')}>Test input checkbox</span>
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
                                                                <span className={cx('text', 'highlight')}>Test input checkbox</span>
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
                                        <label className={cx('label')} htmlFor="job-title">
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
                                                    value={campaign}
                                                    setValue={(value) => setCampaign(value)}
                                                    isRequired={true}
                                                    styleInput={{ width: '100%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('box-content-flex')}>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-title">
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
                                                    setValue={(value) => setJob({ ...job, position: value })}
                                                    styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                />
                                                <div className={cx('input-box-feedback')}>
                                                    <div className={cx('feedback-text')}>Vị trí tuyển dụng không được để trống</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-title">
                                                Ngành nghề
                                                <span className={cx('required')}>*</span>
                                            </label>
                                            <div className={cx('input-box')}>
                                                <InputSelectorMultiComponent
                                                    placeholder={'Chọn ngành nghề'}
                                                    options={fakeData}
                                                    value={typeJob}
                                                    setValue={(value) => setTypeJob(value)}
                                                    styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                                />
                                                <div className={cx('input-box-feedback')}>
                                                    <div className={cx('feedback-text')}>Ngành nghề không được để trống</div>
                                                </div>
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
                                                            setInfo({ ...info, deadline: e.target.value });
                                                        }}
                                                        value={info.deadline}
                                                        // mindate is today
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                                <div className={cx('input-box-feedback')}>
                                                    <div className={cx('feedback-text')}>Vị trí tuyển dụng không được để trống</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('box-content-group')}>
                                            <label className={cx('label')} htmlFor="job-title">
                                                Số lượng tuyển
                                                <span className={cx('required')}>*</span>
                                            </label>
                                            <div className={cx('input-box')}>
                                                <div className={cx('input-box-item', 'input-quantity')}>
                                                    <div className={cx('action', 'action-sub')}>
                                                        <FaMinus className={cx('icon-action', 'icon-minus')} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="job-title"
                                                        name="job-title"
                                                        className={cx('input')}
                                                        maxLength={4}
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            if (!isNaN(inputValue) && inputValue >= 1) {
                                                                setInfo({ ...info, quantity: inputValue });
                                                            }
                                                        }}
                                                        value={info.quantity}
                                                    />
                                                    <div className={cx('action', 'action-add')}>
                                                        <FaPlus className={cx('icon-action', 'icon-plus')} />
                                                    </div>
                                                </div>

                                                <div className={cx('input-box-feedback')}>
                                                    <div className={cx('feedback-text')}>Ngành nghề không được để trống</div>
                                                </div>
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
                                                <div className={cx('select-box-item')}>
                                                    <div className={cx('location-box')}>
                                                        <div className={cx('location-box__province')}>
                                                            <div className={cx('location-box__province-title')}>Tỉnh/Thành phố</div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('address-box')}></div>
                                                </div>
                                                <button className={cx('select-button')}>
                                                    <FaPlus className={cx('icon-plus')} />
                                                    Thêm khu vực
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('box-content-item')}></div>
                            <div className={cx('box-content-item')}></div>
                            <div className={cx('box-content-item')}></div>
                        </div>

                        <div className={cx('box-content')}>
                            <div className={cx('box-content-item')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPostJobPage;
