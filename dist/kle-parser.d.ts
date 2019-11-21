import { KLEElem } from './types';
export declare function parseKLE(kle: string): any;
export declare function generateParsedKLE(kle: KLEElem[][]): {
    width: number;
    height: number;
    keys: {
        c: undefined;
        t: undefined;
        label: undefined;
        size: undefined;
        marginX: undefined;
        marginY: undefined;
        x: number;
        y: number;
        color: string;
        h: number;
        w: number;
        row: number;
        col: number;
    }[];
};
