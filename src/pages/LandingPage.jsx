import React, { useContext, useEffect } from "react";
import MesagesComponent from "../components/MesagesComponent";
import EmailTable from "../components/EmailTable";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";
import AddEmailMessageModal from "../components/modals/AddEmailMessageModal";
import UploadCsvModal from "../components/modals/UploadCsvModal";
import CustomButtonLoader from "../components/modals/CustombuttonLoader";
import toast from "react-hot-toast";
import roolLogo from "../assets/rool_logo.png";

const LandingPage = () => {
  const {
    emailSenders,
    selectedEmails,
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
        <div className="flex justify-between items-center mb-8">
          <img src={roolLogo} alt="Rool Logo" className="w-[100px]" />
        </div>

        <p className="my-2 font-semibold text-[12px]">Admin Emails</p>
        <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mb-8">
          <table class="w-full text-sm text-left rtl:text-right text-body rounded-">
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
                    class="px-6 py-4  whitespace-nowrap text-[12px]"
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
            <div className="w-full flex justify-end">
              {selectedEmailSenders.length > 0 &&
                selectedMessages.length > 0 && selectedEmails.length === emailListModel?.extracted_records.length  && (
                  <button
                    className="bg-green-600 text-white h-[50px] p-4 flex text-center my-2 w-1/6 justify-center text-[12px] rounded-md"
                    onClick={async () => {
                      if (selectedMessages.length < 1) {
                        toast.error("Select the email to send");
                        return;
                      }

                      if (selectedEmailSenders.length < 1) {
                        toast.error("You haven't selected any admin email");
                        return;
                      }
                      const subjects = selectedMessages.map(
                        (item) => item.subject,
                      );
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
          )}
        </div>
        <EmailTable emailListModel={emailListModel} />
      </div>
    </div>
  );
};

export default LandingPage;
