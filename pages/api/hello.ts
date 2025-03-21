import { NextApiRequest, NextApiResponse } from "next";
import { mock } from "mockjs";

type Data = {
  name: string
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(
    mock({
      'list|1-10': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1
        }
      ]
    })
  )
}