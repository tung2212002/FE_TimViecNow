import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import { LuListFilter } from 'react-icons/lu';
import { FaChevronDown } from 'react-icons/fa';

import styles from './JobFilterPage.module.scss';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { searchJobService } from '../../services/jobService';
import JobSuggest from '../../layouts/components/User/JobDetailPage/JobDetailBody/JobSuggest/JobSuggest';

import {
    SearchEmploymentTypeComponent,
    SearchExpComponent,
    SearchJobSearchHeaderComponent,
    SearchLevelTypeComponent,
    SearchSalaryComponent,
    SearchCategoryComponent,
    SearchFieldComponent,
} from '../../components';
import path from '../../constants/path';
import { GeneralCompanyFilter, JobDetailBody } from '../../layouts/components/User/JobFilterPage';
import { EmploymentType } from '../../constants';
import { selectCategory, selectField } from '../../redux/features/config/configSilde';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { SkeletonCompanyComponent } from '../../components/skeleton';

const cx = classNames.bind(styles);

const JobFilterPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ref = useRef(null);
    const categories = useSelector(selectCategory);
    const fieds = useSelector(selectField);
    const {
        keyword,
        province_id,
        job_experience_id,
        min_salary,
        max_salary,
        salary_type,
        show,
        category_id,
        fields,
        employment_type,
        job_position_id,
        numberActive,
        sort_by,
    } = location.state;

    const [jobs, setJobs] = useState({
        jobs: [],
        total: 0,
        loading: true,
    });

    const [activeFilter, setActiveFilter] = useState({
        show: show || false,
        category_id: category_id || 0,
        fields: fields || [0],
        employment_type: employment_type || 0,
        job_position_id: job_position_id || 0,
        numberActive: numberActive || 0,
        sort_by: sort_by || 'id',
        loading: false,
        page: 1,
    });

    const [search, setSearch] = useState({
        keyword: keyword || '',
        province_id: province_id || 0,
        job_experience_id: job_experience_id || 0,
        min_salary: min_salary || 0,
        max_salary: max_salary || 0,
        salary_type: salary_type || '',
    });

    const [zoomOut, setZoomOut] = useState({
        state: false,
        id: 0,
    });

    const listSort = [
        { id: 1, name: 'Liên quan', value: 'id' },
        { id: 2, name: 'Ngày đăng', value: 'created_at' },
        { id: 3, name: 'Ngày cập nhật', value: 'updated_at' },
        { id: 4, name: 'Việc làm gấp', value: 'is_fis_urgent' },
    ];

    const random = Math.floor(Math.random() * 500) + 1;

    const handlePrevPage = () => {
        const element = ref.current;
        element.scrollIntoView({ behavior: 'smooth' });
        setZoomOut({
            state: false,
            id: 0,
        });
        setActiveFilter((prev) => ({
            ...prev,
            page: prev.page - 1,
            loading: true,
        }));
    };

    const handleNextPage = () => {
        const element = ref.current;
        element.scrollIntoView({ behavior: 'smooth' });
        setZoomOut({
            state: false,
            id: 0,
        });
        setActiveFilter((prev) => ({
            ...prev,
            page: prev.page + 1,
            loading: true,
        }));
    };

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
            job_experience_id: value,
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

    const handleSetFilter = (value) => {
        setActiveFilter({
            ...activeFilter,
            show: value,
        });
    };

    const handleSetCategory = (value) => {
        setActiveFilter((prev) => ({
            ...prev,
            loading: true,
            category_id: value,
            numberActive:
                value === 0 && prev.category_id !== 0
                    ? prev.numberActive - 1
                    : prev.category_id === value || (prev.category_id !== 0 && value !== 0)
                    ? prev.numberActive
                    : prev.numberActive + 1,
        }));
        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleSetFields = (value) => {
        setActiveFilter((prev) => ({
            ...prev,
            loading: true,
            fields: [value],
            numberActive:
                value === 0 && prev.fields[0] !== 0
                    ? prev.numberActive - 1
                    : prev.fields[0] === value || (prev.fields[0] !== 0 && value !== 0)
                    ? prev.numberActive
                    : prev.numberActive + 1,
        }));
        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleSetEmploymentType = (value) => {
        setActiveFilter((prev) => ({
            ...prev,
            loading: true,
            employment_type: value,
            numberActive:
                value === 0 && prev.employment_type !== 0
                    ? prev.numberActive - 1
                    : prev.employment_type === value || (prev.employment_type !== 0 && value !== 0)
                    ? prev.numberActive
                    : prev.numberActive + 1,
        }));
        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleSetJobPosition = (value) => {
        setActiveFilter((prev) => ({
            ...prev,
            loading: true,
            job_position_id: value,
            numberActive:
                value === 0 && prev.job_position_id !== 0
                    ? prev.numberActive - 1
                    : (value !== 0 && prev.job_position_id !== 0) || prev.job_position_id === value
                    ? prev.numberActive
                    : prev.numberActive + 1,
        }));
        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleSetJobSort = (value) => {
        setZoomOut({
            state: false,
            id: 0,
        });
        setActiveFilter((prev) => ({
            ...prev,

            loading: true,
            sort_by: value,
        }));
        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleLoading = () => {
        setJobs({
            jobs: [],
            total: 0,
            loading: true,
        });

        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                ...activeFilter,
            },
        });
    };

    const handleSearch = () => {
        const params = {
            skip: activeFilter.page - 1,
            limit: 40,
            order_by: 'desc',
        };

        if (search.keyword) {
            params.keyword = search.keyword;
        }

        if (search.province_id && search.province_id !== 0 && search.province_id !== -1) {
            params.province_id = search.province_id;
        }

        if (search.job_experience_id && search.job_experience_id !== 0 && search.job_experience_id !== -1) {
            params.job_experience_id = search.job_experience_id;
        }

        if (search.min_salary && search.min_salary !== 0) {
            params.min_salary = search.min_salary;
        }

        if (search.max_salary && search.max_salary !== 0) {
            params.max_salary = search.max_salary;
        }

        if (search.salary_type) {
            params.salary_type = search.salary_type;
        }

        if (activeFilter.category_id && activeFilter.category_id !== 0) {
            params.category_id = activeFilter.category_id;
        }

        if (activeFilter.fields[0] && activeFilter.fields[0] !== 0) {
            params.field_id = activeFilter.fields[0];
        }

        if (activeFilter.employment_type && activeFilter.employment_type !== 0) {
            params.employment_type = EmploymentType[activeFilter.employment_type - 1].value;
        }

        if (activeFilter.job_position_id && activeFilter.job_position_id !== 0) {
            params.job_position_id = activeFilter.job_position_id;
        }

        if (activeFilter.sort_by) {
            params.sort_by = activeFilter.sort_by;
        }

        searchJobService(params)
            .then((res) => {
                if (res.status === 200) {
                    setJobs({
                        jobs: res.data.data.jobs,
                        total: res.data.data.count,
                        loading: false,
                    });
                    activeFilter.loading === true && setActiveFilter({ ...activeFilter, loading: false, page: 1 });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEmptyFilter = () => {
        setActiveFilter({
            show: false,
            category_id: 0,
            fields: [0],
            employment_type: 0,
            job_position_id: 0,
            numberActive: 0,
            sort_by: 'id',
            loading: false,
            page: 1,
        });

        navigate(path.JOB_FILTER, {
            state: {
                ...search,
                category_id: 0,
                fields: [0],
                employment_type: 0,
                job_position_id: 0,
            },
        });
    };

    const handleShowDetail = (id) => {
        if (zoomOut.state) {
            setZoomOut({
                ...zoomOut,
                id: id,
            });
        }

        if (!zoomOut.state) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setZoomOut({
                state: true,
                id: id,
            });
        }
    };

    const handleCloseDetail = () => {
        setZoomOut({
            state: false,
            id: 0,
        });
    };

    useDocumentTitle('TVNow - Tìm kiếm');

    useEffect(() => {
        handleSearch();
    }, [location.state, activeFilter.page]);

    return (
        <div className={cx('wrapper', { 'zoom-out': zoomOut.state })} ref={ref}>
            <div className={cx('box-search')}>
                <div className={cx('box-container', 'search')}>
                    <SearchJobSearchHeaderComponent
                        paddingContainer="4px 8px 4px 12px"
                        searchHeight="32px"
                        handleSelectCity={handleSetProvince}
                        handleSelectKeyword={handleSetKeyword}
                        selectCity={search.province_id}
                        selectKeyword={search.keyword}
                    />
                    <div className={cx('group-box')}>
                        <SearchExpComponent
                            padding="12px 19px 12px 2px"
                            handleSelectExperience={handleSetExperience}
                            experienceValue={search.job_experience_id}
                        />
                        <SearchSalaryComponent
                            padding="12px 19px 12px 2px"
                            handleSetMaxSalary={handleSetMaxSalary}
                            handleSetMinSalary={handleSetMinSalary}
                            handleSetSalaryType={handleSetSalaryType}
                            handleSetSalary={handleSetSalary}
                            maxSalaryValue={search.max_salary}
                            minSalaryValue={search.min_salary}
                            salaryTypeValue={search.salary_type}
                        />
                    </div>
                    <div className={cx('box-filter')}>
                        <button className={cx('btn-filter')} onClick={handleLoading}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
                <div className={cx('box-container', 'filter')}>
                    <div className={cx('group-filter-action')}>
                        {!jobs.loading && (
                            <div className={cx('result')}>
                                <div className={cx('result-item')}>
                                    <span className={cx('label')}>Tổng </span>
                                    <span className={cx('quantity')}>{jobs.total?.toLocaleString()}</span>
                                    <span className={cx('label')}> kết quả</span>
                                </div>
                            </div>
                        )}
                        <div className={cx('box-filter')}>
                            <button className={cx('btn-filter-action', { active: activeFilter.show })} onClick={() => handleSetFilter(!activeFilter.show)}>
                                <LuListFilter className={cx('icon')} />
                                <span className={cx('text')}>Lọc nâng cao {activeFilter.numberActive > 0 && `(${activeFilter.numberActive})`}</span>
                                <FaChevronDown className={cx('icon', 'icon-down')} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('container-filter')}>
                        <div className={cx('group-filter', { active: activeFilter.show })}>
                            <div className={cx('list-filter')}>
                                <div className={cx('empty-filter')}>
                                    <button className={cx('btn-clear')} onClick={handleEmptyFilter}>
                                        Xóa lọc nâng cao
                                    </button>
                                </div>
                                <div className={cx('filter-item')}>
                                    <SearchCategoryComponent
                                        handleSetFilter={handleSetCategory}
                                        filter={activeFilter.category_id}
                                        active={activeFilter.category_id !== 0}
                                    />
                                </div>
                                <div className={cx('filter-item')}>
                                    <SearchFieldComponent
                                        handleSetFilter={handleSetFields}
                                        filter={activeFilter.fields[0]}
                                        active={activeFilter.fields[0] !== 0}
                                    />
                                </div>
                                <div className={cx('filter-item')}>
                                    <SearchEmploymentTypeComponent
                                        handleSetFilter={handleSetEmploymentType}
                                        filter={activeFilter.employment_type}
                                        active={activeFilter.employment_type !== 0}
                                    />
                                </div>
                                <div className={cx('filter-item')}>
                                    <SearchLevelTypeComponent
                                        handleSetFilter={handleSetJobPosition}
                                        filter={activeFilter.job_position_id}
                                        active={activeFilter.job_position_id !== 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container')}>
                <h1 className={cx('title')}>
                    Tuyển dụng {!jobs.loading && !activeFilter.loading && jobs.total?.toLocaleString()} công việc {keyword}{' '}
                    {activeFilter.category_id !== 0 && `danh mục ${categories?.find((cate) => cate.id === activeFilter.category_id)?.name}`}{' '}
                    {activeFilter.fields[0] !== 0 && `ngành nghề ${fieds?.find((field) => field.id === activeFilter.fields[0])?.name}`}{' '}
                </h1>
            </div>
            <div className={cx('container')}>
                <div className={cx('list-sort')}>
                    <span className={cx('sort-title')}>Ưu tiên hiển thị theo:</span>

                    {listSort.map((sort) => (
                        <div className={cx('sort-item')} key={sort.id}>
                            <input
                                className={cx('input-sort')}
                                type="radio"
                                name={sort.value}
                                id={sort.value}
                                value={sort.value}
                                onChange={() => handleSetJobSort(sort.value)}
                                checked={activeFilter.sort_by === sort.value}
                            />
                            <label htmlFor={sort.value} className={cx('label-sort', { active: activeFilter.sort_by === sort.value })}>
                                {sort.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('container', 'content')}>
                <div className={cx('list-job')}>
                    {!jobs.loading && !activeFilter.loading ? (
                        jobs.jobs.length > 0 ? (
                            jobs.jobs.map((job) => (
                                <div
                                    className={cx('job')}
                                    key={job.id}
                                    onClick={() => {
                                        handleShowDetail(job.id);
                                    }}
                                >
                                    <JobSuggest job={job} numberStyle={2} zoomOut={zoomOut.state} zoomOutId={zoomOut.id} />
                                </div>
                            ))
                        ) : (
                            <div className={cx('no-job')}>
                                <p>Không tìm thấy công việc phù hợp</p>
                            </div>
                        )
                    ) : (
                        Array.from({ length: 20 }, (_, index) => (
                            <div className={cx('job', 'skeleton')} key={index}>
                                <SkeletonCompanyComponent />
                            </div>
                        ))
                    )}
                    {!jobs.loading && !activeFilter.loading && jobs.jobs.length > 0 && (
                        <div className={cx('footer')}>
                            <div className={cx('content-footer')}>
                                <span
                                    className={cx('btn', activeFilter.page === 1 ? 'deactive' : '')}
                                    onClick={handlePrevPage}
                                    disabled={activeFilter.page === 1}
                                >
                                    <VscChevronLeft className={cx('icon')} />
                                </span>
                                <p className={cx('text-page')}>
                                    <span className={cx('number')}>{activeFilter.page}</span> / {Math.ceil(jobs.total / 40)} trang
                                </p>
                                <span
                                    className={cx('btn', activeFilter.page === Math.ceil(jobs.total / 40) ? 'deactive' : '')}
                                    onClick={handleNextPage}
                                    disabled={activeFilter.page === Math.ceil(jobs.total / 40)}
                                >
                                    <VscChevronRight className={cx('icon')} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('right-page')} style={{}}>
                    <div className={cx('box-company')}>
                        <div className={cx('company')}>
                            <h3 className={cx('title')}>Có thể bạn quan tâm</h3>
                            <div className={cx('info')}>
                                <GeneralCompanyFilter id={random} />
                            </div>
                        </div>
                        <div className={cx('detail-job')}>
                            {zoomOut.state && <JobDetailBody job={jobs.jobs.find((job) => job.id === zoomOut.id)} handleCloseDetail={handleCloseDetail} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobFilterPage;
