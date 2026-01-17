const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql";

export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>
) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const text = await response.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response: ${text}`);
  }

  if (!response.ok) {
    throw new Error(
      `GraphQL HTTP ${response.status}:\n${JSON.stringify(json, null, 2)}`
    );
  }

  if (json.errors) {
    throw new Error(
      `GraphQL execution error:\n${JSON.stringify(json.errors, null, 2)}`
    );
  }

  return json.data;
}


/**
 * NON-PAGINATED helper
 * Use this ONLY for queries that return { nodes }
 */
export async function fetchAllPages<T>(
  query: string,
  dataKey: string
): Promise<T[]> {
  const data = await fetchGraphQL(query);
  return data[dataKey].nodes as T[];
}
