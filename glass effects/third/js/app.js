// script.js
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.neon-container');
    const dotsCount = 2000;

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.backgroundColor = 'white';
        dot.style.borderRadius = '50%';
        dot.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 40px #ff00de';
        // Ensure dots stay within the viewport
        dot.style.left = `${Math.random() * (window.innerWidth - 10)}px`;
        dot.style.top = `${Math.random() * (window.innerHeight - 10)}px`;

        document.body.appendChild(dot);
    }
});
