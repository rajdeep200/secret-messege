import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>🎉Secret message dare 2022🥳</title>
        <meta
          name="description"
          content="Enter your Name, Create Secret Message dare link for whatsapp, facebook and Share it with your friends. Get unknown feedback from your friends, co-workers, and Fans."
        />
        <link rel="icon" href="/message-favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2694152104411481"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
