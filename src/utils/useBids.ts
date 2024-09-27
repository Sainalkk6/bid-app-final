import { useEffect, useState } from "react"


type useBidsProps = {
    itemId: number,
    userName: string,
    bidAmount:  number,
}

type Props = {
    data: useBidsProps
}

const useBids = ({ data }:Props) => {

    const [bidList,setBidList] = useState<Props[]>();

    // useEffect(() => {
    //     setBidList((prev) => [data,...prev])
    // },[])

    console.log(data);
    

}

export default useBids
