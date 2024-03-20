import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { ConnectWallet } from './components/ConnectWallet';
import { PureProxyAccount } from './components/PureProxyAccount'

const App = () => {
  return (
    <div className="flex items-center flex-col justify-center p-10">
      <h1 className="text-3xl text-black mb-3">Talisman Substrate Test</h1>
      <ConnectWallet />
      <PureProxyAccount />
    </div>
  );
}

export default App;
