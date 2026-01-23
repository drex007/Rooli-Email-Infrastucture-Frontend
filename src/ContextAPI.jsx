import React, { useState } from "react";
import toast from "react-hot-toast";

export const AppContext = React.createContext();
export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ModalStates and Variables
  const [userModalState, setUserModalState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentModal, setCurrentModal] = useState(null);

  const [emailMessages, setEmailMessages] = useState([]);

  const [emailListModel, setEmailListModel] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const [selectedMessages, setSelectedMessages] = useState([]);

  const [emailSenders, setEmailSenders] = useState([])
  const [selectedEmailSenders, setSelectedEmailSenders] = useState([])

  // Loading States
  const [postMessageLoadingState, setPostMessageLoadingState] = useState(false);
  const [deleteEmailMessageLoadingState, setDeleteEmailMessageLoadingState] =
    useState(false);
  const [extractEmailFromCsvLoadingState, setExtractEmailFromCsvLoadingState] =
    useState(false);

  const [sendBulkEmailLoadingState, setsendBulkEmailLoadingState] =
    useState(false);

  const [selectedBulkMailsLoadingState, setSelectedBulkMailsLoadingState] =
    useState(false);


  const getEmailSenders = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/email-senders`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setEmailSenders(data?.senders);

      return data?.senders;
    } catch (error) {
      return null;
    }
  };

  const getEmailList = async (currentPage = 1) => {
    try {
      const response = await fetch(
        `${backendUrl}/get-emails?page=${currentPage}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setEmailListModel(data);

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
      toast.success("Email message deleted");
      return data;
    } catch (error) {
      setDeleteEmailMessageLoadingState(false);
      toast.error("Error occurred, try again later");
      return null;
    }
  };

  const extractEmailsFromCsv = async (file) => {
    setExtractEmailFromCsvLoadingState(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // key must match backend

      const response = await fetch(`${backendUrl}/extract-emails`, {
        method: "POST",
        body: formData, // 👈 FormData, not JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success("Emails extraction process queued!");
      setCurrentModal(null);
      return data.emails;
    } catch (error) {
      console.error(error);
      toast.error("Error occurred try again");
      return [];
    } finally {
      setExtractEmailFromCsvLoadingState(false);
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

  const sendBulkEmails = async (subjects, bodies, email_list, senders) => {
    setsendBulkEmailLoadingState(true);

    const body = {
      subjects: subjects,
      bodies: bodies,
      email_list: email_list,
      senders:senders
    };
    try {
      const response = await fetch(`${backendUrl}/send-bulk-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setsendBulkEmailLoadingState(false);
      const data = await response.json();
      setSelectedMessages([])
      toast.success("Batch emailing process queued!!");
      return data;
    } catch (error) {
      setsendBulkEmailLoadingState(false);
      toast.error("Error occurred!!");
      return null;
    }
  };

  const sendSelectedBulkEmails = async (subjects, bodies, email_list,senders) => {
    setSelectedBulkMailsLoadingState(true);

    const body = {
      subjects: subjects,
      bodies: bodies,
      email_list: email_list,
      senders:senders
    };
    try {
      const response = await fetch(`${backendUrl}/send-selected-emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setSelectedBulkMailsLoadingState(false);
      const data = await response.json();
      setSelectedMessages([])
      toast.success("Batch emailing process queued!!");
      return data;
    } catch (error) {
      setSelectedBulkMailsLoadingState(false);
      toast.error("Error occurred!!");
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
          emailListModel,
          getEmailList,
          selectedEmails,
          setSelectedEmails,
          selectedMessages,
          setSelectedMessages,
          currentPage,
          setCurrentPage,
          getEmailSenders,
          emailSenders, 
          setEmailSenders,
          selectedEmailSenders, 
          setSelectedEmailSenders
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};
