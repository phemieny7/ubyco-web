import Server from "../lib/Server";
import { getSession } from "next-auth/client";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";


export const config = {
  api: {
    bodyParser: false,
  },
};

const request = async (data, token) => {
    const res = await Server.post(`/coin/initiate-trade`, data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    })
};

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const data = await new Promise((resolve, reject) => {
  const form = new formidable.IncomingForm();
  const formData = new FormData();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    for (const property in files) {
      formData.append("receipt", fs.createReadStream(files[property].path));
    };
      formData.append("coin_id", fields.id);
      formData.append("rate", fields.rate);
      formData.append("amount", fields.amount);
      formData.append("comment", fields.comment);
      request(formData, token);
      res.status(200).end()
  });
});
};