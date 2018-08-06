export const getCookies = (): {[key: string]: any} => {
  return document.cookie
    .split(";")
    .reduce((acc, c) => {
      const sc = c.split("=")
      return Object.assign(acc, {
        [sc[0]]: sc[1]
      })
    }, {})
}