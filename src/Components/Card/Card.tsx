import { useEffect, useState } from 'react'
import { DataType } from '../HomePage/Home'
import { useNavigate } from 'react-router-dom'
import { useBidList } from '../../provider/bidContextProvider';

const Card = ({ data }: { data: DataType}) => {

  const router = useNavigate();

  const {data:bid} = useBidList()

  const [selectedBidAmount,setSelectedAmout] = useState(0);

  useEffect(() => {
    bid.map(item => {
      if(item.itemId === data.id && selectedBidAmount < item.bidAmount){
        setSelectedAmout(item.bidAmount)
      }
    })
  },[bid])

  return (
    <div onClick={() => router(`/${data.id}`)} className='cursor-pointer bg-white z-10 hover:bg-[#dcee86] hover:z-30 hover:text-green-900 rounded-lg min-h-[412px] w-[350px] hover:scale-105  h-fit pb-5 shadow-lg  duration-200 mt-9 flex flex-col '>
      <div className='rounded-lg items-center w-fit justify-center mx-auto'>
        <img src={data.image} className='object-cover object-center h-[196px]' />
      </div>
      <div className='flex border-t items-center pt-5  gap-4 justify-center  flex-col font-medium'>
        <h1 className='text-4xl'>{data.name}</h1>
        <p className='text-xl'>Current Bid Amount : <span className='text-2xl'>$ {selectedBidAmount > 0 ? selectedBidAmount : data.amount}</span></p>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Card
