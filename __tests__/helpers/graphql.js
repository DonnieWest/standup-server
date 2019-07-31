import fetch from 'node-fetch'

export default function graphqlRequest(url, query, variables) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(response => response.json())
}
