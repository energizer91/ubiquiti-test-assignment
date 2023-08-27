import React from 'react';
import { FilterLine } from '../../types';
import SearchInput from '../SearchInput/SearchInput';
import { DevicesContext } from '../../context/devicesContext';
import styles from './ToolBar.module.css';
import Filter from '../Filter/Filter';

export enum ViewMode {
  TABLE,
  GRID,
}

interface ToolBarProps {
  onChangeFilter: (filters: FilterLine[]) => void;
  filteredLength: number;
  onChangeViewMode: (mode: ViewMode) => void;
}

export default function ToolBar({ onChangeFilter, filteredLength }: ToolBarProps) {
  const { data } = React.useContext(DevicesContext);

  return (
    <section className={styles.root}>
      <div className={styles.searchBar}>
        <SearchInput data={data} />
        <span className={styles.devicesCount}>{filteredLength} devices</span>
      </div>
      <div>
        <Filter onChangeFilters={onChangeFilter} />
      </div>
    </section>
  );
}
