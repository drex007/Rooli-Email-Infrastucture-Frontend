import React, { useContext } from "react";
import MessageCard from "./MessageCard";
import { TfiReload } from "react-icons/tfi";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal } from "../constants";

const MesagesComponent = ({messages}) => {
  const { currentModal, setCurrentModal } = useContext(AppContext);
  return (
    <div>
      <div className="flex space-x-4 items-center">
        <button
          className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2"
          onClick={() => {
            setCurrentModal(showAddEmailMessageModal);
          }}
        >
          Add Email Message +
        </button>
        <TfiReload size={30} className="font-bold cursor-pointer" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {messages && messages.length > 0 ? messages.map((msg, index) => (
          <MessageCard
            key={index}
            message_id={msg.message_id}
            subject={msg.subject}
            body={msg.body}
          />
        )) : (
          <p>No messages available.</p>
        )}
  
      </div>
    </div>
  );
};

export default MesagesComponent;
