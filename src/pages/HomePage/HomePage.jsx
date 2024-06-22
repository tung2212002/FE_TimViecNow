import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './HomePage.module.scss';
import useDocumentTitle from '@hooks/useDocumentTitle';
import { HomeHeader } from '@layouts/components/User/HomePage';
import { FeatureJob, TopCompanySlide, DashBoard, TopJobSlide, SEO } from '@layouts/components/User';

const cx = classNames.bind(styles);

const HomePage = () => {
    const dashBoardRef = useRef(null);

    useDocumentTitle('TVNow - Trang chủ');

    const handleScrollToDashBoard = () => {
        window.scrollTo({ top: dashBoardRef.current.offsetTop - dashBoardRef.current.clientHeight / 2 + 150, behavior: 'smooth' });
    };

    const companies = [
        {
            id: 52115,
            name: 'CÔNG TY CỔ PHẦN ĐẦU TƯ – KINH DOANH NHÀ',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-dau-tu-kinh-doanh-nha-60b06297b9812.jpg',
            totalActiveJobs: '3',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-dau-tu-kinh-doanh-nha/52115.html',
        },
        {
            id: 19067,
            name: 'CÔNG TY TNHH VN ĐẠI PHONG',
            logo: 'https://static.topcv.vn/company_logos/1qSV6GZnlrLv29SgT90gdB1P8fRkxb42_1645416278____604702d4ddf5d79ef304f2f97721c299.jfif',
            totalActiveJobs: '1',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tnhh-vn-dai-phong/19067.html',
        },
        {
            id: 31515,
            name: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN ECOPARK',
            logo: 'https://static.topcv.vn/company_logos/82faeb37e63c762d2b40921f9a61ce1e-5e097c56e4841.jpg',
            totalActiveJobs: '6',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-ecopark/31515.html',
        },
        {
            id: 128753,
            name: 'Công ty Cổ phần Công nghệ mạng và Truyền thông',
            logo: 'https://static.topcv.vn/company_logos/x1vYJ9c1hBsKXqs6rUe51enkJod9oNzD_1670922071____c67d95d54a7501e759769abfb55e0858.jpg',
            totalActiveJobs: '5',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-cong-nghe-mang-va-truyen-thong/128753.html',
        },
        {
            id: 15126,
            name: 'Công Ty Tài Chính Cổ Phần Tín Việt',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-tai-chinh-co-phan-tin-viet-5bd6b78cc1e7e_rs.jpg',
            totalActiveJobs: '10',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tai-chinh-co-phan-tin-viet/15126.html',
        },
        {
            id: 83742,
            name: 'CÔNG TY CỔ PHẦN MASAN MEATLIFE',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-masan-meatlife-61e12e33121f3.jpg',
            totalActiveJobs: '27',
            is_premium: false,
            label: 'profit500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-masan-meatlife/83742.html',
        },
        {
            id: 43219,
            name: 'CÔNG TY CỔ PHẦN THỦY SẢN VÀ THƯƠNG MẠI THUẬN PHƯỚC',
            logo: 'https://static.topcv.vn/company_logos/64ddac9deff59af53650d1bb3dd18d15-5f4391581a70b.jpg',
            totalActiveJobs: '3',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-thuy-san-va-thuong-mai-thuan-phuoc/43219.html',
        },
        {
            id: 1947,
            name: 'Công ty Cổ phần Đầu tư Phát triển Máy Việt Nam',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-dau-tu-phat-trien-may-viet-nam-58abeaf488222_rs.jpg',
            totalActiveJobs: '2',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-dau-tu-phat-trien-may-viet-nam/1947.html',
        },
        {
            id: 42057,
            name: 'CÔNG TY CP TMSX & XNK HƯNG THỊNH',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-cp-tmsx-xnk-hung-thinh-5f2b61d69ab50.jpg',
            totalActiveJobs: '2',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-cp-tmsx-xnk-hung-thinh/42057.html',
        },
        {
            id: 1720,
            name: 'SUNHOUSE GROUP JSC',
            logo: 'https://static.topcv.vn/company_logos/sunhouse-group-jsc-585b5818c11bf_rs.jpg',
            totalActiveJobs: '6',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/sunhouse-group-jsc/1720.html',
        },
        {
            id: 23657,
            name: 'Công ty Cổ Phần Thực Phẩm Dinh Dưỡng Nutifood',
            logo: 'https://static.topcv.vn/company_logos/uvDowJe2c9qNSoEkCxWrQbggPGRIUkmK_1639630266____2ddc7e563edebb295810c46255334bc4.jpg',
            totalActiveJobs: '6',
            is_premium: false,
            label: 'v1000',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-thuc-pham-dinh-duong-nutifood/23657.html',
        },
        {
            id: 7518,
            name: 'Công ty TNHH Bao Bì Việt Hưng',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-tnhh-bao-bi-viet-hung-5a6bd9dc5f121_rs.jpg',
            totalActiveJobs: '1',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-tnhh-bao-bi-viet-hung/7518.html',
        },
        {
            id: 74033,
            name: 'CÔNG TY TNHH XUẤT NHẬP KHẨU PHÁT TRIỂN ĐÔNG DƯƠNG - TẬP ĐOÀN THỂ THAO KINGSPORT',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-tnhh-xuat-nhap-khau-phat-trien-dong-duong-tap-doan-the-thao-kingsport-63bbc55e020e7.jpg',
            totalActiveJobs: '53',
            is_premium: true,
            label: 'fast500',
            url: 'https://www.topcv.vn/brand/xnkphattriendongduong',
        },
        {
            id: 109149,
            name: 'Tokio Marine Insurance Vietnam Company',
            logo: 'https://static.topcv.vn/company_logos/uEbkOk4ApKTtghLT5jv2kZAIiaXR84xp_1656899333____847de7bfdb1a0b98314b57def02d6c08.jpg',
            totalActiveJobs: '1',
            is_premium: false,
            label: 'profit500',
            url: 'https://www.topcv.vn/cong-ty/tokio-marine-insurance-vietnam-company/109149.html',
        },
        {
            id: 19163,
            name: 'Công ty Cổ phần Dược phẩm Hà Tây',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-duoc-pham-ha-tay-5c9b187ac490a.jpg',
            totalActiveJobs: '16',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-duoc-pham-ha-tay/19163.html',
        },
        {
            id: 33205,
            name: 'Công ty cổ phần kỹ thuật Sigma',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-ky-thuat-sigma-5efeb3374e097.jpg',
            totalActiveJobs: '6',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-ky-thuat-sigma/33205.html',
        },
        {
            id: 101789,
            name: 'Công ty Cổ phần xuất nhập khẩu hóa chất và thiết bị Kim Ngưu',
            logo: 'https://static.topcv.vn/company_logos/OEKs3vhfgl7Ji5id2X42SWus0L2VwKAY_1652511514____65e81f942dcb109305f3b7e1bb4f139f.png',
            totalActiveJobs: '9',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-xuat-nhap-khau-hoa-chat-va-thiet-bi-kim-nguu/101789.html',
        },
        {
            id: 18253,
            name: 'Bảo hiểm VietinBank',
            logo: 'https://static.topcv.vn/company_logos/bao-hiem-vietinbank-5c7f3c6e549b5_rs.jpg',
            totalActiveJobs: '6',
            is_premium: false,
            label: 'vnr500',
            url: 'https://www.topcv.vn/cong-ty/bao-hiem-vietinbank/18253.html',
        },
        {
            id: 2248,
            name: 'Công ty cổ phần Hai Bốn Bảy',
            logo: 'https://static.topcv.vn/company_logos/j5VgyhLeaTxlrl7WmuiUfrY2Ds36Ch7A_1670381727____2a0ede2ed3ad5104cf8febb923e2ea3e.jpg',
            totalActiveJobs: '15',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-hai-bon-bay/2248.html',
        },
        {
            id: 24524,
            name: 'Công ty cổ phần tập đoàn MERAP',
            logo: 'https://static.topcv.vn/company_logos/cong-ty-co-phan-tap-doan-merap-5d4147e17ab2f.jpg',
            totalActiveJobs: '2',
            is_premium: false,
            label: 'fast500',
            url: 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-merap/24524.html',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <HomeHeader handleScrollToDashBoard={handleScrollToDashBoard} />
                <FeatureJob />
                <TopCompanySlide companies={companies} />
                <DashBoard ref={dashBoardRef} />
                <TopJobSlide />
                <SEO />
            </div>
        </div>
    );
};

export default HomePage;
