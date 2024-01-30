import React from 'react';
import styles from './Header.module.css';
import Alpha from '../assets/alpha.svg';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Alpha} alt="Logo" />
        <strong>
          Todo List
        </strong>
      </div>
    </div>
  );
}

export default Header;
