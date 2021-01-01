import {
    balls,
    susceptible,
    infected,
    recovered,
    dead,
    drawBalls,
} from './balls.js';

import { maps } from './parameters.js';
import { incrementLast, getLast, getSecondLast} from './helper.js'

function updateNumbers(numInfected, numSusceptable, numDead, numRecovered) {
    document.querySelector('.susceptible .data').innerHTML = numSusceptable;
    document.querySelector('.infected .data').innerHTML = numInfected;
    document.querySelector('.recovered .data').innerHTML = numRecovered;
    document.querySelector('.dead .data').innerHTML = numDead;
}

function initializeDatasets(t) {
    globalStatusData.labels.push(t)
    globalAgeData.datasets[0].data = [0, 0, 0]

    for (let dataset of globalStatusData.datasets) 
        dataset.data.push(0)

    for (let map of maps) { 
        map.statusData.labels.push(t)
        map.ageData.datasets[0].data = [0, 0, 0]

        for (let dataset of map.statusData.datasets) 
            dataset.data.push(0)
    }
}

export function updateStatistics(t) {
    if (getSecondLast(globalStatusData.datasets[0].data) !== 0) {
        initializeDatasets(t)

        for (let ball of balls) {
            switch (ball.status) {
                case infected:
                    incrementLast(globalStatusData.datasets[0].data)
                    incrementLast(ball.map.statusData.datasets[0].data)
                    break;
                case susceptible:
                    incrementLast(globalStatusData.datasets[1].data)
                    incrementLast(ball.map.statusData.datasets[1].data)
                    break;
                case dead:
                    incrementLast(globalStatusData.datasets[2].data)
                    incrementLast(ball.map.statusData.datasets[2].data)
                    if (ball.age < 50) {
                        globalAgeData.datasets[0].data[0]++
                        ball.map.ageData.datasets[0].data[0]++
                    }
                    else if (ball.age < 70) {
                        globalAgeData.datasets[0].data[1]++
                        ball.map.ageData.datasets[0].data[1]++
                    }
                    else {
                        globalAgeData.datasets[0].data[2]++
                        ball.map.ageData.datasets[0].data[2]++
                    } 
                    break;
                case recovered:
                    incrementLast(globalStatusData.datasets[3].data)
                    incrementLast(ball.map.statusData.datasets[3].data)
                    break;
            }
        }

        updateNumbers(
            getLast(statusChart.data.datasets[0].data),
            getLast(statusChart.data.datasets[1].data),
            getLast(statusChart.data.datasets[2].data),
            getLast(statusChart.data.datasets[3].data)
        )
        statusChart.update()
        ageChart.update()
    }
}

export { updateNumbers }