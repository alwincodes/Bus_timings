import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter();

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
                        p={2}
                        variant="link"
                        backgroundColor={
                            router.pathname === "/buses"
                                ? "gray.600"
                                : "linkedin.800"
                        }
                    >
                        Find Buses
                    </Button>
                </NextLink>
            </Box>
        </Flex>
    );
};
