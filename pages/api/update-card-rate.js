import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {id, card_id, name, rate} = req.body
  const result = await Server.put(
    "/admin/update_card_rate",
    {
      id,
      card_id,
      rate,
      name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  res.status(200).json({ data: result });
};
