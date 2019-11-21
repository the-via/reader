export declare type Rotation = {
    r: number;
    rx: number;
    ry: number;
};
export declare type KLEDimensions = Rotation & {
    a: number;
    x: number;
    w: number;
    h: number;
    y: number;
};
declare type OtherKLEProps = {
    [key: string]: any;
};
export declare type KeyColor = string;
export declare type LegendColor = string;
declare type Margin = number;
declare type Size = number;
export declare type MatrixPosition = {
    row: number;
    col: number;
};
export declare type Cursor = {
    x: number;
    y: number;
};
export declare type Formatting = {
    c: KeyColor;
    t: LegendColor;
};
export declare type Dimensions = {
    marginX: Margin;
    marginY: Margin;
    size: Size;
    h: number;
};
export declare type KLEElem = KLEDimensions & Formatting | OtherKLEProps | string;
export declare type ColorCount = {
    [key: string]: number;
};
export declare type ParsedKLE = {
    res: Result[][];
    colorMap: {
        [k: string]: string;
    };
};
export declare type Result = {
    h: number;
    w: number;
} & Formatting & Dimensions & Cursor & MatrixPosition;
export declare enum LightingSupport {
    None = 0,
    QMKLighting = 1,
    WTRGBBacklight = 2,
    WTMonoBacklight = 3
}
export declare type KLEFormattingObject = Partial<{
    c: string;
    t: string;
    x: number;
    y: number;
    w: number;
    a: number;
}>;
export declare type KLELayoutDefinition = (string | KLEFormattingObject)[][];
export declare type MatrixInfo = {
    rows: number;
    cols: number;
};
export declare type KeyboardDefinition = {
    name: string;
    vendorId: string;
    productId: string;
    lighting: LightingSupport;
    matrix: MatrixInfo;
    layouts: {
        [name: string]: KLELayoutDefinition;
    };
};
export declare type VIADefinition = {
    name: string;
    vendorProductId: number;
    lighting: LightingSupport;
    matrix: MatrixInfo;
    layouts: {
        [layoutName: string]: {
            colorMap: ParsedKLE['colorMap'];
            layout: ParsedKLE['res'];
        };
    };
};
export {};
