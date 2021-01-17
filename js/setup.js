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
    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    const cssObj = window.getComputedStyle(canvas, null)
    canvas.width = parseInt(cssObj.getPropertyValue('width')) * scale;
    canvas.height = parseInt(cssObj.getPropertyValue('height')) * scale;
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
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)"
            ],
            borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)"
            ],
            borderWidth: 1
        }]
    }
}

const statusChart = new Chart(graphContext, {
    type: 'line',
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
