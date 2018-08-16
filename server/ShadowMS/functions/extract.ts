/**
 * Use if you don't know if response is an array with one item or just an item.
 * @param sth {any | any[]}
 * @return any 
 */
export const extract = (sth: any | any[]) =>
  Array.isArray(sth)
    ? sth[0]
    : sth