import Server from './lib/Server'

export default async (req, res) => {
  const result = await Server.put('/admin/confirm-card', {
    id: req.body.id,
    user_id: req.body.user_id
  })
  
  res.status(200).json({user: result})
}