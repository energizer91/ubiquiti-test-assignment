import React from 'react';
import loading from '../../assets/loading.gif';
import styles from './Loading.module.css';

export default function Error() {
  return (
    <div className={styles.root}>
      <img src={loading} alt="Error" />
    </div>
  );
}
