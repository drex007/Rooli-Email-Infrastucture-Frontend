import React, { useState } from "react";
import toast from "react-hot-toast";

export const AppContext = React.createContext();
export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userModalState, setUserModalState] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const [emailMessages, setEmailMessages] = useState([]);
  const [postMessageLoadingState, setPostMessageLoadingState] = useState(false);
  const [deleteEmailMessageLoadingState, setDeleteEmailMessageLoadingState] =
    useState(false);
  const [extractEmailFromCsvLoadingState, setExtractEmailFromCsvLoadingState] =
    useState(false);

  const [sendBulkEmailLoadingState, setsendBulkEmailLoadingState] =
    useState(false);

  const [selectedBulkMailsLoadingState, setSelectedBulkMailsLoadingState] =
    useState(false);

  const [emailList, setemailList] = useState([]);

  const getEmailList = async () => {
    try {
      const response = await fetch(`${backendUrl}/get-emails`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    
      setemailList(data?.extracted_records);

      return data?.emails;
    } catch (error) {
  
      return null;
    }
  };

  const getEmailMessage = async () => {
    try {
      const response = await fetch(`${backendUrl}/messages`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmailMessages(data?.messages);

      return data;
    } catch (error) {
      return null;
    }
  };

  const deleteEmailMessage = async (id) => {
    setDeleteEmailMessageLoadingState(true);
    try {
      const response = await fetch(`${backendUrl}/messages/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDeleteEmailMessageLoadingState(false);
      toast.success("Email message deleted")
      return data;
    } catch (error) {
      setDeleteEmailMessageLoadingState(false);
      toast.success("Error occurred, try again later")
      return null;
    }
  };

  const extractEmailsFromCsv = async (file) => {
    setExtractEmailFromCsvLoadingState(true);
    try {
      const response = await fetch(`${backendUrl}/extract-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ csv: csvString }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExtractEmailFromCsvLoadingState(false);
      return data.emails;
    } catch (error) {
      
      setExtractEmailFromCsvLoadingState(false);
      return [];
    }
  };

  const postEmailMessage = async (formdata) => {
    setPostMessageLoadingState(true);
   
    try {
      const response = await fetch(`${backendUrl}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPostMessageLoadingState(false);
      setCurrentModal(null);
      const data = await response.json();
      toast.success("Email message added successfully!");
      return data;
    } catch (error) {
      setPostMessageLoadingState(false);
      toast.error("Failed to add email message.");
      return null;
    }
  };

  const sendBulkEmails = async (emails, message) => {
    setsendBulkEmailLoadingState(true);
    try {
      const response = await fetch(`${backendUrl}/emails/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails, message }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setsendBulkEmailLoadingState(false);
      const data = await response.json();
      return data;
    } catch (error) {
      setsendBulkEmailLoadingState(false);
      return null;
    }
  };

  const sendSelectedBulkEmails = async (selectedEmails, message) => {
    setSelectedBulkMailsLoadingState(true);
    try {
      const response = await fetch(`${backendUrl}/emails/bulk/selected`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedEmails, message }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setSelectedBulkMailsLoadingState(false);
      const data = await response.json();
      return data;
    } catch (error) {
      setSelectedBulkMailsLoadingState(false);
      return null;
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          userModalState,
          setUserModalState,
          currentModal,
          setCurrentModal,
          getEmailMessage,
          emailMessages,
          postEmailMessage,
          extractEmailsFromCsv,
          postMessageLoadingState,
          deleteEmailMessage,
          deleteEmailMessageLoadingState,
          extractEmailFromCsvLoadingState,
          sendBulkEmailLoadingState,
          sendSelectedBulkEmails,
          sendBulkEmails,
          setSelectedBulkMailsLoadingState,
          emailList,
          getEmailList
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
