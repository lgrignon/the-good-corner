import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "./layout";
import { ApolloClient, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from "@apollo/client";
import { ContextSetter, setContext } from "@apollo/client/link/context"
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from ".";
import { AuthContextProvider } from "@/contexts/authContext";
import { useEffect } from "react";

let BACKEND_URL = 'http://localhost:4000/'
const authHeaderFunction: ContextSetter = (request, { headers }) => {

  const token: string | null = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

  return {
    headers: {
      ...headers,
      Authorization: token ? 'Bearer ' + token : ''
    }
  };
};

const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {

  const query = `${BACKEND_URL}/${input}`;
  console.log("query to " + query);
  return fetch(query, init);

};

const httpLink = new HttpLink({ fetch: customFetch });
const authHeaderLink = setContext(authHeaderFunction);


const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authHeaderLink.concat(httpLink)
});

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const CIFlag = document.cookie.includes('CI=true') || new URL(document.location.href).searchParams.get('CI')
    if (CIFlag) {
      BACKEND_URL = 'http://back:4000/';
    } else {
      BACKEND_URL = 'http://localhost:4000/';
    }
    document.cookie = `CI=${CIFlag}; `
  });

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
