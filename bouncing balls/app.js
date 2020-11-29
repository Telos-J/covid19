const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1600 / 2;
canvas.height = 900 / 2;

class Ball {
    constructor(x, y, direction) {
        this.radius = 10;
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.vx = this.speed * Math.cos(direction);
        this.vy = this.speed * Math.sin(direction);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width - this.radius || this.x < this.radius)
            this.vx = -this.vx;
        if (this.y > canvas.height - this.radius || this.y < this.radius)
            this.vy = -this.vy;
    }
}

const balls = [];
const numballs = 10;

for (let i = 0; i < numballs; i++) {
    balls.push(
        new Ball(
            Math.random() * (canvas.width - 20) + 10,
            Math.random() * (canvas.height - 20) + 10,
            Math.random() * 2 * Math.PI
        )
    );
}

function collide(ball1, ball2) {
    return Math.hypot(ball1.x - ball2.x, ball1.y - ball2.y) < 2 * ball1.radius;
}

function update() {
    for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (collide(balls[i], balls[j])) {
                console.log('collide!');
            }
        }
    }

    for (let ball of balls) {
        ball.move();
    }
}

function render() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'red';
    for (let ball of balls) {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

const engine = new Engine(1000 / 60, update, render);
engine.start();
