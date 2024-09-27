import { useContext, useEffect } from "react"
import { NotificationContext, UserContext } from "../App"
import { useBidList } from "../provider/bidContextProvider"
import { FaTrashCan } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const Notification = () => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {notification,setNotification} = useContext(NotificationContext)
    const {data} = useBidList()
    console.log(data)

    useEffect(()=>{
        setNotification(data.filter(i=> i.userName !== user))
    },[data])
    console.log(notification)

    const handleDelete = (id:number)=> setNotification(notification.filter((noti:{bidId:number})=> noti.bidId !== id))

  return (
    <div className="w-full flex-col gap-8 h-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
        <div className="flex flex-col gap-4 mt-5 items-center  backdrop-blur-xl pt-4 px-3 scrollbar-hide overflow-y-scroll  bg-white/10 h-[400px] w-8/12">
        {notification.length > 1 ? notification.map((noti:{userName:string,bidAmount:number,itemName:string,bidId:number},index:number)=>(
            <div key={index} className="h-fit w-full flex pb-6 items-center border-b justify-between">
                <h1 className="font-medium text-xl">{noti.userName} has bidded {noti.bidAmount} on {noti.itemName}</h1>
                <FaTrashCan className="cursor-pointer hover:text-red-800 text-xl" onClick={()=> handleDelete(noti.bidId)}/>
            </div>
        )) :(
            <div className="flex items-center justify-center h-full">
                <h1 className="font-medium text-3xl">No new Notification!</h1>

            </div>
        )}

        </div>
        <button className="bg-black text-white hover:bg-red-900 hover:text-black hover:scale-105 transition-all duration-200 px-3 py-2 w-[150px] rounded" onClick={()=> navigate(-1)}>Back</button>
    </div>
  )
}

export default Notification
