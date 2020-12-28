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
import { drawGraph } from './statistics.js';
import { maps, drawMap } from './maps.js';

const backgroundColor = '#e0e0e0';
let time = 0;

function setup() {
    for (let ball of balls) {
        maps.forEach((map) => {
            if (map.has(ball)) {
                ball.map = map;
                map.balls.push(ball);
            }
        });
    }
}

function update() {
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

    for (let ball of balls) {
        if (ball.status !== dead) {
            if (ball.traveling) ball.travel();
            else {
                ball.move();
            }

            updateStatus(ball);
        }

        if (!ball.traveling) ball.map.collide(ball);
    }
}

function render() {
    buffer.fillStyle = backgroundColor;
    buffer.fillRect(0, 0, buffer.canvas.width, buffer.canvas.height);

    drawBalls();
    maps.forEach((map) => drawMap(map));

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

    drawGraph(time);

    if (time <= graphBuffer.canvas.width) {
        graphContext.fillStyle = backgroundColor;
        graphContext.fillRect(0, 0, graphCanvas.width, graphCanvas.height);
        graphContext.drawImage(
            graphBuffer.canvas,
            0,
            0,
            time,
            graphBuffer.canvas.height,
            0,
            0,
            graphContext.canvas.width,
            graphContext.canvas.height
        );
    }

    barContext.fillStyle = backgroundColor;
    barContext.fillRect(0, 0, barCanvas.width, barCanvas.height);
    barContext.drawImage(
        barBuffer.canvas,
        0,
        0,
        barBuffer.canvas.width,
        barBuffer.canvas.height,
        0,
        0,
        barContext.canvas.width,
        barContext.canvas.height
    );

    time++;
}

const engine = new Engine(1000 / 60, update, render);
setup();
engine.start();
