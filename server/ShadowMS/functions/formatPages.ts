import iShadow from "../types/basic"
interface page {
  Name: string
  Href: string
}
export default (data: iShadow.LooseObject, modelName: string) => 
  data[modelName].map((page: page) => ({
    Name: page.Name,
    Href: `${data.origin}${page.Href}`
  }))