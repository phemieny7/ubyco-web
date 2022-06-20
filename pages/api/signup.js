import Server from "./lib/Server";


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