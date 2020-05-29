declare type Label = {
    label: string;
};
declare type RawExpr = string;
declare type Conditional = {
    showIf?: RawExpr;
};
declare type Group<A> = Conditional & Content<A[]>;
declare type Content<A> = {
    content: A;
};
declare type TextContent = Content<string>;
declare type BindableContent = Content<CommandDef>;
declare type CommandDef = [string, number, ...number[]];
declare type numNumArr = number | number[];
export declare type Toggle = {
    type: 'toggle';
    options?: [numNumArr, numNumArr];
};
export declare type Dropdown = {
    type: 'dropdown';
    options: (string | [string, ...number[]])[];
};
export declare type Range = {
    type: 'range';
    options: [number, number, string?];
};
export declare type Keycode = {
    type: 'keycode';
};
export declare type Color = {
    type: 'color';
};
declare type Item<A> = Label & Conditional & A;
declare type Control = Keycode | Color | Toggle | Dropdown | Range;
export declare type VIAControlItem = Control & Item<BindableContent>;
export declare type VIATextItem = Item<TextContent>;
export declare type VIAItem = VIATextItem | VIAControlItem;
export declare type VIAItemSlice = Group<VIAItem>;
export declare type VIASubmenuSlice = Group<VIASubmenu>;
export declare type VIASubmenu = Label & Group<VIAItem | VIAItemSlice>;
export declare type VIAMenu = Label & Group<VIASubmenu | VIASubmenuSlice>;
export {};
