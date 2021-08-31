import { getSession } from "next-auth/client"
import Server from '../api/lib/Server'

export default async (req, res) => {
  const result = await Server.put('/admin/initiate-withdrawal', {
    id: req.body.id
  })
  res.status(200).json({user: result})
}