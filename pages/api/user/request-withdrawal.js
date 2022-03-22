import Server from '../lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.post('/user/withdraw', {
    amount: req.body.amount,
    bank: req.body.accountId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // console.log(result.status)
  res.status(200).end()
}