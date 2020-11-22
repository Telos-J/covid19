const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1600 / 2;
canvas.height = 900 / 2;

function update() {}

function render() {}
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

const engine = new Engine(1000 / 60, update, render);
engine.start();
