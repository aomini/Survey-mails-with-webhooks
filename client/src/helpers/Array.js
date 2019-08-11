export const freeze = x => Object.freeze(x);
export const mapper = x => y => x.map(y);
export const deepFreeze = array => mapper(array)(freeze);
