type Label = {
  label: string;
};

type RawExpr = string;

// A property that when present, provides the option of not evaluating the block it represents
type Conditional = {
  showIf?: RawExpr;
};

// A structure that allows a grouping of items, generally useful for conditionally rendering a block of controls
// that share the same render condition
type Group<A> = Conditional & Content<A[]>;

// The "parameter" of the render function
type Content<A> = {
  content: A;
};

type TextContent = Content<string>;

// Specifies the get-set command prefix
// For fetching the current value: <CustomCommand> <BindableContent>
// For setting the current value: <CustomCommand> <BindableContent> <NewValue>
type BindableContent = Content<CommandDef>;
type CommandDef = [string, number, ...number[]];

// VIA Controls
type numNumArr = number | number[];
export type Toggle = {
  type: 'toggle';
  options?: [numNumArr, numNumArr];
};

export type Dropdown = {
  type: 'dropdown';
  options: (string | [string, ...number[]])[];
};

export type Range = {
  type: 'range';
  options: [number, number, string?]; // [min, max, unit?]
};

export type Keycode = {
  type: 'keycode';
};

export type Color = {
  type: 'color';
};

// An atomic unit that represents a renderable unit - usually a Control
type Item<A> = Label & Conditional & A;
type Control = Keycode | Color | Toggle | Dropdown | Range;
export type VIAControlItem = Control & Item<BindableContent>;
export type VIATextItem = Item<TextContent>;

// VIA Groups
export type VIAItem = VIATextItem | VIAControlItem;
export type VIAItemSlice = Group<VIAItem>;
export type VIASubmenuSlice = Group<VIASubmenu>;
export type VIASubmenu = Label & Group<VIAItem | VIAItemSlice>;
export type VIAMenu = Label & Group<VIASubmenu | VIASubmenuSlice>;
