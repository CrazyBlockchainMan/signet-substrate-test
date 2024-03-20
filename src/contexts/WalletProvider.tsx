import { createContext, useState, useContext, FC, ReactNode } from 'react'
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

import { DEFAULT_EXTENSION } from '../config';
import { WalletContextType, WalletStateType } from '../types'

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider : FC<{ children: ReactNode }> = ({ children }) => {
    const [walletData, setWalletData] = useState<WalletStateType>({
        accounts: [],
        activeAccount: null,
        connected: false
    })

    const connectWallet = async () => {
        const extensions = await web3Enable(DEFAULT_EXTENSION);
        if (extensions.length === 0) {
          console.error('No extension found');
          return;
        }
        const accounts = await web3Accounts();
        if (accounts.length > 0) {
            setWalletData({ accounts, activeAccount: 1, connected: true });
        }
    }

    const switchAccount = async (index: number) => {
        setWalletData({ ...walletData, activeAccount: index + 1 });
    }

    const walletContextValue : WalletContextType = {
        ...walletData,
        connectWallet,
        switchAccount
    }

    return (
        <WalletContext.Provider value={walletContextValue}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    const context = useContext(WalletContext);

    if (context === undefined) {
        throw new Error('useWallet must be used within an WalletProvider');
    }

    return context;
}