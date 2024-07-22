import {Runner} from './runner.js';
import {Vector} from './vector.js';

import {ctx, size} from './canvas.js';
import {Color} from './color.js';

import {UI} from './ui.js';

const vector = new Vector();

vector.add(10);

console.log('' + vector);

for (let i = 0; i < 4; i++) {
    vector.addAngle(90 * (Math.PI / 180));

    console.log('' + vector);
}

const runner = new Runner();

runner.add((tick) => {
    ctx.clearRect(0, 0, size.x, size.y);

    ctx.fillStyle = Color.Background;

    ctx.fillRect(0, 0, size.x, size.y);

    UI.text('로딩중...', Color.Background, Color.White, 20, 'center', 'center');
});

runner.start();
