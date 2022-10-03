import {useQuery, gql} from '@apollo/client';

const LIST_WIKI_PAGES = gql`
query ListWikiPages {
  wikiPages {
    nodes {
      id
      orgId
      title
      body
    }
  }
}
`;

function ExampleFetchComponent() {
    const {loading, error, data} = useQuery(LIST_WIKI_PAGES);

    if (loading) return <p>Loading...</p>;
    if (error) return <pre><h2>GraphQL Error</h2> {JSON.stringify(error, null, 2)}</pre>;

    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
}

export default ExampleFetchComponent;
