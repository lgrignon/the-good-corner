import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "./layout";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { ContextSetter, setContext } from "@apollo/client/link/context"
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from ".";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authHeaderFunction: ContextSetter = (request, { headers }) => {

  const token: string | null = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  return {
    headers: {
      ...headers,
      Authorization: token ? 'Bearer ' + token : ''
    }
  };
};
const authHeaderLink = setContext(authHeaderFunction);

const apolloClient = new ApolloClient({
  link: authHeaderLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
