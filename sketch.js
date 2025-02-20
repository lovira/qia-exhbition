let xoff = 0;
let yoff = 10000;
let points = [];
let fading = false;

function setup() {
    canvas = createCanvas(800, 1000);
    canvas.parent('animation-container');
    
    stroke(171, 110, 126);
    strokeWeight(5);
    noFill();
    clear();
}

function draw() {
    clear();
    
    if (!fading) {
        // Calculate new point position using Perlin noise
        let x = map(noise(xoff), 0, 1, 0, width);
        let y = map(noise(yoff), 0, 1, 0, height);
        
        points.push({ 
            x, 
            y,
            opacity: 255
        });
        
        xoff += 0.01;
        yoff += 0.01;
        
        if (points.length >= 250) {
            fading = true;
        }
    }
    
    for (let i = points.length - 1; i >= 0; i--) {
        let p = points[i];
        
        if (fading) {
            // Simply fade out
            p.opacity -= 2;
            
            if (p.opacity <= 0) {
                points.splice(i, 1);
                continue;
            }
        }
        
        stroke(171, 110, 126, p.opacity);
        point(p.x, p.y);
    }
    
    if (fading && points.length === 0) {
        resetAnimation();
    }
}

function resetAnimation() {
    fading = false;
    xoff = random(10000);
    yoff = random(10000);
    points = [];
    clear();
}