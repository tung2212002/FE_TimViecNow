import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './JobDetailHeader.module.scss';
import { SearchSalaryComponent, SearchExpComponent, SearchJobSearchHeaderComponent } from '../../../../../components';
import path from '@constants/path';

const cx = classNames.bind(styles);

const JobDetailHeader = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState({
        keyword: '',
        province_id: 0,
        job_expereince_id: 0,
        min_salary: 0,
        max_salary: 0,
        salary_type: '',
    });

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-search')}>
                    <SearchJobSearchHeaderComponent
                        paddingContainer="4px 8px 4px 12px"
                        searchHeight="32px"
                        handleSelectCity={handleSetProvince}
                        handleSelectKeyword={handleSetKeyword}
                        selectCity={search.province_id}
                        selectKeyword={search.keyword}
                    />
                    <div className={cx('group-box')}>
                        <SearchExpComponent handleSelectExperience={handleSetExperience} padding="12px 19px 12px 2px" />
                        <SearchSalaryComponent
                            handleSetMaxSalary={handleSetMaxSalary}
                            handleSetMinSalary={handleSetMinSalary}
                            handleSetSalaryType={handleSetSalaryType}
                            handleSetSalary={handleSetSalary}
                            padding="12px 19px 12px 2px"
                        />
                    </div>
                    <div className={cx('box-filter')}>
                        <button className={cx('btn-filter')} type="button" onClick={handleSearch}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailHeader;
