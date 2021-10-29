import React from 'react'

import styles from './modal.module.scss'

const Index = ({ open, children }) => {
  const modalClass = `${styles.modal} ${open ? styles.modal__open : ''}`.trim();

  return (
    <div className={modalClass}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
};

export default Index
