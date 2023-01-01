type Label = {
  label: string;
};

// A property that describes the byte-length of the setting value
type ByteLength = {
  bytes?: 1 | 2 | 3 | 4; // default should be 1
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

// token_id, channel_id, command_id
type CommandDef = [string, number, number];

// VIA controls
type NumNumArray = number | number[]; // needed to shoehorn wtrgb enable caps/hhkb/etc lighting for now
export type Toggle = {
  type: 'toggle';
  options?: [NumNumArray, NumNumArray];
};

export type Dropdown = {
  type: 'dropdown';
  options: string[] | [string, number, ...number[]][];
};

export type Range = {
  type: 'range';
  options: [number, number];
  unit?: string;
};

export type Keycode = {
  type: 'keycode';
};

export type Color = {
  type: 'color';
};

export type ColorPalette = {
  type: 'color-palette';
};

// An atomic unit that represents a renderable unit - usually a Control
type Item<A> = Label & Conditional & ByteLength & A;
type Control = Keycode | Color | Toggle | Dropdown | Range;
type UniqueControl = ColorPalette;
// The standard VIA control
export type VIAControlItem = Control & Item<BindableContent>;
export type VIAUniqueControlItem = UniqueControl & Item<BindableContent>;
// For displaying text like headers or static springs
export type VIATextItem = Item<TextContent>;

// VIA Groups
export type VIAItem = VIATextItem | VIAControlItem | VIAUniqueControlItem;
export type VIAItemSlice = Group<VIAItem>;
export type VIASubmenuSlice = Group<VIASubmenu>;
export type VIASubmenu = Label & Group<VIAItem | VIAItemSlice>;
export type VIAMenu = Label & Group<VIASubmenu | VIASubmenuSlice>;
