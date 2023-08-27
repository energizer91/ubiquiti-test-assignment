import React from 'react';
import styles from './Error.module.css';

interface ErrorProps {
  e: Error;
}

export default function ErrorMessage({e}: ErrorProps) {
  return (
    <div className={styles.root}>
      <h1>Unexpected Error occurred:</h1>
      <h2>{e.message}</h2>
    </div>
  );
}
