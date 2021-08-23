import { getSession } from "next-auth/client"
import Server from '../api/lib/Server'

export default async (req, res) => {
  const result = await Server.put('/admin/update_card', {
    id: req.body.id,
    name: req.body.name
  })
  res.status(200).json({user: result})
}