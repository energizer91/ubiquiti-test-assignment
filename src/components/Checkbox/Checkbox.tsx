import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  onChange: (value: boolean) => void;
  checked: boolean;
  label: string;
  name: string;
}

export default function Checkbox({ checked, onChange, label, name }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const onChangeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
      setIsChecked(e.target.checked);
    },
    [onChange],
  );

  const onChangeKeyHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLLabelElement>) => {
      if (e.code !== 'Space' && e.code !== 'Enter') {
        return;
      }

      onChange(!isChecked);
      setIsChecked(!isChecked);
    },
    [onChange, isChecked],
  );

  return (
    <label className={styles.root} tabIndex={0} onKeyUp={onChangeKeyHandler}>
      <input
        className={styles.check}
        checked={isChecked}
        onChange={onChangeHandler}
        type="checkbox"
        name={name}
        tabIndex={-1}
      />
      <span>{label}</span>
    </label>
  );
}
