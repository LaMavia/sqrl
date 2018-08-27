export const compare = <T>(srcOfTruth: T , input: T) => {
  let isValid = true
  for(const key in srcOfTruth) {
    if(!isValid) break
    isValid = JSON.stringify(srcOfTruth[key]) === JSON.stringify(input[key])
  }
  return isValid
}