export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
    const response = await fetch("http://localhost:3001", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    
    if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
    }

    return json.data;
}