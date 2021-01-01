const canvas = document.querySelector('#simulation');
const context = canvas.getContext('2d');
const buffer = document.createElement('canvas').getContext('2d');
const graphCanvas = document.querySelector('#graph');
const graphContext = graphCanvas.getContext('2d');
const barCanvas = document.querySelector('#bar');
const barContext = barCanvas.getContext('2d');

buffer.canvas.width = 1600;
buffer.canvas.height = 900;

function resize() {
    let width = window.innerWidth * 0.7;
    let height = window.innerHeight * 0.7;
    const ratio = 9 / 16;

    if (height / width > ratio) {
        height = width * ratio;
    } else {
        width = height / ratio;
    }

    // Set display size (css pixels).
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = width * scale;
    canvas.height = height * scale;
}

function handleMouseMove (event) {
    mousePos.x =  
        ((event.clientX - canvas.offsetLeft) /
            (canvas.width / window.devicePixelRatio)) *
            buffer.canvas.width,
    mousePos.y = 
        ((event.clientY - canvas.offsetTop) /
            (canvas.height / window.devicePixelRatio)) *
            buffer.canvas.height
};

class StatusData {
    constructor() {
        this.labels = []
        this.datasets = [{
            label: 'infected',
            data: [],
            backgroundColor: [
                '#FF2836'
            ],
            borderColor: [
                '#FF2836'
            ],
            borderWidth: 1
        },
        {
            label: 'susceptiable',
            data: [],
            backgroundColor: [
                '#36CFB6'
            ],
            borderColor: [
                '#36CFB6'
            ],
            borderWidth: 1
        },
        {
            label: 'dead',
            data: [],
            backgroundColor: [
                '#002632'
            ],
            borderColor: [
                '#002632'
            ],
            borderWidth: 1
        },
        {
            label: 'recovered',
            data: [],
            backgroundColor: [
                'rgba(150, 65, 138, 1)'
            ],
            borderColor: [
                'rgba(150, 65, 138, 1)'
            ],
            borderWidth: 1
        }]
    }
}

class AgeData {
    constructor() {
        this.labels = ['~50', '50~70', '70~']
        this.datasets = [{
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    }
}

const globalStatusData = new StatusData()
const globalAgeData = new AgeData()

const statusChart = new Chart(graphContext, {
    type: 'line',
    data: globalStatusData,
    options : {
        responsive: true,
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 0
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }],
            xAxes: [{
                display: false
            }]
        },
        layout: {
            padding: {
                left: 12,
                right: 10,
                top: 0,
                bottom: 0
            }
        },
        events: []
    }
})

const ageChart = new Chart(barContext, {
    type: 'horizontalBar',
    data: globalAgeData,
    options: {
        elements: {
            rectangle: {
                borderWidth: 2,
            }
        },
        responsive: true,
        legend: {
            display: false,
        },
        events: []
    }
});

let mousePos = {x:0, y:0}

window.addEventListener('resize', resize);
window.addEventListener('load', resize);
window.addEventListener('mousemove', handleMouseMove)
