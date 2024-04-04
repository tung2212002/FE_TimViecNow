import classNames from 'classnames/bind';

import styles from './SEO.module.scss';

const cx = classNames.bind(styles);

const SEO = () => {
    const HTMLContent = `<div>
    <p><strong>Cơ hội ứng tuyển việc làm với đãi ngộ hấp dẫn tại các công ty hàng đầu</strong> </p> <p>Trước sự phát triển vượt bậc của nền kinh tế, rất nhiều ngành nghề trở nên khan hiếm nhân lực hoặc thiếu nhân lực giỏi. Vì vậy, hầu hết các trường Đại học đều liên kết với các công ty, doanh nghiệp, cơ quan để tạo cơ hội cho các bạn sinh viên được học tập, rèn luyện bản thân và làm quen với môi trường làm việc từ sớm. Trong <a target="_blank" rel="noopener noreferrer" href="/" previewlistener="true"><strong>danh sách việc làm</strong></a> trên đây, TVNow mang đến cho bạn những cơ hội việc làm tại những môi trường làm việc năng động, chuyên nghiệp.</p> <p><strong>Vậy tại sao nên tìm việc làm tại TVNow?</strong> </p> <p><strong>Việc làm Chất lượng</strong> </p> <ul> <li>Hàng ngàn tin tuyển dụng chất lượng cao được cập nhật thường xuyên để đáp ứng nhu cầu tìm việc của ứng viên.</li> <li>Hệ thống thông minh tự động gợi ý các công việc phù hợp theo CV của bạn.</li> </ul><p><strong>Hỗ trợ Người tìm việc</strong> </p> <ul> <li>Nhà tuyển dụng chủ động tìm kiếm và liên hệ với bạn qua hệ thống kết nối ứng viên thông minh.</li> <li>Báo cáo chi tiết Nhà tuyển dụng đã xem CV và gửi offer tới bạn.</li> </ul> <p>Tại <a target="_blank" rel="noopener noreferrer" href="https://www.TVNow.vn/" previewlistener="true"><strong>TVNow</strong></a>, bạn có thể tìm thấy những tin tuyển dụng việc làm với mức lương vô cùng hấp dẫn. Những nhà tuyển dụng kết nối với TVNow đều là những công ty lớn tại Việt Nam, nơi bạn có thể làm việc trong một môi trường chuyên nghiệp, năng động, trẻ trung. TVNow là nền tảng tuyển dụng công nghệ cao giúp các nhà tuyển dụng và ứng viên kết nối với nhau. Nhanh tay tạo CV để ứng tuyển vào các vị trí việc làm mới nhất hấp dẫn tại <a target="_blank" rel="noopener noreferrer" href="/" previewlistener="true"><strong>việc làm mới nhất tại Hà Nội</strong></a>, <a target="_blank" rel="noopener noreferrer" href="/" previewlistener="true"><strong>việc làm mới nhất tại TP.HCM</strong></a> ở TVNow, bạn sẽ tìm thấy những <a target="_blank" rel="noopener noreferrer" href="/"><strong>việc làm mới nhất</strong></a> với mức lương tốt nhất!</p>
    </div>`;

    const jobByIndustry = [
        {
            id: '10101',
            name: 'An toàn lao động',
            url: '/tim-viec-lam-an-toan-lao-dong-c10101',
        },
        {
            id: '10102',
            name: 'Bán hàng kỹ thuật',
            url: '/tim-viec-lam-ban-hang-ky-thuat-c10102',
        },
        {
            id: '10103',
            name: 'Bán lẻ / bán sỉ',
            url: '/tim-viec-lam-ban-le-ban-si-c10103',
        },
        {
            id: '10004',
            name: 'Báo chí / Truyền hình',
            url: '/tim-viec-lam-bao-chi-truyen-hinh-c10004',
        },
        {
            id: '10006',
            name: 'Bảo hiểm',
            url: '/tim-viec-lam-bao-hiem-c10006',
        },
        {
            id: '10104',
            name: 'Bảo trì / Sửa chữa',
            url: '/tim-viec-lam-bao-tri-sua-chua-c10104',
        },
        {
            id: '10007',
            name: 'Bất động sản',
            url: '/tim-viec-lam-bat-dong-san-c10007',
        },
        {
            id: '10003',
            name: 'Biên / Phiên dịch',
            url: '/tim-viec-lam-bien-phien-dich-c10003',
        },
        {
            id: '10005',
            name: 'Bưu chính - Viễn thông',
            url: '/tim-viec-lam-buu-chinh-vien-thong-c10005',
        },
        {
            id: '10008',
            name: 'Chứng khoán / Vàng / Ngoại tệ',
            url: '/tim-viec-lam-chung-khoan-vang-ngoai-te-c10008',
        },
        {
            id: '10010',
            name: 'Cơ khí / Chế tạo / Tự động hóa',
            url: '/tim-viec-lam-co-khi-che-tao-tu-dong-hoa-c10010',
        },
        {
            id: '10009',
            name: 'Công nghệ cao',
            url: '/tim-viec-lam-cong-nghe-cao-c10009',
        },
        {
            id: '10052',
            name: 'Công nghệ Ô tô',
            url: '/tim-viec-lam-cong-nghe-o-to-c10052',
        },
        {
            id: '10131',
            name: 'Công nghệ thông tin',
            url: '/tim-viec-lam-cong-nghe-thong-tin-c10131',
        },
        {
            id: '10012',
            name: 'Dầu khí/Hóa chất',
            url: '/tim-viec-lam-dau-khi-hoa-chat-c10012',
        },
        {
            id: '10013',
            name: 'Dệt may / Da giày',
            url: '/tim-viec-lam-det-may-da-giay-c10013',
        },
        {
            id: '10111',
            name: 'Địa chất / Khoáng sản',
            url: '/tim-viec-lam-dia-chat-khoang-san-c10111',
        },
        {
            id: '10014',
            name: 'Dịch vụ khách hàng',
            url: '/tim-viec-lam-dich-vu-khach-hang-c10014',
        },
        {
            id: '10016',
            name: 'Điện / Điện tử / Điện lạnh',
            url: '/tim-viec-lam-dien-dien-tu-dien-lanh-c10016',
        },
        {
            id: '10015',
            name: 'Điện tử viễn thông',
            url: '/tim-viec-lam-dien-tu-vien-thong-c10015',
        },
        {
            id: '10011',
            name: 'Du lịch',
            url: '/tim-viec-lam-du-lich-c10011',
        },
        {
            id: '10110',
            name: 'Dược phẩm / Công nghệ sinh học',
            url: '/tim-viec-lam-duoc-pham-cong-nghe-sinh-hoc-c10110',
        },
        {
            id: '10017',
            name: 'Giáo dục / Đào tạo',
            url: '/tim-viec-lam-giao-duc-dao-tao-c10017',
        },
        {
            id: '10113',
            name: 'Hàng cao cấp',
            url: '/tim-viec-lam-hang-cao-cap-c10113',
        },
        {
            id: '10020',
            name: 'Hàng gia dụng',
            url: '/tim-viec-lam-hang-gia-dung-c10020',
        },
        {
            id: '10021',
            name: 'Hàng hải',
            url: '/tim-viec-lam-hang-hai-c10021',
        },
        {
            id: '10022',
            name: 'Hàng không',
            url: '/tim-viec-lam-hang-khong-c10022',
        },
        {
            id: '10117',
            name: 'Hàng tiêu dùng',
            url: '/tim-viec-lam-hang-tieu-dung-c10117',
        },
        {
            id: '10023',
            name: 'Hành chính / Văn phòng',
            url: '/tim-viec-lam-hanh-chinh-van-phong-c10023',
        },
        {
            id: '10018',
            name: 'Hoá học / Sinh học',
            url: '/tim-viec-lam-hoa-hoc-sinh-hoc-c10018',
        },
        {
            id: '10019',
            name: 'Hoạch định/Dự án',
            url: '/tim-viec-lam-hoach-dinh-du-an-c10019',
        },
        {
            id: '10024',
            name: 'In ấn / Xuất bản',
            url: '/tim-viec-lam-in-an-xuat-ban-c10024',
        },
        {
            id: '10025',
            name: 'IT Phần cứng / Mạng',
            url: '/tim-viec-lam-it-phan-cung-mang-c10025',
        },
        {
            id: '10026',
            name: 'IT phần mềm',
            url: '/tim-viec-lam-it-phan-mem-c10026',
        },
        {
            id: '10028',
            name: 'Kế toán / Kiểm toán',
            url: '/tim-viec-lam-ke-toan-kiem-toan-c10028',
        },
        {
            id: '10027',
            name: 'Khách sạn / Nhà hàng',
            url: '/tim-viec-lam-khach-san-nha-hang-c10027',
        },
        {
            id: '10120',
            name: 'Kiến trúc',
            url: '/tim-viec-lam-kien-truc-c10120',
        },
        {
            id: '10001',
            name: 'Kinh doanh / Bán hàng',
            url: '/tim-viec-lam-kinh-doanh-ban-hang-c10001',
        },
        {
            id: '10048',
            name: 'Logistics',
            url: '/tim-viec-lam-logistics-c10048',
        },
        {
            id: '10036',
            name: 'Luật/Pháp lý',
            url: '/tim-viec-lam-luat-phap-ly-c10036',
        },
        {
            id: '10029',
            name: 'Marketing / Truyền thông / Quảng cáo',
            url: '/tim-viec-lam-marketing-truyen-thong-quang-cao-c10029',
        },
        {
            id: '10030',
            name: 'Môi trường / Xử lý chất thải',
            url: '/tim-viec-lam-moi-truong-xu-ly-chat-thai-c10030',
        },
        {
            id: '10031',
            name: 'Mỹ phẩm / Trang sức',
            url: '/tim-viec-lam-my-pham-trang-suc-c10031',
        },
        {
            id: '10032',
            name: 'Mỹ thuật / Nghệ thuật / Điện ảnh',
            url: '/tim-viec-lam-my-thuat-nghe-thuat-dien-anh-c10032',
        },
        {
            id: '10033',
            name: 'Ngân hàng / Tài chính',
            url: '/tim-viec-lam-ngan-hang-tai-chinh-c10033',
        },
        {
            id: '11000',
            name: 'Ngành nghề khác',
            url: '/tim-viec-lam-nganh-nghe-khac-c11000',
        },
        {
            id: '10132',
            name: 'NGO / Phi chính phủ / Phi lợi nhuận',
            url: '/tim-viec-lam-ngo-phi-chinh-phu-phi-loi-nhuan-c10132',
        },
        {
            id: '10034',
            name: 'Nhân sự',
            url: '/tim-viec-lam-nhan-su-c10034',
        },
        {
            id: '10035',
            name: 'Nông / Lâm / Ngư nghiệp',
            url: '/tim-viec-lam-nong-lam-ngu-nghiep-c10035',
        },
        {
            id: '10124',
            name: 'Phi chính phủ / Phi lợi nhuận',
            url: '/tim-viec-lam-phi-chinh-phu-phi-loi-nhuan-c10124',
        },
        {
            id: '10037',
            name: 'Quản lý chất lượng (QA/QC)',
            url: '/tim-viec-lam-quan-ly-chat-luong-qa-qc-c10037',
        },
        {
            id: '10038',
            name: 'Quản lý điều hành',
            url: '/tim-viec-lam-quan-ly-dieu-hanh-c10038',
        },
        {
            id: '10125',
            name: 'Sản phẩm công nghiệp',
            url: '/tim-viec-lam-san-pham-cong-nghiep-c10125',
        },
        {
            id: '10039',
            name: 'Sản xuất / Vận hành sản xuất',
            url: '/tim-viec-lam-san-xuat-van-hanh-san-xuat-c10039',
        },
        {
            id: '10040',
            name: 'Sinh viên mới ra trường',
            url: '/tim-viec-lam-sinh-vien-moi-ra-truong-c10040',
        },
        {
            id: '10041',
            name: 'Thực phẩm / Dinh dưỡng',
            url: '/tim-viec-lam-thuc-pham-dinh-duong-c10041',
        },
        {
            id: '10042',
            name: 'Thư ký / Trợ lý',
            url: '/tim-viec-lam-thu-ky-tro-ly-c10042',
        },
        {
            id: '10043',
            name: 'Thương mại điện tử',
            url: '/tim-viec-lam-thuong-mai-dien-tu-c10043',
        },
        {
            id: '10044',
            name: 'Tổ chức sự kiện / Quà tặng',
            url: '/tim-viec-lam-to-chuc-su-kien-qua-tang-c10044',
        },
        {
            id: '10126',
            name: 'Tự động hóa / Điều khiển',
            url: '/tim-viec-lam-tu-dong-hoa-dieu-khien-c10126',
        },
        {
            id: '10045',
            name: 'Vận chuyển / Giao nhận',
            url: '/tim-viec-lam-van-chuyen-giao-nhan-c10045',
        },
        {
            id: '10046',
            name: 'Vật liệu / Thiết bị xây dựng',
            url: '/tim-viec-lam-vat-lieu-thiet-bi-xay-dung-c10046',
        },
        {
            id: '10047',
            name: 'Xây dựng',
            url: '/tim-viec-lam-xay-dung-c10047',
        },
        {
            id: '10130',
            name: 'Y tế / Dược',
            url: '/tim-viec-lam-y-te-duoc-c10130',
        },
        {
            id: '10118',
            name: 'Y tế / Sức khỏe',
            url: '/tim-viec-lam-y-te-suc-khoe-c10118',
        },
    ];

    const jobByLocation = [
        {
            name: 'Hà Nội',
            url: '/tim-viec-lam-moi-nhat-tai-ha-noi-l1',
        },
        {
            name: 'Hồ Chí Minh',
            url: '/tim-viec-lam-moi-nhat-tai-ho-chi-minh-l2',
        },
        {
            name: 'Bình Dương',
            url: '/tim-viec-lam-moi-nhat-tai-binh-duong-l3',
        },
        {
            name: 'Bắc Ninh',
            url: '/tim-viec-lam-moi-nhat-tai-bac-ninh-l4',
        },
        {
            name: 'Đồng Nai',
            url: '/tim-viec-lam-moi-nhat-tai-dong-nai-l5',
        },
        {
            name: 'Hưng Yên',
            url: '/tim-viec-lam-moi-nhat-tai-hung-yen-l6',
        },
        {
            name: 'Hải Dương',
            url: '/tim-viec-lam-moi-nhat-tai-hai-duong-l7',
        },
        {
            name: 'Đà Nẵng',
            url: '/tim-viec-lam-moi-nhat-tai-da-nang-l8',
        },
        {
            name: 'Hải Phòng',
            url: '/tim-viec-lam-moi-nhat-tai-hai-phong-l9',
        },
        {
            name: 'An Giang',
            url: '/tim-viec-lam-moi-nhat-tai-an-giang-l10',
        },
        {
            name: 'Bà Rịa-Vũng Tàu',
            url: '/tim-viec-lam-moi-nhat-tai-ba-ria-vung-tau-l11',
        },
        {
            name: 'Bắc Giang',
            url: '/tim-viec-lam-moi-nhat-tai-bac-giang-l12',
        },
        {
            name: 'Bắc Kạn',
            url: '/tim-viec-lam-moi-nhat-tai-bac-kan-l13',
        },
        {
            name: 'Bạc Liêu',
            url: '/tim-viec-lam-moi-nhat-tai-bac-lieu-l14',
        },
        {
            name: 'Bến Tre',
            url: '/tim-viec-lam-moi-nhat-tai-ben-tre-l15',
        },
        {
            name: 'Bình Định',
            url: '/tim-viec-lam-moi-nhat-tai-binh-dinh-l16',
        },
        {
            name: 'Bình Phước',
            url: '/tim-viec-lam-moi-nhat-tai-binh-phuoc-l17',
        },
        {
            name: 'Bình Thuận',
            url: '/tim-viec-lam-moi-nhat-tai-binh-thuan-l18',
        },
        {
            name: 'Cà Mau',
            url: '/tim-viec-lam-moi-nhat-tai-ca-mau-l19',
        },
        {
            name: 'Cần Thơ',
            url: '/tim-viec-lam-moi-nhat-tai-can-tho-l20',
        },
        {
            name: 'Cao Bằng',
            url: '/tim-viec-lam-moi-nhat-tai-cao-bang-l21',
        },
        {
            name: 'Cửu Long',
            url: '/tim-viec-lam-moi-nhat-tai-cuu-long-l22',
        },
        {
            name: 'Đắk Lắk',
            url: '/tim-viec-lam-moi-nhat-tai-dak-lak-l23',
        },
        {
            name: 'Đắc Nông',
            url: '/tim-viec-lam-moi-nhat-tai-dac-nong-l24',
        },
        {
            name: 'Điện Biên',
            url: '/tim-viec-lam-moi-nhat-tai-dien-bien-l25',
        },
        {
            name: 'Đồng Tháp',
            url: '/tim-viec-lam-moi-nhat-tai-dong-thap-l26',
        },
        {
            name: 'Gia Lai',
            url: '/tim-viec-lam-moi-nhat-tai-gia-lai-l27',
        },
        {
            name: 'Hà Giang',
            url: '/tim-viec-lam-moi-nhat-tai-ha-giang-l28',
        },
        {
            name: 'Hà Nam',
            url: '/tim-viec-lam-moi-nhat-tai-ha-nam-l29',
        },
        {
            name: 'Hà Tĩnh',
            url: '/tim-viec-lam-moi-nhat-tai-ha-tinh-l30',
        },
        {
            name: 'Hậu Giang',
            url: '/tim-viec-lam-moi-nhat-tai-hau-giang-l31',
        },
        {
            name: 'Hoà Bình',
            url: '/tim-viec-lam-moi-nhat-tai-hoa-binh-l32',
        },
        {
            name: 'Khánh Hoà',
            url: '/tim-viec-lam-moi-nhat-tai-khanh-hoa-l33',
        },
        {
            name: 'Kiên Giang',
            url: '/tim-viec-lam-moi-nhat-tai-kien-giang-l34',
        },
        {
            name: 'Kon Tum',
            url: '/tim-viec-lam-moi-nhat-tai-kon-tum-l35',
        },

        {
            name: 'Lai Châu',
            url: '/tim-viec-lam-moi-nhat-tai-lai-chau-l36',
        },
        {
            name: 'Lâm Đồng',
            url: '/tim-viec-lam-moi-nhat-tai-lam-dong-l37',
        },
        {
            name: 'Lạng Sơn',
            url: '/tim-viec-lam-moi-nhat-tai-lang-son-l38',
        },
        {
            name: 'Lào Cai',
            url: '/tim-viec-lam-moi-nhat-tai-lao-cai-l39',
        },
        {
            name: 'Long An',
            url: '/tim-viec-lam-moi-nhat-tai-long-an-l40',
        },
        {
            name: 'Miền Bắc',
            url: '/tim-viec-lam-moi-nhat-tai-mien-bac-l41',
        },
        {
            name: 'Miền Nam',
            url: '/tim-viec-lam-moi-nhat-tai-mien-nam-l42',
        },
        {
            name: 'Miền Trung',
            url: '/tim-viec-lam-moi-nhat-tai-mien-trung-l43',
        },
        {
            name: 'Nam Định',
            url: '/tim-viec-lam-moi-nhat-tai-nam-dinh-l44',
        },
        {
            name: 'Nghệ An',
            url: '/tim-viec-lam-moi-nhat-tai-nghe-an-l45',
        },
        {
            name: 'Ninh Bình',
            url: '/tim-viec-lam-moi-nhat-tai-ninh-binh-l46',
        },
        {
            name: 'Ninh Thuận',
            url: '/tim-viec-lam-moi-nhat-tai-ninh-thuan-l47',
        },
        {
            name: 'Phú Thọ',
            url: '/tim-viec-lam-moi-nhat-tai-phu-tho-l48',
        },
        {
            name: 'Phú Yên',
            url: '/tim-viec-lam-moi-nhat-tai-phu-yen-l49',
        },
        {
            name: 'Quảng Bình',
            url: '/tim-viec-lam-moi-nhat-tai-quang-binh-l50',
        },
        {
            name: 'Quảng Nam',
            url: '/tim-viec-lam-moi-nhat-tai-quang-nam-l51',
        },
        {
            name: 'Quảng Ngãi',
            url: '/tim-viec-lam-moi-nhat-tai-quang-ngai-l52',
        },
        {
            name: 'Quảng Ninh',
            url: '/tim-viec-lam-moi-nhat-tai-quang-ninh-l53',
        },
        {
            name: 'Quảng Trị',
            url: '/tim-viec-lam-moi-nhat-tai-quang-tri-l54',
        },
        {
            name: 'Sóc Trăng',
            url: '/tim-viec-lam-moi-nhat-tai-soc-trang-l55',
        },
        {
            name: 'Sơn La',
            url: '/tim-viec-lam-moi-nhat-tai-son-la-l56',
        },
        {
            name: 'Tây Ninh',
            url: '/tim-viec-lam-moi-nhat-tai-tay-ninh-l57',
        },
        {
            name: 'Thái Bình',
            url: '/tim-viec-lam-moi-nhat-tai-thai-binh-l58',
        },
        {
            name: 'Thái Nguyên',
            url: '/tim-viec-lam-moi-nhat-tai-thai-nguyen-l59',
        },
        {
            name: 'Thanh Hoá',
            url: '/tim-viec-lam-moi-nhat-tai-thanh-hoa-l60',
        },
        {
            name: 'Thừa Thiên Huế',
            url: '/tim-viec-lam-moi-nhat-tai-thua-thien-hue-l61',
        },
        {
            name: 'Tiền Giang',
            url: '/tim-viec-lam-moi-nhat-tai-tien-giang-l62',
        },
        {
            name: 'Toàn Quốc',
            url: '/tim-viec-lam-moi-nhat-tai-toan-quoc-l63',
        },
        {
            name: 'Trà Vinh',
            url: '/tim-viec-lam-moi-nhat-tai-tra-vinh-l64',
        },
        {
            name: 'Tuyên Quang',
            url: '/tim-viec-lam-moi-nhat-tai-tuyen-quang-l65',
        },
        {
            name: 'Vĩnh Long',
            url: '/tim-viec-lam-moi-nhat-tai-vinh-long-l66',
        },
        {
            name: 'Vĩnh Phúc',
            url: '/tim-viec-lam-moi-nhat-tai-vinh-phuc-l67',
        },
        {
            name: 'Yên Bái',
            url: '/tim-viec-lam-moi-nhat-tai-yen-bai-l68',
        },
        {
            name: 'Nước Ngoài',
            url: '/tim-viec-lam-moi-nhat-tai-nuoc-ngoai-l100',
        },
    ];

    const popularJob = [
        {
            id: 1,
            name: 'Nhân viên bán hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-ban-hang',
        },
        {
            id: 2,
            name: 'Chuyên viên quan hệ khách hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-chuyen-vien-quan-he-khach-hang',
        },
        {
            id: 3,
            name: 'Trưởng nhóm bán hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-tr%C6%B0%E1%BB%9Fng-nh%C3%B3m-b%C3%A1n-h%C3%A0ng',
        },
        {
            id: 4,
            name: 'Quản lý Nhà hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-quan-ly-nha-hang',
        },
        {
            id: 5,
            name: 'Quản lý Bán hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-qu%E1%BA%A3n-l%C3%BD-b%C3%A1n-h%C3%A0ng',
        },
        {
            id: 6,
            name: 'Trợ lý kinh doanh',
            link: 'https://www.topcv.vn/tim-viec-lam-tr%E1%BB%A3-l%C3%BD-kinh-doanh',
        },
        {
            id: 7,
            name: 'Quản lý Cửa hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-quan-ly-cua-hang',
        },
        {
            id: 8,
            name: 'Thực tập sinh kinh doanh',
            link: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-kinh-doanh',
        },
        {
            id: 9,
            name: 'Trình dược viên',
            link: 'https://www.topcv.vn/tim-viec-lam-trinh-duoc-vien',
        },
        {
            id: 10,
            name: 'Kinh doanh',
            link: 'https://www.topcv.vn/tim-viec-lam-kinh-doanh',
        },
        {
            id: 11,
            name: 'Trưởng phòng chăm sóc khách hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-truong-phong-cham-soc-khach-hang',
        },
        {
            id: 12,
            name: 'Nhân viên chăm sóc khách hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-cham-soc-khach-hang',
        },
        {
            id: 13,
            name: 'Nhân viên Phát triển thị trường',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-phat-trien-thi-truong',
        },
        {
            id: 14,
            name: 'Nhân viên Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-marketing',
        },
        {
            id: 15,
            name: 'Giám đốc Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-giam-doc-marketing',
        },
        {
            id: 16,
            name: 'Trưởng phòng Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-truong-phong-marketing',
        },
        {
            id: 17,
            name: 'Marketing Manager',
            link: 'https://www.topcv.vn/tim-viec-lam-marketing-manager',
        },
        {
            id: 18,
            name: 'Trưởng nhóm Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-truong-nhom-marketing',
        },
        {
            id: 19,
            name: 'Performance Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-performance-marketing',
        },
        {
            id: 20,
            name: 'Digital Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-digital-marketing',
        },
        {
            id: 21,
            name: 'Marketing Online',
            link: 'https://www.topcv.vn/tim-viec-lam-marketing-online',
        },
        {
            id: 22,
            name: 'Trade Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-trade-marketing',
        },
        {
            id: 23,
            name: 'Trade Marketing Manager',
            link: 'https://www.topcv.vn/tim-viec-lam-trade-marketing-manager',
        },
        {
            id: 24,
            name: 'Nhân viên Facebook Ads',
            link: 'https://www.topcv.vn/tim-viec-lam-nh%C3%A2n-vi%C3%AAn-facebook-ads',
        },
        {
            id: 25,
            name: 'Telemarketing',
            link: 'https://www.topcv.vn/tim-viec-lam-telemarketing',
        },
        {
            id: 26,
            name: 'Content',
            link: 'https://www.topcv.vn/tim-viec-lam-content',
        },
        {
            id: 27,
            name: 'Content Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-content-marketing',
        },
        {
            id: 28,
            name: 'Content Writer',
            link: 'https://www.topcv.vn/tim-viec-lam-content-writer',
        },
        {
            id: 29,
            name: 'Content Creator',
            link: 'https://www.topcv.vn/tim-viec-lam-content-creator',
        },
        {
            id: 30,
            name: 'Copywriter',
            link: 'https://www.topcv.vn/tim-viec-lam-copywriter',
        },
        {
            id: 31,
            name: 'Video Editor',
            link: 'https://www.topcv.vn/tim-viec-lam-video-editor',
        },
        {
            id: 32,
            name: 'Nhân viên Quay/Dựng video',
            link: 'https://www.topcv.vn/tim-viec-lam-nh%C3%A2n-vi%C3%AAn-quay-d%E1%BB%B1ng-video',
        },
        {
            id: 33,
            name: 'Thực tập sinh Marketing',
            link: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-marketing',
        },
        {
            id: 34,
            name: 'Nhân viên SEO',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-seo',
        },
        {
            id: 35,
            name: 'Thực tập sinh SEO',
            link: 'https://www.topcv.vn/tim-viec-lam-th%E1%BB%B1c-t%E1%BA%ADp-sinh-seo',
        },
        {
            id: 36,
            name: 'Biên phiên dịch',
            link: 'https://www.topcv.vn/tim-viec-lam-bi%C3%AAn-phi%C3%AAn-d%E1%BB%8Bch',
        },
        {
            id: 37,
            name: 'Tiếng Nhật',
            link: 'https://www.topcv.vn/tim-viec-lam-tieng-nhat',
        },
        {
            id: 38,
            name: 'Tiếng Hàn',
            link: 'https://www.topcv.vn/tim-viec-lam-tieng-han',
        },
        {
            id: 39,
            name: 'Tiếng Trung',
            link: 'https://www.topcv.vn/tim-viec-lam-tieng-trung',
        },
        {
            id: 40,
            name: 'Tiếng Anh',
            link: 'https://www.topcv.vn/tim-viec-lam-tieng-anh',
        },
        {
            id: 41,
            name: 'Biên phiên dịch Tiếng Nhật',
            link: 'https://www.topcv.vn/tim-viec-lam-bi%C3%AAn-phi%C3%AAn-d%E1%BB%8Bch-ti%E1%BA%BFng-nh%E1%BA%ADt',
        },
        {
            id: 42,
            name: 'Biên phiên dịch Tiếng Hàn',
            link: 'https://www.topcv.vn/tim-viec-lam-bi%C3%AAn-phi%C3%AAn-d%E1%BB%8Bch-ti%E1%BA%BFng-h%C3%A0n',
        },
        {
            id: 43,
            name: 'Biên phiên dịch Tiếng Trung',
            link: 'https://www.topcv.vn/tim-viec-lam-bi%C3%AAn-phi%C3%AAn-d%E1%BB%8Bch-ti%E1%BA%BFng-trung',
        },
        {
            id: 44,
            name: 'Giáo viên Tiếng Nhật',
            link: 'https://www.topcv.vn/tim-viec-lam-gi%C3%A1o-vi%C3%AAn-ti%E1%BA%BFng-nh%E1%BA%ADt',
        },
        {
            id: 45,
            name: 'Giáo viên Tiếng Hàn',
            link: 'https://www.topcv.vn/tim-viec-lam-gi%C3%A1o-vi%C3%AAn-ti%E1%BA%BFng-h%C3%A0n',
        },
        {
            id: 46,
            name: 'Giáo viên Tiếng Trung',
            link: 'https://www.topcv.vn/tim-viec-lam-gi%C3%A1o-vi%C3%AAn-ti%E1%BA%BFng-trung',
        },
        {
            id: 47,
            name: 'Giáo viên Tiếng Anh',
            link: 'https://www.topcv.vn/tim-viec-lam-giao-vien-tieng-anh',
        },
        {
            id: 48,
            name: 'Thiết kế đồ hoạ/Designer',
            link: 'https://www.topcv.vn/tim-viec-lam-thi%E1%BA%BFt-k%E1%BA%BF-%C4%91%E1%BB%93-ho%E1%BA%A1-designer',
        },
        {
            id: 49,
            name: 'Thiết kế nội thất',
            link: 'https://www.topcv.vn/tim-viec-lam-thiet-ke-noi-that',
        },
        {
            id: 50,
            name: 'Thiết kế website',
            link: 'https://www.topcv.vn/tim-viec-lam-thiet-ke-website',
        },
        {
            id: 51,
            name: 'Trưởng phòng nhân sự',
            link: 'https://www.topcv.vn/tim-viec-lam-truong-phong-nhan-su',
        },
        {
            id: 52,
            name: 'Tuyển dụng/Nhân sự',
            link: 'https://www.topcv.vn/tim-viec-lam-tuy%E1%BB%83n-d%E1%BB%A5ng-nh%C3%A2n-s%E1%BB%B1',
        },
        {
            id: 53,
            name: 'Hành chính nhân sự',
            link: 'https://www.topcv.vn/tim-viec-lam-hanh-chinh-nhan-su',
        },
        {
            id: 54,
            name: 'Nhân viên hành chính',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-hanh-chinh',
        },
        {
            id: 55,
            name: 'Nhân viên mua hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-mua-hang',
        },
        {
            id: 56,
            name: 'Nhân viên văn phòng',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-van-phong',
        },
        {
            id: 57,
            name: 'Nhân viên nhập liệu',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-nhap-lieu',
        },
        {
            id: 58,
            name: 'Chuyên viên tuyển dụng',
            link: 'https://www.topcv.vn/tim-viec-lam-chuyen-vien-tuyen-dung',
        },
        {
            id: 59,
            name: 'Thực tập sinh Nhân sự',
            link: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-nhan-su',
        },
        {
            id: 60,
            name: 'Truyền thông nội bộ',
            link: 'https://www.topcv.vn/tim-viec-lam-truyen-thong-noi-bo',
        },
        {
            id: 61,
            name: 'Truyền thông',
            link: 'https://www.topcv.vn/tim-viec-lam-truyen-thong',
        },
        {
            id: 62,
            name: 'Nhân viên Tư vấn',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-tu-van',
        },
        {
            id: 63,
            name: 'Nhân viên Tư vấn tuyển sinh',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-tu-van-tuyen-sinh',
        },
        {
            id: 64,
            name: 'Tư vấn tài chính',
            link: 'https://www.topcv.vn/tim-viec-lam-t%C6%B0-v%E1%BA%A5n-t%C3%A0i-ch%C3%ADnh',
        },
        {
            id: 65,
            name: 'Nhân viên Kế toán',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-ke-toan',
        },
        {
            id: 66,
            name: 'Kế toán trưởng',
            link: 'https://www.topcv.vn/tim-viec-lam-ke-toan-truong',
        },
        {
            id: 67,
            name: 'Kế toán kho',
            link: 'https://www.topcv.vn/tim-viec-lam-ke-toan-kho',
        },
        {
            id: 68,
            name: 'Kế toán bán hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-ke-toan-ban-hang',
        },
        {
            id: 69,
            name: 'Kế toán tổng hợp',
            link: 'https://www.topcv.vn/tim-viec-lam-ke-toan-tong-hop',
        },
        {
            id: 70,
            name: 'Thực tập sinh kế toán',
            link: 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-ke-toan',
        },
        {
            id: 71,
            name: 'Nhân viên Thu ngân',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-thu-ngan',
        },
        {
            id: 72,
            name: 'Ngân hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-ngan-hang',
        },
        {
            id: 73,
            name: 'Nhân viên kinh doanh bất động sản',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-kinh-doanh-bat-dong-san',
        },
        {
            id: 74,
            name: 'Nhân viên tư vấn bất động sản',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-tu-van-bat-dong-san',
        },
        {
            id: 75,
            name: 'Bất động sản',
            link: 'https://www.topcv.vn/tim-viec-lam-bat-dong-san',
        },
        {
            id: 76,
            name: 'Kiểm toán viên',
            link: 'https://www.topcv.vn/tim-viec-lam-ki%E1%BB%83m-to%C3%A1n-vi%C3%AAn',
        },
        {
            id: 77,
            name: 'Account Executive',
            link: 'https://www.topcv.vn/tim-viec-lam-account-executive',
        },
        {
            id: 78,
            name: 'Account Manager',
            link: 'https://www.topcv.vn/tim-viec-lam-account-manager',
        },
        {
            id: 79,
            name: 'Giám đốc dự án',
            link: 'https://www.topcv.vn/tim-viec-lam-giam-doc-du-an',
        },
        {
            id: 80,
            name: 'Giám đốc điều hành',
            link: 'https://www.topcv.vn/tim-viec-lam-giam-doc-dieu-hanh',
        },
        {
            id: 81,
            name: 'Trợ lý giám đốc',
            link: 'https://www.topcv.vn/tim-viec-lam-tro-ly-giam-doc',
        },
        {
            id: 82,
            name: 'Nhân viên lái xe',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-l%C3%A1i-xe',
        },
        {
            id: 83,
            name: 'Nhân viên giao hàng',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-giao-hang',
        },
        {
            id: 84,
            name: 'Nhân viên kho',
            link: 'https://www.topcv.vn/tim-viec-lam-nhan-vien-kho',
        },
        {
            id: 85,
            name: 'Kỹ sư cơ khí',
            link: 'https://www.topcv.vn/tim-viec-lam-ky-su-co-khi',
        },
        {
            id: 86,
            name: 'Bán thời gian',
            link: 'https://www.topcv.vn/tim-viec-lam-ban-thoi-gian',
        },
        {
            id: 87,
            name: 'Quản lý',
            link: 'https://www.topcv.vn/tim-viec-lam-quan-ly',
        },
        {
            id: 88,
            name: 'Trợ lý',
            link: 'https://www.topcv.vn/tim-viec-lam-tro-ly',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content-seo-box')} dangerouslySetInnerHTML={{ __html: HTMLContent }}></div>

                <div className={cx('box-seo-categories')}>
                    <h3 className={cx('title')}>Từ khóa tìm kiếm việc làm phổ biến tại TVNow</h3>
                    <div className={cx('list-categories')}>
                        <div className={cx('item')}>
                            <div className={cx('box-general')}>
                                <h2 className={cx('title-box')}>Tìm việc làm theo ngành nghề</h2>
                                <ul className={cx('list-job')}>
                                    {jobByIndustry.map((item) => (
                                        <li key={item.id}>
                                            <a href={item.url} title={item.name}>
                                                Việc làm {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('box-general')}>
                                <h2 className={cx('title-box')}>Tìm việc làm tại nhà</h2>
                                <ul className={cx('list-job')}>
                                    {jobByLocation.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.url} title={item.name}>
                                                Việc làm {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={cx('box-general')}>
                                <h2 className={cx('title-box')}>Tìm việc làm phổ biến</h2>
                                <ul className={cx('list-job')}>
                                    {popularJob.map((item) => (
                                        <li key={item.id}>
                                            <a href={item.link} title={item.name}>
                                                Tìm việc làm {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEO;
