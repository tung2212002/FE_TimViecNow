import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import { HiLightBulb, HiCheck } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';
import { IoFilter } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi2';

import styles from './FeatureJob.module.scss';
import { JobItemComponent } from '../../../../components';
import { SelectionComponent } from '../../../../components/common';
import { searchJobService } from '../../../../services/jobService';
import { selectCategory, selectProvince } from '../../../../redux/features/config/configSilde';
import { Experience, filterSalary } from '../../../../constants';
import { SkeletonJobSectionComponent } from '../../../../components/skeleton';

const cx = classNames.bind(styles);

const FeatureJob = ({ reponsive = false, number = 12 }) => {
    const province = useSelector(selectProvince);
    const category = useSelector(selectCategory);
    const [categories, setCategories] = useState(null);

    const listFilter = [
        {
            id: 1,
            name: 'Địa điểm',
        },
        {
            id: 2,
            name: 'Mức lương',
        },
        {
            id: 3,
            name: 'Kinh nghiệm',
        },
        {
            id: 4,
            name: 'Nghành nghề',
        },
    ];

    const listLocation = [
        {
            id: 1,
            name: 'Ngẫu nhiên',
        },
        {
            id: 2,
            name: 'Hà Nội',
        },
        {
            id: 3,
            name: 'Hồ Chí Minh',
        },
        {
            id: 4,
            name: 'Miền Bắc',
        },
        {
            id: 5,
            name: 'Miền Nam',
        },
    ];

    const ref = useRef(null);
    const refLocation = useRef(null);
    const refTrack = useRef(null);

    const [currentSearch, setCurrentSearch] = useState({
        search: '',
        location: listLocation[0].id,
        filter: listFilter[0].id,
        reset: false,
    });

    const [isListVisible, setIsListVisible] = useState(false);

    const [showGuide, setShowGuide] = useState(true);

    const [listJobInfo, setListJobInfo] = useState({
        job: [],
        totalJob: null,
        totalPage: null,
        currentPage: 1,
        currentList: [],
        currentSlice: 0,
        fetchPage: 0,
    });

    const listToMap = {
        1: listLocation,
        2: filterSalary,
        3: Experience,
        4: categories,
    };

    const handleNextPage = () => {
        if (listJobInfo.currentPage < listJobInfo.totalPage) {
            setIsListVisible(false);
            setListJobInfo({
                ...listJobInfo,
                currentPage: listJobInfo.currentPage + 1,
            });
        }
    };

    const handlePrevPage = () => {
        if (listJobInfo.currentPage > 1) {
            setIsListVisible(false);
            setListJobInfo({
                ...listJobInfo,
                currentPage: listJobInfo.currentPage - 1,
            });
        }
    };

    const handleSetFilter = (id) => {
        setIsListVisible(false);
        setCurrentSearch({
            ...currentSearch,
            filter: id,
            reset: true,
            location: listToMap[id][0].id,
        });
    };

    const handleSetLocation = (id) => {
        setIsListVisible(false);
        if (currentSearch.location === id) return;
        setCurrentSearch({
            ...currentSearch,
            location: id,
            reset: true,
        });
    };

    const handleScrollLeftLocation = () => {
        refLocation.current.scrollLeft -= 100;
    };

    const handleScrollRightLocation = () => {
        refLocation.current.scrollLeft += 100;
    };

    useEffect(() => {
        if (reponsive) {
            const handleResize = () => {
                const featureJob = ref.current.querySelector(`.${cx('feature-job')}`);
                if (!featureJob) return;
                if (ref.current.offsetWidth >= 1170) {
                    featureJob.classList.add(`${cx('large')}`);
                    featureJob.classList.remove(`${cx('medium')}`);
                    featureJob.classList.remove(`${cx('small')}`);
                    featureJob.classList.remove(`${cx('extra-small')}`);
                } else if (ref.current.offsetWidth < 1170 && ref.current.offsetWidth >= 970) {
                    featureJob.classList.add(`${cx('medium')}`);
                    featureJob.classList.remove(`${cx('large')}`);
                    featureJob.classList.remove(`${cx('small')}`);
                    featureJob.classList.remove(`${cx('extra-small')}`);
                } else if (ref.current.offsetWidth < 970 && ref.current.offsetWidth >= 750) {
                    featureJob.classList.add(`${cx('small')}`);
                    featureJob.classList.remove(`${cx('medium')}`);
                    featureJob.classList.remove(`${cx('large')}`);
                    featureJob.classList.remove(`${cx('extra-small')}`);
                } else if (ref.current.offsetWidth < 750) {
                    featureJob.classList.remove(`${cx('small')}`);
                    featureJob.classList.remove(`${cx('medium')}`);
                    featureJob.classList.remove(`${cx('large')}`);
                    featureJob.classList.add(`${cx('extra-small')}`);
                }
            };

            window.addEventListener('resize', handleResize);
            handleResize();
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        category && setCategories([{ id: 0, name: 'Tất cả' }, ...category.slice(0, 6)]);
    }, [category]);

    useEffect(() => {
        if (listJobInfo.currentPage <= listJobInfo.fetchPage && !currentSearch.reset) {
            setListJobInfo((prev) => ({
                ...prev,
                currentList: prev.job.slice((listJobInfo.currentPage - 1) * number, listJobInfo.currentPage * number),
                currentSlice: (listJobInfo.currentPage - 1) * number,
            }));
            setTimeout(() => {
                setIsListVisible(true);
            }, 500);
        } else {
            const params = {
                skip: (listJobInfo.currentPage - 1) * number,
                limit: number,
            };
            if (currentSearch.filter === 1) {
                const filter = province?.find((item) => item.name === listLocation[currentSearch.location - 1].name);
                filter && (params.province_id = filter.id);
            } else if (currentSearch.filter === 2) {
                const { start, end, name } = filterSalary[currentSearch.location - 1];
                if (name === 'Thỏa thuận') {
                    params.salary_type = 'deal';
                } else {
                    start !== '' && (params.min_salary = start * 1000000);
                    end !== '' && (params.max_salary = end * 1000000);
                }
            } else if (currentSearch.filter === 3) {
                currentSearch.location !== 0 && (params.job_experience_id = currentSearch.location);
            } else if (currentSearch.filter === 4) {
                currentSearch.location !== 0 && (params.category_id = currentSearch.location);
            }

            searchJobService(params)
                .then((res) => {
                    if (res.status === 200) {
                        setListJobInfo((prev) => ({
                            ...prev,
                            job: currentSearch.reset ? [...res.data.data.jobs] : [...prev.job, ...res.data.data.jobs],
                            totalJob: res.data.data.count,
                            totalPage: Math.ceil(res.data.data.count / number),
                            currentList: res.data.data.jobs,
                            currentSlice: 0,
                            fetchPage: currentSearch.reset ? 1 : prev.fetchPage + 1,
                            currentPage: currentSearch.reset ? 1 : prev.currentPage,
                        }));
                        setCurrentSearch({
                            ...currentSearch,
                            reset: false,
                        });
                        setTimeout(() => {
                            setIsListVisible(true);
                        }, 500);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [currentSearch, listJobInfo.currentPage, number]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')} ref={ref}>
                <div className={cx('feature-job')}>
                    <div className={cx('feature-job__header')}>
                        <div className={cx('box-header')}>
                            <h2 className={cx('title')}>Việc làm tốt nhất</h2>
                        </div>
                        <div className={cx('box-tool')}>
                            <span className={cx('see-more')}>
                                <a href="/job" className={cx('text')}>
                                    Xem tất cả
                                </a>
                            </span>
                            <span
                                className={cx('btn', listJobInfo.currentPage === 1 ? 'deactive' : '')}
                                onClick={handlePrevPage}
                                disabled={listJobInfo.currentPage === 1}
                            >
                                <VscChevronLeft className={cx('icon')} />
                            </span>

                            <span
                                className={cx('btn', listJobInfo.currentPage === listJobInfo.totalPage ? 'deactive' : '')}
                                onClick={handleNextPage}
                                disabled={listJobInfo.currentPage === listJobInfo.totalPage}
                            >
                                <VscChevronRight className={cx('icon')} />
                            </span>
                        </div>
                    </div>

                    <div className={cx('feature-job__filter')}>
                        <div className={cx('filter')}>
                            <SelectionComponent
                                header={() => (
                                    <div className={cx('header-select')}>
                                        <div className={cx('container-select')}>
                                            <span className={cx('group')}>
                                                <IoFilter className={cx('icon-filter')} />
                                                Lọc theo:
                                            </span>
                                            <span className={cx('result')}> {listFilter.find((item) => item.id === currentSearch.filter).name}</span>
                                        </div>
                                    </div>
                                )}
                                body={() => (
                                    <ul className={cx('ul-select')}>
                                        {listFilter.map((item) => (
                                            <li
                                                key={item.id}
                                                className={cx('item', { active: item.id === currentSearch.filter })}
                                                onClick={() => handleSetFilter(item.id)}
                                            >
                                                <span className={cx('text')}>{item.name}</span>

                                                {item.id === currentSearch.filter && <HiCheck className={cx('icon')} />}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                icon={() => <HiOutlineChevronDown className={cx('icon-chevron')} />}
                                itemSelect={currentSearch.filter}
                                maxHeight={'200px'}
                                styleDropdown={{ right: '0', left: 'auto', width: '160px' }}
                            />
                        </div>
                        <div className={cx('box-smart-location')}>
                            <div className={cx('smart-location')}>
                                <span className={cx('btn', 'btn-icon')} onClick={handleScrollLeftLocation}>
                                    <VscChevronLeft className={cx('icon')} />
                                </span>
                                <div className={cx('container-location')} ref={refLocation}>
                                    {listToMap[currentSearch.filter]?.map((item, index) => (
                                        <div
                                            className={cx('btn', 'btn-location', { active: item.id === currentSearch.location })}
                                            onClick={() => handleSetLocation(item.id)}
                                            key={index}
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                                <span className={cx('btn', 'btn-icon')} onClick={handleScrollRightLocation}>
                                    <VscChevronRight className={cx('icon')} />
                                </span>
                            </div>
                        </div>
                    </div>

                    {showGuide && (
                        <div className={cx('text-guide')}>
                            <p>
                                <HiLightBulb className={cx('icon')} />
                                <b className={cx('text')}>Gợi ý:</b> Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
                                <IoIosClose className={cx('close-icon')} onClick={() => setShowGuide(false)} />
                            </p>
                        </div>
                    )}

                    <div className={cx('feature-job__list')}>
                        <div className={cx('slick-slider')}>
                            <div className={cx('slick-list')}>
                                <div className={cx('slick-track')}>
                                    {/* <div className={cx('slick-track', { visible: isListVisible })} ref={refTrack}> */}
                                    <div className={cx('slick-slide')}>
                                        <div className={cx('feature-job__items')}>
                                            {isListVisible
                                                ? listJobInfo.currentList.map((job, index) => (
                                                      <div className={cx('feature-job__item')} key={index}>
                                                          <JobItemComponent job={job} reponsive={reponsive} />
                                                      </div>
                                                  ))
                                                : Array.from({ length: number }).map((_, index) => (
                                                      <div className={cx('feature-job__item')} key={index}>
                                                          <SkeletonJobSectionComponent />
                                                      </div>
                                                  ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('feature-job__footer')}>
                        <div className={cx('content-footer')}>
                            <span
                                className={cx('btn', listJobInfo.currentPage === 1 ? 'deactive' : '')}
                                onClick={handlePrevPage}
                                disabled={listJobInfo.currentPage === 1}
                            >
                                <VscChevronLeft className={cx('icon')} />
                            </span>
                            <p className={cx('text-page')}>
                                <span className={cx('number')}>{listJobInfo.currentPage}</span> / {listJobInfo.totalPage} trang
                            </p>
                            <span
                                className={cx('btn', listJobInfo.currentPage === listJobInfo.totalPage ? 'deactive' : '')}
                                onClick={handleNextPage}
                                disabled={listJobInfo.currentPage === listJobInfo.totalPage}
                            >
                                <VscChevronRight className={cx('icon')} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FeatureJob.propTypes = {
    reponsive: PropTypes.bool,
    number: PropTypes.number,
};

export default FeatureJob;
