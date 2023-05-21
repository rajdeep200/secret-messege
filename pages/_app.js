import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { pageview } from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-MZFX1Z7G9K"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MZFX1Z7G9K', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      {/* <Script
        id="Adsense-id"
        data-ad-client="ca-pub-2694152104411481"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      /> */}
      <Layout>
        <Head>
          <title>🎉Secret message dare 2022🥳</title>
          <meta
            name="description"
            content="Enter your Name, Create Secret Message dare link for whatsapp, facebook and Share it with your friends. Get unknown feedback from your friends, co-workers, and Fans."
          />
          <link rel="icon" href="/message-favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
