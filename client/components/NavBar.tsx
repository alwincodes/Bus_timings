import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import React from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue("whitesmoke", "lightblue");

    return (
        <Flex
            padding="4"
            color="telegram.300"
            justifyContent="space-between"
            alignItems="center"
        >
            <Box>
                <NextLink href="/">
                    <Heading cursor="pointer">Bus Timings</Heading>
                </NextLink>
            </Box>
            <Box>
                <NextLink href="/buses">
                    <Button
                        ml={2}
                        p={3}
                        variant="link"
                        color={color}
                        backgroundColor={
                            router.pathname === "/buses"
                                ? "gray.600"
                                : "linkedin.800"
                        }
                    >
                        Find Buses
                    </Button>
                </NextLink>
                <Button onClick={toggleColorMode} size="sm" m={2}>
                    {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
                </Button>
            </Box>
        </Flex>
    );
};
