import React from 'react';
import { FilterLine } from '../../types';
import styles from './Filter.module.css';
import { DevicesContext } from '../../context/devicesContext';
import Checkbox from '../Checkbox/Checkbox';

interface FilterProps {
  onChangeFilters?: (filters: FilterLine[]) => void;
}

export default function Filter({ onChangeFilters }: FilterProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { filters } = React.useContext(DevicesContext);
  const [listOpened, setListOpened] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState(filters.map(() => false));
  const onSetListOpened = React.useCallback(
    () => {
      setListOpened(!listOpened);
    },
    [listOpened],
  );

  const onChangeFiltersCallback = React.useCallback(
    (index: number) => (value: boolean) => {
      setSelectedFilters(selectedFilters.map((f, i) => (i === index ? value : f)));
    },
    [selectedFilters],
  );
  const onResetFilters = React.useCallback(() => {
    setSelectedFilters(filters.map(() => false));
  }, [filters]);

  React.useEffect(() => {
    onChangeFilters?.(filters.filter((_, i) => selectedFilters[i]));
  }, [filters, selectedFilters]);
  React.useEffect(() => {
    function modalCloseHandler(this: Document, event: MouseEvent) {
      if (!modalRef.current) {
        return;
      }

      if (!modalRef.current.contains(event.target as Node)) {
        setListOpened(false);
      }
    }

    function modalCloseKeyHandler(this: Document, event: KeyboardEvent) {
      if (event.code !== 'Escape') {
        return;
      }
      if (!modalRef.current) {
        return;
      }

      if (!modalRef.current.contains(event.target as Node)) {
        setListOpened(false);
      }
    }

    document.addEventListener('click', modalCloseHandler, true);
    document.addEventListener('keyup', modalCloseKeyHandler, true);

    return () => {
      document.removeEventListener('click', modalCloseHandler);
      document.removeEventListener('keyup', modalCloseKeyHandler);
    };
  }, []);

  return (
    <div className={styles.root}>
      <label>
        <input
          className={styles.check}
          checked={listOpened}
          onChange={onSetListOpened}
          type="checkbox"
        />
        <span className={styles.button}>Filter</span>
      </label>
      {listOpened && (
        <div ref={modalRef} className={styles.modal}>
          <span className={styles.heading}>Product line</span>
          <ul className={styles.list}>
            {filters.map((f, i) => (
              <li className={styles.item} key={f.id}>
                <Checkbox
                  onChange={onChangeFiltersCallback(i)}
                  checked={selectedFilters[i]}
                  label={f.name}
                  name={f.id}
                />
              </li>
            ))}
          </ul>
          <button
            className={styles.reset}
            disabled={selectedFilters.filter((f) => f).length === 0}
            onClick={onResetFilters}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
