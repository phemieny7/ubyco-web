import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {
    id,
    banned,
    fullname,
    email,
    phone
  }= req.body
  console.log(req.body)
  const result = await Server.put(
    "/admin/update-admin",
    {
      id,
      banned,
      fullname,
      email,
      phone
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).json({ data: result});
};
