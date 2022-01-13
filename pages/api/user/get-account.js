import Server from "../lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  //   console.log(token)
  try {
    const response = await Server.get(`user/get-account-name`, {
      params: {
        account_number: req.body.account_number,
        bank_code: req.body.bank_code,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json({ data: response.data.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
