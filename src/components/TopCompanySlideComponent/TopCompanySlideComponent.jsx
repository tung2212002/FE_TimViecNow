import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';

import styles from './TopCompanySlideComponent.module.scss';

const cx = classNames.bind(styles);

const TopCompanySlideComponent = ({ companies, dots, infinite, speed, slidesToShow, slidesToScroll, autoplay }) => {
    const ref = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: speed ? speed : 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: autoplay ? true : false,
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-company')}>
                <h2 className={cx('title')}>Top Công ty hàng đầu</h2>
                <div className={cx('box-tool')}>
                    <span className={cx('btn')} onClick={() => ref.current.slickPrev()}>
                        <VscChevronLeft className={cx('icon')} />
                    </span>

                    <span className={cx('btn')} onClick={() => ref.current.slickNext()}>
                        <VscChevronRight className={cx('icon')} />
                    </span>
                </div>
            </div>
            <Slider {...settings} ref={ref} className={cx('slider')}>
                {companies.map((item, index) => (
                    <div key={index} className={cx('slide')}>
                        <div className={cx('content')}>
                            <label className={cx('label', `${item.label}`)}>{item.label}</label>
                            <img src={item.logo ? item.logo : 'https://www.w3schools.com/w3images/fjords.jpg'} alt="" className={cx('img')} />
                            <h3 className={cx('title')}>{item.name}</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

TopCompanySlideComponent.propTypes = {
    companies: PropTypes.array,
    dots: PropTypes.bool,
    infinite: PropTypes.bool,
    speed: PropTypes.number,
    slidesToShow: PropTypes.number,
    slidesToScroll: PropTypes.number,
    autoplay: PropTypes.bool,
};

export default TopCompanySlideComponent;
