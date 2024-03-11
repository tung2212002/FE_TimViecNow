import classNames from 'classnames/bind';

import styles from './FooterComponent.module.scss';
import SelectionComponent from '../SelectionComponent/SelectionComponent';
import { useState } from 'react';

import { FaHome } from 'react-icons/fa';

const cx = classNames.bind(styles);

const FooterComponent = () => {
    const listLanguage = ['English', 'Vietnamese'];

    const [languge, setLanguage] = useState('English');
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('text')} style={{ color: 'white', width: '200px', height: '50px' }}>
                    <SelectionComponent
                        header={() => (
                            <div>
                                <FaHome style={{ width: '50px', height: '50px', color: 'red', fontSize: '20px' }} />
                                <div
                                    style={{
                                        width: '100px',
                                        height: '50px',
                                        color: 'black',
                                        marginLeft: '10px',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        border: '1px solid black',
                                    }}
                                >
                                    Home
                                </div>
                            </div>
                        )}
                        body={() => (
                            <div
                                className={cx('select-dropdown')}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: '50px',
                                    left: '0',
                                    zIndex: '100',
                                }}
                            >
                                {listLanguage.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx('select-item')}
                                        onClick={() => {
                                            setLanguage(item);
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
