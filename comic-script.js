document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.comic-panel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const panelCounter = document.getElementById('panelCounter');
    let currentPanel = 0;
    
    function updateDisplay() {
        // Hide all panels
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Show current panel
        panels[currentPanel].classList.add('active');
        
        // Update counter
        panelCounter.textContent = `Panel ${currentPanel + 1} of ${panels.length}`;
        
        // Update button states
        prevButton.disabled = currentPanel === 0;
        nextButton.disabled = currentPanel === panels.length - 1;
    }
    
    // Next button click
    nextButton.addEventListener('click', function() {
        if (currentPanel < panels.length - 1) {
            currentPanel++;
            updateDisplay();
        }
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        if (currentPanel > 0) {
            currentPanel--;
            updateDisplay();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentPanel < panels.length - 1) {
            currentPanel++;
            updateDisplay();
        } else if (e.key === 'ArrowLeft' && currentPanel > 0) {
            currentPanel--;
            updateDisplay();
        }
    });
    
    // Initialize
    updateDisplay();
});