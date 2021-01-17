import {
    susceptible,
    infected,
    recovered,
    dead,
} from './balls.js';

import { ageProbs } from './parameters.js';
import { incrementLast, getLast, getSecondLast} from './helper.js'
import { maps, balls, globalStatusData, globalAgeData } from './app.js'

function updateNumbers(numInfected, numSusceptable, numDead, numRecovered) {
    document.querySelector('.susceptible .data').innerHTML = numSusceptable;
    document.querySelector('.infected .data').innerHTML = numInfected;
    document.querySelector('.recovered .data').innerHTML = numRecovered;
    document.querySelector('.dead .data').innerHTML = numDead;
}

function initializeDatasets(t) {
    // Initialize GlobalData
    globalStatusData.labels.push(t)

    globalAgeData.labels = [];
    for (let ageProb of ageProbs) 
        globalAgeData.labels.push(ageProb[0][0] + '~' + ageProb[0][1])

    globalAgeData.datasets[0].data = new Array(ageProbs.length).fill(0);

    for (let dataset of globalStatusData.datasets) 
        dataset.data.push(0)

    // Initialize MapData
    for (let map of maps) { 
        map.statusData.labels.push(t)

        map.ageData.labels = [];
        for (let ageProb of ageProbs) 
            map.ageData.labels.push(ageProb[0][0] + '~' + ageProb[0][1])

        map.ageData.datasets[0].data = new Array(ageProbs.length).fill(0);

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
                    ageProbs.forEach((ageProb, idx) => {
                        if (ball.age > ageProb[0][0] && ball.age < ageProb[0][1]) {
                            globalAgeData.datasets[0].data[idx]++
                            ball.map.ageData.datasets[0].data[idx]++
                        }
                    })
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

        ageProbs.forEach((ageProb, idx) => {
            globalAgeData.datasets[0].data[idx] /= balls.filter((ball) => ball.age > ageProb[0][0] && ball.age < ageProb[0][1] ).length
            for (const map of maps) map.ageData.datasets[0].data[idx] /= balls.filter((ball) => ball.age > ageProb[0][0] && ball.age < ageProb[0][1] ).length
        });
        ageChart.update()
    }
}

export { updateNumbers }