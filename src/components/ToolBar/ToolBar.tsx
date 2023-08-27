import React from 'react';
import { FilterLine } from '../../types';
import SearchInput from '../SearchInput/SearchInput';
import { DevicesContext } from '../../context/devicesContext';
import styles from './ToolBar.module.css';
import Filter from '../Filter/Filter';
import ViewModeToggle from '../ViewModeToggle/ViewModeToggle';

interface ToolBarProps {
  onChangeFilter: (filters: FilterLine[]) => void;
  filteredLength: number;
}

export default function ToolBar({ onChangeFilter, filteredLength }: ToolBarProps) {
  const { data } = React.useContext(DevicesContext);

  return (
    <section className={styles.root}>
      <div className={styles.searchBar}>
        <SearchInput data={data} />
        <span className={styles.devicesCount}>{filteredLength} devices</span>
      </div>
      <div className={styles.searchBar}>
        <ViewModeToggle />
        <Filter onChangeFilters={onChangeFilter} />
      </div>
    </section>
  );
}
