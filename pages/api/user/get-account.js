
import Server from '../lib/Server'
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  console.log(token)
  const response = await Server.get(`user/get-account-name`, {
    params: {
      account_number: req.body.account_number,
      bank_code: req.body.bank_code,
    },
    headers: {
        Authorization: `Bearer ${token}`,
      }
  });

console.log(response)
  res.status(200).json({ user: response.data.message });
}