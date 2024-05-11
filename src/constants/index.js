export const bageNavbarMenu = [
    {
        id: 1,
        text: 'Mới',
    },
    {
        id: 2,
        text: 'Hot',
    },
    {
        id: 3,
        text: 'Tuyển dụng',
    },
];

export const listGenderOption = [
    {
        id: 1,
        name: 'Nam',
        value: 'male',
    },
    {
        id: 2,
        name: 'Nữ',
        value: 'female',
    },
    {
        id: 3,
        name: 'Không yêu cầu',
        value: 'other',
    },
];

export const listGender = [
    {
        id: 1,
        name: 'Nam',
        value: 'male',
    },
    {
        id: 2,
        name: 'Nữ',
        value: 'famale',
    },
];

export const listWorkPosition = [
    { value: '0', name: 'Nhân viên' },
    { value: '1', name: 'Trưởng nhóm' },
    { value: '2', name: 'Phó phòng' },
    { value: '3', name: 'Trưởng phòng' },
    { value: '4', name: 'Phó giám đốc' },
    { value: '5', name: 'Giám đốc' },
    { value: '6', name: 'Tổng giám đốc' },
];

export const listJobEmployerLevel = [
    { value: '1', name: 'Nhân viên', id: 1 },
    { value: '2', name: 'Trưởng nhóm', id: 2 },
    { value: '3', name: 'Trưởng / Phó phòng', id: 3 },
    { value: '4', name: 'Quản lý / Giám sát', id: 4 },
    { value: '5', name: 'Trưởng chi nhánh', id: 5 },
    { value: '6', name: 'Phó giám đốc', id: 6 },
    { value: '7', name: 'Giám đốc', id: 7 },
    { value: '8', name: 'Thực tập sinh', id: 8 },
];

export const listScale = ['1-9', '10-24', '25-99', '100-499', '500-1000', '1000+', '3000+', '5000+', '10000+'];

export const JobStatus = [
    { id: 1, value: 'pending', name: 'Đang chờ duyệt' },
    { id: 2, value: 'published', name: 'Đang hiển thị' },
    { id: 3, value: 'rejected', name: 'Bị từ chối' },
    { id: 4, value: 'expired', name: 'Hết hạn' },
    { id: 5, value: 'draft', name: 'Nháp' },
    { id: 6, value: 'banned', name: 'Bị cấm' },
    { id: 7, value: 'stopped', name: 'Không hiển thị' },
    { id: 8, value: 'all', name: 'Tất cả' },
];

export const JobApprovalStatus = [
    { id: 1, value: 'pending', name: 'Đang chờ duyệt' },
    { id: 2, value: 'approved', name: 'Đã duyệt' },
    { id: 3, value: 'rejected', name: 'Bị từ chối' },
    { id: 4, value: 'stopped', name: 'Chưa yêu cầu duyệt' },
    { id: 5, value: 'all', name: 'Tất cả' },
];

export const Experience = [
    {
        id: 0,
        name: 'Tất cả kinh nghiệm',
    },
    {
        id: 1,
        name: 'Chưa có kinh nghiệm',
    },
    {
        id: 2,
        name: 'Dưới 1 năm',
    },
    {
        id: 3,
        name: '1 năm',
    },
    {
        id: 4,
        name: '2 năm',
    },
    {
        id: 5,
        name: '3 năm',
    },
    {
        id: 6,
        name: '4 năm',
    },
    {
        id: 7,
        name: '5 năm',
    },
    {
        id: 8,
        name: 'Trên 5 năm',
    },
];

export const EmploymentType = [
    {
        id: 1,
        name: 'Toàn thời gian',
        value: 'full_time',
    },
    {
        id: 2,
        name: 'Bán thời gian',
        value: 'part_time',
    },
    {
        id: 3,
        name: 'Thực tập',
        value: 'internship',
    },
];

export const filterSalary = [
    {
        id: 1,
        name: 'Tất cả mức lương',
        start: '',
        end: '',
    },
    {
        id: 2,
        name: 'Dưới 10 triệu',
        start: '',
        end: 10,
    },
    {
        id: 3,
        name: '10 - 15 triệu',
        start: 10,
        end: 15,
    },
    {
        id: 4,
        name: '15 - 20 triệu',
        start: 15,
        end: 20,
    },
    {
        id: 5,
        name: '20 - 25 triệu',
        start: 20,
        end: 25,
    },
    {
        id: 6,
        name: '25 - 30 triệu',
        start: 25,
        end: 30,
    },
    {
        id: 7,
        name: '30 - 50 triệu',
        start: 30,
        end: 50,
    },
    {
        id: 8,
        name: 'Trên 50 triệu',
        start: 50,
        end: '',
    },
    {
        id: 9,
        name: 'Thỏa thuận',
        start: '',
        end: '',
    },
];

export const settingBusinessState = {
    SEARCH: 1,
    CREATE: 2,
    INFO: 3,
    SETTING: 4,
};
