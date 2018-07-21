import * as bcrypt from 'bcrypt'

const hashify = <T>(data: T, salt: string) => 
  bcrypt.hash(data, salt)
    .then((hashed: string) => hashed)
    .catch(err => new Error(err))


export default  async <T>(data: T, rounds: number = 10) => 
  bcrypt.genSalt(rounds)
    // @ts-ignore
    .then((salt: string) => 
      Array.isArray(data)
        ? Promise.all(data.map((item: T) => hashify(item, salt)))
        : hashify(data, salt)
    )
    .catch((res: any) => {throw new Error(res)})




  