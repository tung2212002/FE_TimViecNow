import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './JobDetailRequirements.module.scss';
import {
    selectError,
    selectPostJob,
    setJobBenefit,
    setJobDescription,
    setJobRequirement,
    setMustHaveSkills,
    setShouldHaveSkills,
} from '../../../../../redux/features/postJob/postJobSlide';
import { InputSelectorMultiComponent, EditorComponent, Spinner } from '../../../../../components/common';
import { selectSkill } from '../../../../../redux/features/config/configSilde';

const cx = classNames.bind(styles);

const JobDetailRequirements = () => {
    const dispatch = useDispatch();
    const job = useSelector(selectPostJob);
    const skills = useSelector(selectSkill);
    const error = useSelector(selectError);

    const handleSetJobDescription = (value) => {
        dispatch(setJobDescription(value));
    };

    const handleSetJobRequirement = (value) => {
        dispatch(setJobRequirement(value));
    };

    const handleSetJobBenefit = (value) => {
        dispatch(setJobBenefit(value));
    };

    const handleSetMustHaveSkill = (value) => {
        dispatch(setMustHaveSkills(value));
    };

    const handleSetShouldHaveSkill = (value) => {
        dispatch(setShouldHaveSkills(value));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-title')}>
                <h6 className={cx('title')}>Yêu cầu chi tiết</h6>
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-description">
                    Mô tả công việc
                </label>
                <span className={cx('required')}>*</span>
                <div className={cx('input-box')}>
                    <EditorComponent contentHTML={job.job_description} setContentHTML={handleSetJobDescription} />
                </div>
                {error.job_description && (
                    <div className={cx('input-box-feedback')}>
                        <div className={cx('feedback-text')}>Mô tả công việc không được để trống</div>
                    </div>
                )}
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-requirement">
                    Yêu cầu ứng viên
                </label>
                <span className={cx('required')}>*</span>
                <div className={cx('input-box')}>
                    <EditorComponent contentHTML={job.job_requirement} setContentHTML={handleSetJobRequirement} />
                </div>
                {error.job_requirement && (
                    <div className={cx('input-box-feedback')}>
                        <div className={cx('feedback-text')}>Yêu cầu ứng viên không được để trống</div>
                    </div>
                )}
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-benefit">
                    Quyền lợi ứng viên
                </label>
                <span className={cx('required')}>*</span>
                <div className={cx('input-box')}>
                    <EditorComponent contentHTML={job.job_benefit} setContentHTML={handleSetJobBenefit} />
                </div>
                {error.job_benefit && (
                    <div className={cx('input-box-feedback')}>
                        <div className={cx('feedback-text')}>Quyền lợi ứng viên không được để trống</div>
                    </div>
                )}
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-must-have-skill">
                    Kỹ năng cần có
                </label>
                <div className={cx('input-box')}>
                    {skills?.length > 0 ? (
                        <InputSelectorMultiComponent
                            placeholder={'VD: Photoshop, Microsoft Word'}
                            options={skills}
                            value={job.must_have_skills}
                            setValue={(value) => handleSetMustHaveSkill(value)}
                            styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                            maxOption={20}
                        />
                    ) : (
                        <div className={cx('spinner')}>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('box-content-group')}>
                <label className={cx('label')} htmlFor="job-shoud-have-skill">
                    Kỹ năng nên có
                </label>
                <div className={cx('input-box')}>
                    {skills?.length > 0 ? (
                        <InputSelectorMultiComponent
                            placeholder={'VD: Photoshop, Microsoft Word'}
                            options={skills}
                            value={job.should_have_skills}
                            setValue={(value) => handleSetShouldHaveSkill(value)}
                            styleInput={{ paddingTop: '7px', paddingBottom: '7px' }}
                            maxOption={20}
                        />
                    ) : (
                        <div className={cx('spinner')}>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailRequirements;
