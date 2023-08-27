import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import styles from './App.module.css';
import MainView from './views/MainView/MainView';
import DeviceView from './views/DeviceView/DeviceView';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.root}>
        <Routes>
          <Route path="/" Component={MainView} />
          <Route path="/devices/:deviceId" Component={DeviceView} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
