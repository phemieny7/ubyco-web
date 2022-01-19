import Server from "../lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  try {
    const response = await Server.post(`user/delete-account`, {
        id: req.body.id,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.data.success) {
        res.status(200).json({ data: response.data.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};