import {
    balls,
    susceptible,
    infected,
    recovered,
    dead,
    drawBalls,
} from './balls.js';

function updateNumbers(numSusceptable, numInfected, numRecovered, numDead) {
    document.querySelector('.susceptible .data').innerHTML = numSusceptable;
    document.querySelector('.infected .data').innerHTML = numInfected;
    document.querySelector('.recovered .data').innerHTML = numRecovered;
    document.querySelector('.dead .data').innerHTML = numDead;
}

function drawVertical(x, y1, y2, color) {
    graphBuffer.strokeStyle = color;
    graphBuffer.beginPath();
    graphBuffer.moveTo(x, y1);
    graphBuffer.lineTo(x, y2);
    graphBuffer.stroke();
}

function drawHorizontal(y, x1, x2, color) {
    const scale = barBuffer.canvas.width / balls.length;
    barBuffer.fillStyle = color;
    barBuffer.fillRect(x1 * scale, y, x2 * scale, 200);
}

function drawBar(y, age1, age2) {
    const ballsOfAge = balls.filter(
        (ball) => ball.age > age1 && ball.age < age2
    );
    drawHorizontal(
        y,
        0,
        ballsOfAge.filter((ball) => ball.status === infected).length,
        infected
    );
    drawHorizontal(
        y,
        ballsOfAge.filter((ball) => ball.status === infected).length,
        ballsOfAge.filter((ball) => ball.status === susceptible).length,
        susceptible
    );
    drawHorizontal(
        y,
        ballsOfAge.filter(
            (ball) => ball.status === infected || ball.status === susceptible
        ).length,
        ballsOfAge.filter((ball) => ball.status === dead).length,
        dead
    );
    drawHorizontal(
        y,
        ballsOfAge.filter(
            (ball) =>
                ball.status === infected ||
                ball.status === susceptible ||
                ball.status === dead
        ).length,
        ballsOfAge.filter((ball) => ball.status === recovered).length,
        recovered
    );
}

export function drawGraph(t) {
    let numSusceptable = 0;
    let numInfected = 0;
    let numRecovered = 0;
    let numDead = 0;

    for (let ball of balls) {
        switch (ball.status) {
            case susceptible:
                numSusceptable++;
                break;
            case infected:
                numInfected++;
                break;
            case recovered:
                numRecovered++;
                break;
            case dead:
                numDead++;
                break;
        }
    }

    updateNumbers(numSusceptable, numInfected, numRecovered, numDead);

    drawVertical(
        t,
        graphBuffer.canvas.height,
        graphBuffer.canvas.height * (1 - numInfected / balls.length),
        infected
    );
    drawVertical(
        t,
        graphBuffer.canvas.height * (1 - numInfected / balls.length),
        graphBuffer.canvas.height *
            (1 - (numInfected + numSusceptable) / balls.length),
        susceptible
    );
    drawVertical(
        t,
        graphBuffer.canvas.height *
            (1 - (numInfected + numSusceptable) / balls.length),
        graphBuffer.canvas.height *
            (1 - (numInfected + numSusceptable + numDead) / balls.length),
        dead
    );
    drawVertical(
        t,
        graphBuffer.canvas.height *
            (1 - (numInfected + numSusceptable + numDead) / balls.length),
        graphBuffer.canvas.height *
            (1 -
                (numInfected + numSusceptable + numDead + numRecovered) /
                    balls.length),
        recovered
    );

    drawBar((barBuffer.canvas.height * 3) / 4, 0, 50);
    drawBar((barBuffer.canvas.height * 2) / 4, 51, 70);
    drawBar((barBuffer.canvas.height * 1) / 4, 71, 100);
}
