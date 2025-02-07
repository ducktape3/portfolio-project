document.addEventListener('DOMContentLoaded', function () {
    const filterLinks = document.querySelectorAll('.filter-link');
    const items = document.querySelectorAll('.scrollable-gallery .item');
    const scrollToWorksLinks = document.querySelectorAll('.scroll-to-works');

    filterLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            // Remove active class from all buttons
            filterLinks.forEach(link => link.querySelector('button').classList.remove('active'));

            // Add active class to the clicked button
            this.querySelector('button').classList.add('active');

            // Fetch and filter items
            fetchWorks(category);
        });
    });

    scrollToWorksLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const worksSection = document.querySelector('#works');

            // Smooth scroll to the works section
            worksSection.scrollIntoView({ behavior: 'smooth' });

            // Activate the Web Dev category after scrolling
            setTimeout(() => {
                filterLinks.forEach(link => link.querySelector('button').classList.remove('active'));
                document.querySelector(`.filter-link[data-category="${category}"] button`).classList.add('active');

                // Fetch and filter items
                fetchWorks(category);
            }, 500); // Adjust the timeout duration if needed
        });
    });
});

async function fetchWorks(category = 'all') {
    try {
        const response = await fetch('/works');

        if (!response.ok) {
            throw new Error('Failed to fetch works');
        }

        const works = await response.json();
        const workGallery = document.getElementById('workGallery');

        if (!workGallery) {
            console.error('Error: #workGallery not found in index.html');
            return;
        }

        workGallery.innerHTML = ''; // Clear previous works

        works.forEach(work => {
            if (category === 'all' || work.category === category) {
                const workItem = document.createElement('div');
                workItem.classList.add('item');
                workItem.setAttribute('data-category', work.category);
                workItem.innerHTML = `
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <div class="item-info">
                        <h3>${work.title}</h3>
                        <p>${work.description}</p>
                        <a href="${work.link}" target="_blank">View Work</a>
                    </div>
                `;
                workGallery.appendChild(workItem);
            }
        });
    } catch (error) {
        console.error('Error loading works:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => fetchWorks());
