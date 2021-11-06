import Server from "./lib/Server"
export default async(req, res)=> {
    try {
        const {fullname, email, phone, password} = req.body;
        const result = await Server.post("/register", {
            fullname,
            email,
            phone,
            password
        })
        callback()
    } catch (error) {
        
    }
  
    if (result.status === 201){
      return  res.status(200)
    }else{
        return res.status(400).json({data: error})
    }
}