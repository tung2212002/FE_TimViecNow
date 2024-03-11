import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Subpage.module.scss';

const cx = classNames.bind(styles);

const Subpage = () => {
  useEffect(() => {
    document.title = 'Subpage - FE_DATN';
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <span className={cx('text')}>Subpage</span>
      </div>
    </div>
  );
};

export default Subpage;
