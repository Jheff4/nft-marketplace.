const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3001/graphql';

export async function fetchGraphQL(query: string, variables?: Record<string, any>) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

// Helper function to fetch all pages of data
export async function fetchAllPages<T>(
  query: string,
  dataKey: string,
  pageSize: number = 100
): Promise<T[]> {
  let allData: T[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const variables = {
      first: pageSize,
      ...(cursor && { after: cursor }),
    };

    const data = await fetchGraphQL(query, variables);
    const connection = data[dataKey];

    allData = [...allData, ...connection.nodes];
    hasNextPage = connection.pageInfo.hasNextPage;
    cursor = connection.pageInfo.endCursor;
  }

  return allData;
}