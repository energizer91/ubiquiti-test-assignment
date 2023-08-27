import React, { CSSProperties } from 'react';
import { Item } from '../../types';
import styles from './Table.module.css';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import Image from '../Image/Image';

interface TableProps {
  items: Item[];
}

interface TableRowProps {
  data: Item[];
  index: number;
  style: CSSProperties;
}

const TableRow = ({ data, index, style }: TableRowProps) => {
  const navigate = useNavigate();
  const item = data[index];
  const { id, line, product, icon } = item;
  const openDevice = React.useCallback(
    (deviceId: string) => () => navigate(`/devices/${deviceId}`),
    [],
  );

  return (
    <tr
      onClick={openDevice(id)}
      style={Object.assign({}, style, { top: 33 + Number(style.top) })}
      className={styles.row}
    >
      <td className={styles.cell}>
        <Image icon={icon} size={1} alt={line.name + ' ' + product.name} className={styles.icon} />
      </td>
      <td className={styles.cell}>{line.name}</td>
      <td className={styles.cell}>{product.name}</td>
    </tr>
  );
};

const Inner = React.forwardRef<HTMLTableSectionElement, React.HTMLProps<HTMLTableSectionElement>>(
  ({ children, ...rest }, ref) => (
    <div {...rest} ref={ref}>
      <table className={styles.tableBody}>
        <tbody>{children}</tbody>
      </table>
    </div>
  ),
);

Inner.displayName = 'Inner';

export default function Table({ items }: TableProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(ref.current?.getBoundingClientRect().height || 0);
  }, [ref]);

  if (!items.length) {
    return null;
  }

  return (
    <div style={{ height: '100%' }} ref={ref} className={styles.root}>
      <table className={styles.tableHead}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.cell}>
              <span className={styles.icon} />
            </th>
            <th className={styles.cell}>Product line</th>
            <th className={styles.cell}>Name</th>
          </tr>
        </thead>
      </table>
      <List
        innerElementType={Inner}
        itemCount={items.length}
        itemSize={33}
        itemData={items}
        height={height}
        width="100%"
        className={styles.scroll}
      >
        {TableRow}
      </List>
    </div>
  );
}
