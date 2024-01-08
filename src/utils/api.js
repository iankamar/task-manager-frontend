export const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return await response.json();
};
