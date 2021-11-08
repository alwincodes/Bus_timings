import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Hello Alwin</title>
                <meta name="description" content="Alwin Data" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Hello Alwin</h1>
        </div>
    );
};

export default Home;
