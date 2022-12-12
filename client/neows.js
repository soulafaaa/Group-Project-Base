const API_KEY = '7dSy45c8Uem5cD74ceWfAZDDKDUhsEukZvWVLueo';
const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed?';

window.getAsteroidData = async function(startDate, endDate) {
  // Format the start and end dates in the YYYY-MM-DD format required by the API
  const start = startDate.toISOString().slice(0, 10);
  const end = endDate.toISOString().slice(0, 10);
  // Make a GET request to the NeoWs API using the provided API key and dates
  const response = await fetch(`${API_URL}start_date=${start}&end_date=${end}&api_key=${API_KEY}`);

  // Parse the response as JSON
  const data = await response.json();
  // Return a Promise that resolves with the asteroid data
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

// Returns a list of asteroid objects
function getAsteroids(data) {
  // check if the "near_earth_objects" key exists in the data object
  if (data.hasOwnProperty('near_earth_objects')) {
    // if the key exists, log the array of values to the console
    console.log(data.near_earth_objects);

    // return the array of values
    return data.near_earth_objects;
  }

  console.log('trash');

  return [];
}

// Returns the name of an asteroid
function getAsteroidName(asteroid) {
  return asteroid.name;
}

// Returns the estimated diameter of an asteroid in kilometers
function getAsteroidDiameter(asteroid) {
  if (asteroid.estimated_diameter && asteroid.estimated_diameter.kilometers) {
    const { kilometers } = asteroid.estimated_diameter;
    return `${kilometers.estimated_diameter_min.toFixed(2)} - ${kilometers.estimated_diameter_max.toFixed(2)} km`;
  }
  return 'unknown';
}

// Returns the estimated speed of an asteroid in kilometers per hour
// Returns the estimated speed of an asteroid in kilometers per hour
function getAsteroidSpeed(asteroid) {
  if (asteroid.close_approach_data && asteroid.close_approach_data.length > 0
    && asteroid.close_approach_data[0].relative_velocity) {
    const { kph } = asteroid.close_approach_data[0].relative_velocity;
    return `${kph} km/h`;
  }
  return 'unknown';
}

// Returns the estimated distance of an asteroid from Earth in kilometers
function getAsteroidDistance(asteroid) {
  if (asteroid.close_approach_data && asteroid.close_approach_data.length > 0
    && asteroid.close_approach_data[0].miss_distance) {
    const { kilometers } = asteroid.close_approach_data[0].miss_distance;
    const num = Number(kilometers);
    return `${num.toFixed(2)} km`;
  }
  return 'unknown';
}
