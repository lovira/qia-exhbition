document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    // Only run on about2.html
    if (currentPage !== 'about2.html') {
        return;
    }

    const toggleButton = document.getElementById('language-toggle');
    const essayBody = document.querySelector('.essay-body');

    if (!toggleButton || !essayBody) {
        return;
    }

    // Default language is Indonesian
    let currentLang = 'id';

    // Function to load language content
    function loadLanguage(lang) {
        const markdownFile = lang === 'id' ? 'Content/about-id.md' : 'Content/about-en.md';

        fetch(markdownFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${markdownFile}`);
                }
                return response.text();
            })
            .then(markdown => {
                essayBody.innerHTML = marked.parse(markdown);
                currentLang = lang;

                // Update button text
                if (lang === 'id') {
                    toggleButton.textContent = 'Read in English';
                } else {
                    toggleButton.textContent = 'Baca dalam Bahasa Indonesia';
                }
            })
            .catch(error => {
                console.error('Error loading language:', error);
                essayBody.innerHTML = `<p>Error loading content: ${error.message}</p>`;
            });
    }

    // Load Indonesian by default
    loadLanguage('id');

    // Toggle language on button click
    toggleButton.addEventListener('click', function() {
        const newLang = currentLang === 'id' ? 'en' : 'id';
        loadLanguage(newLang);
    });
});
