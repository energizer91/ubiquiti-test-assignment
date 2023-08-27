import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.logo}>
        <Link className={styles.icon} to="/">
          <Icon />
        </Link>
        <span className={styles.title}>Devices</span>
      </div>
      <span>Alexander Bareyko</span>
    </header>
  );
}
