// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PgClient } from '@/integration/pg'
import type { NextApiRequest, NextApiResponse } from 'next'


import * as yup from 'yup'

const pgClient =  new PgClient()
pgClient.conn()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
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
