import { getSession } from "next-auth/client"

export default async (context) => {
  const session = await getSession(context)
  const data = session?.accessToken;
  res.status(200).json(data)
}