const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');

class Fish {
    constructor(x, y, head, color) {
        this.position = new Vector2(x, y);
        this.size = 10;
        this.speed = 3;
        this.steer = angleToVector(head);
        this.color = color;
        this.distRange = 200;
        this.angleRange = (Math.PI * 3) / 4;
        this.velocity = this.steer.scale(this.speed);
        this.avoidance = new Vector2();
        this.alignment = new Vector2();
        this.cohesion = new Vector2();
        this.avoidanceConstant = 20;
        this.alignmentConstant = 0.005;
        this.cohesionConstant = 0.0005;
    }

    move() {
        this.velocity = this.steer.scale(this.speed);
        this.position = this.position.add(this.velocity);

        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.y > canvas.height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = canvas.height;
    }

    inNeighborhood(fish) {
        const relPos = fish.position.sub(this.position);
        const cos =
            relPos.dot(this.steer) /
            relPos.magnitude() /
            this.steer.magnitude();

        return relPos.magnitude() < this.distRange &&
            cos > Math.cos(this.angleRange)
            ? true
            : false;
    }

    getNeighborhood(school) {
        return school.filter((fish) => this.inNeighborhood(fish));
    }

    initBehavior() {
        this.avoidance.set(0, 0);
        this.alignment.set(0, 0);
        this.cohesion.set(0, 0);
    }

    updateSteer() {
        this.steer = this.steer.add(
            this.avoidance,
            this.alignment,
            this.cohesion
        );
        this.steer = this.steer.normalize();
    }

    updateAvoidance(fish) {
        this.avoidance = this.avoidance
            .add(this.position)
            .sub(fish.position)
            .inverseMagnitude()
            .scale(this.avoidanceConstant);
    }

    updateAlignment(fish) {
        this.alignment = this.alignment
            .add(fish.steer)
            .scale(this.alignmentConstant);
    }

    updateCohesion(fish) {
        this.cohesion = this.cohesion.add(fish.position);
    }
}

const heroFish = new Fish(canvas.width / 2, canvas.height / 2, 0, 'white');
const numFish = 100;
const school = [heroFish];
for (let i = 0; i < numFish; i++) {
    school.push(
        new Fish(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2 * Math.PI,
            '#2A363B'
        )
    );
}

function drawFish(fish) {
    context.fillStyle = fish.color;
    context.beginPath();
    context.moveTo(
        fish.position.x + fish.size * Math.cos(vectorToAngle(fish.steer)),
        fish.position.y + fish.size * Math.sin(vectorToAngle(fish.steer))
    );
    // prettier-ignore
    context.lineTo(
        fish.position.x + fish.size * Math.cos(vectorToAngle(fish.steer) + Math.PI * 3 / 4),
        fish.position.y + fish.size * Math.sin(vectorToAngle(fish.steer) + Math.PI * 3 / 4)
    );
    // prettier-ignore
    context.lineTo(
        fish.position.x + fish.size * Math.cos(vectorToAngle(fish.steer) - Math.PI * 3 / 4),
        fish.position.y + fish.size * Math.sin(vectorToAngle(fish.steer) - Math.PI * 3 / 4)
    );
    context.fill();
}

function drawNeighborhood(fish) {
    context.fillStyle = 'rgba(241, 241, 241, 0.5)';

    context.beginPath();
    context.moveTo(fish.position.x, fish.position.y);
    context.arc(
        fish.position.x,
        fish.position.y,
        fish.distRange,
        vectorToAngle(fish.steer) - fish.angleRange,
        vectorToAngle(fish.steer) + fish.angleRange
    );
    context.fill();

    for (let otherFish of school) {
        if (fish.inNeighborhood(otherFish)) {
            context.strokeStyle = 'rgba(241, 241, 241, 0.5)';
            context.beginPath();
            context.moveTo(fish.position.x, fish.position.y);
            context.lineTo(otherFish.position.x, otherFish.position.y);
            context.stroke();
        }
    }
}

function update() {
    for (let someFish of school) {
        someFish.initBehavior();
        const neighborhood = someFish.getNeighborhood(school);
        for (let fish of neighborhood) {
            someFish.updateAvoidance(fish);
            someFish.updateAlignment(fish);
            someFish.updateCohesion(fish);
        }
        if (neighborhood.length)
            someFish.cohesion = someFish.cohesion
                .scale(1 / neighborhood.length)
                .sub(someFish.position)
                .scale(someFish.cohesionConstant);

        someFish.updateSteer();
        someFish.move();
    }
}

function render() {
    context.fillStyle = '#99B898';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawNeighborhood(heroFish);

    for (let fish of school) {
        drawFish(fish);
    }
}

const engine = new Engine(1000 / 60, update, render);

engine.start();
