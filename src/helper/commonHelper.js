function extractResponseData(response) {
  // Check if the response has the expected structure
  if (response?.data) {
    const { data } = response.data;
    return data;
  } else {
    // Handle unexpected response structure or missing data property
    console.error("Invalid response structure:", response);
    return null;
  }
}

export { extractResponseData };
