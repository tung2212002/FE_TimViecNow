import { useRef } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import { VscChevronRight, VscChevronLeft } from 'react-icons/vsc';

import styles from './JobDetailReportSlideComponent.module.scss';
import { images } from '../../../../assets';

const cx = classNames.bind(styles);

const JobDetailReportSlideComponent = () => {
    const listImage = [
        {
            id: 1,
            img: images.report_1,
            content: 'Nội dung mô tả công việc sơ sài, không đồng nhất với công việc thực tế',
        },
        {
            id: 2,
            img: images.report_2,
            content: 'Hứa hẹn "việc nhẹ lương cao", không cần bỏ nhiều công sức dễ dàng lấy tiền "khủng"',
        },
        {
            id: 3,
            img: images.report_3,
            content: 'Yêu cầu tải app, nạp tiền, làm nhiệm vụ',
        },
        {
            id: 4,
            img: images.report_4,
            content: 'Yêu cầu nộp phí phỏng vấn, phí giữ chỗ...',
        },
        {
            id: 5,
            img: images.report_5,
            content: 'Yêu cầu ký kết giấy tờ không rõ ràng hoặc nộp giấy tờ gốc',
        },
        {
            id: 6,
            img: images.report_6,
            content: 'Địa điểm phỏng vấn bất bình thường',
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

    const handlePrev = () => {
        ref.current.slickPrev();
    };

    const handleNext = () => {
        ref.current.slickNext();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Slider {...settings} ref={ref} className={cx('slider')}>
                    {listImage.map((item, index) => (
                        <div key={index} className={cx('slide')}>
                            <img src={item.img} alt="" className={cx('img')} />
                            <p className={cx('content')}>{item.content}</p>
                        </div>
                    ))}
                </Slider>
                <button className={cx('btn', 'btn-left')} onClick={handlePrev}>
                    <VscChevronLeft className={cx('icon')} />
                </button>
                <button className={cx('btn', 'btn-right')} onClick={handleNext}>
                    <VscChevronRight className={cx('icon')} />
                </button>
            </div>
        </div>
    );
};

export default JobDetailReportSlideComponent;
