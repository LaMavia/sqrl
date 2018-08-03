import { sendQuery } from "../functions/sendQuery"
// @ts-ignore Because is used by sendQuery
import fetch from "node-fetch"
import dotenv from "dotenv"
// @ts-ignore
global.fetch = fetch
dotenv.load()

describe("SendQuery", () => {
  // Setting-up global vars for tested functions to override browser ones
  // @ts-ignore
  global.location = {
    origin: "http://localhost:8000"
  }

  let userId: string

  const req = {
    Name: "Test",
    Username: "TestLogin", 
    Password: "Password",
    Email: "Test@mail.com"
  }

  it("Creates user", async () => {
    // @ts-ignore
    const { data } = await sendQuery(`
      mutation {
        userAdd(
          Name: "${req.Name}", 
          Username: "${req.Username}", 
          Password: "${req.Password}",
          Email: "${req.Email}"
        ) {
          _id
          Name
          Username
          Email
        }
      }
    `, {}, "http://localhost:8000")

    const { Name, Username, Email, _id } = data.userAdd
    userId = String(_id)
    const reqC = Object.assign({}, req)
    delete reqC.Password

    expect({ Name, Username, Email }).toEqual(reqC)
  })

  it("Updates user", async () => {
    const newData = {
      Name: "Testymonian Testy",
      Email: "theNew@mail.com",
      Password: "theNewPassword"
    }
    // @ts-ignore
    const res = await sendQuery(`
      mutation {
        userUpdate( 
          _id: "${userId}",
          Name: "${newData.Name}",
          Email: "${newData.Email}"
        ) {
         n
         ok
         nModified
        }
      }
    `, {}, "http://localhost:8000")

    console.dir(res, {colors: true})
    // @ts-ignore
    const data = res.data
    const { ok, n, nModified } = data.userUpdate
    expect({ ok, n, nModified }).toEqual({ ok: 1, n: 1, nModified: 1 })
  })

  it("Deletes user", async () => {
    // @ts-ignore
    const { data } = await sendQuery(`
      mutation {
        userDelete(_id: "${userId}") {
          n
          ok
        }
      }
    `, {}, "http://localhost:8000")

    expect(data.userDelete).toEqual({n: 1, ok: 1})
  })
})