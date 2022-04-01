import { log } from 'console';
import explore from './explorer';
import Map from './map';

const timings = {
    oval: <number[]>[],
    square: <number[]>[],
};

for (let i = 1; i <= 5; i++) {
    const start = Date.now(),
        map = Map.from('rect', i);

    explore(map);
    const end = Date.now();

    timings.square[i] = end - start;

    log(
        `\n\nRectangle #${i}:\n\n` +
        map.toString()
    );
}

for (let i = 1; i <= 1; i++) {
    const start = Date.now(),
        map = Map.from('oval', i);

    explore(map);
    const end = Date.now();

    timings.oval[i] = end - start;

    explore(map);
    log(
        `\nOval #${i}:\n\n` +
        map.toString()
    );
}

log("\n\nTimings:\n");

for (const i in timings.square) {
    const timing = timings.square[i];
    log(`Square #${i}:`, timing < 1000 ? timing + 'ms' : timing / 1000 + 's');
}

for (const i in timings.oval) {
    const timing = timings.oval[i];
    log(`Oval #${i}:`, timing < 1000 ? timing + 'ms' : timing / 1000 + 's');
}

