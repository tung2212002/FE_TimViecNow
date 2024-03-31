import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ContentOnlyLayout.module.scss';
import Toast from '../../components/common/Toast/Toast';
import { selectToastList } from '../../redux/features/toast/toastSlice';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ContentOnlyLayout({ children }) {
    const listToast = useSelector(selectToastList);

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
            {children}
        </div>
    );
}

ContentOnlyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContentOnlyLayout;
