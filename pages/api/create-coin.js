import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.post(
    "/admin/create_coin",
    {
      name: req.body.name,
      wallet: req.body.wallet,
      rate: req.body.rate
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).json({ data: result });
};
