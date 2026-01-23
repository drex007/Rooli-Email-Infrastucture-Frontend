import React, { useContext, useEffect } from "react";
import MesagesComponent from "../components/MesagesComponent";
import EmailTable from "../components/EmailTable";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";
import AddEmailMessageModal from "../components/modals/AddEmailMessageModal";
import UploadCsvModal from "../components/modals/UploadCsvModal";
import CustomButtonLoader from "../components/modals/CustombuttonLoader";
import toast from "react-hot-toast";

const LandingPage = () => {
  const { setCurrentModal,selectedMessages, currentModal, sendBulkEmailLoadingState, emailListModel, getEmailList, getEmailMessage, emailMessages, extractEmailFromCsvLoadingState, postMessageLoadingState, deleteEmailMessageLoadingState,sendBulkEmails } =
    useContext(AppContext);

  useEffect(() => {
    // getEmailList();
    getEmailMessage()
  }, [postMessageLoadingState, deleteEmailMessageLoadingState]);

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
        <MesagesComponent messages={emailMessages} />
        <div className="w-full flex justify-between">
          <p></p>
          {sendBulkEmailLoadingState ?
            <button className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/4 justify-center"



            >
              <CustomButtonLoader />
            </button> :

            <button className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/4 justify-center"

              onClick={async () => {
                if(selectedMessages.length < 1){
                  toast.error("Select the email to send")
                  return;
                }
                const subjects = selectedMessages.map(item => item.subject)
                const bodies = selectedMessages.map(item => item.body)
                const emails = emailListModel.extracted_records?.map(item => ({ Emails: item.Emails }));

                await sendBulkEmails(subjects, bodies, emails)


              }}

            >
              Send To All Emails
            </button>
          }

        </div>
        <EmailTable emailListModel={emailListModel} />
      </div>
    </div>
  );
};

export default LandingPage;
