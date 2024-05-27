import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './JobSearchHeader.module.scss';
import { SearchSalaryComponent, SearchExpComponent, SearchJobSearchHeaderComponent } from '../../../../../components';
import { images } from '../../../../../assets';
import BannerSlide from './BannerSlide/BannerSlide';
import path from '../../../../../constants/path';
import { getJobCruitmentDemandService } from '../../../../../services/jobService';
import { convertDateTime } from '../../../../../utils/convertTimeUtil';

const cx = classNames.bind(styles);

const JobSearchHeader = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState({
        keyword: '',
        province_id: 0,
        job_expereince_id: 0,
        min_salary: 0,
        max_salary: 0,
        salary_type: '',
    });
    const [jobDemand, setJobDemand] = useState({});

    const handleSetKeyword = (value) => {
        setSearch({
            ...search,
            keyword: value,
        });
    };

    const handleSetProvince = (value) => {
        setSearch({
            ...search,
            province_id: value,
        });
    };

    const handleSetExperience = (value) => {
        setSearch({
            ...search,
            job_expereince_id: value,
        });
    };

    const handleSetMinSalary = (value) => {
        setSearch({
            ...search,
            min_salary: value,
        });
    };

    const handleSetMaxSalary = (value) => {
        setSearch({
            ...search,
            max_salary: value,
        });
    };

    const handleSetSalaryType = (value) => {
        setSearch({
            ...search,
            salary_type: value,
        });
    };

    const handleSetSalary = (min, max, type) => {
        setSearch({
            ...search,
            min_salary: min,
            max_salary: max,
            salary_type: type,
        });
    };

    const handleSearch = () => {
        navigate(path.JOB_FILTER, {
            state: {
                keyword: search.keyword,
                province_id: search.province_id,
                job_expereince_id: search.job_expereince_id,
                min_salary: search.min_salary,
                max_salary: search.max_salary,
                salary_type: search.salary_type,
            },
        });
    };

    useEffect(() => {
        getJobCruitmentDemandService()
            .then((res) => {
                setJobDemand(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-title')}>
                    <h1 className={cx('title')}>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
                    <p className={cx('desc')}>
                        Tiếp cận
                        <span className={cx('highlight')}> 1,000+ </span>
                        tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam.
                    </p>
                </div>
                <div className={cx('box-search')}>
                    <SearchJobSearchHeaderComponent handleSelectCity={handleSetProvince} handleSelectKeyword={handleSetKeyword} />
                    <div className={cx('group-box')}>
                        <SearchExpComponent handleSelectExperience={handleSetExperience} />
                        <SearchSalaryComponent
                            handleSetMaxSalary={handleSetMaxSalary}
                            handleSetMinSalary={handleSetMinSalary}
                            handleSetSalaryType={handleSetSalaryType}
                            handleSetSalary={handleSetSalary}
                        />
                    </div>
                    <div className={cx('box-filter')}>
                        <button className={cx('btn-filter')} onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className={cx('box-work')}>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Vị trí chờ bạn khám phá</span>
                        <span className={cx('quantity')}>{jobDemand.number_of_job_active}</span>
                    </div>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Việc làm mới nhất</span>
                        <span className={cx('quantity')}>{jobDemand.number_of_job_24h}</span>
                    </div>
                    <div className={cx('work')}>
                        <span className={cx('label')}>Cập nhật lúc</span>
                        <span className={cx('quantity')}>{jobDemand.time_scan && convertDateTime(jobDemand.time_scan)}</span>
                    </div>
                </div>
                <BannerSlide />
            </div>
            <img src={images.robot} alt="" className={cx('img-robot', 'img-back')} />
            <img src={images.bg_left} alt="" className={cx('bg-left', 'img-back')} />
            <img src={images.bg_right} alt="" className={cx('bg-right', 'img-back')} />
            <img src={images.bg_left_tablet} alt="" className={cx('bg-left-tablet', 'img-back')} />
            <img src={images.bg_right_tablet} alt="" className={cx('bg-right-tablet', 'img-back')} />
        </div>
    );
};

export default JobSearchHeader;
