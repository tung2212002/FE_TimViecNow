import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';

import styles from './ListCompanyPage.module.scss';
import route from '@constants/route';
import { images } from '@assets';
import { CompanyComponent } from '@layouts/components/User/ListCompanyPage';
import { getListCompanySerivce } from '@services/companyService';
import { SkeletonCompanySquareComponent } from '@components/skeleton';

const cx = classNames.bind(styles);

const ListCompanyPage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState('list');
    const [keyword, setKeyword] = useState('');
    const [companies, setCompanies] = useState({
        listComapny: [],
        loading: true,
    });

    const handleSearch = () => {
        keyword.trim().length > 0 && navigate(`${route.COMPANY_SEARCH}?search=${keyword}`, { state: { search: keyword } });
    };

    useEffect(() => {
        const params = {
            limit: 50,
            skip: 0,
            order_by: 'desc',
            sort_by: 'created_at',
        };

        getListCompanySerivce(params)
            .then((res) => {
                if (res.status === 200) {
                    setCompanies((prev) => ({
                        ...prev,
                        listComapny: res.data.data,
                        loading: false,
                    }));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-search-company')}>
                    <div className={cx('box-search-container')}>
                        <div className={cx('box-search')}>
                            <ul className={cx('box-search-nav')}>
                                <li className={cx('box-search-nav-item')} onClick={() => setState('list')}>
                                    <Link to={route.COMPANY} className={cx('box-search-nav-link', { active: state === 'list' })}>
                                        Danh sách công ty
                                    </Link>
                                </li>
                                <li className={cx('box-search-nav-item')} onClick={() => setState('top')}>
                                    <Link to={route.COMPANY} className={cx('box-search-nav-link', { active: state === 'top' })}>
                                        Top công ty
                                    </Link>
                                </li>
                            </ul>

                            <div className={cx('box-search-title')}>
                                <h1 className={cx('box-search-title-text')}>Khám phá tất cả các công ty</h1>

                                <p className={cx('box-search-title-description')}>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</p>
                            </div>

                            <div className={cx('box-search-feature')}>
                                <div className={cx('box-search-feature-icon')}>
                                    <IoIosSearch className={cx('icon-search')} />
                                </div>

                                <input
                                    type="text"
                                    className={cx('box-search-feature-input')}
                                    placeholder="Nhập tên công ty"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button className={cx('box-search-feature-button')} onClick={handleSearch}>
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                        <div className={cx('image-search')}>
                            <img src={images.company_billboard} alt="company" className={cx('image-search-company')} />
                        </div>
                    </div>
                </div>
                <div className={cx('featured-company')}>
                    <div className={cx('featured-company-container')}>
                        <h1 className={cx('featured-company-title')}>DANH SÁCH CÁC CÔNG TY</h1>
                        <div className={cx('featured-company-list')}>
                            {!companies.loading
                                ? companies.listComapny.map((company) => (
                                      <div className={cx('company')} key={company.id}>
                                          <CompanyComponent company={company} />
                                      </div>
                                  ))
                                : Array.from({ length: 10 }).map((_, index) => (
                                      <div className={cx('company')} key={index}>
                                          <SkeletonCompanySquareComponent />
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCompanyPage;
