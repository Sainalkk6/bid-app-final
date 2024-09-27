import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, UserContext } from "../../App";
import { DataType } from "../HomePage/Home";

import { useBidList } from "../../provider/bidContextProvider";

type DataTypes = {
  itemId: number;
  userName: string;
  bidAmount: number;
  itemName: string
  bidId:number,
};



type Props = {
  data: DataTypes;
};

const Items = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { itemAmount } = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useState<DataType>({} as DataType);
  const { user } = useContext(UserContext);
  const [bigAmout, setBidAmout] = useState<number>(0);
  const {data,setBid} = useBidList()
  const [hightestBidAmount,setHighestBidAmount] = useState(0)
  const [showMessage,setShowMessage] = useState(false)


  useEffect(() => {
    itemAmount.map((item: DataType) => {
      if (item.id === Number(id)) {
        setSelectedItem(item);
      }
    });

    setBidAmout(hightestBidAmount > 0 ? hightestBidAmount
         : selectedItem.amount);
    
    data.map(bid => {
        if(bid.itemId === Number(id) && hightestBidAmount < bid.bidAmount) {
            setHighestBidAmount(bid.bidAmount)
        }
    })

  }, [itemAmount, selectedItem,data,hightestBidAmount]);
  
  const handleBidding = ({ data }: Props) => {
    setBid(data)
  };

  const handlClick = () => {
    const data: DataTypes = {
      bidAmount: bigAmout,
      userName: user,
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      bidId:Date.now(),
    };
    setBidAmout(hightestBidAmount)
    handleBidding({ data: data });
    setShowMessage(true)
  };

  console.log(data.slice(-1))

  return (
    <div className="flex flex-col pt-16 items-center px-10 w-full min-h-screen h-full bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="w-full bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8] gap-11 flex sm:flex-row flex-col h-full border-r">
        <div className="border-r bg-white h-fit sm:h-[500px] items-end justify-end flex"> 
          <img src={selectedItem.image} alt="image" />
        </div>
        <div className="flex items-center justify-center h-[450px] mt-11 sm:w-1/2 backdrop-blur-xl bg-white/30 rounded-xl hover:text-white hover:bg-[#a8c1b3] transition duration-200 ">
          <div className="flex flex-col items-center justify-between h-full py-9">
            <h3 className="text-3xl font-medium">{selectedItem.name}</h3>
            <h4 className="text-2xl">{hightestBidAmount > 0 ? hightestBidAmount : selectedItem.amount}</h4>
            <span>Current Highest Bidder {hightestBidAmount > 0 ? data.slice(-1)[0].userName : ""}</span>
            <input
              type="number"
              className="focus:outline-none px-3 py-2 rounded text-black"
              min={hightestBidAmount > 0 ? hightestBidAmount : selectedItem.amount}
              value={bigAmout}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBidAmout(+e.target.value)
              }
            />
            <button className="bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-200 px-3 py-2 w-[150px] rounded" onClick={handlClick}>set bid</button>
            <button
              className="bg-black text-white hover:bg-red-900 hover:text-black hover:scale-105 transition-all duration-200 px-3 py-2 w-[150px] rounded"
              onClick={() => {
                navigate(-1);
                setShowMessage(false);
              }}
            >
              Back
            </button>
          </div>

        </div>
      </div>
      {showMessage && (
        <div className="ml-32 mt-5 text-2xl font-medium">
          You have successfully set a bid of ${hightestBidAmount}
        </div>
      )}
    </div>
  );
};

export default Items;
