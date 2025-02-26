document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop();
    

    const contentContainer = document.getElementById('essay-container') || document.getElementById('about-content-container');
    
    if (!contentContainer) return;
    
    let markdownFile;
    
    switch(currentPage) {
        case 'Artist1.html':
            markdownFile = 'Content/essay1.md';
            break;
        case 'about.html':
            markdownFile = 'Content/about.md';
            break;
        // Add more cases for additional pages
        // case 'artist2.html':
        //     markdownFile = 'Content/essay2.md';
        //     break;
        default:
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
            const htmlContent = marked.parse(markdown);
            contentContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error:', error);
            contentContainer.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        });
});