import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import styles from './DashboardHeader.module.scss';
import { Header } from '../components/Business';
import { selectToastList } from '@redux/features/toast/toastSlice';
import { Toast } from '@components/common';

const cx = classNames.bind(styles);

const DashboardHeader = ({ children }) => {
    const listToast = useSelector(selectToastList);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className={cx('wrapper')}>
            {listToast.length > 0 && (
                <div className={cx('toast')}>
                    <div className={cx('toast-content')}>
                        {listToast.map((toast) => (
                            <Toast key={toast.id} title={toast.title} message={toast.message} type={toast.type} />
                        ))}
                    </div>
                </div>
            )}
            <Header />
            {children}
        </div>
    );
};

DashboardHeader.propTypes = {
    children: PropTypes.node,
};

export default DashboardHeader;
