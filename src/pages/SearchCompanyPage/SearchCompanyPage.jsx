import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import styles from './SearchCompanyPage.module.scss';
import { images } from '@assets';
import { searchCompanyService } from '@services/user/companyService';
import { SkeletonCompanyComponent } from '@components/skeleton';
import { SearchCompanyComponent } from '@layouts/components/User/SearchCompanyPage';

const cx = classNames.bind(styles);

const SearchCompanyPage = () => {
    const numberCompanyPerPage = 50;
    const location = useLocation();
    const [keyword, setKeyword] = useState(location.state?.search || '');
    const [companies, setCompanies] = useState({
        listComapny: [],
        loading: true,
        total: 0,
        fetchPage: 1,
    });

    const handleLoading = () => {
        setCompanies((prev) => ({
            ...prev,
            loading: true,
        }));
    };

    const handlePrevPage = () => {
        setCompanies((prev) => ({ ...prev, fetchPage: prev.fetchPage - 1, loading: true }));
    };

    const handleNextPage = () => {
        setCompanies((prev) => ({ ...prev, fetchPage: prev.fetchPage + 1, loading: true }));
    };

    const handleSearch = () => {
        if (keyword.trim() === '') {
            setCompanies((prev) => ({
                ...prev,
                total: null,
                listComapny: [],
                loading: false,
            }));
            return;
        }
        const params = {
            limit: numberCompanyPerPage,
            skip: (companies.fetchPage - 1) * numberCompanyPerPage,
            order_by: 'desc',
            sort_by: 'created_at',
            keyword: keyword.trim(),
        };

        searchCompanyService(params)
            .then((res) => {
                if (res.status === 200) {
                    setTimeout(() => {
                        setCompanies((prev) => ({
                            ...prev,
                            listComapny: res.data.data.companies,
                            total: res.data.data.total,
                            loading: false,
                        }));
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (!companies.loading) return;
        handleSearch();
    }, [companies.loading]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-search-company')}>
                    <div className={cx('box-search-container')}>
                        <div className={cx('box-search')}>
                            <div className={cx('box-search-title')}>
                                <h1 className={cx('box-search-title-text')}>
                                    Tìm kiếm thông tin công ty kết nối bạn với những
                                    <span className={cx('box-search-title-text-highlight')}> cơ hội việc làm </span>
                                    phù hợp nhất
                                </h1>
                            </div>

                            <div className={cx('box-search-feature')}>
                                <div className={cx('box-search-feature-icon')}>
                                    <FaSearch className={cx('icon-search')} />
                                </div>

                                <input
                                    type="text"
                                    className={cx('box-search-feature-input')}
                                    placeholder="Nhập tên công ty mà bạn muốn tìm kiếm ..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleLoading()}
                                />

                                <button
                                    className={cx('box-search-feature-button')}
                                    //  disabled={companies.loading}
                                    onClick={handleLoading}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <div className={cx('image-search')}>
                            <img src={images.image_search_company} alt="company" className={cx('image-search-company')} />
                        </div>
                    </div>
                </div>

                {!companies.loading ? (
                    <div className={cx('featured-company')}>
                        <div className={cx('featured-company-container')}>
                            <div className={cx('featured-company-content')}>
                                {companies.total ? (
                                    <p className={cx('featured-company-title')}>
                                        Tìm thấy
                                        <span className={cx('featured-company-title-highlight')}> {companies.total} </span>
                                        công ty phù hợp với yêu cầu của bạn.
                                    </p>
                                ) : (
                                    <p className={cx('featured-company-title')}>Không tìm thấy công ty nào phù hợp với yêu cầu của bạn.</p>
                                )}

                                <div className={cx('featured-company-list')}>
                                    {companies.listComapny.length > 0 &&
                                        companies.listComapny.map((company) => (
                                            <div className={cx('company')} key={company.id}>
                                                <SearchCompanyComponent company={company} />
                                            </div>
                                        ))}
                                </div>

                                {!companies.loading && companies.total > 0 && (
                                    <div className={cx('footer')}>
                                        <div className={cx('content-footer')}>
                                            <span
                                                className={cx('btn', companies.fetchPage === 1 ? 'deactive' : '')}
                                                onClick={handlePrevPage}
                                                disabled={companies.fetchPage === 1}
                                            >
                                                <VscChevronLeft className={cx('icon')} />
                                            </span>
                                            <p className={cx('text-page')}>
                                                <span className={cx('number')}>{companies.fetchPage}</span> /{' '}
                                                {Math.ceil(companies.total / numberCompanyPerPage)} trang
                                            </p>
                                            <span
                                                className={cx(
                                                    'btn',
                                                    companies.fetchPage === Math.ceil(companies.total / numberCompanyPerPage) ? 'deactive' : '',
                                                )}
                                                onClick={handleNextPage}
                                                disabled={companies.fetchPage === Math.ceil(companies.total / numberCompanyPerPage)}
                                            >
                                                <VscChevronRight className={cx('icon')} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={cx('featured-company')}>
                        <div className={cx('featured-company-container')}>
                            <div className={cx('featured-company-content')}>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div className={cx('company')} key={index}>
                                        <SkeletonCompanyComponent />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchCompanyPage;
