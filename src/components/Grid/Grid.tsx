import React from 'react';
import { Item } from '../../types';
import { getImageURL } from '../../utils';
import styles from './Grid.module.css';
import { useNavigate } from 'react-router-dom';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';

interface TableProps {
  items: Item[];
}

const GridElement = ({ data, rowIndex, columnIndex, style }: GridChildComponentProps<Item[]>) => {
  const navigate = useNavigate();

  return (
    <div style={style} className={styles.element}>
      <img src="" alt="" />
      <div className={styles.elementDescription}>
        <span className={styles.elementTitle}></span>
        <span className={styles.elementShortnames}></span>
      </div>
      <div className={styles.elementLine}>zhopa</div>
    </div>
  );

  // const item = data[index];
  // const { id, line, product, icon } = item;
  // const openDevice = React.useCallback(
  //   (deviceId: string) => () => navigate(`/devices/${deviceId}`),
  //   [],
  // );
  //
  // return (
  //   <tr
  //     onClick={openDevice(id)}
  //     style={Object.assign({}, style, {top: 33 + Number(style.top)})}
  //     className={styles.row}
  //     key={id}
  //   >
  //     <td className={styles.cell}>
  //       <img
  //         className={styles.icon}
  //         src={getImageURL(icon, 1)}
  //         alt={line.name + ' ' + product.name}
  //       />
  //     </td>
  //     <td className={styles.cell}>{line.name}</td>
  //     <td className={styles.cell}>{product.name}</td>
  //   </tr>
  // );
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

const ELEMENT_WIDTH = 216;
const ELEMENT_HEIGHT = 172;

export default function Table({ items }: TableProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();

    setHeight(rect?.height || 0);
    setWidth(rect?.width || 0);
  }, [ref]);

  if (!items.length) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }} ref={ref}>
      <Grid
        columnCount={Math.floor(width / ELEMENT_WIDTH)}
        rowCount={5}
        columnWidth={ELEMENT_WIDTH}
        rowHeight={ELEMENT_HEIGHT}
        itemData={items}
        height={height}
        width={width}
        className={styles.scroll}
      >
        {GridElement}
      </Grid>
    </div>
  );
}
