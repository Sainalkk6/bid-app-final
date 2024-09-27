import React, { createContext, useContext, useState } from "react";


export type useBidsProps = {
  bidId: number;
  itemId: number;
  userName: string;
  bidAmount: number;
  itemName: string;
};


type Props = {
  data: useBidsProps[];
  setBid: (data: useBidsProps) => void;
  removeItem: (bidId: number) => void;
};


const IntialState: Props = {
  data: [
    {
      bidId: 0,
      itemId: 0,
      userName: "",
      bidAmount: 0,
      itemName: "",
    },
  ],
  setBid: () => {},
  removeItem: () => {},
};


export const BidListContext = createContext<Props>(IntialState);

const BidContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [bidData, setBidData] = useState<useBidsProps[]>(IntialState.data);
    console.log('running contexxt');
    

  const setBid = (data: useBidsProps) => {
    setBidData((prev) => [...prev, data]);
    console.log(bidData);
  };

  const removeItem = (bidId: number) => {
    const filteredItems = bidData.filter((bid) => bid.bidId !== bidId);

    setBidData(filteredItems);
  };

  return (
    <BidListContext.Provider value={{ data: bidData, setBid, removeItem }}>
      {children}
    </BidListContext.Provider>
  );
};

export default BidContextProvider;

export const useBidList = () => {
  const context = useContext(BidListContext);
  return context;
};
