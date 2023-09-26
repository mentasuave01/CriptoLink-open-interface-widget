"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import "../styles/global.css";
import { config } from "../wagmi";
import CL_Avatar from "../components/CL_Avatar";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        customTheme={{
          "--ck-connectbutton-background": "transparent",
        }}
        options={{
          customAvatar: CL_Avatar,
          initialChainId: 0,
        }}
      >
        {mounted && children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
