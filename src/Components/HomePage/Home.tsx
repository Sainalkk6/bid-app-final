import React, { useContext } from "react";
import { DataContext } from "../../App";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";

export type DataType = {
  id: number;
  image: string;
  amount: number;
  name: string;
};

function Home() {
  const { itemAmount } = useContext(DataContext);
  const show = false;

  console.log(itemAmount);
  

  return (
    <>
      <div className="w-full h-full min-h-screen pb-8  bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
        <Navbar/>
        {/* <div className="px-12 justify-center items-center grid lg:grid-cols-3 ">
            
        </div> */}
        {/* {show && <Items/>} */}
        <div className="px-12 justify-center items-center grid lg:grid-cols-3">
          {itemAmount &&
            itemAmount.map((item: DataType) => (
              <React.Fragment key={item.id}>
                <Card
                  data={item}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
