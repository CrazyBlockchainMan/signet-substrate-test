import { useEffect, useState } from 'react'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';

import { ROCOCO_RPC_URL, DEFAULT_EXTENSION } from '../config';
import { KitchensinkRuntimeProxyType, SystemAccountType } from '../types';

export const useCreatePureProxyAccounts = () => {
    const [api, setApi] = useState<ApiPromise | null>(null);

    const connectToBlockchain = async () => {
        const wsProvider = new WsProvider(ROCOCO_RPC_URL);
        const _api = await ApiPromise.create({ provider: wsProvider });
        setApi(_api);
    };

    const createPureProxyAccount  = async (delegatorAddress: string, selectedAccountIndex: number, proxyType: KitchensinkRuntimeProxyType, delay: number) => {
        if (!api) return null;

        const injector = await web3FromSource(DEFAULT_EXTENSION);
        if (!injector) {
            console.error('Unable to find injector');
        }
        const tx = api.tx.proxy.createPure(proxyType, delay, selectedAccountIndex);
        return tx.signAndSend(delegatorAddress, { signer: injector.signer }, (result) => {
            console.log(`Transaction status: ${result.status}`);
            if (result.status.isInBlock) {
                console.log(`Included in block ${result.status.asInBlock}`);
            }
        });
    };

    const getAccountBalance = async (address: string) => {
        if (!api) return null;

        const account = await api.query.system.account(address);
        const data = account.toJSON()

        return data;
    };

    useEffect(() => {
        connectToBlockchain();
    }, [])

    return { api, connectToBlockchain, createPureProxyAccount, getAccountBalance };
}