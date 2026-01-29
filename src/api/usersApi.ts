
export const fetchUsers500 = async () => {
  const baseUrl = import.meta.env.VITE_MOCK_API_URL;
  const apiKey = import.meta.env.VITE_MOCK_API_KEY;

  if (!baseUrl || !apiKey) {
    console.error("Missing env vars:", { baseUrl, apiKey });
    return [];
  }

  const url = `${baseUrl}?count=500&key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    console.error("Fetch failed:", res.status, res.statusText);
    return [];
  }

  return await res.json();
};

