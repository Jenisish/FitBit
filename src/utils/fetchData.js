export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY ,
  },
};

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Ensure we return an array for endpoints that should return arrays
    if (url.includes('bodyPartList') && !Array.isArray(data)) {
      console.error('Expected array for bodyPartList but got:', typeof data);
      return [];
    }
    
    // Ensure we return an array for exercises endpoints
    if (url.includes('/exercises') && !Array.isArray(data)) {
      console.error('Expected array for exercises but got:', typeof data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    
    // Return appropriate default values based on the endpoint
    if (url.includes('bodyPartList')) {
      return [];
    }
    
    if (url.includes('/exercises')) {
      return [];
    }
    
    // For other endpoints, return an empty object
    return {};
  }
};
