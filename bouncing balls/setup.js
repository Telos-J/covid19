const canvas = document.querySelector('#simulation');
const context = canvas.getContext('2d');
const buffer = document.createElement('canvas').getContext('2d');
const graphCanvas = document.querySelector('#graph');
const graphContext = graphCanvas.getContext('2d');
const graphBuffer = document.createElement('canvas').getContext('2d');
const barCanvas = document.querySelector('#bar');
const barContext = barCanvas.getContext('2d');
const barBuffer = document.createElement('canvas').getContext('2d');
const numbers = document.querySelector('.numbers');

buffer.canvas.width = 1600;
buffer.canvas.height = 900;
graphBuffer.canvas.width = 60 * 30; // 60fps * 30s
graphBuffer.canvas.height = 80 * 30;
barBuffer.canvas.width = 60 * 30; // 60fps * 30s
barBuffer.canvas.height = 80 * 30;

function resize() {
    let width = window.innerWidth * 0.7;
    let height = window.innerHeight * 0.7;
    let graphWidth = window.innerWidth * 0.2;
    let graphHeight = window.innerHeight * 0.2;
    let barWidth = window.innerWidth * 0.2;
    let barHeight = window.innerHeight * 0.2;
    const ratio = 9 / 16;
    const graphRatio = 3 / 4;
    const barRatio = 3 / 4;

    if (height / width > ratio) {
        height = width * ratio;
        graphHeight = graphWidth * graphRatio;
        barHeight = barWidth * barRatio;
    } else {
        width = height / ratio;
        graphWidth = graphHeight / graphRatio;
        barWidth = barHeight / barRatio;
    }

    // Set display size (css pixels).
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    graphCanvas.style.width = graphWidth + 'px';
    graphCanvas.style.height = graphHeight + 'px';
    barCanvas.style.width = barWidth + 'px';
    barCanvas.style.height = barHeight + 'px';
    numbers.style.width = barWidth + 'px';

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = width * scale;
    canvas.height = height * scale;
    graphCanvas.width = graphWidth * scale;
    graphCanvas.height = graphHeight * scale;
    barCanvas.width = barWidth * scale;
    barCanvas.height = barHeight * scale;
}

window.addEventListener('resize', resize);
window.addEventListener('load', resize);
