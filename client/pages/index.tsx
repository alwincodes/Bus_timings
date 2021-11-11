import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { NavBar } from "../components/NavBar";
import parseMd from "../utils/parseMd";
import style from "../styles/index.module.scss";
import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
import { useColorMode } from "@chakra-ui/color-mode";
interface HomeProps {
    html: string;
}
const Home: NextPage<HomeProps> = (props) => {
    const { colorMode } = useColorMode();
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
                className={
                    colorMode === "light"
                        ? style.md_container_light
                        : style.md_container_dark
                }
                dangerouslySetInnerHTML={{ __html: props.html }}
            ></Box>
            <NextLink href="/buses">
                <Button
                    variant="link"
                    m="1em 0em 0em 2em"
                    p="3"
                    backgroundColor="linkedin.800"
                    color={colorMode === "dark" ? "inherit" : "white"}
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
