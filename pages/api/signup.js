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
    const { name, email, phone, password } = req.body;
    return new Promise((resolve, reject) => {
        Server.post("/register", {
            fullname: name,
            email,
            phone,
            password,
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