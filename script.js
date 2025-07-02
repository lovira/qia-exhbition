document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    const contentContainer = document.getElementById('essay-container') || document.getElementById('about-content-container');
    
    // Exit early if no container is found
    if (!contentContainer) {
        console.log('No content container found on this page');
        return;
    }
    
    let markdownFile;
    
    switch(currentPage) {
        case 'Artist1.html':
            markdownFile = 'Content/essay1.md';
            break;
        case 'about.html':
            markdownFile = 'Content/about.md';
            break;
        default:
            console.log('No markdown file configured for this page');
            return; // Exit if no matching page
    }
    
    fetch(markdownFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${markdownFile}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(markdown => {
            // For essay pages, load content into essay-body div
            if (currentPage === 'Artist1.html') {
                const essayBody = contentContainer.querySelector('.essay-body');
                if (essayBody) {
                    // Remove the title from markdown since it's already in the HTML
                    const markdownWithoutTitle = markdown.replace(/^# .*\n/, '');
                    essayBody.innerHTML = marked.parse(markdownWithoutTitle);
                } else {
                    console.log('No essay-body found');
                }
            } else {
                // For other pages, load content as before
                contentContainer.innerHTML = marked.parse(markdown);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorMessage = `<p>Error loading content: ${error.message}</p>`;
            if (currentPage === 'Artist1.html') {
                const essayBody = contentContainer.querySelector('.essay-body');
                if (essayBody) {
                    essayBody.innerHTML = errorMessage;
                }
            } else {
                contentContainer.innerHTML = errorMessage;
            }
        });
});