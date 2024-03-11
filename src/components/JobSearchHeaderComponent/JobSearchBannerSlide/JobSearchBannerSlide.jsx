import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './JobSearchBannerSlide.module.scss';
import { images } from '../../../assets';
import { useRef } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const cx = classNames.bind(styles);

const JobSearchBannerSlide = () => {
    const listBanner = [
        {
            id: 1,
            img: images.banner1,
            url: '/',
        },
        {
            id: 2,
            img: images.banner2,
            url: '/',
        },
        {
            id: 3,
            img: images.banner3,
            url: '/',
        },
        {
            id: 4,
            img: images.banner4,
            url: '/',
        },
    ];

    const ref = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
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
                <VscChevronLeft className={cx('icon')} />
            </span>

            <span className={cx('btn', 'btn-right')} onClick={() => ref.current.slickNext()}>
                <VscChevronRight className={cx('icon')} />
            </span>
        </div>
    );
};

export default JobSearchBannerSlide;
