import { log } from 'console';
import explore from './explorer';
import Map from './map';

const timings = {
    oval: <number[]>[],
    rect: <number[]>[],
};


(async function () {
    await testLabyrinths("rect", 1, 5);
    await testLabyrinths("oval", 1, 1);

    log("\n\nTimings:\n");
    printTimings("rect");
    log();
    printTimings("oval");
})();

async function testLabyrinths(shape: "oval" | "rect", start: number, end: number) {
    for (let i = start; i <= end; i++) {
        const start = Date.now(),
            map = Map.from(shape, i);

        await explore(map);
        const end = Date.now();

        timings[shape][i] = end - start;

        log(
            `\n${shape[0].toUpperCase() + shape.slice(1).toLowerCase()} #${i}:\n\n` +
            map.toString()
        );
    }
}


function printTimings(shape: "oval" | "rect") {
    for (const i in timings[shape]) {
        const timing = timings[shape][i];
        log(
            `${shape[0].toUpperCase() + shape.slice(1).toLowerCase()} #${i}:`,
            timing < 1000 ? timing + 'ms' : timing / 1000 + 's'
        );
    }
}
