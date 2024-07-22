import {Vector} from './vector.js';

export const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#game'));

export const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

export const size = new Vector();

function resize() {
    canvas.width = size.x = document.body.clientWidth;
    canvas.height = size.y = document.body.clientHeight;
}

window.addEventListener('resize', resize);

resize();
