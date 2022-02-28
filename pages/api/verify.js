import Server from "./lib/Server";
// export default async (req, res) => {
//   try {

//     return res.status(200)
//   } catch (error) {
//       let errorMessage;
//       {error.response.data != '' ? errorMessage = error.response.data : errorMessage = "Email ? Phone number already exists"}
//     return res.status(400).json({ message: errorMessage });
//   }
// };

export default async function(req, res) {
    const { code } = req.body;
    return new Promise((resolve, reject) => {
        Server.put("/verify", {
            verification_code: code,
          })
        .then(response => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.end(JSON.stringify(response));
          resolve();
        })
        .catch(error => {
          res.statusCode = 400
          res.json(error);
          res.end();
          resolve();
        });
    });
  };