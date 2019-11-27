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
export declare type KLEElem = (KLEDimensions & Formatting) | OtherKLEProps | string;
export declare type ColorCount = {
    [key: string]: number;
};
export declare type ParsedKLE = {
    res: Result[][];
    colorMap: {
        [k: string]: string;
    };
};
export declare type GroupMeta = {
    group: {
        key: number;
        option: number;
    };
};
export declare type Result = {
    h: number;
    w: number;
} & Formatting & Dimensions & Cursor & Rotation & MatrixPosition & GroupMeta;
export declare type VIAKey = Omit<Result, keyof Formatting | 'group' | 'marginX' | 'marginY' | 'size'> & {
    color: KeyColorType;
};
export declare enum LightingTypeDefinition {
    None = "none",
    QMKLighting = "qmk_backlight",
    WTRGBBacklight = "wt_rgb_backlight",
    WTMonoBacklight = "wt_mono_backlight"
}
export declare type KLEFormattingObject = Partial<{
    c: string;
    t: string;
    x: number;
    y: number;
    w: number;
    a: number;
}>;
export declare type KLELayoutDefinition = (KLEMeta | (string | KLEFormattingObject)[])[];
export declare type MatrixInfo = {
    rows: number;
    cols: number;
};
export declare type KeyboardDefinition = {
    name: string;
    vendorId: string;
    productId: string;
    lighting: LightingTypeDefinition;
    matrix: MatrixInfo;
    layouts: {
        [name: string]: KLELayoutDefinition;
    };
};
export declare enum KeyColorType {
    Alpha = "alpha",
    Mod = "mod",
    Accent = "accent"
}
export declare type KLEMeta = {
    name?: string;
};
export declare type KLELayout = (KLEMeta | KLEElem[])[];
export declare type VIALayout = {
    width: number;
    height: number;
    keys: VIAKey[];
    optionKeys: {
        [g: string]: {
            [o: string]: VIAKey[];
        };
    };
};
export declare type VIADefinition = {
    name: string;
    vendorProductId: number;
    lighting: LightingTypeDefinition;
    matrix: MatrixInfo;
    layouts: {
        [layoutName: string]: VIALayout;
    };
};
export {};
