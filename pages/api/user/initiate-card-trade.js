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
  const res = await Server.post(`/giftcard/initiate-trade`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
};

export default async (req, res) => {
  try {
    const session = await getSession({ req });
    const token = session?.accessToken;

    const form = new formidable.IncomingForm();
    const formData = new FormData();
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }

      let image;
      for (const property in files) {
        formData.append("card", fs.createReadStream(files[property].path));
      }
      formData.append("card_type_id", fields.id);
      formData.append("rate", fields.rate);
      formData.append("amount", fields.amount);
      formData.append("comment", fields.comment);
      // console.log(formData);
      request(formData, token);
      res.status(200).end();
      for (const file in files) {
        fs.unlink(files[file].path, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  } catch (error) {
    res.status(500).end();
  }
};
