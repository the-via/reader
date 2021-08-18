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
export declare type OptionalDimensions = Partial<{
    x2: number;
    y2: number;
    h2: number;
    w2: number;
}>;
export declare type Decal = {
    d: boolean;
};
export declare type OtherKLEProps = {
    [key: string]: any;
};
export declare type KeyColor = string;
export declare type LegendColor = string;
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
    w: number;
    h: number;
};
export declare type KLEElem = (KLEDimensions & Formatting & Decal & OptionalDimensions) | OtherKLEProps | string;
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
export declare type ThemeDefinition = {
    [key in KeyColorType]: Formatting;
};
export declare type Result = {
    h: number;
    w: number;
} & Formatting & Dimensions & OptionalDimensions & Cursor & Rotation & MatrixPosition & Decal & GroupMeta;
export declare type VIAKey = Omit<Result, keyof Formatting | 'group' | 'd'> & {
    color: KeyColorType;
};
export declare enum KeycodeType {
    QMK = "qmk",
    WT = "wt",
    None = "none"
}
export declare enum KeyColorType {
    Alpha = "alpha",
    Mod = "mod",
    Accent = "accent"
}
export declare type KLEFormattingObject = Partial<{
    c: string;
    t: string;
    x: number;
    y: number;
    w: number;
    a: number;
}>;
export declare type KLEMeta = {
    name?: string;
};
export declare type KLELayoutDefinition = (KLEMeta | (string | KLEFormattingObject)[])[];
export declare type KLELayout = (KLEMeta | KLEElem[])[];
export declare type MatrixInfo = {
    rows: number;
    cols: number;
};
export declare type CustomKeycode = {
    name: string;
    title: string;
    shortName?: string;
};
export declare type LayoutLabel = string | string[];
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
export declare enum DefinitionVersion {
    v2 = "v2",
    v3 = "v3"
}
export declare type KeyboardDefinitionIndex = {
    generatedAt: number;
    version: string;
    theme: ThemeDefinition;
    vendorProductIds: {
        [key in DefinitionVersion]: number[];
    };
};
