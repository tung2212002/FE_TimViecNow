import classNames from 'classnames/bind';

import { IoSearch } from 'react-icons/io5';

import styles from './SearchCompany.module.scss';
import SearchCompanyComponent from '../SearchCompanyComponent/SearchCompanyComponent';
import { useEffect, useState } from 'react';
import { Spinner } from '../../../../../../components/common';

const cx = classNames.bind(styles);

const SearchCompany = () => {
    const [company, setCompany] = useState([
        {
            id: 169127,
            name: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ GO',
            address: 'Số nhà 8, ngõ 272 đường Thanh Bình, tổ dân phố 11, Phường Mộ Lao, Quận Hà Đông',
            logo_url: 'https://static.topcv.vn/company_logos/a0e5d11b9f9e4143586fd814825965d1-66190c0b4209d.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-cong-nghe-go/169127.html',
            size: '25-99',
            fields: [
                {
                    name: 'IT - Phần mềm',
                },
            ],
            field_ids: [1],
            tax_code: '0107931925',
        },
        {
            id: 169121,
            name: 'CÔNG TY CỔ PHẦN HỢP LỰC TOÀN CẦU',
            address: 'SỐ 106 NHÀ X1, TỔ 12, THỊ TRẤN ĐÔNG ANH, HUYỆN ĐÔNG ANH, THÀNH PHỐ HÀ NỘI, VIỆT NAM',
            logo_url: 'https://static.topcv.vn/company_logos/1ffde0d7921d37904ea0df722349aa24-6618fd79e6f2a.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-hop-luc-toan-cau/169121.html',
            size: '25-99',
            fields: [
                {
                    name: 'Sản xuất',
                },
            ],
            field_ids: [12],
            tax_code: '0110103022',
        },
        {
            id: 169120,
            name: 'CÔNG TY TNHH NHÔM KÍNH KAIZEN',
            address: '239 Bis Lý Thường Kiệt, Phường 15, Quận 11, TP Hồ Chí Minh',
            logo_url: 'https://static.topcv.vn/company_logos/54854c1d1d33aaf1bfcac209fa125ba4-6618fd5c18103.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tnhh-nhom-kinh-kaizen/169120.html',
            size: '10-24',
            fields: [
                {
                    name: 'Sản xuất',
                },
            ],
            field_ids: [12],
            tax_code: '0318337943',
        },
        {
            id: 169118,
            name: 'CÔNG TY TNHH TIẾN ANH VIỆT NAM',
            address: 'Thôn Hà Tân, Xã Tản Lĩnh, Huyện Ba Vì, Thành phố Hà Nội, Việt Nam',
            logo_url: 'https://static.topcv.vn/company_logos/178e831bfeef7c29361469160e1c0000-6618fb7b70880.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tnhh-tien-anh-viet-nam/169118.html',
            size: '10-24',
            fields: [
                {
                    name: 'Xây dựng',
                },
            ],
            field_ids: [14],
            tax_code: '0110419033',
        },
        {
            id: 169114,
            name: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ THÔNG MINH T&T',
            address: '16/49 Nguyễn Thiện Thuật , Phường 02, Quận 3, Thành phố Hồ Chí Minh, Việt Nam',
            logo_url: 'https://static.topcv.vn/company_logos/d9f9741de5706cd9720c41b2b5ff9250-6618f906351b6.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-giai-phap-cong-nghe-thong-minh-tt/169114.html',
            size: '25-99',
            fields: [
                {
                    name: 'IT - Phần mềm',
                },
                {
                    name: 'IT - Phần cứng',
                },
            ],
            field_ids: [1, 37],
            tax_code: '0314841525',
        },
        {
            id: 169113,
            name: 'CÔNG TY CỔ PHẦN ERIC VIỆT NAM',
            address: 'Thôn văn, Thanh Liệt, Thanh Trì, Hà Nội',
            logo_url: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-eric-viet-nam-7e8c07e7a9dde9015b8b8fc1c14d554c-6618fdb9e554a.jpg',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-eric-viet-nam/169113.html',
            size: '10-24',
            fields: [
                {
                    name: 'Cơ khí',
                },
            ],
            field_ids: [23],
            tax_code: '0107747059',
        },
    ]);

    const [isSearch, setIsSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(true);
    };

    useEffect(() => {
        if (!loading) return;
        if (!isSearch) {
            setIsSearch(true);
        }
        setTimeout(() => {
            setCompany([...company, ...company]);
            setLoading(false);
        }, 2000);
    }, [loading]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('input-container')}>
                <div className={cx('input-box')}>
                    <span className={cx('icon')}>
                        <IoSearch className={cx('icon-search')} />
                    </span>
                    <input type="text" className={cx('input')} placeholder="Tên công ty" />
                </div>
                <span className={cx('btn-search')}>
                    <button className={cx('btn')}>Tìm kiếm</button>
                </span>
            </div>
            <p className={cx('description')}>{isSearch ? 'Công ty mới tạo' : 'Kết quả tìm kiếm'}</p>
            <div className={cx('company-list')}>
                {company.map((item) => (
                    <div className={cx('company')} key={item.id}>
                        <SearchCompanyComponent company={item} />
                    </div>
                ))}
            </div>
            <div className={cx('read-more')} onClick={handleSearch}>
                <button className={cx('btn')}>{loading ? <Spinner /> : 'Xem thêm'}</button>
            </div>
        </div>
    );
};

export default SearchCompany;
