import React, { useEffect, useState } from 'react';

import { useCreatePureProxyAccounts } from '../hooks/useCreatePureProxyAccount';
import { useWallet } from '../contexts/WalletProvider';
import { KitchensinkRuntimeProxyType } from '../types';

export const PureProxyAccount: React.FC = () => {
  const [freeBalance, setFreeBalance] = useState(0);
  const [reservedBalance, setReservedBalance] = useState(0);

  const { api, createPureProxyAccount, getAccountBalance } = useCreatePureProxyAccounts();
  const { accounts, activeAccount } = useWallet();
    
  const handleCreateProxyAccount = async () => {
    if (!api || !activeAccount) return;

    await createPureProxyAccount(accounts[activeAccount - 1].address, activeAccount - 1,  KitchensinkRuntimeProxyType.Governance, 0);
  };

  useEffect(() => {
    const updateBalance = async () => {
        if (!api || !activeAccount) return;

        const selectedAddress : string = accounts[activeAccount - 1].address;
        const result: any = await getAccountBalance(selectedAddress);

        setFreeBalance(result.data.free)
        setReservedBalance(result.data.reserved);
    }
    
    if (!api || !activeAccount) return;

    updateBalance()
  }, [activeAccount, accounts])

  return (
    <div>
        <h1>Free Balance: {freeBalance}</h1>
        <h1>Reserved Balance: {reservedBalance}</h1>
        <button onClick={handleCreateProxyAccount} className='my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Create Pure Proxy Account</button>
    </div>
  );
};

export default PureProxyAccount;
