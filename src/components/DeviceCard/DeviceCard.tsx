import React from 'react';
import { Item } from '../../types';
import Image from '../Image/Image';
import CTA from '../CTA/CTA';
import { getSpec } from '../../utils/specs';
import styles from './DeviceCard.module.css';

interface DeviceCardProps {
  item: Item;
}

const ICON_SIZE = 7;

export default function DeviceCard({ item }: DeviceCardProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [showJSON, setShowJSON] = React.useState(false);
  const specs = React.useMemo(() => getSpec(item?.unifi || {}) || [], [item]);
  const onShowJSON = React.useCallback(() => {
    setShowJSON(true);
  }, []);
  const onHideJSON = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!modalRef.current || modalRef.current !== e.target) {
        return;
      }

      setShowJSON(false);
    },
    [modalRef],
  );
  return (
    <section className={styles.wrapper}>
      <div className={styles.image}>
        <Image icon={item.icon} size={ICON_SIZE} alt={item.product.name} width={259} height={259} />
      </div>
      <div className={styles.description}>
        <h1 className={styles.heading}>{item.product.name}</h1>
        <h2 className={styles.subheading}>{item.line.name}</h2>
        <div className={styles.properties}>
          <table className={styles.propertiesTable}>
            <tbody>
              <tr>
                <td>Product Line</td>
                <td>{item.line.name}</td>
              </tr>
              <tr>
                <td>ID</td>
                <td>{item.line.id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{item.product.name}</td>
              </tr>
              <tr>
                <td>Short Name</td>
                <td>{item.shortnames.join(', ')}</td>
              </tr>
              {specs.map((s, i) => (
                <tr key={i}>
                  <td>{s[0]}</td>
                  <td>{s[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <CTA onClick={onShowJSON}>See All Details as JSON</CTA>
        </div>
      </div>
      {showJSON && (
        <div className={styles.backdrop} onClick={onHideJSON} ref={modalRef}>
          <div className={styles.dialog}>
            <pre className={styles.json}>{JSON.stringify(item, null, 2)}</pre>
          </div>
        </div>
      )}
    </section>
  );
}
