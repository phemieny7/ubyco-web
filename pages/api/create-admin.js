import Server from "./lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {email, phone, fullname}= req.body
  console.log(req.body)
  const result = await Server.post(
    "/admin/create-admin",
    {
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
