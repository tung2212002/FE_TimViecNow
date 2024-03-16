import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ChartJobDemandComponent.module.scss';

const cx = classNames.bind(styles);

const ChartJobDemandComponent = ({ stateId }) => {
    const chartRef = useRef(null);

    const dataNumber1 = [
        {
            x: 'Kinh doanh / Bán hàng',
            y: 11628,
        },
        {
            x: 'Marketing / Truyền thông / Quảng cáo',
            y: 5824,
        },
        {
            x: 'Dịch vụ khách hàng',
            y: 3815,
        },
        {
            x: 'Tư vấn',
            y: 3538,
        },
        {
            x: 'Hành chính / Văn phòng',
            y: 3422,
        },
    ];

    const dataNumber2 = [
        {
            x: 'Dưới 3 triệu',
            y: 580,
        },
        {
            x: 'Từ 3 - 10 triệu',
            y: 1074,
        },
        {
            x: 'Từ 10 - 20 triệu',
            y: 20926,
        },
        {
            x: 'Từ 20 - 30 triệu',
            y: 22137,
        },
        {
            x: 'Trên 30 triệu',
            y: 1611,
        },
        {
            x: 'Thỏa thuận',
            y: 7630,
        },
    ];

    const listItem1 = [
        { color: 'rgb(17, 215, 105)', text: 'Kinh doanh / Bán hàng', colorRgba1: 'rgba(17, 215, 105, 0.4)', colorRgba2: 'rgba(17, 215, 105, 0.1)' },
        {
            color: 'rgb(48, 138, 255)',
            text: 'Marketing / Truyền thông / Quảng cáo',
            colorRgba1: 'rgba(48, 138, 255, 0.4)',
            colorRgba2: 'rgba(48, 138, 255, 0.1)',
        },
        { color: 'rgb(218, 131, 0)', text: 'Dịch vụ khách hàng', colorRgba1: 'rgba(218, 131, 0, 0.4)', colorRgba2: 'rgba(218, 131, 0, 0.1)' },
        { color: 'rgb(28, 255, 241)', text: 'Tư vấn', colorRgba1: 'rgba(28, 255, 241, 0.4)', colorRgba2: 'rgba(28, 255, 241, 0.1)' },
        { color: 'rgb(255, 231, 0)', text: 'Hành chính / Văn phòng', colorRgba1: 'rgba(255, 231, 0, 0.4)', colorRgba2: 'rgba(255, 231, 0, 0.1)' },
    ];
    const listItem2 = [
        { color: 'rgb(17, 215, 105)', text: 'Dưới 3 triệu', colorRgba1: 'rgba(17, 215, 105, 0.4)', colorRgba2: 'rgba(17, 215, 105, 0.1)' },
        { color: 'rgb(48, 138, 255)', text: 'Từ 3 - 10 triệu', colorRgba1: 'rgba(48, 138, 255, 0.4)', colorRgba2: 'rgba(48, 138, 255, 0.1)' },
        { color: 'rgb(218, 131, 0)', text: 'Từ 10 - 20 triệu', colorRgba1: 'rgba(218, 131, 0, 0.4)', colorRgba2: 'rgba(218, 131, 0, 0.1)' },
        { color: 'rgb(28, 255, 241)', text: 'Từ 20 - 30 triệu', colorRgba1: 'rgba(28, 255, 241, 0.4)', colorRgba2: 'rgba(28, 255, 241, 0.1)' },
        { color: 'rgb(255, 231, 0)', text: 'Trên 30 triệu', colorRgba1: 'rgba(255, 231, 0, 0.4)', colorRgba2: 'rgba(255, 231, 0, 0.1)' },
        { color: 'rgb(255, 255, 255)', text: 'Thỏa thuận', colorRgba1: 'rgba(255, 255, 255, 0.4)', colorRgba2: 'rgba(255, 255, 255, 0.1)' },
    ];
    const [listItem, setListItem] = useState(listItem1);
    const [inputData, setInputData] = useState(dataNumber1);
    useEffect(() => {
        const generateGradient = (context, index) => {
            const canvas = context.chart.ctx;
            const gradient = canvas.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(1, listItem[index].colorRgba2);
            gradient.addColorStop(0.2, listItem[index].colorRgba1);
            gradient.addColorStop(0, listItem[index].color);
            return gradient;
        };

        const datasets = inputData.map((item, index) => ({
            label: item.x,
            data: inputData.slice(index, index + 1),
            backgroundColor: (context) => generateGradient(context, index),
            barPercentage: 40,
            categoryPercentage: 0.1,
        }));

        const data = {
            labels: inputData.map((item) => item.x),
            datasets: datasets,
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => context.formattedValue + ' việc làm',
                            title: (context) => context[0].label,
                        },
                        titleFont: { size: 14, weight: 500 },
                        bodyFont: { size: 18, weight: 600 },
                        displayColors: false,
                    },
                },
                scales: {
                    x: {
                        display: false,
                        offset: true,

                        grid: {
                            display: false,
                            drawBorder: false,
                            drawOnChartArea: false,
                            borderWidth: 0,
                            lineWidth: 2,
                            tickLength: 10,
                            tickWidth: 0,
                        },
                        border: {
                            display: false,
                            dash: [10, 4],
                        },
                        ticks: { display: false, minBarLength: 1000 },
                    },
                    y: {
                        grid: {
                            color: 'rgba(28, 200, 200, 0.1)',
                            lineWidth: 2,
                            tickLength: 10,
                            tickWidth: 0,
                            tickBorderDash: [10, 4],
                        },
                        border: {
                            display: false,
                            dash: [15, 10],
                            dashOffset: 100,
                        },
                        ticks: { beginAtZero: true, color: '#fff', font: { size: 10, weight: 500 } },
                    },
                },
            },
        };

        if (chartRef && chartRef.current) {
            const chart = new Chart(chartRef.current, config);
            return () => {
                chart.destroy();
            };
        }
    }, [inputData]);

    useEffect(() => {
        if (stateId === 1) {
            setListItem(listItem1);
            setInputData(dataNumber1);
        } else {
            setListItem(listItem2);
            setInputData(dataNumber2);
        }
    }, [stateId]);

    useEffect(() => {
        const checkWidth = () => {
            if (window.innerWidth < 768) {
                chartRef.current.style.width = '320px';
                chartRef.current.style.height = '220px';
            } else {
                chartRef.current.style.width = '352px';
                chartRef.current.style.height = '220px';
            }
        };
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => {
            window.removeEventListener('resize', checkWidth);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <canvas ref={chartRef} height="170" width={'352'} className={cx('canvas')} style={{ width: '352px', height: '170px' }}></canvas>
            </div>
            <div className={cx('footer')}>
                {listItem.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('color')} style={{ background: item.color }}></div>
                        <div className={cx('text')}>{item.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ChartJobDemandComponent.propTypes = {
    stateId: PropTypes.number,
};

export default ChartJobDemandComponent;
