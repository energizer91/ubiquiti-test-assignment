import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationButton.module.css';

interface NavigationButtonProps {
  className?: string;
  children?: React.ReactNode;
  href: string;
  icon?: string;
  disabled?: boolean;
}

export default function NavigationButton({
  className,
  disabled = false,
  icon,
  children,
  href,
}: NavigationButtonProps) {
  if (disabled) {
    return (
      <span className={`${styles.root} ${className}`}>
        <img className={styles.icon} src={icon} alt="arrow" />
        {children}
      </span>
    );
  }
  return (
    <Link to={href} className={`${styles.root} ${className}`}>
      <img className={styles.icon} src={icon} alt="arrow" />
      <span>{children}</span>
    </Link>
  );
}
