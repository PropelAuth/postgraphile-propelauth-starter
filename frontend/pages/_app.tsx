import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RequiredAuthProvider} from '@propelauth/react'
import AuthenticatedApolloProvider from '../components/AuthenticatedApolloProvider'

const getAuthUrlFromEnv = () => {
    const authUrl = process.env["NEXT_PUBLIC_PROPELAUTH_AUTH_URL"]
    if (!authUrl) {
        throw new Error(`Could not find env variable NEXT_PUBLIC_PROPELAUTH_AUTH_URL`);
    }
    return authUrl
}

function MyApp({Component, pageProps}: AppProps) {
    return <RequiredAuthProvider authUrl={getAuthUrlFromEnv()}>
        <AuthenticatedApolloProvider>
            <Component {...pageProps} />
        </AuthenticatedApolloProvider>
    </RequiredAuthProvider>


}

export default MyApp
