import { getSession } from "next-auth/client"
import Server from '../api/lib/Server'

export default async (req, res) => {
  const result = await Server.put('/admin/user_status', {
    id: req.body.id,
    status: req.body.status
  })
  res.status(200).json({user: result})
}