import iShadow from "../types/basic"
export default (cookie: string): iShadow.LooseObject => {
  const arr = cookie.split("=")
  const output: iShadow.LooseObject = {}
  for(let i = 0; i < arr.length && arr[i]; i += 2) {
    output[arr[i]] = arr[i+1]
  }
  return output
} 