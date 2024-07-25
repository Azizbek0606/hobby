const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Parameters
const numPoints = 300;
const maxRadius = 2;
const minRadius = 1;
const noise = 2; // Amplitude of noise
const speed = 0.02; // Speed of animation
const connectionDistance = 50; // Maximum distance to draw a line

// Colors for points
const colors = ['#FF5733', '#FF8D1A', '#FFC300', '#FF5733', '#C70039', '#900C3F', '#581845'];

// Mouse position
let mouse = {
    x: null,
    y: null
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Create an array to store points
let points = [];
for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (maxRadius - minRadius) + minRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2 // Random initial angle for direction
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections with gradient
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const gradient = ctx.createLinearGradient(points[i].x, points[i].y, points[j].x, points[j].y);
                gradient.addColorStop(0, points[i].color);
                gradient.addColorStop(1, points[j].color);

                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    // Draw points with shadow effect
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2, false);

        // Add shadow effect
        ctx.shadowColor = point.color;
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = point.color;
        ctx.fill();
    });
}

function update() {
    points.forEach(point => {
        // Update the position based on the angle and noise
        point.x += Math.cos(point.angle) * noise;
        point.y += Math.sin(point.angle) * noise;

        // Attract points to the mouse
        if (mouse.x && mouse.y) {
            const dx = mouse.x - point.x;
            const dy = mouse.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = 100;
            const force = (maxDistance - distance) / maxDistance;

            if (distance < maxDistance) {
                point.x += forceDirectionX * force * 0.6;
                point.y += forceDirectionY * force * 0.6;
            }
        }

        // Keep points within canvas bounds
        if (point.x < 0) point.x = canvas.width;
        if (point.x > canvas.width) point.x = 0;
        if (point.y < 0) point.y = canvas.height;
        if (point.y > canvas.height) point.y = 0;

        // Optionally, change angle to add more variety
        point.angle += (Math.random() - 0.5) * 0.05; // Small random change in angle
    });
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
