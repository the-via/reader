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
declare type CommandDef = [string, ...number[]];
declare type Keycode = {
    type: 'keycode';
};
declare type Color = {
    type: 'color';
};
declare type numNumArr = number | number[];
declare type Toggle = {
    type: 'toggle';
    options?: [numNumArr, numNumArr];
};
declare type Dropdown = {
    type: 'dropdown';
    options: (string | [string, ...number[]])[];
};
declare type Item<A> = Label & Conditional & A;
declare type Control = Keycode | Color | Toggle | Dropdown;
declare type VIAControlItem = Item<Control & BindableContent>;
declare type VIATextItem = Item<TextContent>;
export declare type VIAItem = VIATextItem | VIAControlItem;
export declare type VIAItemSlice = Group<VIAItem>;
export declare type VIASubmenuSlice = Group<VIASubmenu>;
export declare type VIASubmenu = Label & Group<VIAItem | VIAItemSlice>;
export declare type VIAMenu = Label & Group<VIASubmenu | VIASubmenuSlice>;
export {};
