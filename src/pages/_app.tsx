import AppShell from "@/components/layouts/AppShell/AppShell";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
    <SessionProvider session={session}>
    <Head>
      <title>RyStore</title>
    </Head>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
    </>
  );
}
