export const request = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`${data.message}`);
  }
  return await response.json();
};
