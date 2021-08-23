import Server from '../api/lib/Server'
export default async (req, res) => {
  const result = await Server.post('/admin/create_card', {
    name: req.body.name,
  })
  res.status(200).json({data: result})
}