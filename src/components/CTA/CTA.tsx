import React from 'react';
import styles from './CTA.module.css';

interface CTAProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function CTA({ onClick, children, disabled = false }: CTAProps) {
  return (
    <button className={styles.root} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
