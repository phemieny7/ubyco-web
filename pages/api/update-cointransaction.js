import Server from './lib/Server'

export default async (req, res) => {
  const result = await Server.put('/admin/coin',{
    id: req.body.id,
    status: req.body.status
  })
  res.status(200).end();
}