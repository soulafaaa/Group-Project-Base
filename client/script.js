const form = document.getElementById('form');
const asteroidList = document.getElementById('asteroid-list');

// Function to generate the list of asteroids
function generateAsteroidList(asteroids, list) {
  const map = new Map(Object.entries(asteroids));

  // console.log(map);
  for (const day of map.keys()) {
    // console.log("this is the ass",map.get(day));
    for (const asteroid of map.get(day)) {
      console.log('this is the ass', asteroid);
      const name = getAsteroidName(asteroid);
      const speed = getAsteroidSpeed(asteroid);
      const distance = getAsteroidDistance(asteroid);
      const diameter = getAsteroidDiameter(asteroid);
      const item = document.createElement('li');

      item.innerHTML = `<strong>${name}</strong><br /> Diameter: ${diameter}<br /> Speed: ${speed}<br /> Distance from our homeland: ${distance}<br>`;
      list.appendChild(item);
    }
  }

const startDateElement = document.getElementById('start-date');
const endDateElement = document.getElementById('end-date');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the start and end dates from the input elements
  const startDate = new Date(startDateElement.valueAsDate);
  const endDate = new Date(endDateElement.valueAsDate);

  const data = await getAsteroidData(startDate, endDate);

  const asteroids = getAsteroids(data);
  console.log('this is the event asteroids', asteroids);
  asteroidList.innerHTML = '';

  // Generate the asteroid list
  generateAsteroidList(asteroids, asteroidList);
});