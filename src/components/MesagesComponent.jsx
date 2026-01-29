import React, { useContext } from "react";
import MessageCard from "./MessageCard";
import { TfiReload } from "react-icons/tfi";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";

const MesagesComponent = ({ messages }) => {
  const {
    currentModal,
    setCurrentModal,
    selectedMessages,
    setSelectedMessages,
  } = useContext(AppContext);

  const addEmailToSelectedEmails = (e) => {
    const messageToAdd = e;

    if (!selectedMessages.includes(messageToAdd)) {
      setSelectedMessages([...selectedMessages, messageToAdd]);
    } else {
      setSelectedMessages(
        selectedMessages.filter((message) => message !== messageToAdd),
      );
    }
  };

  const isAdded = (message) => {
    return selectedMessages.some((m) => m.message_id === message.message_id);
  };

  return (
    <div>
      <div className="flex space-x-4 justify-between">
        <p></p>
        <div className="flex items-center space-x-4"> 
          <button
            className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2 rounded-md text-[12px]"
            onClick={() => {
              setCurrentModal(showAddEmailMessageModal);
            }}
          >
            Add Email Message +
          </button>
          <button
            className="bg-orange-500 text-white h-[50px] p-4 flex text-center rounded-md text-[12px]"
            onClick={() => {
              setCurrentModal(showUploadCsvModal);
            }}
          >
            Upload Csv
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div onClick={() => addEmailToSelectedEmails(msg)} key={index}>
              <MessageCard
                key={index}
                message_id={msg.message_id}
                subject={msg.subject}
                body={msg.body}
                included={isAdded(msg)}
              />
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
    </div>
  );
};

export default MesagesComponent;
