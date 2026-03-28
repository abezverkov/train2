// API utility functions for connecting to the Django REST API backend

export const getApiBaseUrl = () => {
  const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  
  console.log(`API Base URL: ${codespaceUrl}`);
  return codespaceUrl;
};

export const fetchFromApi = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/${endpoint}/`;
  
  console.log(`Fetching from: ${url}`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated and plain array responses
    const items = data.results || data;
    
    console.log(`Data fetched from ${endpoint}:`, data);
    console.log(`Processed items from ${endpoint}:`, items);
    
    return Array.isArray(items) ? items : [items];
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};
