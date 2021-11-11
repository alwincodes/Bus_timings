import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { BusTimings } from "../components/BusTimings";
import { StationSelector } from "../components/StationSelector";
import { Box, Heading } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

const Buses: NextPage = () => {
    const [station, setStation] = useState<number>();
    const selectChangeHandler: ChangeEventHandler<HTMLSelectElement> = (
        e: ChangeEvent<HTMLSelectElement>
    ) => {
        let val = e.target.value;
        if (val) {
            setStation((s) => parseInt(val));
        }
    };
    return (
        <Box width="100wv" padding={4}>
            <Head>
                <title>Bus Finder</title>
                <meta name="description" content="Bus finder" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <StationSelector changeHandler={selectChangeHandler} />
            {station && <BusTimings stationId={station} />}
        </Box>
    );
};

export default Buses;
