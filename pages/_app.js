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
          content="Enter your Name, Create Secret Message link and Share with your friends on Whatsapp, Facebook. Get unknown feedback from your friends, co-workers, and Fans."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
