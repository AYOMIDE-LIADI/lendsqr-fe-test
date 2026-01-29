export const fetchUsers500 = async () => {
  const baseUrl = import.meta.env.VITE_MOCK_API_URL;
  const apiKey = import.meta.env.VITE_MOCK_API_KEY;

  if (!baseUrl || !apiKey) {
    return [];
  }

  const urlObj = new URL(baseUrl);
  urlObj.searchParams.set("count", "500");
  urlObj.searchParams.set("key", apiKey);

  const url = urlObj.toString();

  const res = await fetch(url);

const text = await res.text();

if (!res.ok) {
  return [];
}


  if (!res.ok) {
    return [];
  }

  try {
    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (e) {
    return [];
  }
};
