import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { format } from 'date-fns'
import md5 from 'md5'
import { encode } from 'js-base64';
import request from 'service/fetch'
import { ironoptions } from 'config/index';
import { ISession } from 'pages/api/index'

export default withIronSessionApiRoute(sendVerifyCode, ironoptions)

async function sendVerifyCode (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session: ISession = req?.session
  const { to = '', templateId = '1' } = req.body;
  const AppId = '2c94811c946f6bfb0195cc8b23bf3866'
  const AccountId = '2c94811c946f6bfb0195cc8b220a385f'
  const AuthToken = '2d1eed6fcc7247fd9d20c392ea56f0b8'
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')

  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`)
  const Authorization = encode(`${AccountId}:${NowDate}`)
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = '5'

  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`

  console.log(url)

  const response: any = await request.post(url, {
    to,
    templateId,
    appid: AppId,
    datas: [verifyCode, expireMinute]
  }, {
    headers: {
      Authorization
    }
  })
  const { statusCode, statusMsg, templateSMS } = response;

  if (statusCode === '00000') {
    session.verifyCode = verifyCode
    await session.save();
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
      data: {templateSMS}
    }) 
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg
    }) 
  }
}