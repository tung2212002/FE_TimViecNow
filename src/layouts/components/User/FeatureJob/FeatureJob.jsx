import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import { HiLightBulb, HiCheck } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';
import { IoFilter } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi2';

import styles from './FeatureJob.module.scss';
import { fakeJob } from '../../../../assets/fakejob';
import { JobItemComponent } from '../../../../components';
import { SelectionComponent } from '../../../../components/common';

const cx = classNames.bind(styles);

const FeatureJob = ({ reponsive = false, number = 12 }) => {
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

    const [currentSearch, setCurrentSearch] = useState({
        search: '',
        location: listLocation[0].id,
        filter: listFilter[0].id,
    });

    const [isListVisible, setIsListVisible] = useState(false);

    const [showGuide, setShowGuide] = useState(true);

    const [listJobInfo, setListJobInfo] = useState({
        job: fakeJob,
        totalJob: fakeJob.length,
        totalPage: Math.ceil(fakeJob.length / number),
        currentPage: 1,
        currentList: fakeJob.slice(0, number),
        currentSlice: 0,
    });

    const handleNextPage = () => {
        if (listJobInfo.currentPage < listJobInfo.totalPage) {
            setIsListVisible(false);
            setListJobInfo({
                ...listJobInfo,
                currentPage: listJobInfo.currentPage + 1,
                currentList: fakeJob.slice(listJobInfo.currentPage * number, (listJobInfo.currentPage + 1) * number),
            });
        }
    };

    const handlePrevPage = () => {
        if (listJobInfo.currentPage > 1) {
            setIsListVisible(false);
            setListJobInfo({
                ...listJobInfo,
                currentPage: listJobInfo.currentPage - 1,
                currentList: fakeJob.slice((listJobInfo.currentPage - 2) * number, (listJobInfo.currentPage - 1) * number),
            });
        }
    };

    const handleSetFilter = (id) => {
        setCurrentSearch({
            ...currentSearch,
            filter: id,
        });
    };

    const handleSetLocation = (id) => {
        setCurrentSearch({
            ...currentSearch,
            location: id,
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
        const handleWait = setTimeout(() => {
            setIsListVisible(true);
        }, 200);
        return () => {
            clearTimeout(handleWait);
        };
    }, [listJobInfo.currentPage]);

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
                                    {listLocation.map((item, index) => (
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
                                <div className={cx('slick-track', { visible: isListVisible })}>
                                    <div className={cx('slick-slide')}>
                                        <div className={cx('feature-job__items')}>
                                            {listJobInfo.currentList.map((job, index) => (
                                                <div className={cx('feature-job__item')} key={index}>
                                                    <JobItemComponent job={job} reponsive={reponsive} />
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
