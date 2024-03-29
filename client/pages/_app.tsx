import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider, LightMode } from "@chakra-ui/react";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </ApolloProvider>
    );
}

export default MyApp;
