import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DevicesContext } from '../../context/devicesContext';
import DeviceCard from '../../components/DeviceCard/DeviceCard';
import styles from './DeviceView.module.css';
import DeviceNavigation from '../../components/DeviceNavigation/DeviceNavigation';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/Error/Error';

const NOT_FOUND_ERROR: Error = new Error('Device not found');

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
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage e={error} />;
  }

  if (!item) {
    return <ErrorMessage e={NOT_FOUND_ERROR} />;
  }

  return (
    <div className={styles.root}>
      <DeviceNavigation />
      <DeviceCard item={item} />
    </div>
  );
}
