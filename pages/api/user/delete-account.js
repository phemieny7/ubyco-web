import Server from "../lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const { id }= req.body
  console.log(id)
 try {
  const result = await Server.post(
    "/user/delete-account",
    {
      id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  res.status(200).json({ data: result.status});
 } catch (error) {
   console.log(error)
  res.status(500).json({ error: error.message });
 }
  
};
 
