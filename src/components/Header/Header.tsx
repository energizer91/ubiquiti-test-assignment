import React from 'react';
import styles from './Header.module.css';
import Icon from '../Icon/Icon';

export default function Header() {
  return (
    <header className={styles.root}>
      <a className={styles.logo} href="/"><Icon /> <span className={styles.title}>Devices</span></a>
      <span>Alexander Bareyko</span>
    </header>
  );
}
