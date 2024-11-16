import { http, createConfig } from "wagmi";
import { supportedNetworks } from "./networks";
import { HttpTransport } from "viem";
import { getDefaultConfig } from "connectkit";
import { config } from "./config";

export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: supportedNetworks,
    transports: supportedNetworks.reduce((acc, chain) => {
      return {
        ...acc,
        [chain.id]: http(),
      };
    }, {} as Record<1 | 11155111 | 84532 | 1301 | 747, HttpTransport>),
    appName: config.appName,
    walletConnectProjectId: config.walletConnectProjectId,
    ssr: true,
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
