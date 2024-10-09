import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { FaCaretDown } from 'react-icons/fa';
import { HiCheck } from 'react-icons/hi';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import styles from './AppliedJobPage.module.scss';
import { SelectionComponent } from '@components/common';
import { cVAppliedStatus } from '@constants';
import { AppliedJobComponent } from '@layouts/components/User/AppliedJobPage';
import { SkeletonCompanyComponent } from '@components/skeleton';
import route from '@constants/route';
import { images } from '@assets';
import { getListCVApplicationsService } from '../../services/user/cvApplicationsService';

const cx = classNames.bind(styles);

const AppliedJobPage = () => {
    const [job, setJob] = useState({
        count: 0,
        fetchPage: 1,
        loading: false,
        filter_by: 'all',
        jobs: [],
        refresh: true,
    });

    const handleSetFilter = (value) => {
        setJob({ count: 0, fetchPage: 1, loading: true, filter_by: value, jobs: [], refresh: true });
    };

    const handlePrevPage = () => {
        setJob((prev) => ({ ...prev, fetchPage: prev.fetchPage - 1 }));
    };

    const handleNextPage = () => {
        setJob((prev) => ({ ...prev, fetchPage: prev.fetchPage + 1 }));
    };

    const handleGetJob = () => {
        setJob((prev) => ({ ...prev, loading: true }));
        const params = {
            limit: 6,
            skip: (job.fetchPage - 1) * 6,
            sort_by: 'created_at',
        };
        if (job.filter_by !== 'all') {
            params.status = job.filter_by;
        }

        getListCVApplicationsService(params)
            .then((res) => {
                if (res.status === 200) {
                    setJob((prev) => ({
                        ...prev,
                        jobs: res.data.data.jobs,
                        count: res.data.data.count,
                        loading: false,
                        refresh: false,
                    }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetJob();
    }, [job.filter_by]);

    useEffect(() => {
        if (job.refresh) return;
        handleGetJob();
    }, [job.fetchPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('box-group')}>
                        <div className={cx('box-group-header')}>
                            <div className={cx('box-group-header-title')}> Công việc đã ứng tuyển</div>
                            <div className={cx('box-group-header-action')}>
                                <div className={cx('input-box-item')}>
                                    <SelectionComponent
                                        header={() => (
                                            <div className={cx('header-select')}>
                                                <div className={cx('container-select')}>
                                                    <span className={cx('result')}>
                                                        {cVAppliedStatus.find((item) => item.value === job.filter_by)?.name || 'Tất cả'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {cVAppliedStatus.map((item) => (
                                                    <li
                                                        key={item.value}
                                                        className={cx('item', { active: item.value === job.filter_by })}
                                                        onClick={() => handleSetFilter(item.value)}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>
                                                        {item.value === job.filter_by && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <FaCaretDown className={cx('icon-care')} />}
                                        itemSelect={cVAppliedStatus.find((item) => item.id === job.filter_by)?.name}
                                        maxHeight={'230px'}
                                        styleDropdown={{ right: '0', left: 'auto', top: '50px' }}
                                        styleButton={{ marginRight: '10px', borderRadius: '6px' }}
                                        styleOnActive={{ borderRadius: '6px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        {!job.loading && job.jobs.length !== 0 ? (
                            <div className={cx('box-group-body')}>
                                {Object.values(job.jobs).map((item, index) => (
                                    <div className={cx('box')} key={index}>
                                        <AppliedJobComponent cv={item} />
                                    </div>
                                ))}
                            </div>
                        ) : job.loading ? (
                            <div className={cx('box-group-body')}>
                                {Array.from({ length: 3 }, (_, index) => (
                                    <div className={cx('job', 'skeleton')} key={index}>
                                        <SkeletonCompanyComponent />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('box-group-body')}>
                                <div className={cx('job', 'empty')}>
                                    <div className={cx('img-empty-container')}>
                                        <img src={images.empty_02} alt="empty" className={cx('img-empty')} />
                                    </div>
                                    <div className={cx('text-empty')}>
                                        <p className={cx('text-highlight')}>Bạn chưa ứng tuyển công việc nào!</p>
                                        <p className={cx('text')}>Hãy tìm kiếm công việc phù hợp và ứng tuyển ngay!</p>
                                    </div>
                                    <div className={cx('btn-action')}>
                                        <Link to={route.JOB_SEARCH} className={cx('btn')}>
                                            Tìm việc ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!job.loading && job.jobs.length > 0 && (
                            <div className={cx('footer')}>
                                <div className={cx('content-footer')}>
                                    <span className={cx('btn', job.fetchPage === 1 ? 'deactive' : '')} onClick={handlePrevPage} disabled={job.fetchPage === 1}>
                                        <VscChevronLeft className={cx('icon')} />
                                    </span>
                                    <p className={cx('text-page')}>
                                        <span className={cx('number')}>{job.fetchPage}</span> / {Math.ceil(job.count / 6)} trang
                                    </p>
                                    <span
                                        className={cx('btn', job.fetchPage === Math.ceil(job.count / 6) ? 'deactive' : '')}
                                        onClick={handleNextPage}
                                        disabled={job.fetchPage === Math.ceil(job.count / 6)}
                                    >
                                        <VscChevronRight className={cx('icon')} />
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <div className={cx('box-group')}></div> */}
                </div>
                <div className={cx('sidebar')}></div>
            </div>
        </div>
    );
};

export default AppliedJobPage;
