import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { NavBar } from "../components/NavBar";
import parseMd from "../utils/parseMd";
import style from "../styles/index.module.scss";
import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
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
                className={style.md_container}
                dangerouslySetInnerHTML={{ __html: props.html }}
            ></Box>
            <NextLink href="/buses">
                <Button
                    variant="link"
                    m="1em 0em 0em 2em"
                    p="3"
                    backgroundColor="linkedin.800"
                >
                    Find Buses
                </Button>
            </NextLink>
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
