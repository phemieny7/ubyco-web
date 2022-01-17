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

  const form = new formidable.IncomingForm();
  const formData = new FormData();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
      formData.append("receipt", fs.createReadStream(files.image.path));
      formData.append("coin_id", fields.id);
      formData.append("rate", fields.rate);
      formData.append("amount", fields.amount);
      formData.append("comment", fields.comment);
      request(formData, token);
      res.status(200).end()
      fs.unlink(files.image.path, (err) => {
        if (err) {
          console.log(err);
        }
      });

  });
};