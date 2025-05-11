document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for navbar height
                    behavior: 'smooth'
                });
                if (window.innerWidth < 769) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // --- Placeholder for fetching weather data ---
    async function getWeatherData(city, tempId, conditionId, humidityId) {
        // Replace with your actual API endpoint and API key
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.example.com/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.main && data.weather && data.weather.length > 0) {
                document.getElementById(tempId).textContent = data.main.temp;
                document.getElementById(conditionId).textContent = data.weather[0].description;
                document.getElementById(humidityId).textContent = data.main.humidity;
            } else {
                console.error(`Could not fetch weather data for ${city}`);
                document.getElementById(tempId).textContent = 'N/A';
                document.getElementById(conditionId).textContent = 'N/A';
                document.getElementById(humidityId).textContent = 'N/A';
            }
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error);
            document.getElementById(tempId).textContent = 'Error';
            document.getElementById(conditionId).textContent = 'Error';
            document.getElementById(humidityId).textContent = 'Error';
        }
    }

    // Call the function for your cities (replace 'City 1' and 'City 2' with actual city names)
    // You'll need to sign up for a weather API (e.g., OpenWeatherMap) and get an API key.
    // Remember to replace 'YOUR_API_KEY' with your actual key.
    getWeatherData('London', 'city1-temp', 'city1-condition', 'city1-humidity');
    getWeatherData('Tokyo', 'city2-temp', 'city2-condition', 'city2-humidity');
});