import {Runner} from './runner.js';
import {Vector} from './vector.js';

const vector = new Vector();

vector.add(10);

console.log(vector);

for (let i = 0; i < 4; i++) {
    vector.addAngle(90 * (Math.PI / 180));

    console.log(vector);
}

const runner = new Runner();

runner.add((tick) => {
    console.log(tick);
});

runner.start();
