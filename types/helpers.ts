export type Defined<T> = Exclude<T, undefined>;

export type Override<T extends object, K extends object> = Omit<T, keyof K> & K;
