// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animating project cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project elements
    document.querySelectorAll('.project').forEach(project => {
        observer.observe(project);
    });

    // Project filtering functionality
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const projects = document.querySelectorAll('.project');

    // Add event listeners to all filter checkboxes
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProjects);
    });

    function filterProjects() {
        const selectedFilters = new Set(
            Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.filter)
        );

        projects.forEach(project => {
            const projectTags = new Set(project.dataset.tags.split(',').map(tag => tag.trim().toLowerCase()));

            // Show project if no filters are selected or if it matches all selected filters
            project.style.display = selectedFilters.size === 0 || [...selectedFilters].every(filter => projectTags.has(filter)) ? 'block' : 'none';
        });
    }

    // Back to Top button functionality
    const backToTopButton = document.getElementById("back-to-top");

    // Show/hide Back to Top button based on scroll position
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        backToTopButton.style.display = scrollTop > 20 ? "block" : "none";
    });

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});