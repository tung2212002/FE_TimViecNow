import classNames from 'classnames/bind';

import { FaCaretDown } from 'react-icons/fa';

import styles from './DashboardPostJobGeneralRequirementsCampaign.module.scss';
import { SelectionComponent } from '../../common';
import { HiCheck } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectPostJob,
    setEmploymentType,
    setJobExperience,
    setMaxSalary,
    setMinSalary,
    setPostionLevel,
    setSalaryType,
} from '../../../redux/features/postJob/postJobSlide';

const cx = classNames.bind(styles);

const DashboardPostJobGeneralRequirementsCampaign = () => {
    const dispatch = useDispatch();
    const job = useSelector(selectPostJob);

    const employmentType = [
        {
            id: 1,
            name: 'Toàn thời gian',
            value: 'fulltime',
        },
        {
            id: 2,
            name: 'Bán thời gian',
            value: 'parttime',
        },
        {
            id: 3,
            name: 'Thực tập',
            value: 'intern',
        },
    ];

    const jobLevel = [
        { value: '0', name: 'Nhân viên' },
        { value: '1', name: 'Trưởng nhóm' },
        { value: '2', name: 'Phó phòng' },
        { value: '3', name: 'Trưởng phòng' },
        { value: '4', name: 'Phó giám đốc' },
        { value: '5', name: 'Giám đốc' },
        { value: '6', name: 'Tổng giám đốc' },
        { value: '7', name: 'Chủ tịch' },
        { value: '8', name: 'Thực tập sinh' },
    ];
    const filterExp = [
        {
            id: 1,
            name: 'Tất cả kinh nghiệm',
        },
        {
            id: 2,
            name: 'Chưa có kinh nghiệm',
        },
        {
            id: 3,
            name: 'Dưới 1 năm',
        },
        {
            id: 4,
            name: '1 năm',
        },
        {
            id: 5,
            name: '2 năm',
        },
        {
            id: 6,
            name: '3 năm',
        },
        {
            id: 7,
            name: '4 năm',
        },
        {
            id: 8,
            name: '5 năm',
        },
        {
            id: 9,
            name: 'Trên 5 năm',
        },
    ];

    const handleSetEmploymentType = (value) => {
        dispatch(setEmploymentType(value));
    };

    const handleSetJobLevel = (value) => {
        dispatch(setPostionLevel(value));
    };

    const handleSetJobExp = (value) => {
        dispatch(setJobExperience(value));
    };

    const handleSetMaxSalary = (value) => {
        dispatch(setMaxSalary(value));
    };

    const handleSetMinSalary = (value) => {
        dispatch(setMinSalary(value));
    };

    const handleSetSalaryType = (value) => {
        dispatch(setSalaryType(value));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-title')}>
                <h6 className={cx('title')}>Yêu cầu chung</h6>
            </div>
            <div className={cx('item-content')}>
                <div>
                    <div className={cx('box-content-group')}>
                        <label className={cx('label')} htmlFor="job-type">
                            Loại công việc
                        </label>
                        <span className={cx('required')}>*</span>
                        <div className={cx('input-box')}>
                            <div className={cx('input-box-item')}>
                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select')}>
                                            <div className={cx('container-select')}>
                                                <span className={cx('result')}>{employmentType.find((item) => item.value === job.employment_type)?.name}</span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {employmentType.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.value === job.employment_type })}
                                                    onClick={() => handleSetEmploymentType(item.value)}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>
                                                    {item.value === job.employment_type && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={employmentType.find((item) => item.value === job.employment_type)?.name}
                                    maxHeight={'230px'}
                                    styleDropdown={{ right: '0', left: 'auto', top: '72px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
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
                                            <b className={cx('description-bold')}> 255 ký tự </b>.<span className={cx('service')}> Kích hoạt dịch vụ</span>
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
                                setValue={handleSetPosition}
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
                            <div className={cx('input-box-item')}></div>
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
                            <div className={cx('input-box-feedback')}>
                                <div className={cx('feedback-text')}>Ngành nghề không được để trống</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('box-content-group')}></div>
            </div> */}
        </div>
    );
};

export default DashboardPostJobGeneralRequirementsCampaign;
