const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
    radius: 75
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.color = "#ffffda";
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            this.radius = this.baseRadius + 3;
        } else {
            this.radius = this.baseRadius;
        }

        this.draw();
    }
}

const pointsArray = [];
const numberOfPoints = 300;

for (let i = 0; i < numberOfPoints; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    pointsArray.push(new Point(x, y));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pointsArray.length; i++) {
        pointsArray[i].update();

        for (let j = i + 1; j < pointsArray.length; j++) {
            let dx = pointsArray[i].x - pointsArray[j].x;
            let dy = pointsArray[i].y - pointsArray[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 75) {
                ctx.beginPath();
                ctx.moveTo(pointsArray[i].x, pointsArray[i].y);
                ctx.lineTo(pointsArray[j].x, pointsArray[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}   

animate();
