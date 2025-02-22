document.addEventListener('DOMContentLoaded', function() {
    const essayContainer = document.getElementById('essay-container');

    fetch('Content/essay1.md')
        .then(response => response.text())
        .then(markdown => {
            const htmlContent = marked.parse(markdown);
            essayContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});