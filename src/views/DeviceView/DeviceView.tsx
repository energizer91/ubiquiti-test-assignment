import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DevicesContext } from '../../context/devicesContext';
import DeviceCard from '../../components/DeviceCard/DeviceCard';
import styles from './DeviceView.module.css';
import DeviceNavigation from '../../components/DeviceNavigation/DeviceNavigation';

export default function DeviceView() {
  const { deviceId } = useParams();
  const { loading, data, error } = useContext(DevicesContext);
  const item = React.useMemo(() => {
    if (!data || !data.length) {
      return null;
    }

    return data.find((i) => i.id === deviceId);
  }, [deviceId, data]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!item) {
    return <div>not found</div>;
  }

  return (
    <div className={styles.root}>
      <DeviceNavigation />
      <DeviceCard item={item} />
    </div>
  );
}
