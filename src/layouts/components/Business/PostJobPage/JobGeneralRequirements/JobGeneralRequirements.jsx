import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { FaCaretDown } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import { FaMinus, FaRegClock, FaXmark } from 'react-icons/fa6';
import { FiMinus } from 'react-icons/fi';
import { FaPlus as Fa6Plus } from 'react-icons/fa6';

import styles from './JobGeneralRequirements.module.scss';
import {
    addWorkingTime,
    removeWorkingTime,
    selectError,
    selectPostJob,
    setEmploymentType,
    setGenderRequirement,
    setJobExperienceId,
    setMaxSalary,
    setMinSalary,
    setJobPositionId,
    setSalaryType,
    setWorkingTime,
    setWorkingTimeText,
} from '@redux/features/postJob/postJobSlide';
import { InputSelectorComponent, SelectionComponent } from '@components/common';
import { listJobEmployerLevel } from '@constants';
const cx = classNames.bind(styles);

const JobGeneralRequirements = () => {
    const dispatch = useDispatch();
    const job = useSelector(selectPostJob);
    const error = useSelector(selectError);
    const refArea = useRef(null);

    const [isDeal, setIsDeal] = useState(false);

    const employmentType = [
        {
            id: 1,
            name: 'Toàn thời gian',
            value: 'full_time',
        },
        {
            id: 2,
            name: 'Bán thời gian',
            value: 'part_time',
        },
        {
            id: 3,
            name: 'Thực tập',
            value: 'internship',
        },
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
    const jobSalaryType = [
        {
            id: 1,
            name: 'VND',
        },
        {
            id: 2,
            name: 'USD',
        },
    ];

    const day = [
        {
            id: 1,
            name: 'Thứ 2',
        },
        {
            id: 2,
            name: 'Thứ 3',
        },
        {
            id: 3,
            name: 'Thứ 4',
        },
        {
            id: 4,
            name: 'Thứ 5',
        },
        {
            id: 5,
            name: 'Thứ 6',
        },
        {
            id: 6,
            name: 'Thứ 7',
        },
        {
            id: 7,
            name: 'Chủ nhật',
        },
    ];

    const gender = [
        {
            id: 1,
            name: 'Nam',
            value: 'male',
        },
        {
            id: 2,
            name: 'Nữ',
            value: 'female',
        },
        {
            id: 3,
            name: 'Không yêu cầu',
            value: 'other',
        },
    ];
    const handleSetEmploymentType = (value) => {
        dispatch(setEmploymentType(value));
    };

    const handleSetJobPositionId = (value) => {
        dispatch(setJobPositionId(value));
    };

    const handleSetJobExpId = (value) => {
        dispatch(setJobExperienceId(value));
    };

    const handleSetMaxSalary = (value) => {
        const numberValue = Number(value);
        if (!isNaN(numberValue) && (numberValue > 0 || numberValue === 0) && numberValue >= job.min_salary) {
            if (numberValue.length > 1 && numberValue[0] === 0) {
                return;
            }
            dispatch(setMaxSalary(numberValue));
        }
    };

    const handleSetMinSalary = (value) => {
        const numberValue = Number(value);
        if (!isNaN(numberValue) && (numberValue > 0 || numberValue === 0) && numberValue <= job.max_salary) {
            if (numberValue.length > 1 && numberValue[0] === 0) {
                return;
            }

            dispatch(setMinSalary(numberValue));
        }
    };

    const handleSetSalaryType = (value) => {
        dispatch(setSalaryType(value));
        setIsDeal(value === 'deal');
    };

    const handleAddworkingTime = () => {
        dispatch(addWorkingTime());
    };

    const handleRemoveWorkingTime = (id) => {
        dispatch(removeWorkingTime(id));
    };

    const handleSetWorkingTime = (value, type, id) => {
        dispatch(setWorkingTime({ id, [type]: value }));
    };

    const handleSetWorkingTimeText = (value) => {
        const height = refArea.current.scrollHeight;
        refArea.current.style.height = 'auto';
        refArea.current.style.height = height + 'px';
        dispatch(setWorkingTimeText(value));
    };

    const handleSetGender = (value) => {
        dispatch(setGenderRequirement(value));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-title')}>
                <h6 className={cx('title')}>Yêu cầu chung</h6>
            </div>
            <div className={cx('item-content')}>
                <div className={cx('box-content-flex')}>
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
                                    styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                    styleButton={{ marginRight: '10px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('box-content-group')}>
                        <label className={cx('label')} htmlFor="job-level">
                            Cấp bậc
                            <span className={cx('required')}>*</span>
                        </label>
                        <div className={cx('input-box')}>
                            <InputSelectorComponent
                                placeholder={'Chọn cấp bậc'}
                                options={listJobEmployerLevel}
                                value={job.job_position_id}
                                setValue={handleSetJobPositionId}
                                styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                isRequired={true}
                                keepValue={true}
                            />
                            {error.job_position_id && (
                                <div className={cx('input-box-feedback')}>
                                    <div className={cx('feedback-text')}>Cấp bậc không được để trống</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('box-content-flex')}>
                    <div className={cx('box-content-group')}>
                        <label className={cx('label')} htmlFor="job-exp">
                            Kinh nghiệm
                        </label>
                        <span className={cx('required')}>*</span>
                        <div className={cx('input-box')}>
                            <div className={cx('input-box-item')}>
                                <SelectionComponent
                                    header={() => (
                                        <div className={cx('header-select')}>
                                            <div className={cx('container-select')}>
                                                <span className={cx('result')}>
                                                    {filterExp.find((item) => item.id === job.job_experience_id)?.name || '-- Chọn kinh nghiệm --'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    body={() => (
                                        <ul className={cx('ul-select')}>
                                            {filterExp.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className={cx('item', { active: item.id === job.job_experience_id })}
                                                    onClick={() => handleSetJobExpId(item.id)}
                                                >
                                                    <span className={cx('text')}>{item.name}</span>
                                                    {item.id === job.job_experience_id && <HiCheck className={cx('icon-check')} />}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    icon={() => <FaCaretDown className={cx('icon-care')} />}
                                    itemSelect={filterExp.find((item) => item.id === job.job_experience_id)?.name}
                                    maxHeight={'230px'}
                                    styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                    styleButton={{ marginRight: '10px' }}
                                />
                            </div>
                            {error.job_experience_id && (
                                <div className={cx('input-box-feedback')}>
                                    <div className={cx('feedback-text')}>Cấp bậc không được để trống</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={cx('box-content-group')}>
                        <label className={cx('label', 'label-salary')} htmlFor="job-min-salary">
                            Mức lương
                            <span className={cx('required')}>*</span>
                            <span className={cx('label-salary-box')}>
                                <input
                                    type="checkbox"
                                    id="job-salary"
                                    name="job-salary"
                                    className={cx('checkbox')}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleSetMinSalary(0);
                                            handleSetMaxSalary(0);
                                            handleSetSalaryType('deal');
                                        } else {
                                            handleSetMinSalary('');
                                            handleSetMaxSalary('');
                                            handleSetSalaryType('VND');
                                        }
                                    }}
                                />
                                <label className={cx('label-checkbox')} htmlFor="job-salary">
                                    Thoả thuận
                                </label>
                            </span>
                        </label>
                        <div className={cx('input-box')}>
                            <div className={cx('input-box-item', 'input-salary')}>
                                <input
                                    type="text"
                                    id="job-min-salary"
                                    name="job-min-salary"
                                    className={cx('input')}
                                    maxLength={10}
                                    onChange={(e) => {
                                        handleSetMinSalary(e.target.value);
                                    }}
                                    value={job.min_salary}
                                    disabled={isDeal}
                                />
                                <FaMinus className={cx('icon-minus')} />
                                <input
                                    type="text"
                                    id="job-max-salary"
                                    name="job-max-salary"
                                    className={cx('input')}
                                    maxLength={10}
                                    onChange={(e) => {
                                        handleSetMaxSalary(e.target.value);
                                    }}
                                    value={job.max_salary}
                                    disabled={isDeal}
                                />
                                <div className={cx('salary-type')}>
                                    <SelectionComponent
                                        header={() => (
                                            <div className={cx('header-select')}>
                                                <div className={cx('container-select')}>
                                                    <span className={cx('result')}>{jobSalaryType.find((item) => item.name === job.salary_type)?.name}</span>
                                                </div>
                                            </div>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {jobSalaryType.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className={cx('item', { active: item.name === job.salary_type })}
                                                        onClick={() => {
                                                            handleSetSalaryType(item.name);
                                                        }}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <FaCaretDown className={cx('icon-care')} />}
                                        itemSelect={jobSalaryType.find((item) => item.name === job.salary_type)?.name}
                                        maxHeight={'230px'}
                                        styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                        disabled={isDeal}
                                        styleButton={{ marginRight: '10px' }}
                                    />
                                </div>
                            </div>
                            {error.salary && (
                                <div className={cx('input-box-feedback')}>
                                    <div className={cx('feedback-text')}>Mức lương không được để trống</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('box-content-group', 'box-content-group-time')}>
                    <label className={cx('label')} htmlFor="job-working-time">
                        Thời gian làm việc
                    </label>
                    {job.working_time.map((item, index) => (
                        <div className={cx('input-box')} key={index}>
                            <FaRegClock className={cx('icon-clock', 'icon-clock-start')} />
                            <div className={cx('input-box-time')}>
                                <InputSelectorComponent
                                    placeholder={'Chọn ngày'}
                                    options={day}
                                    value={item.date_from}
                                    setValue={(value) => handleSetWorkingTime(value, index, 'date_from')}
                                    styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                                    isRequired={true}
                                    keepValue={true}
                                    defaultValue={day[item.date_from - 1]?.name}
                                />
                            </div>
                            <FiMinus className={cx('icon-minus')} />
                            <div className={cx('input-box-time')}>
                                <InputSelectorComponent
                                    placeholder={'Chọn ngày'}
                                    options={day}
                                    value={item.date_to}
                                    setValue={(value) => handleSetWorkingTime(value, index, 'date_to')}
                                    styleInput={{ paddingTop: '4.75px', paddingBottom: '4.75px' }}
                                    isRequired={true}
                                    keepValue={true}
                                    defaultValue={day[item.date_to - 1]?.name}
                                />
                            </div>
                            <div className={cx('input-box-item')}>
                                <input
                                    type="time"
                                    id="job-working-time"
                                    name="job-working-time"
                                    className={cx('input', 'input-time')}
                                    min="00:00"
                                    max="23:59"
                                    required
                                    placeholder="Từ giờ"
                                    value={item.start_time}
                                    onChange={(e) => handleSetWorkingTime(e.target.value, 'start_time', item.id)}
                                />
                                <FaRegClock className={cx('icon-clock', 'icon-clock-end')} />
                            </div>
                            <div className={cx('input-box-item')}>
                                <input
                                    type="time"
                                    id="job-working-time"
                                    name="job-working-time"
                                    className={cx('input', 'input-time')}
                                    min="00:00"
                                    max="23:59"
                                    placeholder="Đến giờ"
                                    value={item.end_time}
                                    onChange={(e) => handleSetWorkingTime(e.target.value, 'end_time', item.id)}
                                    required
                                />
                                <FaRegClock className={cx('icon-clock', 'icon-clock-end')} />
                            </div>
                            <button className={cx('button-remove')} type="button" onClick={() => handleRemoveWorkingTime(item.id)}>
                                <FaXmark className={cx('icon-remove')} />
                            </button>
                        </div>
                    ))}
                    <button className={cx('button-add')} type="button" onClick={handleAddworkingTime}>
                        <Fa6Plus className={cx('icon-plus')} />
                        Thêm thời gian
                    </button>
                    <div className={cx('input-box-description')}>
                        <textarea
                            ref={refArea}
                            className={cx('input-description')}
                            placeholder="Nhập thời gian làm việc"
                            value={job.working_time_description}
                            onChange={(e) => handleSetWorkingTimeText(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('box-content-group', 'box-input-gender')}>
                    <label className={cx('label')}>Giới tính</label>
                    <div className={cx('input-box')}>
                        <div className={cx('input-box-item', 'input-box-gender')}>
                            <SelectionComponent
                                header={() => (
                                    <div className={cx('header-select')}>
                                        <div className={cx('container-select')}>
                                            <span className={cx('result')}>
                                                {gender.find((item) => item.value === job.gender_requirement)?.name || '-- Chọn giới tính --'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                body={() => (
                                    <ul className={cx('ul-select')}>
                                        {gender.map((item) => (
                                            <li
                                                key={item.id}
                                                className={cx('item', { active: item.value === job.gender_requirement })}
                                                onClick={() => handleSetGender(item.value)}
                                            >
                                                <span className={cx('text')}>{item.name}</span>
                                                {item.value === job.gender_requirement && <HiCheck className={cx('icon-check')} />}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                icon={() => <FaCaretDown className={cx('icon-care')} />}
                                itemSelect={gender.find((item) => item.value === job.gender_requirement)?.name}
                                maxHeight={'230px'}
                                styleDropdown={{ right: '0', left: 'auto', top: '37px' }}
                                styleButton={{ marginRight: '10px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobGeneralRequirements;
