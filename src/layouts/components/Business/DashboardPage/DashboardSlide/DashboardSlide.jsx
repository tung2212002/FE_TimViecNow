import { useRef } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';

import styles from './DashboardSlide.module.scss';
import { images } from '../../../../../assets';

const cx = classNames.bind(styles);

const DashboardSlide = () => {
    const listBanner = [
        {
            id: 1,
            img: images.banner_eKYC,
            url: '/',
        },
        {
            id: 2,
            img: images.banner_dash1,
            url: '/',
        },
        {
            id: 3,
            img: images.banner_dash2,
            url: '/',
        },
        {
            id: 4,
            img: images.banner_dash3,
            url: '/',
        },
        {
            id: 5,
            img: images.banner_dash4,
        },
    ];

    const ref = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings} ref={ref} className={cx('slider')}>
                {listBanner.map((item, index) => (
                    <div key={index} className={cx('slide')}>
                        <a href={item.url} target="_blank" rel="noreferrer" className={cx('content')}>
                            <img src={item.img} alt="" className={cx('img')} />
                        </a>
                    </div>
                ))}
            </Slider>
            <span className={cx('btn', 'btn-left')} onClick={() => ref.current.slickPrev()}>
                <FaArrowLeft className={cx('icon')} />
            </span>

            <span className={cx('btn', 'btn-right')} onClick={() => ref.current.slickNext()}>
                <FaArrowRight className={cx('icon')} />
            </span>
        </div>
    );
};

export default DashboardSlide;
