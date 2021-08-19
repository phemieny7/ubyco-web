import Server from "./Server";
const token = "NA.8CLdZK2WVnNpzQkmCxXT22MKM9flWULai47qR_8TFvSR0iLdgVAxLKSpbMDI";
export default async function handler(req, res) {
  try {
    const response = await Server.put(`/admin/user_status/${1}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.status(200).json({ message: response.data.message });
  } catch (error) {
    console.log(error.response.status);
  }
}
