import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface WalletStateType {
    accounts: Array<InjectedAccountWithMeta>
    activeAccount: number | null
    connected: boolean
}

export interface WalletContextType extends WalletStateType {
    connectWallet: () => Promise<void>
    switchAccount: (index: number) => Promise<void>
}

export interface PureProxyAccountType {
    address: string;
    balance: string;
}

interface SystemAccountBalance {
    free: number;
    reserved: number;
}

export interface SystemAccountType {
    data: SystemAccountBalance
}

export enum KitchensinkRuntimeProxyType {
    Any = 'Any',
    Governance = 'Governance'
}