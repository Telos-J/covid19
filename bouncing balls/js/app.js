import {
    balls,
    susceptible,
    infected,
    dead,
    recovered,
    collide,
    bounceoff,
    drawBalls,
} from './balls.js';
import { Engine } from './engine.js';
import { infect, updateStatus } from './covid19.js';
import { updateStatistics } from './statistics.js';
import { drawMaps, selectMap, clickMap } from './maps.js';
import { maps } from './parameters.js'

const engine = new Engine(1000 / 60, update, render);
const statisticsUpdateTimeStep = 20
let time = 0;
let play = true;

function setup() {
    for (let map of maps) {
        for (let ball of balls) {
            if (map.has(ball)) {
                ball.map = map;
                map.balls.push(ball);
            }
        }
    }
}

function update() {
    if (play) {
        // Interrelational updates
        for (let ball1 of balls) {
            for (let ball2 of ball1.map.balls) {
                if (collide(ball1, ball2)) {
                    if (!ball1.traveling && !ball2.traveling) {
                        bounceoff(ball1, ball2);
                        infect(ball1, ball2);
                    }
                }
            }
        }

        // Individual updates
        for (let ball of balls) {
            if (ball.status !== dead) {
                ball.move();
                updateStatus(ball);
            }

            if (!ball.traveling) ball.map.collide(ball);
        }
    }
}

function render() {
    buffer.clearRect(0, 0, buffer.canvas.width, buffer.canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBalls();
    drawMaps();

    if (!(time % statisticsUpdateTimeStep)) updateStatistics(time);
    if (play) time++;
    
    
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

    context.drawImage(
        buffer.canvas,
        0,
        0,
        buffer.canvas.width,
        buffer.canvas.height,
        0,
        0,
        context.canvas.width,
        context.canvas.height
    );
}

setup();

window.addEventListener('load', (e) => engine.start())
window.addEventListener('click', (e) => selectMap());
window.addEventListener('click', (e) => clickMap())
window.addEventListener('keydown', (e) => { if (e.code === "Space" ) play = !play })
