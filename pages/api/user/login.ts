import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironoptions } from 'config/index';

export default withIronSessionApiRoute(login, ironoptions)

async function login ( req: NextApiRequest, res: NextApiResponse, ) {
  const { phone = '', verify = ''} = req

  res?.status(200).json({phone, verify, code: 0})
}   