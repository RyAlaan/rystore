export const fetcher = async (url: string, method?: string) => {
  //   fetch(url).then((res) => res.json());
  const response = await fetch(url, { method: method || "GET" });

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }

  return response.json();
};
