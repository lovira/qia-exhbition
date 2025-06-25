// let xoff = 0;
// let yoff = 10000;
// let points = [];
// let fading = false;

// function setup() {
//     canvas = createCanvas(1000, 1000);
//     canvas.parent('animation-container');
    
//     stroke(171, 110, 126);
//     strokeWeight(5);
//     noFill();
//     clear();
// }

// function draw() {
//     clear();
    
//     if (!fading) {

//         let x = map(noise(xoff), 0, 1, 0, width);
//         let y = map(noise(yoff), 0, 1, 0, height);
        
//         points.push({ 
//             x, 
//             y,
//             opacity: 255
//         });
        
//         xoff += 0.01;
//         yoff += 0.01;
        
//         if (points.length >= 500) {
//             fading = true;
//         }
//     }
    
//     for (let i = points.length - 1; i >= 0; i--) {
//         let p = points[i];
        
//         if (fading) {
//             // Simply fade out
//             p.opacity -= 2;
            
//             if (p.opacity <= 0) {
//                 points.splice(i, 1);
//                 continue;
//             }
//         }
        
//         stroke(171, 110, 126, p.opacity);
//         point(p.x, p.y);
//     }
    
//     if (fading && points.length === 0) {
//         resetAnimation();
//     }
// }

// function resetAnimation() {
//     fading = false;
//     xoff = random(10000);
//     yoff = random(10000);
//     points = [];
//     clear();
// }
// function preload() {
//     // Replace these with your actual photo paths
//     img1 = loadImage('/Content/home1.PNG');
//     img2 = loadImage('/Content/home2.PNG');
//   }

// EX 2
// let particles = [];
// let img1, img2;
// let photoOpacity1 = 0;
// let photoOpacity2 = 0;
// let noiseScale = 0.01;
// let canvasWidth, canvasHeight;
// let smallScreen = false;

// function setup() {
//   // Calculate responsive canvas size
//   updateCanvasSize();
  
//   let canvas = createCanvas(canvasWidth, canvasHeight);
//   canvas.parent('animation-container');
  
//   // Create initial particles
//   createInitialParticles();
  
//   // Set drawing properties
//   noStroke();
  
//   // Start with photos hidden
//   photoOpacity1 = 0;
//   photoOpacity2 = 0;
// }

// function updateCanvasSize() {
//   // Determine if we're on a small screen
//   smallScreen = windowWidth <= 768;
  
//   if (smallScreen) {
//     // For mobile, use full width but limited height
//     canvasWidth = windowWidth;
//     canvasHeight = min(windowHeight * 0.4, 300);
//   } else {
//     // For desktop, use percentage of viewport
//     canvasWidth = min(windowWidth * 0.6, 800);
//     canvasHeight = min(windowHeight * 0.8, 800);
//   }
// }

// function createInitialParticles() {
//   particles = [];
//   // Adjust particle count based on screen size
//   let particleCount = smallScreen ? 15 : 25;
  
//   for (let i = 0; i < particleCount; i++) {
//     particles.push(createParticle());
//   }
// }

// function draw() {
//   clear();
  
//   // Slowly fade in photos
//   if (frameCount > 60 && photoOpacity1 < 120) {
//     photoOpacity1 += 0.5;
//   }
  
//   if (frameCount > 120 && photoOpacity2 < 100) {
//     photoOpacity2 += 0.4;
//   }
  
//   // Draw photos with responsive positioning
//   drawPhotos();
  
//   // Update and display particles
//   updateParticles();
  
//   // Add new particles occasionally
//   if (frameCount % 10 === 0) {
//     let maxParticles = smallScreen ? 20 : 30;
//     if (particles.length < maxParticles) {
//       particles.push(createParticle());
//     }
//   }
// }

// function drawPhotos() {
//   // Responsive positioning for photos
//   let img1Width, img1Height, img2Width, img2Height;
//   let img1X, img1Y, img2X, img2Y;
  
//   if (smallScreen) {
//     // Mobile layout
//     img1Width = width * 0.4;
//     img1Height = img1Width;
//     img1X = width * 0.1;
//     img1Y = height * 0.5;
    
//     img2Width = width * 0.4;
//     img2Height = img2Width;
//     img2X = width * 0.55;
//     img2Y = height * 0.2;
//   } else {
//     // Desktop layout
//     img1Width = width * 0.3;
//     img1Height = img1Width;
//     img1X = width * 0.15;
//     img1Y = height * 0.35;
    
//     img2Width = width * 0.35;
//     img2Height = img2Width;
//     img2X = width * 0.55;
//     img2Y = height * 0.55;
//   }
  
//   // Draw first photo with current opacity
//   push();
//   tint(255, photoOpacity1);
//   image(img1, img1X, img1Y, img1Width, img1Height);
//   pop();
  
//   // Draw second photo with current opacity
//   push();
//   tint(255, photoOpacity2);
//   image(img2, img2X, img2Y, img2Width, img2Height);
//   pop();
// }

// function updateParticles() {
//   for (let i = particles.length - 1; i >= 0; i--) {
//     let p = particles[i];
//     p.update();
//     p.display();
    
//     // Remove particles that have faded out
//     if (p.isDead()) {
//       particles.splice(i, 1);
//     }
//   }
// }

// function createParticle() {
//   // Use your site's color palette - primary is purplish blue, accent is pinkish
//   let primaryColor = color(67, 67, 142); // Your --primary-bg
//   let accentColor = color(171, 110, 126); // Your --accent-color
  
//   // Create a color somewhere between the two
//   let particleColor;
//   if (random() > 0.5) {
//     particleColor = lerpColor(primaryColor, accentColor, random(0.3, 0.7));
//   } else {
//     particleColor = accentColor;
//   }
  
//   // Adjust size based on screen
//   let maxSize = smallScreen ? 8 : 12;
  
//   return {
//     x: random(width),
//     y: random(height),
//     size: random(3, maxSize),
//     speedFactor: random(0.5, 1.5),
//     color: particleColor,
//     alpha: random(50, 150),
//     life: random(200, 400),
    
//     update: function() {
//       // Use Perlin noise for more natural, flowing movement
//       let angle = noise(this.x * noiseScale, this.y * noiseScale, frameCount * 0.01) * TWO_PI;
//       this.x += cos(angle) * this.speedFactor;
//       this.y += sin(angle) * this.speedFactor;
      
//       // Gradually reduce life
//       this.life -= 1;
      
//       // Adjust alpha based on life
//       this.alpha = map(this.life, 0, 400, 0, 150);
      
//       // Wrap around edges
//       if (this.x < 0) this.x = width;
//       if (this.x > width) this.x = 0;
//       if (this.y < 0) this.y = height;
//       if (this.y > height) this.y = 0;
//     },
    
//     display: function() {
//       // Draw the particle with current color and alpha
//       noStroke();
//       fill(red(this.color), green(this.color), blue(this.color), this.alpha);
//       ellipse(this.x, this.y, this.size, this.size);
//     },
    
//     isDead: function() {
//       return this.life < 0;
//     }
//   };
// }

// function windowResized() {
//   // Update canvas dimensions
//   updateCanvasSize();
  
//   // Resize the canvas
//   resizeCanvas(canvasWidth, canvasHeight);
  
//   // Recreate particles for new dimensions
//   createInitialParticles();
// }
