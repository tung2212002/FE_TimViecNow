import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';

import styles from './TopJobSlideComponent.module.scss';
import { icons } from '../../assets';

const cx = classNames.bind(styles);

const TopJobSlideComponent = () => {
    const fakeData = {
        success: true,
        data: {
            categories: [
                {
                    id: 10001,
                    name: 'Kinh doanh / Bán hàng',
                    alias: 'kinh-doanh-ban-hang',
                    access_url: '/tim-viec-lam-kinh-doanh-ban-hang-c10001',
                    job_category_count: '14.205',
                    time_scan: '2024-03-07T08:00:20.700700Z',
                },
                {
                    id: 10026,
                    name: 'IT phần mềm',
                    alias: 'it-phan-mem',
                    access_url: '/tim-viec-lam-it-phan-mem-c10026',
                    job_category_count: '3.651',
                    time_scan: '2024-03-07T08:00:20.700766Z',
                },
                {
                    id: 10023,
                    name: 'Hành chính / Văn phòng',
                    alias: 'hanh-chinh-van-phong',
                    access_url: '/tim-viec-lam-hanh-chinh-van-phong-c10023',
                    job_category_count: '4.261',
                    time_scan: '2024-03-07T08:00:20.700800Z',
                },
                {
                    id: 10017,
                    name: 'Giáo dục / Đào tạo',
                    alias: 'giao-duc-dao-tao',
                    access_url: '/tim-viec-lam-giao-duc-dao-tao-c10017',
                    job_category_count: '3.563',
                    time_scan: '2024-03-07T08:00:20.700831Z',
                },
                {
                    id: 10045,
                    name: 'Tư vấn',
                    alias: 'tu-van',
                    access_url: '/tim-viec-lam-tu-van-c10045',
                    job_category_count: '4.446',
                    time_scan: '2024-03-07T08:00:20.700886Z',
                },
                {
                    id: 10029,
                    name: 'Marketing / Truyền thông / Quảng cáo',
                    alias: 'marketing-truyen-thong-quang-cao',
                    access_url: '/tim-viec-lam-marketing-truyen-thong-quang-cao-c10029',
                    job_category_count: '7.200',
                    time_scan: '2024-03-07T08:00:20.700929Z',
                },
                {
                    id: 10047,
                    name: 'Vận tải / Kho vận',
                    alias: 'van-tai-kho-van',
                    access_url: '/tim-viec-lam-van-tai-kho-van-c10047',
                    job_category_count: '1.233',
                    time_scan: '2024-03-07T08:00:20.700960Z',
                },
                {
                    id: 10028,
                    name: 'Kế toán / Kiểm toán',
                    alias: 'ke-toan-kiem-toan',
                    access_url: '/tim-viec-lam-ke-toan-kiem-toan-c10028',
                    job_category_count: '3.720',
                    time_scan: '2024-03-07T08:00:20.700993Z',
                },
                {
                    id: 10037,
                    name: 'Quản lý chất lượng (QA/QC)',
                    alias: 'quan-ly-chat-luong-qa-qc',
                    access_url: '/tim-viec-lam-quan-ly-chat-luong-qa-qc-c10037',
                    job_category_count: '725',
                    time_scan: '2024-03-07T08:00:20.701024Z',
                },
                {
                    id: 10131,
                    name: 'Công nghệ thông tin',
                    alias: 'cong-nghe-thong-tin',
                    access_url: '/tim-viec-lam-cong-nghe-thong-tin-c10131',
                    job_category_count: '3.170',
                    time_scan: '2024-03-07T08:00:20.701056Z',
                },
                {
                    id: 10129,
                    name: 'Thư ký / Trợ lý',
                    alias: 'thu-ky-tro-ly',
                    access_url: '/tim-viec-lam-thu-ky-tro-ly-c10129',
                    job_category_count: '884',
                    time_scan: '2024-03-07T08:00:20.701090Z',
                },
                {
                    id: 10130,
                    name: 'Dịch vụ',
                    alias: 'dich-vu',
                    access_url: '/tim-viec-lam-dich-vu-c10130',
                    job_category_count: '2.087',
                    time_scan: '2024-03-07T08:00:20.701118Z',
                },
                {
                    id: 10133,
                    name: 'Bảo vệ / An ninh',
                    alias: 'bao-ve-an-ninh',
                    access_url: '/tim-viec-lam-bao-ve-an-ninh-c10133',
                    job_category_count: '690',
                    time_scan: '2024-03-07T08:00:20.701147Z',
                },
                {
                    id: 10136,
                    name: 'Tài xế / Lái xe',
                    alias: 'tai-xe-lai-xe',
                    access_url: '/tim-viec-lam-tai-xe-lai-xe-c10136',
                    job_category_count: '256',
                    time_scan: '2024-03-07T08:00:20.701178Z',
                },
                {
                    id: 10137,
                    name: 'Sinh viên làm thêm / Bán thời gian',
                    alias: 'sinh-vien-lam-them-ban-thoi-gian',
                    access_url: '/tim-viec-lam-sinh-vien-lam-them-ban-thoi-gian-c10137',
                    job_category_count: '43',
                    time_scan: '2024-03-07T08:00:20.701211Z',
                },
                {
                    id: 10138,
                    name: 'Xây dựng',
                    alias: 'xay-dung',
                    access_url: '/tim-viec-lam-xay-dung-c10138',
                    job_category_count: '317',
                    time_scan: '2024-03-07T08:00:20.701239Z',
                },
                {
                    id: 10139,
                    name: 'Dược / Sinh học / Thực phẩm',
                    alias: 'duoc-sinh-hoc-thuc-pham',
                    access_url: '/tim-viec-lam-duoc-sinh-hoc-thuc-pham-c10139',
                    job_category_count: '171',
                    time_scan: '2024-03-07T08:00:20.701269Z',
                },
                {
                    id: 10140,
                    name: 'Nông nghiệp / Lâm nghiệp / Môi trường',
                    alias: 'nong-nghiep-lam-nghiep-moi-truong',
                    access_url: '/tim-viec-lam-nong-nghiep-lam-nghiep-moi-truong-c10140',
                    job_category_count: '107',
                    time_scan: '2024-03-07T08:00:20.701298Z',
                },
                {
                    id: 10141,
                    name: 'Y tế / Dược phẩm',
                    alias: 'y-te-duoc-pham',
                    access_url: '/tim-viec-lam-y-te-duoc-pham-c10141',
                    job_category_count: '101',
                    time_scan: '2024-03-07T08:00:20.701328Z',
                },
                {
                    id: 10142,
                    name: 'Sản xuất / Vận hành sản xuất',
                    alias: 'san-xuat-van-hanh-san-xuat',
                    access_url: '/tim-viec-lam-san-xuat-van-hanh-san-xuat-c10142',
                    job_category_count: '248',
                    time_scan: '2024-03-07T08:00:20.701356Z',
                },
                {
                    id: 10143,
                    name: 'Bán lẻ / Bán sỉ',
                    alias: 'ban-le-ban-si',
                    access_url: '/tim-viec-lam-ban-le-ban-si-c10143',
                    job_category_count: '247',
                    time_scan: '2024-03-07T08:00:20.701387Z',
                },
                {
                    id: 10144,
                    name: 'Làm đẹp / Spa',
                    alias: 'lam-dep-spa',
                    access_url: '/tim-viec-lam-lam-dep-spa-c10144',
                    job_category_count: '10',
                    time_scan: '2024-03-07T08:00:20.701418Z',
                },
                {
                    id: 10145,
                    name: 'Hàng không / Du lịch',
                    alias: 'hang-khong-du-lich',
                    access_url: '/tim-viec-lam-hang-khong-du-lich-c10145',
                    job_category_count: '19',
                    time_scan: '2024-03-07T08:00:20.701449Z',
                },
                {
                    id: 10146,
                    name: 'Ngoại ngữ',
                    alias: 'ngoai-ngu',
                    access_url: '/tim-viec-lam-ngoai-ngu-c10146',
                    job_category_count: '42',
                    time_scan: '2024-03-07T08:00:20.701480Z',
                },
                {
                    id: 10147,
                    name: 'Kiến trúc / TK nội thất',
                    alias: 'kien-truc-tk-noi-that',
                    access_url: '/tim-viec-lam-kien-truc-tk-noi-that-c10147',
                    job_category_count: '73',
                    time_scan: '2024-03-07T08:00:20.701511Z',
                },
                {
                    id: 10148,
                    name: 'Luật / Pháp lý',
                    alias: 'luat-phap-ly',
                    access_url: '/tim-viec-lam-luat-phap-ly-c10148',
                    job_category_count: '162',
                    time_scan: '2024-03-07T08:00:20.701540Z',
                },
                {
                    id: 10149,
                    name: 'Thiết kế đồ họa / Web',
                    alias: 'thiet-ke-do-hoa-web',
                    access_url: '/tim-viec-lam-thiet-ke-do-hoa-web-c10149',
                    job_category_count: '139',
                    time_scan: '2024-03-07T08:00:20.701569Z',
                },
                {
                    id: 10150,
                    name: 'Kinh doanh',
                    alias: 'kinh-doanh',
                    access_url: '/tim-viec-lam-kinh-doanh-c10150',
                    job_category_count: '1013',
                    time_scan: '2024-03-07T08:00:20.701599Z',
                },
                {
                    id: 10151,
                    name: 'Nhân sự',
                    alias: 'nhan-su',
                    access_url: '/tim-viec-lam-nhan-su-c10151',
                    job_category_count: '699',
                    time_scan: '2024-03-07T08:00:20.701628Z',
                },
                {
                    id: 10152,
                    name: 'Tư vấn',
                    alias: 'tu-van',
                    access_url: '/tim-viec-lam-tu-van-c10152',
                    job_category_count: '733',
                    time_scan: '2024-03-07T08:00:20.701657Z',
                },
                {
                    id: 10153,
                    name: 'Nghệ thuật / Thiết kế',
                    alias: 'nghe-thuat-thiet-ke',
                    access_url: '/tim-viec-lam-nghe-thuat-thiet-ke-c10153',
                    job_category_count: '159',
                    time_scan: '2024-03-07T08:00:20.701688Z',
                },
                {
                    id: 10154,
                    name: 'Giao thông vận tải',
                    alias: 'giao-thong-van-tai',
                    access_url: '/tim-viec-lam-giao-thong-van-tai-c10154',
                    job_category_count: '27',
                    time_scan: '2024-03-07T08:00:20.701720Z',
                },
                {
                    id: 10155,
                    name: 'Chăm sóc khách hàng',
                    alias: 'cham-soc-khach-hang',
                    access_url: '/tim-viec-lam-cham-soc-khach-hang-c10155',
                    job_category_count: '259',
                    time_scan: '2024-03-07T08:00:20.701749Z',
                },
                {
                    id: 10156,
                    name: 'Bảo hiểm',
                    alias: 'bao-hiem',
                    access_url: '/tim-viec-lam-bao-hiem-c10156',
                    job_category_count: '48',
                    time_scan: '2024-03-07T08:00:20.701779Z',
                },
                {
                    id: 10157,
                    name: 'Dữ liệu / Phân tích dữ liệu',
                    alias: 'du-lieu-phan-tich-du-lieu',
                    access_url: '/tim-viec-lam-du-lieu-phan-tich-du-lieu-c10157',
                    job_category_count: '224',
                    time_scan: '2024-03-07T08:00:20.701811Z',
                },
                {
                    id: 10158,
                    name: 'Giáo dục / Đào tạo',
                    alias: 'giao-duc-dao-tao',
                    access_url: '/tim-viec-lam-giao-duc-dao-tao-c10158',
                    job_category_count: '306',
                    time_scan: '2024-03-07T08:00:20.701842Z',
                },
                {
                    id: 10159,
                    name: 'Thư ký / Trợ lý',
                    alias: 'thu-ky-tro-ly',
                    access_url: '/tim-viec-lam-thu-ky-tro-ly-c10159',
                    job_category_count: '108',
                    time_scan: '2024-03-07T08:00:20.701870Z',
                },
                {
                    id: 10160,
                    name: 'Vận chuyển / Giao nhận',
                    alias: 'van-chuyen-giao-nhan',
                    access_url: '/tim-viec-lam-van-chuyen-giao-nhan-c10160',
                    job_category_count: '124',
                    time_scan: '2024-03-07T08:00:20.701900Z',
                },
                {
                    id: 10161,
                    name: 'Hành chính / Văn phòng',
                    alias: 'hanh-chinh-van-phong',
                    access_url: '/tim-viec-lam-hanh-chinh-van-phong-c10161',
                    job_category_count: '191',
                    time_scan: '2024-03-07T08:00:20.701930Z',
                },
                {
                    id: 10162,
                    name: 'Tài chính / Kế toán / Kiểm toán',
                    alias: 'tai-chinh-ke-toan-kiem-toan',
                    access_url: '/tim-viec-lam-tai-chinh-ke-toan-kiem-toan-c10162',
                    job_category_count: '661',
                    time_scan: '2024-03-07T08:00:20.701960Z',
                },
                {
                    id: 10163,
                    name: 'Học sinh làm thêm / Tình nguyện',
                    alias: 'hoc-sinh-lam-them-tinh-nguyen',
                    access_url: '/tim-viec-lam-hoc-sinh-lam-them-tinh-nguyen-c10163',
                    job_category_count: '2',
                    time_scan: '2024-03-07T08:00:20.701991Z',
                },
                {
                    id: 10164,
                    name: 'Kho vận / Vật tư / Thu mua',
                    alias: 'kho-van-vat-tu-thu-mua',
                    access_url: '/tim-viec-lam-kho-van-vat-tu-thu-mua-c10164',
                    job_category_count: '106',
                    time_scan: '2024-03-07T08:00:20.702021Z',
                },
                {
                    id: 10165,
                    name: 'Điện / Điện tử / Điện lạnh',
                    alias: 'dien-dien-tu-dien-lanh',
                    access_url: '/tim-viec-lam-dien-dien-tu-dien-lanh-c10165',
                    job_category_count: '121',
                    time_scan: '2024-03-07T08:00:20.702052Z',
                },
                {
                    id: 10166,
                    name: 'Thể dục / Thể thao',
                    alias: 'the-duc-the-thao',
                    access_url: '/tim-viec-lam-the-duc-the-thao-c10166',
                    job_category_count: '5',
                    time_scan: '2024-03-07T08:00:20.702081Z',
                },
                {
                    id: 10167,
                    name: 'Nhân viên phục vụ / Bếp / Bar',
                    alias: 'nhan-vien-phuc-vu-bep-bar',
                    access_url: '/tim-viec-lam-nhan-vien-phuc-vu-bep-bar-c10167',
                    job_category_count: '50',
                    time_scan: '2024-03-07T08:00:20.702111Z',
                },
                {
                    id: 10168,
                    name: 'Môi trường',
                    alias: 'moi-truong',
                    access_url: '/tim-viec-lam-moi-truong-c10168',
                    job_category_count: '37',
                    time_scan: '2024-03-07T08:00:20.702140Z',
                },
                {
                    id: 10169,
                    name: 'Thú y / Dinh dưỡng',
                    alias: 'thu-y-dinh-duong',
                    access_url: '/tim-viec-lam-thu-y-dinh-duong-c10169',
                    job_category_count: '6',
                    time_scan: '2024-03-07T08:00:20.702169Z',
                },
                {
                    id: 10170,
                    name: 'Thiết kế / Mỹ thuật',
                    alias: 'thiet-ke-my-thuat',
                    access_url: '/tim-viec-lam-thiet-ke-my-thuat-c10170',
                    job_category_count: '71',
                    time_scan: '2024-03-07T08:00:20.702198Z',
                },
                {
                    id: 10171,
                    name: 'Nông nghiệp / Lâm nghiệp',
                    alias: 'nong-nghiep-lam-nghiep',
                    access_url: '/tim-viec-lam-nong-nghiep-lam-nghiep-c10171',
                    job_category_count: '49',
                    time_scan: '2024-03-07T08:00:20.702227Z',
                },
                {
                    id: 10172,
                    name: 'Vận tải',
                    alias: 'van-tai',
                    access_url: '/tim-viec-lam-van-tai-c10172',
                    job_category_count: '56',
                    time_scan: '2024-03-07T08:00:20.702256Z',
                },
                {
                    id: 10173,
                    name: 'Dược / Phẩm mỹ phẩm',
                    alias: 'duoc-pham-my-pham',
                    access_url: '/tim-viec-lam-duoc-pham-my-pham-c10173',
                    job_category_count: '13',
                    time_scan: '2024-03-07T08:00:20.702285Z',
                },
                {
                    id: 10174,
                    name: 'Thực phẩm',
                    alias: 'thuc-pham',
                    access_url: '/tim-viec-lam-thuc-pham-c10174',
                    job_category_count: '20',
                    time_scan: '2024-03-07T08:00:20.702315Z',
                },
                {
                    id: 10175,
                    name: 'Ngân hàng / Tài chính',
                    alias: 'ngan-hang-tai-chinh',
                    access_url: '/tim-viec-lam-ngan-hang-tai-chinh-c10175',
                    job_category_count: '269',
                    time_scan: '2024-03-07T08:00:20.702345Z',
                },
                {
                    id: 10176,
                    name: 'Kiến trúc / Nội thất',
                    alias: 'kien-truc-noi-that',
                    access_url: '/tim-viec-lam-kien-truc-noi-that-c10176',
                    job_category_count: '90',
                    time_scan: '2024-03-07T08:00:20.702376Z',
                },
                {
                    id: 10177,
                    name: 'Kinh doanh quốc tế',
                    alias: 'kinh-doanh-quoc-te',
                    access_url: '/tim-viec-lam-kinh-doanh-quoc-te-c10177',
                    job_category_count: '30',
                    time_scan: '2024-03-07T08:00:20.702406Z',
                },
                {
                    id: 10178,
                    name: 'Thể chất / Thể thao / Dã ngoại',
                    alias: 'the-chat-the-thao-da-ngoai',
                    access_url: '/tim-viec-lam-the-chat-the-thao-da-ngoai-c10178',
                    job_category_count: '11',
                    time_scan: '2024-03-07T08:00:20.702435Z',
                },
                {
                    id: 10179,
                    name: 'Thiết kế đồ họa',
                    alias: 'thiet-ke-do-hoa',
                    access_url: '/tim-viec-lam-thiet-ke-do-hoa-c10179',
                    job_category_count: '74',
                    time_scan: '2024-03-07T08:00:20.702465Z',
                },
                {
                    id: 10180,
                    name: 'Bảo trì / Sửa chữa / Xây dựng',
                    alias: 'bao-tri-sua-chua-xay-dung',
                    access_url: '/tim-viec-lam-bao-tri-sua-chua-xay-dung-c10180',
                    job_category_count: '45',
                    time_scan: '2024-03-07T08:00:20.702494Z',
                },
                {
                    id: 10181,
                    name: 'Hạ tầng',
                    alias: 'ha-tang',
                    access_url: '/tim-viec-lam-ha-tang-c10181',
                    job_category_count: '16',
                    time_scan: '2024-03-07T08:00:20.702523Z',
                },
                {
                    id: 10182,
                    name: 'Vật lý / Kỹ thuật / Cơ khí',
                    alias: 'vat-ly-ky-thuat-co-khi',
                    access_url: '/tim-viec-lam-vat-ly-ky-thuat-co-khi-c10182',
                    job_category_count: '44',
                    time_scan: '2024-03-07T08:00:20.702552Z',
                },
                {
                    id: 10183,
                    name: 'Vận hành sản xuất',
                    alias: 'van-hanh-san-xuat',
                    access_url: '/tim-viec-lam-van-hanh-san-xuat-c10183',
                    job_category_count: '92',
                    time_scan: '2024-03-07T08:00:20.702582Z',
                },
                {
                    id: 10184,
                    name: 'Xây dựng / Kiến trúc',
                    alias: 'xay-dung-kien-truc',
                    access_url: '/tim-viec-lam-xay-dung-kien-truc-c10184',
                    job_category_count: '121',
                    time_scan: '2024-03-07T08:00:20.702612Z',
                },
                {
                    id: 10185,
                    name: 'Chất lượng',
                    alias: 'chat-luong',
                    access_url: '/tim-viec-lam-chat-luong-c10185',
                    job_category_count: '50',
                    time_scan: '2024-03-07T08:00:20.702642Z',
                },
                {
                    id: 10186,
                    name: 'Địa chất / Khoáng sản',
                    alias: 'dia-chat-khoang-san',
                    access_url: '/tim-viec-lam-dia-chat-khoang-san-c10186',
                    job_category_count: '5',
                    time_scan: '2024-03-07T08:00:20.702671Z',
                },
                {
                    id: 10187,
                    name: 'Môi trường / Xử lý chất thải',
                    alias: 'moi-truong-xu-ly-chat-thai',
                    access_url: '/tim-viec-lam-moi-truong-xu-ly-chat-thai-c10187',
                    job_category_count: '12',
                    time_scan: '2024-03-07T08:00:20.702701Z',
                },
                {
                    id: 10188,
                    name: 'Công nghệ cao',
                    alias: 'cong-nghe-cao',
                    access_url: '/tim-viec-lam-cong-nghe-cao-c10188',
                    job_category_count: '46',
                    time_scan: '2024-03-07T08:00:20.702731Z',
                },
                {
                    id: 10189,
                    name: 'Sản xuất',
                    alias: 'san-xuat',
                    access_url: '/tim-viec-lam-san-xuat-c10189',
                    job_category_count: '142',
                    time_scan: '2024-03-07T08:00:20.702760Z',
                },
                {
                    id: 10190,
                    name: 'Truyền hình / Báo chí / Biên tập',
                    alias: 'truyen-hinh-bao-chi-bien-tap',
                    access_url: '/tim-viec-lam-truyen-hinh-bao-chi-bien-tap-c10190',
                    job_category_count: '65',
                    time_scan: '2024-03-07T08:00:20.702790Z',
                },
                {
                    id: 10191,
                    name: 'Chứng khoán / Vàng / Ngoại hối',
                    alias: 'chung-khoan-vang-ngoai-hoi',
                    access_url: '/tim-viec-lam-chung-khoan-vang-ngoai-hoi-c10191',
                    job_category_count: '8',
                    time_scan: '2024-03-07T08:00:20.702819Z',
                },
                {
                    id: 10192,
                    name: 'Tài chính',
                    alias: 'tai-chinh',
                    access_url: '/tim-viec-lam-tai-chinh-c10192',
                    job_category_count: '169',
                    time_scan: '2024-03-07T08:00:20.702849Z',
                },
                {
                    id: 10193,
                    name: 'Truyền thông / Báo chí',
                    alias: 'truyen-thong-bao-chi',
                    access_url: '/tim-viec-lam-truyen-thong-bao-chi-c10193',
                    job_category_count: '71',
                    time_scan: '2024-03-07T08:00:20.702878Z',
                },
                {
                    id: 10194,
                    name: 'Truyền thông',
                    alias: 'truyen-thong',
                    access_url: '/tim-viec-lam-truyen-thong-c10194',
                    job_category_count: '18',
                    time_scan: '2024-03-07T08:00:20.702908Z',
                },
                {
                    id: 10195,
                    name: 'Thú y',
                    alias: 'thu-y',
                    access_url: '/tim-viec-lam-thu-y-c10195',
                    job_category_count: '9',
                    time_scan: '2024-03-07T08:00:20.702937Z',
                },
                {
                    id: 10196,
                    name: 'Vật lý',
                    alias: 'vat-ly',
                    access_url: '/tim-viec-lam-vat-ly-c10196',
                    job_category_count: '15',
                    time_scan: '2024-03-07T08:00:20.702966Z',
                },
                {
                    id: 10197,
                    name: 'Điện / Điện tử',
                    alias: 'dien-dien-tu',
                    access_url: '/tim-viec-lam-dien-dien-tu-c10197',
                    job_category_count: '42',
                    time_scan: '2024-03-07T08:00:20.702996Z',
                },
                {
                    id: 10198,
                    name: 'Kỹ thuật',
                    alias: 'ky-thuat',
                    access_url: '/tim-viec-lam-ky-thuat-c10198',
                    job_category_count: '70',
                    time_scan: '2024-03-07T08:00:20.703025Z',
                },
                {
                    id: 10199,
                    name: 'Công nghệ thông tin',
                    alias: 'cong-nghe-thong-tin',
                    access_url: '/tim-viec-lam-cong-nghe-thong-tin-c10199',
                    job_category_count: '613',
                    time_scan: '2024-03-07T08:00:20.703055Z',
                },
            ],
        },
        num_all_jobs: 27200,
        time_crawl: '2024-03-07T08:00:20.703083Z',
    };

    const listIcon = [
        {
            id: 10001,
            icon: icons.icon_market,
        },
        {
            id: 10026,
            icon: icons.icon_sofware,
        },
        {
            id: 10023,
            icon: icons.icon_office,
        },
        {
            id: 10017,
            icon: icons.icon_education,
        },
        {
            id: 10045,
            icon: icons.icon_counselor,
        },
        {
            id: 10029,
            icon: icons.icon_media,
        },
        {
            id: 10047,
            icon: icons.icon_transport,
        },
        {
            id: 10028,
            icon: icons.icon_accountant,
        },
        {
            id: 10037,
            icon: icons.icon_qaqc,
        },
        {
            id: 10031,
            icon: icons.icon_it,
        },
        {
            id: 10129,
            icon: icons.icon_secretary,
        },
        {
            id: 10130,
            icon: icons.icon_service,
        },
        {
            id: 10138,
            icon: icons.icon_construction,
        },
        {
            id: 10139,
            icon: icons.icon_medicine,
        },
        {
            id: 10140,
            icon: icons.icon_agrilculture,
        },
        {
            id: 10141,
            icon: icons.icon_mechanical,
        },
        {
            id: 10142,
            icon: icons.icon_manufacture,
        },
        {
            id: 10144,
            icon: icons.icon_spa,
        },
        {
            id: 10147,
            icon: icons.icon_architecture,
        },
        {
            id: 10148,
            icon: icons.icon_law,
        },
        {
            id: 10149,
            icon: icons.icon_graphic_design,
        },
        {
            id: 10151,
            icon: icons.icon_hr,
        },
        {
            id: 10155,
            icon: icons.icon_service,
        },
        {
            id: 10159,
            icon: icons.icon_secretary,
        },
        {
            id: 10165,
            icon: icons.icon_electrical,
        },
        {
            id: 10175,
            icon: icons.icon_finance,
        },
        {
            id: 10183,
            icon: icons.icon_manager_operation,
        },
        {
            id: 10188,
            icon: icons.icon_high_technology,
        },
        {
            id: 10190,
            icon: icons.icon_tv,
        },
        {
            id: 10193,
            icon: icons.icon_stock,
        },
    ];

    const companies = fakeData.data.categories;
    const ref = useRef(null);
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        rows: 2,
        slidesPerRow: 4,
        centerPadding: '20px',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesPerRow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesPerRow: 2,
                },
            },
            {
                breakpoint: 750,
                settings: {
                    slidesPerRow: 1,
                },
            },
        ],
    };
    const [page, setPage] = useState(1);

    const handleNext = () => {
        if (page >= Math.ceil(listIcon.length / settings.slidesToShow)) return;
        setPage(page + 1);
        ref.current.slickNext();
    };

    const handlePrev = () => {
        if (page <= 1) return;
        setPage(page - 1);
        ref.current.slickPrev();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <div className={cx('title')}>
                        <h2 className={cx('title-text')}>Top ngành nghề nổi bật</h2>
                        <p>
                            Bạn muốn tìm việc làm mới? Xem danh sách việc làm <span>&nbsp;</span>
                            <a href={'/'} className={cx('link')} target="_blank" rel="noreferrer">
                                tại đây
                            </a>
                        </p>
                    </div>
                    <div className={cx('box-tool')}>
                        <span className={cx('btn', { deactive: page <= 1 })} onClick={handlePrev}>
                            <VscChevronLeft className={cx('icon')} />
                        </span>

                        <span className={cx('btn', { deactive: page >= Math.ceil(listIcon.length / settings.slidesToShow) })} onClick={handleNext}>
                            <VscChevronRight className={cx('icon')} />
                        </span>
                    </div>
                </div>
                <Slider {...settings} ref={ref} className={cx('slider')}>
                    {listIcon.map((item, index) => (
                        <div key={index} className={cx('slide')}>
                            <div className={cx('item')}>
                                <a
                                    className={cx('content')}
                                    href={companies.find((company) => company.id === item.id)?.access_url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={item.icon} className={cx('icon')} alt={companies.find((company) => company.id === item.id)?.name} />
                                    <label className={cx('label')}>{companies.find((company) => company.id === item.id)?.name}</label>
                                    <h3 className={cx('title')}>{companies.find((company) => company.id === item.id)?.job_category_count} việc làm</h3>
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

TopJobSlideComponent.propTypes = {};

export default TopJobSlideComponent;
