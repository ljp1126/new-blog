import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns'
import md5 from 'md5'
import { encode } from 'js-base64';
import request from 'service/fetch'

export default async function sendVerifyCode (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { to = '', templateId = '1' } = req.body;
  const AppId = '2c94811c946f6bfb0195cc8b23bf3866'
  const AccountId = '2c94811c946f6bfb0195cc8b220a385f'
  const AuthToken = '2d1eed6fcc7247fd9d20c392ea56f0b8'
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')

  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`)
  const Authorization = encode(`${AccountId}:${NowDate}`)
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = '5'

  console.log(2222)
  console.log('NowDate', NowDate)
  console.log('SigParameter', SigParameter)
  console.log('Authorization', Authorization)

  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`

  console.log(url)

  const response = await request.post(url, {
    to,
    templateId,
    appid: AppId,
    datas: [verifyCode, expireMinute]
  }, {
    headers: {
      Authorization
    }
  })

  console.log(response)


  res.status(200).json({
    code: 0,
    data: 123
  }) 
}