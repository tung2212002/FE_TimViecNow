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

const cx = classNames.bind(styles);

const AppliedJobPage = () => {
    const [state, setState] = useState(0);

    const [job, setJob] = useState({
        jobs: [
            {
                campaign_id: 1,
                title: 'Nhân Viên Thiết Kế Đồ Họa',
                max_salary: 12000000,
                min_salary: 9000000,
                salary_type: 'vnd',
                job_description:
                    '\n<ul><li>Thiết kế các ấn phẩm phục vụ truyền thông thương hiệu bao gồm: ấn phẩm online/offline, quảng cáo Social (Facebook, tiktok, insgram...), truyền thông nội bộ...</li><li>Thực hiện quản lý hình ảnh các dự án đảm bảo tính nhất quán và đặc điểm nhận dạng thương hiệu</li><li>Phối hợp cùng trưởng dự án và marketing triển khai các ý tưởng sáng tạo</li><li>Hỗ trợ cắt video đơn giản</li><li>Hỗ trợ vẽ linh vật cho các ứng dụng nếu có khả năng vẽ tay</li></ul>\n',
                job_requirement:
                    '\n<ul><li>Tốt nghiệp các ngành liên quan đến Thiết kế, Đồ hoạ, Mỹ thuật...</li><li>Có ít nhất 01 năm kinh nghiệm trong lĩnh vực Thiết kế đồ họa;</li><li>Thành thạo các phần mềm thiết kế như Photoshop, Premiere, After Effect... ;</li><li>Sáng tạo, có khả năng làm việc độc lập cũng như tinh thần làm việc theo nhóm.</li></ul>\n',
                job_benefit:
                    '\n<ul><li>Thu nhập: 8 - 12 triệu + phụ cấp + thưởng</li><li>Chế độ khen thưởng, phúc lợi: Tham gia BHXH đầy đủ; chính sách khen thưởng theo tháng/quý/năm; lương tháng 13; thưởng nhân các ngày lễ/tết trong năm; nghỉ dưỡng định kỳ...</li><li>Chế độ đào tạo: Được công ty đầu tư tham gia các khóa đào tạo về nghiệp vụ, kỹ năng cần thiết theo yêu cầu công việc và các khóa học phát huy tiềm năng con người, thay đổi tư duy và cách thức tiếp cận mọi vấn đề hướng đến văn hóa mang lại hạnh phúc cho mọi nhân viên.</li></ul>\n',
                phone_number_contact: '0374064048',
                full_name_contact: 'Ngô Minh Quang',
                employment_type: 'full_time',
                gender_requirement: 'other',
                deadline: '2024-05-16',
                quantity: 1,
                job_location: '',
                working_time_text: '""',
                job_position_id: 1,
                job_experience_id: 3,
                id: 1,
                updated_at: '2024-05-29T20:38:22',
                created_at: '2024-05-30T20:38:22',
                is_featured: false,
                is_highlight: false,
                is_urgent: false,
                is_paid_featured: false,
                is_bg_featured: false,
                is_vip_employer: false,
                is_diamond_employer: false,
                is_job_flash: false,
                employer_verified: false,
                is_new: false,
                is_hot: false,
                email_contact: ['ngominhquang@gmail.com'],
                status: 'published',
                locations: [
                    {
                        province: {
                            name: 'Hà Nội',
                            code: '1',
                            name_with_type: 'Thành phố Hà Nội',
                            slug: 'thanh-pho-ha-noi',
                            type: 'thanh-pho',
                            country: 'Việt Nam',
                            id: 1,
                        },
                        district: null,
                        description: 'Toà nhà Toyota Thanh Xuân,315 Trường Chinh',
                    },
                ],
                categories: [
                    {
                        name: 'Marketing / Truyền thông / Quảng cáo',
                        slug: 'marketing-truyen-thong-quang-cao',
                        description: null,
                        id: 28,
                        count: 6385,
                    },
                    {
                        name: 'Mỹ thuật / Nghệ thuật / Điện ảnh',
                        slug: 'my-thuat-nghe-thuat-dien-anh',
                        description: null,
                        id: 31,
                        count: 530,
                    },
                    {
                        name: 'Thiết kế đồ họa',
                        slug: 'thiet-ke-do-hoa',
                        description: null,
                        id: 38,
                        count: 1206,
                    },
                ],
                working_times: [],
                must_have_skills: [],
                should_have_skills: [],
                company: {
                    id: 1,
                    name: 'Công ty Cổ phần Công nghệ eUp',
                    email: 'congtycophancongngheeup@gmail.com',
                    type: 'company',
                    phone_number: '0374064048',
                    is_premium: false,
                    label: null,
                    logo: 'https://static.topcv.vn/company_logos/00d229a2b71a4c9f808e1dba3e705e01-6194d04ad2151.jpg',
                    website: 'https://eupgroup.net/',
                    address: '\nTòa nhà Toyota Thanh Xuân, 315 Trường Chinh, Thanh Xuân, Hà Nội\n',
                    company_short_description:
                        '\nCông ty Cổ phần Công nghệ eUp (eUp) là một Công ty Công nghệ hàng đầu tại Việt Nam trong lĩnh vực cung cấp Giải pháp Học tập. Tới nay, eUp đã cho ra mắt nhiều ứng dụng học tập được hàng triệu triệu người dùng tại Việt Nam và trên toàn Thế giới yêu thích và sử dụng hằng ngày như ứng dụng Từ điển tiếng Nhật Mazii; Từ vựng và Ngữ pháp HeyJapanese; Từ điển tiếng Trung Hanzii; Đọc báo TODAI; Luyện thi Migii,… và rất nhiều ứng dụng rất thiết thực dành cho các ngôn ngữ khác như tiếng Pháp; Tây Ban Nha;... Với hơn 7 năm trong ngành Công nghệ Giáo dục, eUp luôn nỗ lực không ngừng để thực hiện sứ mệnh giúp hàng triệu triệu người học tiếp cận với hệ thống giải pháp học tập đơn giản, thông minh và tiện ích hơn bao giờ hết.Tầm nhìn: “Năm 2030 eUp sẽ trở thành Công ty Công nghệ hàng đầu trong lĩnh vực Giải pháp Học tập”.Sứ mệnh: “Đơn giản việc học và dạy. Tiếp bước, xây dựng ước mơ cho triệu triệu người vươn đến đỉnh cao tri thức”.Giá trị cốt lõi: “Tận tâm - Tinh thần đồng đội - Đổi mới và phát triển”.Tại eUp, từng thành viên luôn được sống với triết lý: “Muốn đi nhanh thì đi một mình. Muốn đi xa hãy đi cùng nhau”. Vì vậy, từng nhân sự tại eUp không chỉ được trao các cơ hội để tỏa sáng theo một cách riêng, mà còn được mài dũa để luôn sẵn sàng đương đầu với khó khăn và luôn say “Yes” với mọi vấn đề.\n\n',
                    scale: '25-99',
                    is_verified: true,
                    total_active_jobs: 0,
                    tax_code: '5677450812',
                    banner: 'https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
                    fields: [
                        {
                            name: 'IT - Phần mềm',
                            slug: 'it---phan-mem',
                            description: null,
                            id: 1,
                        },
                        {
                            name: 'Giáo dục / Đào tạo',
                            slug: 'giao-duc-/-dao-tao',
                            description: null,
                            id: 26,
                        },
                    ],
                },
            },
            {
                campaign_id: 1,
                title: 'Nhân Viên Thiết Kế Đồ Họa',
                max_salary: 12000000,
                min_salary: 9000000,
                salary_type: 'vnd',
                job_description:
                    '\n<ul><li>Thiết kế các ấn phẩm phục vụ truyền thông thương hiệu bao gồm: ấn phẩm online/offline, quảng cáo Social (Facebook, tiktok, insgram...), truyền thông nội bộ...</li><li>Thực hiện quản lý hình ảnh các dự án đảm bảo tính nhất quán và đặc điểm nhận dạng thương hiệu</li><li>Phối hợp cùng trưởng dự án và marketing triển khai các ý tưởng sáng tạo</li><li>Hỗ trợ cắt video đơn giản</li><li>Hỗ trợ vẽ linh vật cho các ứng dụng nếu có khả năng vẽ tay</li></ul>\n',
                job_requirement:
                    '\n<ul><li>Tốt nghiệp các ngành liên quan đến Thiết kế, Đồ hoạ, Mỹ thuật...</li><li>Có ít nhất 01 năm kinh nghiệm trong lĩnh vực Thiết kế đồ họa;</li><li>Thành thạo các phần mềm thiết kế như Photoshop, Premiere, After Effect... ;</li><li>Sáng tạo, có khả năng làm việc độc lập cũng như tinh thần làm việc theo nhóm.</li></ul>\n',
                job_benefit:
                    '\n<ul><li>Thu nhập: 8 - 12 triệu + phụ cấp + thưởng</li><li>Chế độ khen thưởng, phúc lợi: Tham gia BHXH đầy đủ; chính sách khen thưởng theo tháng/quý/năm; lương tháng 13; thưởng nhân các ngày lễ/tết trong năm; nghỉ dưỡng định kỳ...</li><li>Chế độ đào tạo: Được công ty đầu tư tham gia các khóa đào tạo về nghiệp vụ, kỹ năng cần thiết theo yêu cầu công việc và các khóa học phát huy tiềm năng con người, thay đổi tư duy và cách thức tiếp cận mọi vấn đề hướng đến văn hóa mang lại hạnh phúc cho mọi nhân viên.</li></ul>\n',
                phone_number_contact: '0374064048',
                full_name_contact: 'Ngô Minh Quang',
                employment_type: 'full_time',
                gender_requirement: 'other',
                deadline: '2024-05-16',
                quantity: 1,
                job_location: '',
                working_time_text: '""',
                job_position_id: 1,
                job_experience_id: 3,
                id: 1,
                updated_at: '2024-05-29T20:38:22',
                created_at: '2024-05-30T20:38:22',
                is_featured: false,
                is_highlight: false,
                is_urgent: false,
                is_paid_featured: false,
                is_bg_featured: false,
                is_vip_employer: false,
                is_diamond_employer: false,
                is_job_flash: false,
                employer_verified: false,
                is_new: false,
                is_hot: false,
                email_contact: ['ngominhquang@gmail.com'],
                status: 'published',
                locations: [
                    {
                        province: {
                            name: 'Hà Nội',
                            code: '1',
                            name_with_type: 'Thành phố Hà Nội',
                            slug: 'thanh-pho-ha-noi',
                            type: 'thanh-pho',
                            country: 'Việt Nam',
                            id: 1,
                        },
                        district: null,
                        description: 'Toà nhà Toyota Thanh Xuân,315 Trường Chinh',
                    },
                ],
                categories: [
                    {
                        name: 'Marketing / Truyền thông / Quảng cáo',
                        slug: 'marketing-truyen-thong-quang-cao',
                        description: null,
                        id: 28,
                        count: 6385,
                    },
                    {
                        name: 'Mỹ thuật / Nghệ thuật / Điện ảnh',
                        slug: 'my-thuat-nghe-thuat-dien-anh',
                        description: null,
                        id: 31,
                        count: 530,
                    },
                    {
                        name: 'Thiết kế đồ họa',
                        slug: 'thiet-ke-do-hoa',
                        description: null,
                        id: 38,
                        count: 1206,
                    },
                ],
                working_times: [],
                must_have_skills: [],
                should_have_skills: [],
                company: {
                    id: 1,
                    name: 'Công ty Cổ phần Công nghệ eUp',
                    email: 'congtycophancongngheeup@gmail.com',
                    type: 'company',
                    phone_number: '0374064048',
                    is_premium: false,
                    label: null,
                    logo: 'https://static.topcv.vn/company_logos/00d229a2b71a4c9f808e1dba3e705e01-6194d04ad2151.jpg',
                    website: 'https://eupgroup.net/',
                    address: '\nTòa nhà Toyota Thanh Xuân, 315 Trường Chinh, Thanh Xuân, Hà Nội\n',
                    company_short_description:
                        '\nCông ty Cổ phần Công nghệ eUp (eUp) là một Công ty Công nghệ hàng đầu tại Việt Nam trong lĩnh vực cung cấp Giải pháp Học tập. Tới nay, eUp đã cho ra mắt nhiều ứng dụng học tập được hàng triệu triệu người dùng tại Việt Nam và trên toàn Thế giới yêu thích và sử dụng hằng ngày như ứng dụng Từ điển tiếng Nhật Mazii; Từ vựng và Ngữ pháp HeyJapanese; Từ điển tiếng Trung Hanzii; Đọc báo TODAI; Luyện thi Migii,… và rất nhiều ứng dụng rất thiết thực dành cho các ngôn ngữ khác như tiếng Pháp; Tây Ban Nha;... Với hơn 7 năm trong ngành Công nghệ Giáo dục, eUp luôn nỗ lực không ngừng để thực hiện sứ mệnh giúp hàng triệu triệu người học tiếp cận với hệ thống giải pháp học tập đơn giản, thông minh và tiện ích hơn bao giờ hết.Tầm nhìn: “Năm 2030 eUp sẽ trở thành Công ty Công nghệ hàng đầu trong lĩnh vực Giải pháp Học tập”.Sứ mệnh: “Đơn giản việc học và dạy. Tiếp bước, xây dựng ước mơ cho triệu triệu người vươn đến đỉnh cao tri thức”.Giá trị cốt lõi: “Tận tâm - Tinh thần đồng đội - Đổi mới và phát triển”.Tại eUp, từng thành viên luôn được sống với triết lý: “Muốn đi nhanh thì đi một mình. Muốn đi xa hãy đi cùng nhau”. Vì vậy, từng nhân sự tại eUp không chỉ được trao các cơ hội để tỏa sáng theo một cách riêng, mà còn được mài dũa để luôn sẵn sàng đương đầu với khó khăn và luôn say “Yes” với mọi vấn đề.\n\n',
                    scale: '25-99',
                    is_verified: true,
                    total_active_jobs: 0,
                    tax_code: '5677450812',
                    banner: 'https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
                    fields: [
                        {
                            name: 'IT - Phần mềm',
                            slug: 'it---phan-mem',
                            description: null,
                            id: 1,
                        },
                        {
                            name: 'Giáo dục / Đào tạo',
                            slug: 'giao-duc-/-dao-tao',
                            description: null,
                            id: 26,
                        },
                    ],
                },
            },
        ],
        total: 1,
        fetchPage: 1,
        loading: false,
        filter_by: 'none',
    });

    const handleSetFilter = (value) => {
        setState(value);
    };

    const handlePrevPage = () => {
        setJob((prev) => ({ ...prev, fetchPage: prev.fetchPage - 1 }));
    };

    const handleNextPage = () => {
        setJob((prev) => ({ ...prev, fetchPage: prev.fetchPage + 1 }));
    };

    useEffect(() => {
        setJob((prev) => ({ ...prev, loading: true }));
        setTimeout(() => {
            setJob((prev) => ({ ...prev, loading: false }));
        }, 1000);
    }, [state]);

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
                                                        {cVAppliedStatus.find((item) => item.value === state)?.name || 'Trạng thái'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        body={() => (
                                            <ul className={cx('ul-select')}>
                                                {cVAppliedStatus.map((item) => (
                                                    <li
                                                        key={item.value}
                                                        className={cx('item', { active: item.value === state })}
                                                        onClick={() => handleSetFilter(item.value)}
                                                    >
                                                        <span className={cx('text')}>{item.name}</span>
                                                        {item.value === state && <HiCheck className={cx('icon-check')} />}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        icon={() => <FaCaretDown className={cx('icon-care')} />}
                                        itemSelect={cVAppliedStatus.find((item) => item.id === state)?.name}
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
                                {job.jobs.map((item, index) => (
                                    <div className={cx('box')} key={index}>
                                        <AppliedJobComponent job={item} />
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
                                    <img src={images.empty_02} alt="empty" className={cx('img-empty')} />
                                    <p className={cx('text')}>Bạn chưa lưu công việc nào!</p>
                                    <Link to={route.JOB_SEARCH} className={cx('btn')}>
                                        Tìm việc ngay
                                    </Link>
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
                                        <span className={cx('number')}>{job.fetchPage}</span> / {Math.ceil(job.total / 40)} trang
                                    </p>
                                    <span
                                        className={cx('btn', job.fetchPage === Math.ceil(job.total / 5) ? 'deactive' : '')}
                                        onClick={handleNextPage}
                                        disabled={job.fetchPage === Math.ceil(job.total / 5)}
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
