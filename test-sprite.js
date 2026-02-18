// Quick test to verify sprite generation
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Test canvas
const canvas = document.createElement('canvas');
console.log('Canvas created:', canvas instanceof HTMLCanvasElement);
console.log('Canvas size:', canvas.width, 'x', canvas.height);

const ctx = canvas.getContext('2d');
console.log('Context:', ctx ? 'OK' : 'FAILED');

// Test basic rect drawing
ctx.fillStyle = '#FF0000';
ctx.fillRect(0, 0, 1, 1);
console.log('Draw test: OK');

// Test toDataURL
const url = canvas.toDataURL('image/png');
console.log('Data URL begins with:', url.substring(0, 30));
console.log('Data URL length:', url.length);
