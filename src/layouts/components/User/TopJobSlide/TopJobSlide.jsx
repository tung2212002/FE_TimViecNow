import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';

import styles from './TopJobSlide.module.scss';
import { icons } from '../../../../assets';
import { getListCategoryService } from '../../../../services/categoryService';
import path from '../../../../constants/path';

const cx = classNames.bind(styles);

const TopJobSlide = () => {
    const navigate = useNavigate();
    const listIcon = [
        {
            id: 1,
            slug: 'kinh-doanh-ban-hang',
            icon: icons.icon_market,
        },
        {
            id: 2,
            slug: 'bien-phien-dich',
            icon: icons.icon_interpreter,
        },
        {
            id: 3,
            slug: 'bao-chi-truyen-hinh',
            icon: icons.icon_tv,
        },
        {
            id: 4,
            slug: 'buu-chinh-vien-thong',
            icon: icons.icon_EaT,
        },
        {
            id: 5,
            slug: 'bao-hiem',
            icon: icons.icon_dots,
        },

        {
            id: 6,
            slug: 'bat-dong-san',
            icon: icons.icon_real_estate,
        },
        {
            id: 8,
            slug: 'cong-nghe-cao',
            icon: icons.icon_high_technology,
        },
        {
            id: 10,
            slug: 'du-lich',
            icon: icons.icon_tourism,
        },
        {
            id: 11,
            slug: 'dien-tu-vien-thong',
            icon: icons.icon_EaT,
        },
        {
            id: 12,
            slug: 'hoa-hoc-sinh-hoc',
            icon: icons.icon_mechanical,
        },
        {
            id: 21,
            slug: 'hang-khong',
            icon: icons.icon_tourism,
        },
        {
            id: 25,
            slug: 'it-phan-mem',
            icon: icons.icon_sofware,
        },
        {
            id: 26,
            slug: 'khach-san-nha-hang',
            icon: icons.icon_hotel,
        },
        {
            id: 22,
            slug: 'hanh-chinh-van-phong',
            icon: icons.icon_office,
        },
        {
            id: 16,
            slug: 'giao-duc-dao-tao',
            icon: icons.icon_education,
        },
        {
            id: 44,
            slug: 'logistics',
            icon: icons.icon_counselor,
        },
        {
            id: 28,
            slug: 'marketing-truyen-thong-quang-cao',
            icon: icons.icon_media,
        },
        {
            id: 46,
            slug: 'xay-dung',
            icon: icons.icon_transport,
        },
        {
            id: 27,
            slug: 'ke-toan-kiem-toan',
            icon: icons.icon_accountant,
        },
        {
            id: 36,
            slug: 'quan-ly-chat-luong-qa-qc',
            icon: icons.icon_qaqc,
        },
        {
            id: 65,
            slug: 'cong-nghe-thong-tin',
            icon: icons.icon_it,
        },
        {
            id: 27,
            slug: 'ke-toan-kiem-toan',
            icon: icons.icon_secretary,
        },
        {
            id: 41,
            slug: 'tu-van',
            icon: icons.icon_service,
        },
        {
            id: 37,
            slug: 'quan-ly-dieu-hanh',
            icon: icons.icon_construction,
        },
        {
            id: 47,
            slug: 'y-te-duoc',
            icon: icons.icon_medicine,
        },
        {
            id: 34,
            slug: 'nong-lam-ngu-nghiep',
            icon: icons.icon_agrilculture,
        },
        {
            id: 9,
            slug: 'co-khi-che-tao-tu-dong-hoa',
            icon: icons.icon_mechanical,
        },
        {
            id: 56,
            slug: 'hang-tieu-dung',
            icon: icons.icon_tv,
        },
        {
            id: 57,
            slug: 'kien-truc',
            icon: icons.icon_architecture,
        },
        {
            id: 59,
            slug: 'san-pham-cong-nghiep',
            icon: icons.icon_manufacture,
        },
        {
            id: 60,
            slug: 'san-xuat',
            icon: icons.icon_manufacture,
        },
        {
            id: 64,
            slug: 'spa-lam-dep',
            icon: icons.icon_spa,
        },
        {
            id: 62,
            slug: 'thiet-ke-noi-that',
            icon: icons.icon_architecture,
        },
        {
            id: 66,
            slug: 'ngo-phi-chinh-phu-phi-loi-nhuan',
            icon: icons.icon_law,
        },
        {
            id: 58,
            slug: 'phi-chinh-phu-phi-loi-nhuan',
            icon: icons.icon_law,
        },
        {
            id: 38,
            slug: 'thiet-ke-do-hoa',
            icon: icons.icon_graphic_design,
        },
        {
            id: 33,
            slug: 'nhan-su',
            icon: icons.icon_hr,
        },
        {
            id: 32,
            slug: 'ngan-hang-tai-chinh',
            icon: icons.icon_service,
        },
        {
            id: 63,
            slug: 'thu-ky-tro-ly',
            icon: icons.icon_secretary,
        },
        {
            id: 15,
            slug: 'dien-dien-tu-dien-lanh',
            icon: icons.icon_electrical,
        },
        {
            id: 61,
            slug: 'tai-chinh-dau-tu',
            icon: icons.icon_finance,
        },
        {
            id: 37,
            slug: 'quan-ly-dieu-hanh',
            icon: icons.icon_manager_operation,
        },
        {
            id: 55,
            slug: 'hang-cao-cap',
            icon: icons.icon_high_technology,
        },
        {
            id: 7,
            slug: 'chung-khoan-vang-ngoai-te',
            icon: icons.icon_stock,
        },
    ];

    const [categories, setCategories] = useState([]);
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

    const handleNavigate = (category_id) => {
        navigate(path.JOB_FILTER, { state: { category_id } });
    };

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

    useEffect(() => {
        getListCategoryService()
            .then((res) => {
                if (res.status == 200) {
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                    {categories.map((item, index) => (
                        <div key={index} className={cx('slide')}>
                            <div className={cx('item')}>
                                <a className={cx('content')} onClick={() => handleNavigate(item.id)}>
                                    <img
                                        src={listIcon.find((icon) => icon.slug === item.slug)?.icon || icons.icon_dots}
                                        className={cx('icon')}
                                        alt={item.name}
                                    />
                                    <label className={cx('label')}>{item.name}</label>
                                    <h3 className={cx('title')}>{item.count} việc làm</h3>
                                </a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

TopJobSlide.propTypes = {};

export default TopJobSlide;
