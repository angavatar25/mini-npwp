const BASE_URL = "https://online-test-api.achilles.systems/api/v1";

export const apiFetch = (endpoint: string, method: string, payload?: any) => {
  const url = `${BASE_URL}${endpoint}`;

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  });
}