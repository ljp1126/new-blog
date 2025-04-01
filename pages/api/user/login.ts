import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironoptions } from 'config/index';
// import { prepareConnection } from 'db/index'
// import { User, UserAuth } from 'db/entity/index'

export default withIronSessionApiRoute(login, ironoptions)

async function login ( req: NextApiRequest, res: NextApiResponse, ) {
  const { phone = '', verify = ''} = req

  // const db = await prepareConnection()
  // db.getRepository()
  
  // const userRepo = db.getRepository(User)
  // console.log("userRepo:",userRepo);

  res?.status(200).json({phone, verify, code: 0})
}   