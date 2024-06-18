// Function to create particles
function createParticles() {
  const numParticles = 50; // Number of particles

  // Loop to create particles
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.getElementById('background-animation').appendChild(particle);

    // Set initial position and size
    const size = Math.random() * 10 + 5; // Random size between 5 and 15px
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;
    const color = ['#5cb85c', '#4cae4c', '#008cba', '#0056b3'][Math.floor(Math.random() * 4)]; // Random color from predefined array

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = `${initialX}px`;
    particle.style.top = `${initialY}px`;

    // Animate particle movement
    anime({
      targets: particle,
      translateX: [
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
      ],
      translateY: [
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
      ],
      opacity: [
        { value: 1 },
        { value: 0, duration: 1500, delay: 200, easing: 'easeOutQuad' }
      ],
      duration: () => Math.random() * 5000 + 2000,
      loop: true,
      easing: 'linear'
    });
  }
}

// Call the function to create particles when the window loads
window.onload = createParticles;
