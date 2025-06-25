// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Configuration
const config = {
    pdfUrl: 'Content/ruri-puisi.pdf',  // Replace with actual PDF path
    totalPages: 6,                // Update with your actual page count
    initialPage: 1
};

// State variables
let currentPage = config.initialPage;

// DOM Elements
const elements = {
    pdfPages: document.getElementById('pdfPages'),
    currentPageEl: document.getElementById('currentPage'),
    totalPagesEl: document.getElementById('totalPages'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn')
};

/**
 * Loads and renders PDF pages
 */
async function loadPdfPages() {
    try {
        const loadingTask = pdfjsLib.getDocument(config.pdfUrl);
        const pdf = await loadingTask.promise;
        
        // Update total pages display
        elements.totalPagesEl.textContent = pdf.numPages;
        config.totalPages = pdf.numPages;
        
        // Clear existing content
        elements.pdfPages.innerHTML = '';
        
        // Load each page
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            
            // Create a container for this page
            const pageDiv = document.createElement('div');
            pageDiv.className = 'pdf-page';
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            pageDiv.appendChild(canvas);
            elements.pdfPages.appendChild(pageDiv);
            
            // Render the page
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
        }
        
        updatePageView();
    } catch (error) {
        console.error('Error loading PDF:', error);
        loadFallbackImages();
    }
}

/**
 * Fallback function to load images if PDF fails to load
 */
function loadFallbackImages() {
    // Clear container
    elements.pdfPages.innerHTML = '';
    
    // Create image pages as fallback
    for (let i = 1; i <= config.totalPages; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        
        const img = document.createElement('img');
        img.src = `path/to/poem-page-${i}.jpg`;  // Replace with actual image paths
        img.alt = `Poem page ${i}`;
        
        pageDiv.appendChild(img);
        elements.pdfPages.appendChild(pageDiv);
    }
    
    updatePageView();
}

/**
 * Updates the view to show current page
 */
function updatePageView() {
    // Update transform to show current page
    elements.pdfPages.style.transform = `translateX(-${(currentPage - 1) * 100}%)`;
    
    // Update page counter
    elements.currentPageEl.textContent = currentPage;
    
    // Update button states
    elements.prevBtn.disabled = currentPage === 1;
    elements.nextBtn.disabled = currentPage === config.totalPages;
}

/**
 * Navigate to next page
 */
function nextPage() {
    if (currentPage < config.totalPages) {
        currentPage++;
        updatePageView();
    }
}

/**
 * Navigate to previous page
 */
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePageView();
    }
}

/**
 * Initialize the viewer
 */
function initViewer() {
    // Set initial page count
    elements.totalPagesEl.textContent = config.totalPages;
    
    // Add event listeners
    elements.nextBtn.addEventListener('click', nextPage);
    elements.prevBtn.addEventListener('click', prevPage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            prevPage();
        }
    });
    
    // Load the PDF
    loadPdfPages();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initViewer);