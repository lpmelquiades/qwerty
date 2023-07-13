// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ORM } from '@/integration/orm'
import type { NextApiRequest, NextApiResponse } from 'next'


import * as yup from 'yup'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    let orm =  new ORM()
    await orm.test()
    await orm.sync()
    // await orm.user.create({firstName: 'john', lastName: 'paul'})
    // let abc = await orm.user.findByPk(2)
    // console.log(abc.toJSON())
    
    let abc = orm.user.findByPk(2)
    let xyz = orm.user.findByPk(3)
    let zzz = orm.user.findByPk(4)
    let ppp = orm.user.findByPk(88888)
    let arr = [abc, xyz, zzz, ppp]
    let results = (await Promise.allSettled(arr)) as PromiseFulfilledResult<{}>[]
    results.filter(result => result.status === 'fulfilled' && result.value !== null).forEach(result => console.log(JSON.stringify(result.value)))
    
    await orm.close()
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify({messsage: "hello world"}))
    return
  } catch (e: any) {
    let stackArr = e.stack.split(" at ")
    let body = {
      error_message : e.message,
      error_location: stackArr[1].trim()
    }
    console.error(JSON.stringify(body))
    res.setHeader('Content-Type', 'application/json')
    res.status(555).send(JSON.stringify(body))
    return
  }
}
