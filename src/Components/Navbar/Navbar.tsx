import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../Extras/Button";
import { useContext, useState } from "react";
import { NotificationContext, UserContext } from "../../App";
import {users} from "../../data/user.json"


function Navbar() {
const navigate = useNavigate()
const {user, setUser} = useContext(UserContext);
const [isActive, setIsActive] = useState(true);
const {notification} = useContext(NotificationContext)
console.log(notification)

return (
    <nav className="sticky top-0 z-50 w-full  backdrop-blur-md pr-6  flex justify-end pt-3">
      <div></div>
      <div className=" px-4 mx-auto h-[100px] flex container gap-4 pt-4 justify-center items-start relative text-sm ml-[50px]">
        <div className="relative">
          {notification.length > 0 && <div className="rounded-full h-2 w-2 bg-red-500 absolute right-3 top-3"></div>}
          <Button  margin="mt-[6px]" image={<FaBell />} path = "notification" />
        </div>
        <button className="rounded-full shadow-md bg-[#ececec] px-4 h-fit w-fit py-3 border transition-all duration-200 active:scale-95   flex items-center justify-center text-nowrap   font-medium hover:text-green-900 text-lg hover:bg-[#dcee86] gap-5" onClick={()=> navigate("/profile")}>Your Profile</button>
        {isActive ? (
          <button
          onClick={() => setIsActive(false)}
          className="rounded-full shadow-md bg-[#ececec] px-4 h-fit w-fit py-3 border transition-all duration-200 active:scale-95   flex items-center justify-center   font-medium hover:text-green-900 text-lg hover:bg-[#dcee86] gap-5"
          >
            <FaUserCircle /> {user}
          </button>
        ) : (
          <div className=" backdrop-blur-lg  w-fit rounded-xl flex flex-col gap-2 p-2 shadow-md">
            {users.map((newUser, index) => (
              <button
              key={index}
              onClick={() => {
                setUser(newUser);
                setIsActive(true);
              }}
              className="z-50 rounded-full shadow-md  backdrop-blur-lg  px-4 h-fit w-fit py-3 border transition-all duration-200 active:scale-95   flex items-center justify-center   font-medium hover:text-green-900 text-lg hover:bg-[#dcee86] gap-5"
              >
                <FaUserCircle /> {newUser}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
