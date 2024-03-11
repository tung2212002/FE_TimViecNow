// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import classNames from 'classnames/bind';
// import PropTypes from 'prop-types';

// import styles from './ChartJobHeaderComponent.module.scss';

// const cx = classNames.bind(styles);

// const ChartJobHeaderComponent = ({ stateId }) => {
//     const chartRef = useRef(null);

//     const dataNumber1 = ['11628', '5824', '3815', '3538', '3422'];
//     const dataNumber2 = ['580', '1074', '20926', '22137', '1611', '7630'];
//     const borderColor1 = ['rgb(17, 215, 105)', 'rgb(48, 138, 255)', 'rgb(218, 131, 0)', 'rgb(28, 255, 241)', 'rgb(255, 231, 0)'];
//     const borderColor2 = ['rgb(17, 215, 105)', 'rgb(48, 138, 255)', 'rgb(218, 131, 0)', 'rgb(28, 255, 241)', 'rgb(255, 231, 0)', 'rgb(255, 255, 255)'];
//     const backgroundColor1 = [
//         'rgba(17, 215, 105, 0.7)',
//         'rgba(48, 138, 255, 0.7)',
//         'rgba(218, 131, 0, 0.7)',
//         'rgba(28, 255, 241, 0.7)',
//         'rgba(255, 231, 0, 0.7)',
//     ];
//     const backgroundColor2 = [
//         'rgba(17, 215, 105, 0.7)',
//         'rgba(48, 138, 255, 0.7)',
//         'rgba(218, 131, 0, 0.7)',
//         'rgba(28, 255, 241, 0.7)',
//         'rgba(255, 231, 0, 0.7)',
//         'rgba(255, 255, 255, 0.7)',
//     ];
//     const listItem1 = [
//         { color: 'rgb(17, 215, 105)', text: 'Kinh doanh / Bán hàng' },
//         { color: 'rgb(48, 138, 255)', text: 'Marketing / Truyền thông / Quảng cáo' },
//         { color: 'rgb(218, 131, 0)', text: 'Dịch vụ khách hàng' },
//         { color: 'rgb(28, 255, 241)', text: 'Tư vấn' },
//         { color: 'rgb(255, 231, 0)', text: 'Hành chính / Văn phòng' },
//     ];
//     const listItem2 = [
//         { color: 'rgb(17, 215, 105)', text: 'Dưới 3 triệu' },
//         { color: 'rgb(48, 138, 255)', text: 'Từ 3 - 10 triệu' },
//         { color: 'rgb(218, 131, 0)', text: 'Từ 10 - 20 triệu' },
//         { color: 'rgb(28, 255, 241)', text: 'Từ 20 - 30 triệu' },
//         { color: 'rgb(255, 231, 0)', text: 'Trên 30 triệu' },
//         { color: 'rgb(255, 255, 255)', text: 'Thỏa thuận' },
//     ];
//     const [listItem, setListItem] = useState(listItem1);
//     const [inputData, setInputData] = useState(dataNumber1);

//     useEffect(() => {
//         const data = {
//             labels: inputData,
//             datasets: [
//                 {
//                     data: inputData,
//                     backgroundColor: stateId === 1 ? backgroundColor1 : backgroundColor2,
//                     borderColor: stateId === 1 ? borderColor1 : borderColor2,
//                     borderWidth: 1,
//                     barThickness: 50,
//                 },
//             ],
//         };

//         const config = {
//             type: 'bar',
//             data: data,
//             options: {
//                 plugins: {
//                     legend: {
//                         display: false,
//                     },
//                     tooltip: {
//                         callbacks: {
//                             label: function (context) {
//                                 const data = listItem[context.dataIndex].text;
//                                 return data;
//                             },
//                         },
//                     },
//                 },
//                 scales: {
//                     x: {
//                         grid: {
//                             display: false,
//                             drawBorder: false,
//                             drawOnChartArea: false,
//                             borderWidth: 0,
//                         },
//                         ticks: {
//                             display: true,
//                             beginAtZero: true,
//                             color: '#fff',
//                             font: {
//                                 size: 12,
//                                 weight: 500,
//                             },
//                         },
//                     },
//                     y: {
//                         display: false,
//                     },
//                 },
//             },
//         };

//         if (chartRef && chartRef.current) {
//             const chart = new Chart(chartRef.current, config);

//             return () => {
//                 chart.destroy();
//             };
//         }
//     }, [inputData]);
//     const canvas = chartRef.current;

//     useEffect(() => {
//         if (stateId === 1) {
//             setListItem(listItem1);
//             setInputData(dataNumber1);
//         } else {
//             setListItem(listItem2);
//             setInputData(dataNumber2);
//         }
//         if (canvas) {
//             console.log(canvas.getContext('2d'));
//         }
//     }, [stateId]);

//     return (
//         <div className={cx('wrapper')}>
//             <div className={cx('container')}>
//                 <canvas ref={chartRef} height="105" width={'400'} className={cx('canvas')}></canvas>
//             </div>
//             <div className={cx('footer')}>
//                 {listItem.map((item, index) => (
//                     <div className={cx('item')} key={index}>
//                         <div className={cx('color')} style={{ background: item.color }}></div>
//                         <div className={cx('text')}>{item.text}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// ChartJobHeaderComponent.propTypes = {
//     stateId: PropTypes.number,
// };

// export default ChartJobHeaderComponent;

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ChartJobHeaderComponent.module.scss';

const cx = classNames.bind(styles);

const ChartJobHeaderComponent = ({ stateId }) => {
    const chartRef = useRef(null);

    const handleNumberLocale = (number) => {
        return number.toLocaleString('vi-VN');
    };

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
            data: [{ x: `${item.y}`, y: item.y }],
            backgroundColor: (context) => generateGradient(context, index),
            barPercentage: 400,
            categoryPercentage: 0.01,
        }));

        const data = {
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
                            title: (context) => listItem[context[0].dataIndex].text,
                        },
                        titleFont: { size: 12, weight: 500 },
                        bodyFont: { size: 16, weight: 600 },
                        displayColors: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                            drawOnChartArea: false,
                            borderWidth: 0,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            color: '#fff',
                            font: {
                                size: 12,
                                weight: 500,
                            },
                        },
                    },
                    y: {
                        display: false,
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <canvas ref={chartRef} height="100" width={'480'} className={cx('canvas')} style={{ width: '480px', height: '100px' }}></canvas>
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

ChartJobHeaderComponent.propTypes = {
    stateId: PropTypes.number,
};

export default ChartJobHeaderComponent;
