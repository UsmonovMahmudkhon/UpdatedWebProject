document.addEventListener("DOMContentLoaded", function () {
    const goalText = "At Art Gallery, our mission is to inspire and connect people through the power of art. We aim to create a vibrant and inclusive space where artists, collectors, and art enthusiasts can come together to share their passion, discover new talents, and experience the transformative power of art in innovative ways. Our vision is to become a leading platform for art discovery and appreciation, leveraging cutting-edge technology to enhance the way art is experienced and enjoyed. We are committed to supporting emerging and established artists, fostering creativity, and making art accessible to everyone, regardless of their background or circumstances. By offering a diverse range of exhibitions, interactive experiences, and educational programs, we strive to enrich the cultural landscape and build a global community that celebrates the beauty and diversity of artistic expression. Join us on this journey as we explore the endless possibilities of art and creativity, and work together to make a positive impact on the world through the universal language of art";
    const goalElement = document.getElementById("goal-text");
    let index = 0;

    function typeLetter() {
        if (index < goalText.length) {
            goalElement.textContent += goalText.charAt(index);
            index++;
            setTimeout(typeLetter, 70); // Adjust typing speed here (in milliseconds)
        }
    }

    typeLetter();
});

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const searchTermInput = document.getElementById('search-term');
    const imageGrid = document.getElementById('image-grid');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const darkModeIcon = darkModeToggle.querySelector('i');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Load dark mode preference from localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update the icon
        if (body.classList.contains('dark-mode')) {
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
    });

    generateButton.addEventListener('click', () => {
        const searchTerm = searchTermInput.value.trim();
        if (searchTerm) {
            fetchImages(searchTerm);
        }
    });
    
    async function fetchImages(query) {
        const apiKey = 'gqEYNmX6p2vGAUvjyz-EntntGkwDA2noKPaZdzhuxQ0';
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayImages(data.results);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }
    
    function displayImages(images) {
        imageGrid.innerHTML = '';
        images.forEach(image => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('image-card');
            imgElement.innerHTML = `
                <img src="${image.urls.small}" alt="${image.alt_description}">
                <p>${image.alt_description}</p>
                <a href="${image.urls.full}" download="image.jpg" class="download-button">Download</a>
            `;
            imageGrid.appendChild(imgElement);
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const arGenerateButton = document.getElementById('ar-generate-button');
    const arSearchTermInput = document.getElementById('ar-search-term');
    const imageContainer = document.getElementById('image-container');
    let currentImageUrl = '';

    arGenerateButton.addEventListener('click', () => {
        const searchTerm = arSearchTermInput.value.trim();
        if (searchTerm) {
            fetchARImages(searchTerm);
        }
    });

    async function fetchARImages(query) {
        const apiKey = 'gqEYNmX6p2vGAUvjyz-EntntGkwDA2noKPaZdzhuxQ0';
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length > 0) {
                currentImageUrl = data.results[0].urls.small;
                alert('Image ready to place. Tap on the AR scene to place the image.');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    document.querySelector('a-scene').addEventListener('click', (event) => {
        if (currentImageUrl) {
            const touchPoint = getTouchPoint(event);
            placeImageInAR(currentImageUrl, touchPoint);
            currentImageUrl = '';
        }
    });

    function getTouchPoint(event) {
        const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
        const touch = touches[0];
        const touchPoint = { x: touch.clientX, y: touch.clientY };
        return touchPoint;
    }

    function placeImageInAR(imageUrl, touchPoint) {
        const { x, y } = touchPoint;
        const position = `0 1 -3`;  // Adjust this position as needed
        const imageEntity = document.createElement('a-image');
        imageEntity.setAttribute('src', imageUrl);
        imageEntity.setAttribute('position', position);
        imageEntity.setAttribute('scale', '2 2 2');
        imageEntity.setAttribute('look-at', '[camera]');
        imageContainer.appendChild(imageEntity);
    }
});