document.getElementById('weatherForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const location = document.getElementById('locationInput').value.trim();
  const apiKey = '8bef9ee85edf42c8af4100111250507';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  const weatherResult = document.getElementById('weatherResult');
  const errorDiv = document.getElementById('error');
  const loading = document.getElementById('loading');

  // Reset UI
  weatherResult.classList.add('d-none');
  errorDiv.classList.add('d-none');
  loading.classList.remove('d-none');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location not found');

    const data = await response.json();

    document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = data.current.temp_c;
    document.getElementById('conditionText').textContent = data.current.condition.text;
    document.getElementById('conditionIcon').src = data.current.condition.icon;

    // Show result
    loading.classList.add('d-none');
    weatherResult.classList.remove('d-none');
    weatherResult.classList.add('animate__fadeInUp');

  } catch (error) {
    loading.classList.add('d-none');
    errorDiv.textContent = error.message;
    errorDiv.classList.remove('d-none');
  }
});
