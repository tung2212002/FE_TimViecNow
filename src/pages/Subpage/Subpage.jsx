import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './Subpage.module.scss';

const cx = classNames.bind(styles);

const Subpage = () => {
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJmaW5nZXJwcmludGluZyI6IjIzMTIzMTI0MzEyNCIsInN1YiI6IjhAZ21haWwuY29tIiwiaWF0IjoxNzIzMDk1NDY4LCJleHAiOjE3MjMxODE4Njh9.y8EAEHXv6ULj4wpzEcp9Iu0d6_QLdzGUG-_fIRXpOF8';
    const date = new Date();
    const data = {
        firstName: 'tung',
        lastName: 'ong',
        phoneNumber: '0328484848',
        homeTown: 98,
        schoolName: 'BK',
        workPlace: '....',
        isProfilePublic: true,
        dob: date,
    };

    const handleCreateProfile = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/v1/profiles', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        document.title = 'Subpage - FE_DATN';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <button onClick={handleCreateProfile}>Update Profile</button>
                <span className={cx('text')}>Subpage</span>
            </div>
        </div>
    );
};

export default Subpage;
