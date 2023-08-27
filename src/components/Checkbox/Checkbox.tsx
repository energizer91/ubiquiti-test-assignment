import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  label: string;
  name: string;
}

export default function Checkbox({ checked, onChange, label, name }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const onChangeHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setIsChecked(e.target.checked);
  }, [onChange]);

  return (
    <label className={styles.root}>
      <input className={styles.check} checked={isChecked} onChange={onChangeHandler} type="checkbox" name={name} />
      <span>{label}</span>
    </label>
  );
}
