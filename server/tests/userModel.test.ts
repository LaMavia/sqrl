import { app } from "../app"
import axios from "axios"

describe("models/user.model.ts", () => {
  beforeAll(() => {
    
  })

  it("Creates user", async () => {
    const query = `
      {
        mutation {
          userAdd(Name: "Tester", Username: "Testxxx12", Password: "Password123", Email: "t.test@test.com")
        }
      }
    `
    await axios.post(`${app.data.origin}${app.apollo.graphqlPath}`, {
      query
    }).then(res => {
      console.dir(res, {colors: true})
    })
  })
})