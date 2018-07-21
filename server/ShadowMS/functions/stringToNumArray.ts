export default (string: string, separator: string | RegExp): number[] => 
  string.slice().split(separator).map(Number)
