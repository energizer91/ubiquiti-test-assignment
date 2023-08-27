import React from 'react';
import { useParams } from 'react-router-dom';
import { DevicesContext } from '../../context/devicesContext';
import NavigationButton from '../NavigationButton/NavigationButton';
import styles from './DeviceNavigation.module.css';
import Arrow from '../../assets/Union.svg';

const getUrl = (deviceId: string) => `/devices/${deviceId}`;

export default function DeviceNavigation() {
  const { data } = React.useContext(DevicesContext);
  const { deviceId } = useParams();
  const deviceIndex = React.useMemo(() => {
    if (!data.length) {
      return -1;
    }

    return data.findIndex((d) => d.id === deviceId);
  }, [data, deviceId]);

  return (
    <section className={styles.root}>
      <NavigationButton className={styles.backButton} href="/" icon={Arrow}>
        Back
      </NavigationButton>
      <div className={styles.navigation}>
        <NavigationButton
          icon={Arrow}
          className={styles.backButton}
          disabled={deviceIndex <= 0}
          href={getUrl(data[deviceIndex - 1]?.id)}
        />
        <NavigationButton
          icon={Arrow}
          className={styles.foreButton}
          disabled={deviceIndex >= data.length - 1}
          href={getUrl(data[deviceIndex + 1]?.id)}
        />
      </div>
    </section>
  );
}
