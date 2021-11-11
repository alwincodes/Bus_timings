import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { NavBar } from "../components/NavBar";
import parseMd from "../utils/parseMd";
interface HomeProps {
    html: string;
}
const Home: NextPage<HomeProps> = (props) => {
    return (
        <Box width="100wv" padding={4}>
            <Head>
                <title>Bus Finder</title>
                <meta name="description" content="Bus finder" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <Box
                padding={5}
                style={{}}
                dangerouslySetInnerHTML={{ __html: props.html }}
            ></Box>
        </Box>
    );
};

export async function getStaticProps() {
    const htmlParsed = parseMd("index");
    return {
        props: {
            html: htmlParsed,
        },
    };
}
export default Home;
