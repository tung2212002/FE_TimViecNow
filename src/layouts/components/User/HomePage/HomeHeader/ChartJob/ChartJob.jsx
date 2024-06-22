import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ChartJob.module.scss';
import { getCountJobBySalaryService, getCountJobByCategoryService } from '@services/jobService';
import SkeletonChartComponent from '@components/skeleton/SkeletonChartComponent/SkeletonChartComponent';
import SkeletonChartLabelComponent from '@components/skeleton/SkeletonChartComponent/SkeletonChartLabelComponent';

const cx = classNames.bind(styles);

const ChartJob = ({ stateId }) => {
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
                            title: (context) => inputData[context[0].datasetIndex].x,
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
            if (chartInstance) chartInstance.destroy();
            const chart = new Chart(chartRef.current, config);
            setChartInstance(chart);
        }
    }, [listItem]);

    useEffect(() => {
        if (stateId === 1 && !loadingCategory) {
            setListItem(listItem1);
            setInputData(dataNumber1);
        } else if (stateId === 2 && !loadingSalary) {
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
                chartInstance.resize(240, 50);
            } else if (windowWidth <= 1200 && windowWidth > 768) {
                chartInstance.resize(360, 66);
            } else {
                chartInstance.resize(480, 100);
            }
        }
    }, [chartInstance, windowWidth]);

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
                <canvas ref={chartRef} height={'100'} width={'480'} className={cx('canvas')} style={{ width: '480px', height: '100px' }}></canvas>
            </div>
            <div className={cx('footer')}>
                {listItem &&
                    listItem.map((item, index) => (
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

ChartJob.propTypes = {
    stateId: PropTypes.number,
};

export default ChartJob;
