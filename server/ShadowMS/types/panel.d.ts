declare namespace Panel {
  namespace Redux {
    type Action = (...args: any[]) => ({
      type: string,
      [key: string]: any
    })
  }
}

export default Panel