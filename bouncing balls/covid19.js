import { balls, susceptible, infected, recovered, dead } from './balls.js';
import { maps } from './maps.js';

const timeStep = 2;
const inwardPro = 0.25;
const outwardPro = 0.5;
const infectionR = 0.5;
const travelProb = 0.001;

export function infect(ball1, ball2) {
    if (ball1.status === infected && ball2.status === susceptible) {
        if (ball1.mask && !ball2.mask) {
            if (Math.random() < infectionR * outwardPro) {
                ball2.status = infected;
            }
        }
        if (!ball1.mask && ball2.mask) {
            if (Math.random() < infectionR * inwardPro) {
                ball2.status = infected;
            }
        }
        if (ball1.mask && ball2.mask) {
            if (Math.random() < infectionR * inwardPro * outwardPro) {
                ball2.status = infected;
            }
        }
        if (!ball1.mask && !ball2.mask) {
            if (Math.random() < infectionR) {
                ball2.status = infected;
            }
        }
    }
    if (ball2.status === infected && ball1.status === susceptible) {
        if (!ball1.mask && ball2.mask) {
            if (Math.random() < infectionR * outwardPro) {
                ball2.status = infected;
            }
        }
        if (ball1.mask && !ball2.mask) {
            if (Math.random() < infectionR * inwardPro) {
                ball2.status = infected;
            }
        }
        if (ball1.mask && ball2.mask) {
            if (Math.random() < infectionR * inwardPro * outwardPro) {
                ball2.status = infected;
            }
        }
        if (!ball1.mask && !ball2.mask) {
            if (Math.random() < infectionR) {
                ball2.status = infected;
            }
        }
    }
}

export function updateStatus(ball) {
    if (ball.status === infected) {
        ball.timeInfected++;

        if (ball.timeInfected > 60 * timeStep * 2) {
            ball.status = recovered;
        }

        if (ball.timeInfected > 60 * timeStep && ball.status !== recovered) {
            const randomNum = Math.random();

            if (ball.age < 50) {
                if (randomNum < 0.001) ball.status = dead;
            } else if (ball.age < 70) {
                if (randomNum < 0.01) ball.status = dead;
            } else if (ball.age >= 70) {
                if (randomNum < 0.2) ball.status = dead;
            }
        }
    }

    if (!ball.traveling) {
        if (Math.random() < travelProb) {
            const idx = Math.floor(
                Math.random() * maps.filter((map) => map !== ball.map).length
            );
            const randomMap = maps[idx];
            ball.destination.set(
                randomMap.x + Math.random() * randomMap.width,
                randomMap.y + Math.random() * randomMap.height
            );
            ball.traveling = true;
        }
    }
}
