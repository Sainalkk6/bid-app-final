import { useContext, useEffect, useState } from "react";
import { NotificationContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { useBidList, useBidsProps } from "../../provider/bidContextProvider";
import { FaTrash } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { data, removeItem } = useBidList();

  const [userBids, setUserBids] = useState<useBidsProps[]>();

  useEffect(() => {
    setUserBids(data.filter((item) => item.userName === user));
  }, [data]);

  const handleDelete = (
    bidId:number
  ) => {
    
    removeItem(bidId);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-full min-h-screen pb-8 bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="flex flex-col gap-5 pt-20 backdrop-blur-2xl rounded-lg bg-white/30 h-[600px] w-[500px]">
        <div className="w-[120px] mx-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
          />
        </div>
        <span className="mx-auto font-medium text-2xl">{user}</span>
        <div className="w-full font-medium text-xl text-green-900">
          <div className="w-full border-b border-black pb-3 mb-8">
            <span className="ml-4">My Biddings</span>
          </div>
          <div className="p-4">
            {userBids?.map((bid) => (
              <div
                key={bid.itemId}
                className="w-full py-2 px-4 bg-blue-50 rounded-lg flex justify-between items-center "
              >
                <div className="flex gap-4">
                  <h3>{bid.itemName}</h3>
                  <span>{bid.bidAmount}</span>
                </div>
                <FaTrash
                  onClick={() =>
                    handleDelete(bid.bidId)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="relative top-6 bg-black text-white px-3 py-2 w-[200px] rounded-lg hover:bg-red-900 hover:text-black transition duration-200"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default Profile;
