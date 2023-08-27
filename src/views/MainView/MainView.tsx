import React, { useContext } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { FilterLine, Item, ViewMode } from '../../types';
import Table from '../../components/Table/Table';
import Grid from '../../components/Grid/Grid';
import styles from './MainView.module.css';
import { DevicesContext } from '../../context/devicesContext';

export default function MainView() {
  const [filters, setFilters] = React.useState<FilterLine[]>([]);
  const { loading, data, error, viewMode } = useContext(DevicesContext);
  const filteredItems = React.useMemo<Item[]>(() => {
    if (!data) {
      return [];
    }

    return data.filter((v) => {
      if (!filters.length) return true;

      return filters.some((f) => v.line.id === f.id);
    });
  }, [data, filters]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.root}>
      <ToolBar
        onChangeFilter={setFilters}
        filteredLength={filteredItems.length}
      />
      {viewMode === ViewMode.TABLE && <Table items={filteredItems} />}
      {viewMode === ViewMode.GRID && <Grid items={filteredItems} />}
    </div>
  );
}
