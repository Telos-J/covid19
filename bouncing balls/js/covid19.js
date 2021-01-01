import { balls, susceptible, infected, recovered, dead } from './balls.js';
import { maps } from './parameters.js';
import { inwardPro, outwardPro, infectionR, travelProb } from './parameters.js'

const timeStep = 5;

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
    if (ball.status === infected && !ball.traveling) {
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
            } else {
                if (randomNum < 0.2) ball.status = dead;
            }
        }
    }

    if (!ball.traveling) {
        if (Math.random() < travelProb) {
            const mapChoices = maps.filter((map) => map !== ball.map)
            const idx = Math.floor(
                Math.random() * mapChoices.length
            );
            const randomMap = mapChoices[idx];
            ball.destination.set(
                randomMap.x + Math.random() * randomMap.width,
                randomMap.y + Math.random() * randomMap.height
            );
            ball.velocity = ball.destination.sub(ball.position).normalize(ball.travelspeed)
            ball.map.balls = ball.map.balls.filter((otherBall) => otherBall !== ball)
            ball.map = randomMap;
            ball.traveling = true;
            randomMap.balls.push(ball)
        }
    }
}
