class Map {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.padding = 20;
        this.balls = [];
    }

    has(ball) {
        return (
            ball.position.x > this.x &&
            ball.position.x < this.x + this.width &&
            ball.position.y > this.y &&
            ball.position.y < this.y + this.height
        );
    }

    moveTo(ball) {
        ball.position.x = this.x + Math.random() * this.width;
        ball.position.y = this.y + Math.random() * this.height;
    }

    getLeft() {
        return this.x + this.padding;
    }

    getRight() {
        return this.x + this.width - this.padding;
    }

    getTop() {
        return this.y + this.padding;
    }

    getBottom() {
        return this.y + this.height - this.padding;
    }

    collide(ball) {
        if (ball.position.x > this.getRight() - ball.radius) {
            ball.position.x = this.getRight() - ball.radius;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.x < this.getLeft() + ball.radius) {
            ball.position.x = this.getLeft() + ball.radius;
            ball.velocity.x = -ball.velocity.x;
        }
        if (ball.position.y > this.getBottom() - ball.radius) {
            ball.position.y = this.getBottom() - ball.radius;
            ball.velocity.y = -ball.velocity.y;
        }
        if (ball.position.y < this.getTop() + ball.radius) {
            ball.position.y = this.getTop() + ball.radius;
            ball.velocity.y = -ball.velocity.y;
        }
    }
}

function drawMap(map) {
    buffer.strokeStyle = 'black';
    buffer.beginPath();
    buffer.moveTo(map.getLeft(), map.getTop());
    buffer.lineTo(map.getRight(), map.getTop());
    buffer.lineTo(map.getRight(), map.getBottom());
    buffer.lineTo(map.getLeft(), map.getBottom());
    buffer.lineTo(map.getLeft(), map.getTop());
    buffer.stroke();
}

const fullMaps = [new Map(0, 0, buffer.canvas.width, buffer.canvas.height)];

const doubleMaps = [
    new Map(0, 0, buffer.canvas.width / 2, buffer.canvas.height),
    new Map(
        buffer.canvas.width / 2,
        0,
        buffer.canvas.width / 2,
        buffer.canvas.height
    ),
];

const quarterMaps = [
    new Map(0, 0, buffer.canvas.width / 2, buffer.canvas.height / 2),
    new Map(
        buffer.canvas.width / 2,
        0,
        buffer.canvas.width / 2,
        buffer.canvas.height / 2
    ),
    new Map(
        0,
        buffer.canvas.height / 2,
        buffer.canvas.width / 2,
        buffer.canvas.height / 2
    ),
    new Map(
        buffer.canvas.width / 2,
        buffer.canvas.height / 2,
        buffer.canvas.width / 2,
        buffer.canvas.height / 2
    ),
];

const hexaMaps = [
    new Map(0, 0, buffer.canvas.width / 3, buffer.canvas.height / 2),
    new Map(
        buffer.canvas.width / 3,
        0,
        buffer.canvas.width / 3,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 2) / 3,
        0,
        buffer.canvas.width / 3,
        buffer.canvas.height / 2
    ),
    new Map(
        0,
        buffer.canvas.height / 2,
        buffer.canvas.width / 3,
        buffer.canvas.height / 2
    ),
    new Map(
        buffer.canvas.width / 3,
        buffer.canvas.height / 2,
        buffer.canvas.width / 3,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 2) / 3,
        buffer.canvas.height / 2,
        buffer.canvas.width / 3,
        buffer.canvas.height / 2
    ),
];

const octaMaps = [
    new Map(0, 0, buffer.canvas.width / 4, buffer.canvas.height / 2),
    new Map(
        buffer.canvas.width / 4,
        0,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 2) / 4,
        0,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 3) / 4,
        0,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        0,
        buffer.canvas.height / 2,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        buffer.canvas.width / 4,
        buffer.canvas.height / 2,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 2) / 4,
        buffer.canvas.height / 2,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
    new Map(
        (buffer.canvas.width * 3) / 4,
        buffer.canvas.height / 2,
        buffer.canvas.width / 4,
        buffer.canvas.height / 2
    ),
];

const maps = doubleMaps;

export { maps, drawMap };
