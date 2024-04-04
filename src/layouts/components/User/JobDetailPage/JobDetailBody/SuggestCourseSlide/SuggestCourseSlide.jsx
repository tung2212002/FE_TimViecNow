import { useRef } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TippyText from '@tippyjs/react';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';
import { FaGraduationCap } from 'react-icons/fa6';

import styles from './SuggestCourseSlide.module.scss';

const cx = classNames.bind(styles);

const SuggestCourseSlide = () => {
    const fakeData = {
        status: 'success',
        courses: [
            {
                id: 1,
                name: 'EXG01 - Tuy\u1ec7t \u0111\u1ec9nh Excel - Tr\u1edf th\u00e0nh b\u1eadc th\u1ea7y Excel trong 16 gi\u1edd',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/3.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/exg01-tuyet-dinh-excel-tro-thanh-bac-thay-excel-trong-16-gio?utm_source=topcv&utm_medium=EXG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 2,
                name: 'PPG01 - Tuy\u1ec7t \u0111\u1ec9nh PowerPoint - Chinh ph\u1ee5c m\u1ecdi \u00e1nh nh\u00ecn trong 9 b\u01b0\u1edbc',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/4.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/ppg01-tuyet-dinh-powerpoint-truc-quan-hoa-moi-slide-trong-9-buoc?utm_source=topcv&utm_medium=PPG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 3,
                name: 'WOG01 - Tuy\u1ec7t \u0111\u1ec9nh Microsoft Word - Chuy\u00ean gia so\u1ea1n th\u1ea3o v\u0103n b\u1ea3n',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/6.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/wog01-tuyet-dinh-microsoft-word-chuyen-gia-soan-thao-van-ban?utm_source=topcv&utm_medium=WOG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 4,
                name: 'PPG01 - Tuy\u1ec7t \u0111\u1ec9nh PowerPoint - Chinh ph\u1ee5c m\u1ecdi \u00e1nh nh\u00ecn trong 9 b\u01b0\u1edbc',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/4.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/ppg01-tuyet-dinh-powerpoint-truc-quan-hoa-moi-slide-trong-9-buoc?utm_source=topcv&utm_medium=PPG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 6,
                name: 'WOG01 - Tuy\u1ec7t \u0111\u1ec9nh Microsoft Word - Chuy\u00ean gia so\u1ea1n th\u1ea3o v\u0103n b\u1ea3n',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/6.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/wog01-tuyet-dinh-microsoft-word-chuyen-gia-soan-thao-van-ban?utm_source=topcv&utm_medium=WOG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 11,
                name: 'PPG01 - Tuy\u1ec7t \u0111\u1ec9nh PowerPoint - Chinh ph\u1ee5c m\u1ecdi \u00e1nh nh\u00ecn trong 9 b\u01b0\u1edbc',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/4.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/ppg01-tuyet-dinh-powerpoint-truc-quan-hoa-moi-slide-trong-9-buoc?utm_source=topcv&utm_medium=PPG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
            {
                id: 31,
                name: 'WOG01 - Tuy\u1ec7t \u0111\u1ec9nh Microsoft Word - Chuy\u00ean gia so\u1ea1n th\u1ea3o v\u0103n b\u1ea3n',
                thumbnail: 'https://static.topcv.vn/partner/gitiho/courses/6.png',
                link: 'https://gitiho.com/khoa-hoc/tin-hoc-van-phong/wog01-tuyet-dinh-microsoft-word-chuyen-gia-soan-thao-van-ban?utm_source=topcv&utm_medium=WOG01_topcv_Referral_01_01_01&utm_campaign=Trangchu&utm_content=1',
                default: false,
            },
        ],
    };

    const ref = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleNext = () => {
        ref.current.slickNext();
    };

    const handlePrev = () => {
        ref.current.slickPrev();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <FaGraduationCap className={cx('icon')} />
                    <h2 className={cx('title-text')}>Khóa học dành cho bạn</h2>
                </div>
                <span className={cx('btn', 'btn-left')} onClick={handlePrev}>
                    <VscChevronLeft className={cx('icon')} />
                </span>
                <span className={cx('btn', 'btn-right')} onClick={handleNext}>
                    <VscChevronRight className={cx('icon')} />
                </span>
                <Slider {...settings} ref={ref} className={cx('slider')}>
                    {fakeData.courses.map((item, index) => (
                        <div key={index} className={cx('slide')}>
                            <div className={cx('item')}>
                                <a className={cx('content')} href={item.link} target="_blank" rel="noreferrer">
                                    <img src={item.thumbnail} alt="thumbnail" className={cx('thumbnail')} />
                                </a>
                                <div className={cx('info')}>
                                    <TippyText content={item.name} placement="top">
                                        <h3 className={cx('title')}>
                                            <a href={item.link} target="_blank" rel="noreferrer">
                                                {item.name}
                                            </a>
                                        </h3>
                                    </TippyText>
                                    <div className={cx('action')}>
                                        <a href={item.link} target="_blank" rel="noreferrer" className={cx('btn-more')}>
                                            Tìm hiểu thêm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

SuggestCourseSlide.propTypes = {};

export default SuggestCourseSlide;
