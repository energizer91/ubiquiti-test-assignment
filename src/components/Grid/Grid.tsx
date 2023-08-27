import React from 'react';
import { Item } from '../../types';
import styles from './Grid.module.css';
import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import Image from '../Image/Image';
import { useNavigate } from 'react-router-dom';

interface GridProps {
  items: Item[];
}

const GridElement = ({ data, rowIndex, columnIndex, style }: GridChildComponentProps<Item[][]>) => {
  const item = data[rowIndex][columnIndex];
  const navigate = useNavigate();
  const openDevice = React.useCallback(
    (deviceId: string) => () => navigate(`/devices/${deviceId}`),
    [],
  );

  if (!item) {
    return null;
  }

  return (
    <div className={styles.wrapper} style={style} onClick={openDevice(item.id)}>
      <div className={styles.element}>
        <Image
          className={styles.image}
          icon={item.icon}
          width={100}
          height={100}
          size={2}
          alt={item.product.name}
        />
        <div className={styles.elementDescription}>
          <h2 className={styles.elementTitle}>{item.product.name}</h2>
          <h3 className={styles.elementShortnames}>{item.shortnames.join(', ')}</h3>
        </div>
        <div className={styles.elementLine}>{item.line.name}</div>
      </div>
    </div>
  );
};

const Inner = React.forwardRef<HTMLTableSectionElement, React.HTMLProps<HTMLTableSectionElement>>(
  ({ children, ...rest }, ref) => (
    <div {...rest} className={styles.inner} ref={ref}>
      {children}
    </div>
  ),
);

Inner.displayName = 'Inner';

const ELEMENT_WIDTH = 216 + 16;
const ELEMENT_HEIGHT = 172 + 16;

export default function Grid({ items }: GridProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const colCount = Math.floor(width / ELEMENT_WIDTH);
  const gridItems = React.useMemo(
    () =>
      items.reduce<Item[][]>((acc, i) => {
        if (!acc[acc.length - 1] || acc[acc.length - 1].length === colCount) {
          acc.push([]);
        }

        acc[acc.length - 1].push(i);

        return acc;
      }, []),
    [items, colCount],
  );

  React.useEffect(() => {
    const handler = () => {
      const rect = ref.current?.getBoundingClientRect();

      setHeight(rect?.height || 0);
      setWidth(rect?.width || 0);
    };

    handler();

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [ref]);

  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.root} style={{ height: '100%', width: '100%' }} ref={ref}>
      <FixedSizeGrid
        columnCount={Math.floor(width / ELEMENT_WIDTH)}
        rowCount={gridItems.length}
        columnWidth={ELEMENT_WIDTH}
        rowHeight={ELEMENT_HEIGHT}
        itemData={gridItems}
        height={height}
        width={colCount * ELEMENT_WIDTH}
        className={styles.scroll}
      >
        {GridElement}
      </FixedSizeGrid>
    </div>
  );
}
