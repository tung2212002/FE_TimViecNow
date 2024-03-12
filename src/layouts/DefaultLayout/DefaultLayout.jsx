import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { HeaderComponent, FooterComponent } from '../../components';
import HeaderHiddenComponent from '../../components/HeaderHiddenComponent/HeaderHiddenComponent';
import BackTopComponent from '../../components/BackTopComponent/BackTopComponent';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderComponent />
            <HeaderHiddenComponent />
            {children}
            <FooterComponent />
            <BackTopComponent />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
