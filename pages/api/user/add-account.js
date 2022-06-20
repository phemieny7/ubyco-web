import Server from "../lib/Server";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  try {
    const result = await Server.post(
        "/user/add-account",
        {
          bank: req.body.bank,
          account_number: req.body.accountNumber,
          bank_code: req.body.bankCode,
          account_name: req.body.accountName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
};
