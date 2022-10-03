import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {useRedirectFunctions, WithLoggedInAuthInfoProps, withRequiredAuthInfo} from "@propelauth/react";
import {ReactNode} from "react";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
});

const accessTokenToAuthLink = (accessToken: string, orgId: string) => setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
            "x-org-id": orgId,
        }
    }
});

interface AuthenticatedApolloProviderProps extends WithLoggedInAuthInfoProps {
    children?: ReactNode
}

const AuthenticatedApolloProvider = withRequiredAuthInfo((props: AuthenticatedApolloProviderProps) => {
    const {redirectToCreateOrgPage} = useRedirectFunctions()

    // There are a number of strategies to get an organization for the user to operate within
    // In this case, we'll defer to the user's choice by checking which org they have selected
    // We can use `orgHelper.selectOrg` separately to let the user pick
    const selectedOrg = props.orgHelper.getSelectedOrg();

    // If the user has no orgs, prompt them to create or join one
    if (!selectedOrg) {
        redirectToCreateOrgPage();
        return <></>
    }

    const authLink = accessTokenToAuthLink(props.accessToken, selectedOrg.orgId)

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
});

export default AuthenticatedApolloProvider