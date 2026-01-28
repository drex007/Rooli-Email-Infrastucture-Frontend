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
  const {
    emailSenders,
    setEmailSenders,
    setCurrentModal,
    selectedMessages,
    currentModal,
    sendBulkEmailLoadingState,
    emailListModel,
    getEmailList,
    getEmailMessage,
    emailMessages,
    extractEmailFromCsvLoadingState,
    postMessageLoadingState,
    deleteEmailMessageLoadingState,
    sendBulkEmails,
    getEmailSenders,
    selectedEmailSenders,
    setSelectedEmailSenders,
  } = useContext(AppContext);

  useEffect(() => {
    getEmailSenders();
  }, []);

  useEffect(() => {
    // getEmailList();
    getEmailMessage();
  }, [postMessageLoadingState, deleteEmailMessageLoadingState]);

  useEffect(() => {
    getEmailList();
  }, [extractEmailFromCsvLoadingState]);

  const toggleAdminEmail = (item) => {
    setSelectedEmailSenders((prev) => {
      const exists = prev.some((m) => m === item);

      if (exists) {
        // remove
        return prev.filter((m) => m !== item);
      }

      return [...prev, item];
    });
  };

  const adminEmailIsAdded = (item) => {
    return selectedEmailSenders.some((m) => m === item);
  };
  return (
    <div>
      {currentModal == showAddEmailMessageModal && <AddEmailMessageModal />}
      {currentModal == showUploadCsvModal && <UploadCsvModal />}
      <div className="p-8 font-poppins">
        <div className="flex justify-between items-center">
          <p className="py-8 font-semibold"> Rooli Email Infrastructure</p>
          <button
            className="bg-orange-500 text-white h-[50px] p-4 flex text-center"
            onClick={() => {
              setCurrentModal(showUploadCsvModal);
            }}
          >
            Upload Csv
          </button>
        </div>

        <p className="my-2 font-semibold">Admin Emails</p>
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mb-8">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <tbody className="flex flex-col">
              {emailSenders?.map((item, index) => (
                <tr
                  class="bg-neutral-primary-soft border-b  border-default"
                  key={index}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={adminEmailIsAdded(item)}
                      className="w-[20px] h-[20px] cursor-pointer"
                      onChange={() => toggleAdminEmail(item)}
                    />
                  </th>

                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {item?.Emails}
                  </th>
                  <td class="px-6 py-4">{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <MesagesComponent messages={emailMessages} />
        <div className="w-full flex justify-between">
          <p></p>
          {sendBulkEmailLoadingState ? (
            <button className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/4 justify-center">
              <CustomButtonLoader />
            </button>
          ) : (
            <button
              className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/4 justify-center"
              onClick={async () => {
                if (selectedMessages.length < 1) {
                  toast.error("Select the email to send");
                  return;
                }

                if (selectedEmailSenders.length < 1) {
                  toast.error("You haven't selected any admin email");
                  return;
                }
                const subjects = selectedMessages.map((item) => item.subject);
                const bodies = selectedMessages.map((item) => item.body);
                const emails = emailListModel.extracted_records?.map(
                  (item) => ({ Emails: item.Emails }),
                );

                const senders = selectedEmailSenders;

                await sendBulkEmails(subjects, bodies, emails, senders);
              }}
            >
              Send To All Emails
            </button>
          )}
        </div>
        <EmailTable emailListModel={emailListModel} />
      </div>
    </div>
  );
};

export default LandingPage;
