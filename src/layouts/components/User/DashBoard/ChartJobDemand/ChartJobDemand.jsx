import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ChartJobDemand.module.scss';
import { getCountJobBySalaryService, getCountJobByCategoryService } from '@services/jobService';
import SkeletonChartComponent from '@components/skeleton/SkeletonChartComponent/SkeletonChartComponent';
import SkeletonChartLabelComponent from '@components/skeleton/SkeletonChartComponent/SkeletonChartLabelComponent';

const cx = classNames.bind(styles);

const ChartJobDemand = ({ stateId }) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loadingSalary, setLoadingSalary] = useState(true);

    const [dataNumber1, setDataNumber1] = useState([]);

    const [dataNumber2, setDataNumber2] = useState([]);

    const handleCategory = (category) => {
        const data = category.map((item) => ({
            x: item.name,
            y: item.count,
        }));
        return data;
    };

    const handleSalary = (salary) => {
        const data = salary.map((item) => ({
            x:
                item.salary_type == 'deal'
                    ? 'Thỏa thuận'
                    : item.min_salary == 0
                    ? `Dưới ${item.max_salary} triệu`
                    : item.max_salary == 0
                    ? `Trên ${item.min_salary} triệu`
                    : `Từ ${item.min_salary} - ${item.max_salary} triệu`,
            y: item.count,
        }));
        return data;
    };
    const listItem1 = [
        { color: 'rgb(17, 215, 105)', colorRgba1: 'rgba(17, 215, 105, 0.4)', colorRgba2: 'rgba(17, 215, 105, 0.1)' },
        {
            color: 'rgb(48, 138, 255)',
            colorRgba1: 'rgba(48, 138, 255, 0.4)',
            colorRgba2: 'rgba(48, 138, 255, 0.1)',
        },
        { color: 'rgb(218, 131, 0)', colorRgba1: 'rgba(218, 131, 0, 0.4)', colorRgba2: 'rgba(218, 131, 0, 0.1)' },
        { color: 'rgb(28, 255, 241)', colorRgba1: 'rgba(28, 255, 241, 0.4)', colorRgba2: 'rgba(28, 255, 241, 0.1)' },
        { color: 'rgb(255, 231, 0)', colorRgba1: 'rgba(255, 231, 0, 0.4)', colorRgba2: 'rgba(255, 231, 0, 0.1)' },
    ];
    const listItem2 = [
        { color: 'rgb(17, 215, 105)', colorRgba1: 'rgba(17, 215, 105, 0.4)', colorRgba2: 'rgba(17, 215, 105, 0.1)' },
        { color: 'rgb(48, 138, 255)', colorRgba1: 'rgba(48, 138, 255, 0.4)', colorRgba2: 'rgba(48, 138, 255, 0.1)' },
        { color: 'rgb(218, 131, 0)', colorRgba1: 'rgba(218, 131, 0, 0.4)', colorRgba2: 'rgba(218, 131, 0, 0.1)' },
        { color: 'rgb(28, 255, 241)', colorRgba1: 'rgba(28, 255, 241, 0.4)', colorRgba2: 'rgba(28, 255, 241, 0.1)' },
        { color: 'rgb(255, 231, 0)', colorRgba1: 'rgba(255, 231, 0, 0.4)', colorRgba2: 'rgba(255, 231, 0, 0.1)' },
        { color: 'rgb(255, 255, 255)', colorRgba1: 'rgba(255, 255, 255, 0.4)', colorRgba2: 'rgba(255, 255, 255, 0.1)' },
    ];
    const [listItem, setListItem] = useState(null);

    const [inputData, setInputData] = useState(null);

    useEffect(() => {
        if ((stateId === 1 && loadingCategory) || (stateId === 2 && loadingSalary)) return;

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
        const resizeHandler = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        if (chartInstance) {
            if (windowWidth <= 768) {
                chartInstance.resize(320, 220);
            } else {
                chartInstance.resize(352, 220);
            }
            chartInstance.update();
        }
    }, [windowWidth, chartInstance]);

    useEffect(() => {
        getCountJobBySalaryService()
            .then((res) => {
                if (res.status === 200) {
                    setDataNumber2(handleSalary(res.data.data));
                    setLoadingSalary(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        getCountJobByCategoryService()
            .then((res) => {
                if (res.status === 200) {
                    setDataNumber1(handleCategory(res.data.data.slice(0, 5)));
                    setInputData(handleCategory(res.data.data.slice(0, 5)));
                    setListItem(listItem1);
                    setLoadingCategory(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (stateId === 1 && !loadingCategory) || (stateId === 2 && !loadingSalary) ? (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <canvas ref={chartRef} height="170" width={'352'} className={cx('canvas')} style={{ width: '352px', height: '170px' }}></canvas>
            </div>
            <div className={cx('footer')}>
                {listItem.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('color')} style={{ background: item.color }}></div>
                        <div className={cx('text')}>{inputData[index].x}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('skeleton')} style={{ width: '100%', height: '100px' }}>
                    <SkeletonChartComponent scale={1} />
                </div>
            </div>
            <div className={cx('footer')}>
                <SkeletonChartLabelComponent scale={1} />
            </div>
        </div>
    );
};

ChartJobDemand.propTypes = {
    stateId: PropTypes.number,
};

export default ChartJobDemand;
