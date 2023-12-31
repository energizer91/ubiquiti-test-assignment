import React, { createContext, useEffect, useState } from 'react';
import { FilterLine, Item, ViewMode } from '../types';

export interface FetchItemsResult {
  loading: boolean;
  error: TypeError | undefined;
  data: Item[];
  filters: FilterLine[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const defaultContext: FetchItemsResult = {
  loading: false,
  error: undefined,
  data: [],
  filters: [],
  viewMode: ViewMode.TABLE,
  setViewMode: () => void 0,
};

interface DevicesData {
  id: string;
  devices: Item[];
}

type DevicesWrapperProps = React.PropsWithChildren;

export const DevicesContext = createContext<FetchItemsResult>(defaultContext);
const ITEMS_URL = 'https://static.ui.com/fingerprint/ui/public.json';

export default function DevicesWrapper({ children }: DevicesWrapperProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<TypeError>();
  const [data, setData] = useState<Item[]>([]);
  const [filters, setFilters] = useState<FilterLine[]>([]);
  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.TABLE);

  useEffect(() => {
    if (loading) return;

    setLoading(true);

    fetch(ITEMS_URL)
      .then((r) => r.json())
      .then((d: DevicesData) => {
        const { devices } = d;
        const hash: Record<string, boolean> = {};
        const result: FilterLine[] = [];

        devices.forEach((i) => {
          if (Object.hasOwnProperty.apply(hash, [i.line.id])) {
            return;
          }

          hash[i.line.id] = true;
          result.push(i.line);
        });

        setData(devices);
        setFilters(result);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DevicesContext.Provider
      value={{
        loading,
        data,
        error,
        filters,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </DevicesContext.Provider>
  );
}
