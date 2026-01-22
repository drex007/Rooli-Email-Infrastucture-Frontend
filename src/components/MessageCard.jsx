import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { AppContext } from "../ContextAPI";

const MessageCard = ({ message_id, subject, body,included }) => {
  const { deleteEmailMessage,selectedMessages } = useContext(AppContext);

 

  
  return (
    <div 
    
      className={`
        p-4 border rounded-lg cursor-pointer transition-all
        ${included 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-300 bg-white hover:border-gray-400'
        }
      `}
    >
      <div className="flex justify-between">
        <p className="">
          <span className="font-semibold">Email Title : </span>
          {subject}
        </p>
        <MdCancel
          color="red"
          size={30}
          className="cursor-pointer"
          onClick={async () => {
            await deleteEmailMessage(message_id);
          }}
        />
      </div>
      <p className="py-4">
        <span className="font-semibold">Email Body : </span>
      </p>
      <p className="py-4 whitespace-pre-wrap">{body}</p>
    </div>
  );
};

export default MessageCard;
