import { Vector2, angleToVector, vectorToAngle } from './vector.js';

const susceptible = '#538B94';
const infected = '#9F4C00';
const recovered = '#96418A';
const dead = '#050505';

const numballs = 1000;
const probInfected = 0.05;
const probMask = 0;

class Ball {
    constructor(x, y, direction, status, mask, age) {
        this.radius = 5;
        this.speed = 3;
        this.travelspeed = 6;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(
            this.speed * Math.cos(direction),
            this.speed * Math.sin(direction)
        );
        this.status = status;
        this.mask = mask;
        this.timeInfected = 0;
        this.age = age;
        this.traveling = false;
        this.destination = new Vector2();
    }

    move() {
        this.position = this.position.add(this.velocity);
    }

    travel() {
        this.position = this.position.add(
            this.destination.sub(this.position).normalize(this.travelspeed)
        );

        if (this.position.sub(this.destination).magnitude() < this.travelspeed)
            this.traveling = false;
    }
}

const balls = [];

for (let i = 0; i < numballs; i++) {
    balls.push(
        new Ball(
            Math.random() * (buffer.canvas.width - 20) + 10,
            Math.random() * (buffer.canvas.height - 20) + 10,
            Math.random() * 2 * Math.PI,
            Math.random() < probInfected ? infected : susceptible,
            Math.random() < probMask ? true : false,
            parseInt(Math.random() * 100)
        )
    );
}

function collide(ball1, ball2) {
    return ball1.position.sub(ball2.position).magnitude() < 2 * ball1.radius;
}

function bounceoff(ball1, ball2) {
    const m = ball1.position.add(ball2.position).scale(1 / 2);
    const n1 = ball1.position.sub(ball2.position).normalize();
    ball1.velocity = ball1.velocity.sub(n1.scale(2 * ball1.velocity.dot(n1)));
    ball1.position = m.add(n1.scale(ball1.radius));

    const n2 = ball2.position.sub(ball1.position).normalize();
    ball2.velocity = ball2.velocity.sub(n2.scale(2 * ball2.velocity.dot(n2)));
    ball2.position = m.add(n2.scale(ball2.radius));
}

function drawBalls() {
    for (let ball of balls) {
        buffer.fillStyle = ball.status;
        buffer.beginPath();
        buffer.arc(ball.position.x, ball.position.y, ball.radius, Math.PI, 0);
        buffer.fill();

        if (ball.mask) buffer.fillStyle = 'white';
        buffer.beginPath();
        buffer.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI);
        buffer.fill();
    }
}

export {
    balls,
    susceptible,
    infected,
    recovered,
    dead,
    collide,
    bounceoff,
    drawBalls,
};
