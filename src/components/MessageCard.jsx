import React, { useContext } from 'react'
import { MdCancel } from "react-icons/md";
import { AppContext } from '../ContextAPI';

const MessageCard = ({message_id, subject, body}) => {
    const { deleteEmailMessage} =
      useContext(AppContext)
  return (

    <div className='border border-solid border-blue-400 text-black p-4 rounded-md shadow-md'>
        <div className='flex justify-between'>
            <p className=''><span className='font-semibold'>Email Title : </span>{subject}</p>
            <MdCancel  color='red' size={30} className='cursor-pointer' onClick={async ()=>{
              await deleteEmailMessage(message_id)
            }}/>

        </div>
        <p className='py-4'><span className='font-semibold'>Email Body : </span></p>
        <p className='py-4'>{body}</p>


    </div>
  )
}

export default MessageCard