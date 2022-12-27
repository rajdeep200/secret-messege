import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-2694152104411481"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
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
    </>
  );
}

export default MyApp;
