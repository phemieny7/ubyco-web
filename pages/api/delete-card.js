import { getSession } from "next-auth/client"
import Server from '../api/lib/Server'

export default async (req, res) => {
  const result = await Server.delete('/admin/delete_card', {
    id,
  })
  res.status(200).json({user: result})
}