import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import classNames from 'classnames/bind';

import styles from './ChartJobOpportunity.module.scss';

const cx = classNames.bind(styles);

const ChartJobOpportunity = () => {
    const fakeOpportunity = [
        {
            key: '04/02/2024',
            value: '25300',
        },
        {
            key: '05/02/2024',
            value: '25108',
        },
        {
            key: '06/02/2024',
            value: '25534',
        },
        {
            key: '07/02/2024',
            value: '25893',
        },
        {
            key: '08/02/2024',
            value: '24189',
        },
        {
            key: '09/02/2024',
            value: '22914',
        },
        {
            key: '10/02/2024',
            value: '21889',
        },
        {
            key: '11/02/2024',
            value: '20768',
        },
        {
            key: '12/02/2024',
            value: '19715',
        },
        {
            key: '13/02/2024',
            value: '19696',
        },
        {
            key: '14/02/2024',
            value: '19691',
        },
        {
            key: '15/02/2024',
            value: '20536',
        },
        {
            key: '16/02/2024',
            value: '22146',
        },
        {
            key: '17/02/2024',
            value: '21260',
        },
        {
            key: '18/02/2024',
            value: '20111',
        },
        {
            key: '19/02/2024',
            value: '23634',
        },
        {
            key: '20/02/2024',
            value: '26880',
        },
        {
            key: '21/02/2024',
            value: '29722',
        },
        {
            key: '22/02/2024',
            value: '30854',
        },
        {
            key: '23/02/2024',
            value: '32115',
        },
        {
            key: '24/02/2024',
            value: '31326',
        },
        {
            key: '25/02/2024',
            value: '30403',
        },
        {
            key: '26/02/2024',
            value: '32540',
        },
        {
            key: '27/02/2024',
            value: '34741',
        },
        {
            key: '28/02/2024',
            value: '36642',
        },
        {
            key: '29/02/2024',
            value: '37366',
        },
        {
            key: '01/03/2024',
            value: '38072',
        },
        {
            key: '02/03/2024',
            value: '37406',
        },
        {
            key: '03/03/2024',
            value: '36754',
        },
        {
            key: '04/03/2024',
            value: '38533',
        },
        {
            key: '05/03/2024',
            value: '40398',
        },
    ];
    const labels = fakeOpportunity.map((item) => item.key.split('/')[0] + '/' + item.key.split('/')[1]);
    const dataNumber = fakeOpportunity.map((item) => {
        return item.value;
    });
    const chartRef = useRef(null);

    const [inputData, setInputData] = useState(labels);

    useEffect(() => {
        const data = {
            labels: inputData,
            datasets: [
                {
                    data: dataNumber,
                    borderColor: 'rgb(17, 215, 105)',
                    borderWidth: 3,
                    pointRadius: 0,
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },

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
                interaction: {
                    mode: 'nearest',
                    intersect: false,
                    axis: 'x',
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            color: '#fff',
                            font: {
                                size: 11,
                                weight: 500,
                                angle: 45,
                            },
                            maxTicksLimit: 6,
                            padding: 3,
                            maxRotation: 45,
                            minRotation: 45,
                        },
                    },
                    y: {
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            color: '#fff',
                            font: {
                                size: 10,
                                weight: 500,
                            },
                            maxTicksLimit: 6,
                        },
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
                    },
                },
                elements: {
                    pointStyle: 'circle',
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
                <canvas ref={chartRef} height="220" width={'352'} className={cx('canvas')} style={{ width: '352px', height: '220px' }}></canvas>
            </div>
        </div>
    );
};

export default ChartJobOpportunity;
