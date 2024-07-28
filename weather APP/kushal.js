document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location.');
    }
});

async function fetchWeather(location) {
    const apiKey = '676fb7fdc4045f5743b97308dacd61c1'; // Your API key

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        console.log(data); // Log the response data for debugging

        if (data.cod === 200) {
            document.getElementById('city').innerText = `City: ${data.name}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
            
            // Update weather icon
            const iconCode = data.weather[0].icon;
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        } else if (data.cod === 404) {
            alert('City not found. Please enter a valid city name.');
            document.getElementById('city').innerText = '';
            document.getElementById('temperature').innerText = '';
            document.getElementById('description').innerText = '';
            document.getElementById('weatherIcon').src = '';
        } else {
            alert('An error occurred. Please try again.');
            console.error('Error details:', data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data. Please check the console for details.');
    }
}
