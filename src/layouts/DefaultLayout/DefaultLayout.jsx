import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './DefaultLayout.module.scss';
import { BackTopComponent } from '@components';
import { Footer, Header, HeaderHidden } from '../components/User';
import useScrollToTop from '../../hooks/useScrollToTop';

const cx = classNames.bind(styles);

function DefaultLayout({ children, positionHeader = '' }) {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    useScrollToTop();

    return (
        <div className={cx('wrapper')}>
            <Header positionHeader={positionHeader} />
            <HeaderHidden />
            {children}
            <Footer />
            <BackTopComponent />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    positionHeader: PropTypes.string,
};

export default DefaultLayout;
