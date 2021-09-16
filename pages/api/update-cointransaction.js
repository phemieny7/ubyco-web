import Server from './lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.put('/admin/coin',{
    id: req.body.id,
    status: req.body.status
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  res.status(200).end();
}