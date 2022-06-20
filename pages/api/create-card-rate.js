import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {id,  name, rate} = req.body
  const result = await Server.post(
    "/admin/create_card_rate",
    {
      id,
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
