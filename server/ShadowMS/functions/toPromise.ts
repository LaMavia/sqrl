export default <T>(data: T | T[]) => new Promise<T | T[]>((res) => {
  let copy: T | T[]
  if(Array.isArray(data)) copy = data.slice()
  else if(typeof data === "object") copy = Object.assign({}, data)
  else copy = data
  return res(copy)
})
