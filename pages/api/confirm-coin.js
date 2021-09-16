import Server from './lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.put('/admin/confirm-coin',{
    id: req.body.id,
    user_id: req.body.user_id
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  
  res.status(200).json({user: result})
}