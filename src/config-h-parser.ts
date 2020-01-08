enum LS {
  START = 1,
  DEFINE = 2,
  DEFINE_VAL = 'define_val',
  LAYOUT1D_START = 3,
  LAYOUT1D_END = 4,
  LAYOUT2D_START = 5,
  LAYOUT2D_ROW_START = 6,
  LAYOUT2D_COL_START = 7,
  LAYOUT2D_COL_CONTINUE = 8,
  LAYOUT2D_COL_END = 9,
  LAYOUT2D_ROW_END = 10,
  LAYOUT2D_END = 11,
  SKIP = 12
}

type ParserState = {
  prev: LS;
  defineKey?: string;
  res: LayoutHResult;
};

type LayoutHResult = Record<'string', 'string'>;

function error(state: ParserState, nextToken: string) {
  console.error('Current State', state, 'Next: ', nextToken);
}

function tokenizer(state: ParserState, next: string): ParserState {
  const tnext = next.trim();
  const {prev, res} = state;
  // skip empty strings
  if (tnext === '') {
    return state;
  }
  if (prev === LS.SKIP) {
    return state;
  }
  if (prev === LS.START) {
    // skip
    if (tnext === '#define') {
      return {...state, prev: LS.DEFINE};
    }
    return {...state};
  } else if (prev === LS.DEFINE) {
    return {...state, prev: LS.DEFINE_VAL, defineKey: tnext};
  } else if (prev === LS.DEFINE_VAL) {
    return {
      ...state,
      prev: LS.START,
      defineKey: undefined,
      res: {
        ...res,
        [state.defineKey || '']: tnext
      }
    };
  }
  error(state, tnext);
  throw `Bad Token found: ${state}:${tnext} `;
}

export function parseConfig(config: string) {
  const tokens = config.split(/[\\]?\s+/g);
  const {res} = tokens.reduce(tokenizer, {
    prev: LS.START,
    res: {}
  } as ParserState);
  return res;
}
