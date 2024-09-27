import { createContext, useEffect, useState } from "react";
import { bidItems } from "../src/data/db.json";
import { Route, Routes } from "react-router-dom";
import Home, { DataType } from "./Components/HomePage/Home";
import Items from "./Components/ItemsPage/Items";
import BidContextProvider from "./provider/bidContextProvider";
import Profile from "./Components/Profile/Profile";
import Notification from "./Extras/Notification";

export const DataContext = createContext<any>([]);
export const NotificationContext = createContext<any>([]);
export const UserContext = createContext<any>([]);

function App() {
  const [user, setUser] = useState<string>("john");
  const items = bidItems;
  const [itemAmount, setItemAmount] = useState<DataType[]>([]);
  const [notification, setNotification] = useState<
    { item: string; user: string; amount: number; id: number }[]
  >([]);
  const [highestBid, setHighestBid] = useState<
    { item: string; user: string; amount: number; id: number }[]
  >([]);

  useEffect(() => {
    setItemAmount(
      items.map((item) => ({
        amount: item.amount,
        id: item.id,
        name: item.name,
        image: item.image,
      }))
    );
  }, [items]);

  return (
    <>
      <BidContextProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <DataContext.Provider
            value={{ itemAmount, setItemAmount, highestBid, setHighestBid }}
          >
            <NotificationContext.Provider
              value={{ notification, setNotification }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/:id" element={<Items />} />
                <Route path="/notification" element={<Notification />} />
              </Routes>
            </NotificationContext.Provider>
          </DataContext.Provider>
        </UserContext.Provider>
      </BidContextProvider>
    </>
  );
}

export default App;
