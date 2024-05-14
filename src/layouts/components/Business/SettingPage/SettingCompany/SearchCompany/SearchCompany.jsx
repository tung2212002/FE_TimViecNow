import classNames from 'classnames/bind';

import { IoSearch } from 'react-icons/io5';

import styles from './SearchCompany.module.scss';
import SearchCompanyComponent from '../SearchCompanyComponent/SearchCompanyComponent';
import { useEffect, useState } from 'react';
import { Spinner } from '../../../../../../components/common';
import { getListCompanySerivce } from '../../../../../../services/businessCompanyService';
import { SkeletonCompanyComponent } from '../../../../../../components/skeleton';

const cx = classNames.bind(styles);

const SearchCompany = () => {
    const [company, setCompany] = useState({
        company: [],
        loading: true,
        skip: 0,
        limit: 6,
        keyword: '',
        canLoading: true,
    });

    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCompany((prev) => ({ ...prev, keyword: e.target.value }));
    };

    const loadMore = () => {
        setCompany((prev) => ({
            ...prev,
            skip: prev.skip + prev.limit,
            limit: prev.limit,
            loading: true,
        }));
    };

    const searchCompany = () => {
        setCompany((prev) => ({
            ...prev,
            company: [],
            skip: 0,
            limit: 6,
            loading: true,
        }));
    };

    const handleGetCompany = (params) => {
        getListCompanySerivce(params)
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        setCompany((prev) => ({
                            ...prev,
                            company: [...prev.company, ...res.data.data],
                            loading: false,
                            canLoading: res.data.data.length === prev.limit,
                            // skip: res.data.skip,
                            // limit: res.data.limit,
                        }));
                    }, 1000);
                    // setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (!company.loading) return;
        const params = {
            skip: company.skip,
            limit: company.limit,
            sort_by: 'created_at',
            sort_type: 'desc',
        };
        company.keyword !== '' && (params.keyword = company.keyword);
        handleGetCompany(params);
    }, [company.loading]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-container')}>
                <div className={cx('input-box')}>
                    <span className={cx('icon')}>
                        <IoSearch className={cx('icon-search')} />
                    </span>
                    <input type="text" className={cx('input')} placeholder="Tên công ty" value={company.keyword} onChange={handleChange} />
                </div>
                <span className={cx('btn-search')} onClick={searchCompany}>
                    <button className={cx('btn')}>Tìm kiếm</button>
                </span>
            </div>
            <p className={cx('description')}>{isSearch ? 'Công ty mới tạo' : 'Kết quả tìm kiếm'}</p>
            <div className={cx('company-list')}>
                {company.company.map((item) => (
                    <div className={cx('company')} key={item.id}>
                        <SearchCompanyComponent company={item} />
                    </div>
                ))}
                {company.loading &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <div className={cx('company')} key={index}>
                            <SkeletonCompanyComponent scale={0.8} />
                        </div>
                    ))}
            </div>
            <div className={cx('read-more')} onClick={loadMore}>
                <button className={cx('btn')} disabled={company.loading || !company.canLoading}>
                    {company.loading ? <Spinner /> : company.canLoading ? 'Xem thêm' : 'Không còn công ty'}
                </button>
            </div>
        </div>
    );
};

export default SearchCompany;
