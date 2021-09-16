import Server from './lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(req.body.name)
  const token = session?.accessToken;
  const result = await Server.put('/admin/update_coin', {
    id: req.body.id,
    name: req.body.name,
    rate: req.body.rate,
    wallet: req.body.wallet
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  res.status(200).json({user: result})
}