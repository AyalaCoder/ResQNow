import axios from "axios"
import { useEffect ,useState} from "react"

export default function UserManagement(){
const [user,setUser]=useState([])


useEffect(() => {
  const fetchUser = async () => {
    const users = await axios.get('http://localhost:4444/user');
    setUser(users.data);
  };

  fetchUser();
}, []);

return (
  <>
    {user.map((e, index) => (
      <div key={index}>{e.name} - {e.age}</div>
    ))}
  </>
);

}