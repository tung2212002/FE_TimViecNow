import { useRef } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './VerticalBanner.module.scss';
import { images } from '@assets';

const cx = classNames.bind(styles);

const VerticalBanner = () => {
    const listBanner = [
        {
            id: 1,
            img: images.banner_r1,
            url: '/',
        },
        {
            id: 2,
            img: images.banner_r2,
            url: '/',
        },
        {
            id: 3,
            img: images.banner_r3,
            url: '/',
        },
        {
            id: 4,
            img: images.banner_r4,
            url: '/',
        },
    ];

    const ref = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        dotsClass: 'slick-dots slick-thumb',
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Slider {...settings} ref={ref} className={cx('slider')}>
                    {listBanner.map((item, index) => (
                        <div key={index} className={cx('slide')}>
                            <a href={item.url} target="_blank" rel="noreferrer" className={cx('content')}>
                                <img src={item.img} alt="" className={cx('img')} />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default VerticalBanner;
