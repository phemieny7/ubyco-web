import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {
    id,
    rate
  }= req.body

  const result = await Server.put(
    "/admin/change-card-rate",
    {
      id,
     rate
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).json({ data: result});
};
