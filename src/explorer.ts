import Map, { Cell } from "./map";

export default function explore(map: Map) {

    const stack: Cell[] = [],
        end = map.end,
        bannedCells: Cell[] = [];

    let curr: Cell = map.start;

    while (true) {
        const nextCells = map.flat
            .filter(c => !bannedCells.includes(c) && c.isEmpty && Math.sqrt(
                Math.pow(c.x - curr.x, 2)
                + Math.pow(c.y - curr.y, 2)
            ) == 1)
            .sort((a, b) => Math.sqrt(
                Math.pow(a.x - end.x, 2)
                + Math.pow(a.y - end.y, 2)
            ) - Math.sqrt(
                Math.pow(b.x - end.x, 2)
                + Math.pow(b.y - end.y, 2)
            ));

        const newCell = nextCells[0];
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