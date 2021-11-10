import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { BusTimings } from "../components/BusTimings";
import { StationSelector } from "../components/StationSelector";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    const [station, setStation] = useState<number>();
    const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        setStation((s) => parseInt(e.target.value));
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Bus Finder</title>
                <meta name="description" content="Bus finder" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StationSelector changeHandler={selectChangeHandler} />
            {station && <BusTimings stationId={station} />}
        </div>
    );
};

export default Home;
