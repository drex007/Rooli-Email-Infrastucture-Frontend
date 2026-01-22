import React, { useContext, useEffect } from "react";
import MesagesComponent from "../components/MesagesComponent";
import EmailTable from "../components/EmailTable";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";
import AddEmailMessageModal from "../components/modals/AddEmailMessageModal";
import UploadCsvModal from "../components/modals/UploadCsvModal";

const LandingPage = () => {
  const { setCurrentModal,currentModal, emailListModel, getEmailList, getEmailMessage, emailMessages,extractEmailFromCsvLoadingState ,postMessageLoadingState,deleteEmailMessageLoadingState} =
    useContext(AppContext);

  useEffect(() => {
    // getEmailList();
    getEmailMessage()
  }, [postMessageLoadingState,deleteEmailMessageLoadingState]);

    useEffect(() => {
    getEmailList();

  }, [extractEmailFromCsvLoadingState]);


  return (
    <div>
      {currentModal == showAddEmailMessageModal && <AddEmailMessageModal />}
      {currentModal == showUploadCsvModal && <UploadCsvModal />}
      <div className="p-8 font-poppins">
        <div className="flex justify-between items-center">
          <p className="py-8 font-bold"> Rooli Email Infrastructure</p>
          <button
            className="bg-orange-500 text-white h-[50px] p-4 flex text-center"
            onClick={() => {
              setCurrentModal(showUploadCsvModal);
            }}
          >
            Upload Csv
          </button>
        </div>
        <MesagesComponent messages = {emailMessages} />
        <div className="w-full flex justify-between">
          <p></p>
          <button className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/4 justify-center">
            Send To All Emails
          </button>
        </div>
        <EmailTable emailListModel={emailListModel} />
      </div>
    </div>
  );
};

export default LandingPage;
