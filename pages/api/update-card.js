import Server from '../api/lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.put('/admin/update_card', {
    id: req.body.id,
    name: req.body.name
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  res.status(200).json({user: result})
}