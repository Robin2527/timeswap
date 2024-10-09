// client/src/wagmiClient.js

import { createClient, chain, WagmiConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

// Create a client
const client = createClient({
  autoConnect: true,
  connectors: () => [
    new InjectedConnector({
      chains: [chain.mainnet, chain.rinkeby], // Specify the chains you want to support
    }),
  ],
});

export default client;
