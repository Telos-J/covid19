import {
    susceptible,
    infected,
    dead,
    recovered,
    collide,
    bounceoff,
    drawBalls,
    createBalls,
} from './balls.js';
import { Engine } from './engine.js';
import { infect, updateStatus } from './covid19.js';
import { updateStatistics } from './statistics.js';
import { createMaps, drawMaps, selectMap, clickMap } from './maps.js';
import { numMaps, numballs, probInfected, probMask, travelProb } from './parameters.js'

const engine = new Engine(1000 / 60, update, render);
const statisticsUpdateTimeStep = 20;
let time = 0;
let play = true;

function setup(numMaps, numballs, probInfected, probMask, travelProb) {
    const maps = createMaps(numMaps);
    const balls = createBalls(numballs, probInfected, probMask, travelProb);
    const globalStatusData = new StatusData();
    const globalAgeData = new AgeData();
    statusChart.data = globalStatusData;
    ageChart.data = globalAgeData;
    statusChart.update({ duration: 0 });
    ageChart.update({ duration: 0 });

    for (let map of maps) {
        for (let ball of balls) {
            if (map.has(ball)) {
                ball.map = map;
                map.balls.push(ball);
            }
        }
    }
    
    engine.start()
    
    return [maps, balls, globalStatusData, globalAgeData]
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

    drawBalls(balls);
    drawMaps(maps);

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

let [maps, balls, globalStatusData, globalAgeData] = setup(numMaps, numballs, probInfected, probMask, travelProb)

window.addEventListener('click', selectMap);
window.addEventListener('click', clickMap)
window.addEventListener('keydown', (e) => { if (e.code === "Space" ) play = !play })

document.querySelector('.control-icon').addEventListener('click', () => {
    const mapOptions = ["full", "double", "quarter", "hexa", "octa"];
    const numMaps = mapOptions[Math.floor(Math.random() * mapOptions.length)];
    [maps, balls, globalStatusData, globalAgeData] = setup(
        numMaps, 
        50 + Math.random() * 450, 
        Math.random() * 0.2, 
        Math.random() * 0.5, 
        Math.random() * 0.001
    )
})

export { maps, balls, globalStatusData, globalAgeData, travelProb }