import { readFileSync } from "fs";
import PATHS from 'path';

export default class Map {

    public readonly cells: Cell[][];
    public readonly start: Cell;
    public readonly end: Cell;

    constructor(cells: Cell[][], start: Cell, end: Cell) {
        this.cells = cells;
        this.start = start;
        this.end = end;
    }

    public get flat(): Cell[] {
        const cells: Cell[] = [];

        for (const row of this.cells) {
            for (const cell of row) {
                cells.push(cell);
            }
        }

        return cells;
    }

    public static fromString(str: string): Map {
        const lines = str.split('\n'),
            cells: Cell[][] = new Array(lines.length)
                .fill(null)
                .map(() => []);

        let start: Cell | undefined, end: Cell | undefined;

        for (const y of lines.keys()) {
            const line = lines[y],
                chars = line.split('');

            for (const x of chars.keys()) {
                const char = chars[x],
                    cell = Cell.fromChar(x, y, char);

                if (cell.type == "START") start = cell;
                else if (cell.type == "END") end = cell;

                cells[y][x] = cell;
            }
        }

        if (!start) { console.error("\u001b[31mInvalid Map: Missing start"); process.exit(1); }
        if (!end) { console.error("\u001b[31mInvalid Map: Missing end"); process.exit(1); }

        return new Map(cells, start, end);
    }

    public static fromFile(path: string): Map {
        return this.fromString(readFileSync(path, 'utf8'));
    }

    public static from(shape: Shape, index: number): Map {
        try {
            return Map.fromFile(PATHS.resolve(
                __dirname,
                'res/maps',
                shape + '_' + padZero(index) + '.map')
            );
        } catch {
            console.error("\u001b[31mInvalid Map: Does not exist");
            process.exit(1);
        }
    }

    public toString(): string {
        return this.cells
            .map(row => row
                .map(cell =>
                    cell.toString()
                )
                .join('')
            ).join('\n');
    }

}

export class Cell {
    public x: number;
    public y: number;
    public type: CellType

    constructor(x: number, y: number, type: CellType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public static fromChar(x: number, y: number, char: string): Cell {
        switch (char) {
            case '*': return new Cell(x, y, "WALL");
            case '1': return new Cell(x, y, "START");
            case '2': return new Cell(x, y, "END");
            default: return new Cell(x, y, "EMPTY");
        }
    }

    public get isEmpty(): boolean {
        return this.type === "EMPTY"
            || this.type === "END"
            || this.type === "START";
    }

    public set explored(explored: boolean) {
        this.type = explored ? "PATH" : "EMPTY";
    }

    public get explored(): boolean {
        return this.type === "PATH";
    }


    public toString(): string {
        let color: number = 0, bright = false;

        switch (this.type) {
            case "WALL": bright = true; break;
            case "START": color = 1; break;
            case "END": color = 2; break;
            case "PATH": color = 5; break;
            default: return "  ";
        }

        if (process.env.NODE_ENV === 'production') {
            return "\u001b[3" + color + (bright ? ';1' : '') + "m" + "OO" + "\u001b[0m";
        }

        return "\u001b[3" + color + (bright ? ';1' : '') + "m" + "██" + "\u001b[0m";
    }
}

function padZero(x: number): string {
    const str = x.toString();
    if (str.length > 1) return str;

    return "0" + str;
}

export type CellType = "WALL" | "EMPTY" | "START" | "END" | "PATH";
export type Shape = "oval" | "rect";
