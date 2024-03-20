import React from 'react'

import { useWallet } from '../contexts/WalletProvider';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export const ConnectWallet = () => {
    const { connectWallet, switchAccount, connected, accounts } = useWallet();

    const onSwitchAccounts = (e: React.ChangeEvent<HTMLSelectElement> | undefined) => {
        const selectedIndex = Number(e!.target.value);
        
        switchAccount(selectedIndex);
    }

    return (
        <div className='my-4'>
            { !connected && <button onClick={connectWallet} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Connect Wallet</button> }
            { connected && accounts.length > 0 &&
                <select onChange={onSwitchAccounts} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    { accounts.map((account : InjectedAccountWithMeta, index: number) => (
                        <option key={index} value={index}>{account.address}</option>   
                    ))}
                </select>
            }
        </div>
    )
}