import Map, { Cell } from "./map";

export default async function explore(map: Map) {

    const stack: Cell[] = [],
        end = map.end,
        bannedCells: Cell[] = [];

    let curr: Cell = map.start, steppingBack = false;

    while (true) {
        // Uncomment the following lines if you want an animation
        // await new Promise(r => setTimeout(r, 50));
        // console.clear();
        // console.log(map.toString());

        const nextCells = map.flat
            .filter(c => !bannedCells.includes(c) && c.isEmpty && Math.sqrt(
                Math.pow(c.x - curr.x, 2)
                + Math.pow(c.y - curr.y, 2)
            ) == 1)

        if (steppingBack && nextCells.length < 2) {
            bannedCells.push(curr);
            continue;
        }
        steppingBack = false;

        const explorable = nextCells
            .filter(curr => map.flat
                .filter(c => c.explored && Math.sqrt(
                    Math.pow(c.x - curr.x, 2)
                    + Math.pow(c.y - curr.y, 2)
                ) == 1)
                .length < 2
            )
            .sort((a, b) => Math.sqrt(
                Math.pow(a.x - end.x, 2)
                + Math.pow(a.y - end.y, 2)
            ) - Math.sqrt(
                Math.pow(b.x - end.x, 2)
                + Math.pow(b.y - end.y, 2)
            ));

        const newCell = explorable[0];
        if (newCell?.type == "END") break;

        if (!newCell) {
            if (stack.length > 0) {
                bannedCells.push(curr);
                stack.pop();
                curr.explored = false;
                curr = stack.at(-1)!;
                continue;
            } else break;
        };


        newCell.explored = true;
        curr = newCell;
        stack.push(newCell);
    }

}
