import { updateNumbers } from './statistics.js'
import { getLast } from './helper.js'
import { maps } from './parameters.js'

class Map {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.padding = 20;
        this.balls = [];
        this.selected = false;
        this.statusData = new StatusData();
        this.ageData = new AgeData();
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
    
    getOuterWidth() {
        return this.getRight() - this.getLeft()
    }
    
    getOuterHeight() {
        return this.getBottom() - this.getTop()
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

function drawMaps() {
    for (let map of maps) {
        if (map.selected) {
            buffer.fillStyle = 'rgba(0, 0, 0, 0.2)';
            buffer.fillRect(map.getLeft(), map.getTop(), map.getOuterWidth(), map.getOuterHeight())
        }

        buffer.strokeStyle = 'white';
        buffer.strokeRect(map.getLeft(), map.getTop(), map.getOuterWidth(), map.getOuterHeight())
    }
}

function selectMap() {
    for (let map of maps) {
        if (mousePos.x > map.getLeft() && mousePos.x < map.getRight() && mousePos.y > map.getTop() && mousePos.y < map.getBottom()) {
            document.body.style.cursor = 'pointer'
            maps.map((map) => map.selected = false)
            map.selected = true;
            break;
        } else {
            document.body.style.cursor = 'default'
            maps.map((map) => map.selected = false)
        }
    }
}

function clickMap() {
    for (let map of maps) {
        if (mousePos.x > map.getLeft() && mousePos.x < map.getRight() && mousePos.y > map.getTop() && mousePos.y < map.getBottom()) {
            statusChart.data = map.statusData;
            statusChart.update({ duration: 0 });
            ageChart.data = map.ageData;
            ageChart.update({ duration: 0 })
            break;
        } else {
            statusChart.data = globalStatusData;
            statusChart.update({ duration: 0 });
            ageChart.data = globalAgeData;
            ageChart.update({ duration: 0 })
        }
    }

    updateNumbers(
        getLast(statusChart.data.datasets[0].data),
        getLast(statusChart.data.datasets[1].data),
        getLast(statusChart.data.datasets[2].data),
        getLast(statusChart.data.datasets[3].data)
    )
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

export { fullMaps, doubleMaps, quarterMaps, hexaMaps, octaMaps, drawMaps, selectMap, clickMap };
