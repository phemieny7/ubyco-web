import Server from './lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.put('/admin/verify-withdrawal', {
    id: req.body.id
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  res.status(200).json({user: result})
}