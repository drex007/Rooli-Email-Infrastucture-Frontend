import React, { useContext } from "react";
import { AppContext } from "../ContextAPI";
import toast from "react-hot-toast";

const EmailTable = ({ emailListModel }) => {
  const {
    selectedEmails,
    setSelectedEmails,
    selectedMessages,
    emailMessages,
    getEmailList,
    currentPage,
    setCurrentPage,
    sendSelectedBulkEmails,
    selectedEmailSenders,
  } = useContext(AppContext);

  const toggleSelectedEmail = (item) => {
    setSelectedEmails((prev) => {
      const exists = prev.some((m) => m.Emails === item.Emails);

      if (exists) {
        // remove
        return prev.filter((m) => m.Emails !== item.Emails);
      }

      // add
      return [...prev, item];
    });
  };

  const nextPage = async () => {
    const numb = currentPage + 1;
    setCurrentPage(numb);
    await getEmailList(currentPage);
  };

  const PrevPage = async () => {
    const numb = currentPage - 1;
    setCurrentPage(numb);
    await getEmailList(numb);
  };

  const isAdded = (item) => {
    return selectedEmails.some((m) => m.Emails === item.Emails);
  };

  return (
    <div className="p-8">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium"></th>
              <th scope="col" class="px-6 py-3 font-medium">
                Index
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Email address
              </th>
              <th scope="col" class="px-6 py-3J font-medium">
                Name
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Name of GP
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Role
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Company
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                Region
              </th>
            </tr>
          </thead>
          <tbody>
            {emailListModel?.extracted_records.map((item, index) => (
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
                    checked={isAdded(item)}
                    className="w-[20px] h-[20px] cursor-pointer"
                    onChange={() => toggleSelectedEmail(item)}
                  />
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item?.Emails}
                </th>
                <td class="px-6 py-4">{item?.Name}</td>
                <td class="px-6 py-4">{item?.["Name of Gp"]}</td>
                <td class="px-6 py-4">{item?.Role}</td>
                <td class="px-6 py-4">{item?.Company}</td>
                <td class="px-6 py-4">{item?.Region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-4 flex justify-between">
        <div className="flex items-center space-x-4">
          {emailListModel?.page > 1 && (
            <button
              type="button"
              className="bg-purple-600 text-white p-3"
              onClick={() => PrevPage()}
            >
              Prev
            </button>
          )}
          <p>
            {" "}
            {emailListModel?.page} of {emailListModel?.total_pages}
          </p>
          {emailListModel?.total_pages > emailListModel?.page && (
            <button
              type="button"
              className="bg-purple-600 text-white p-3"
              onClick={() => nextPage()}
            >
              Next
            </button>
          )}
        </div>
        {selectedEmails.length > 0 && selectedMessages.length > 0 && (
          <button
            type="button"
            className="bg-purple-600 text-white p-3"
            onClick={async () => {
              if (selectedEmailSenders.length < 1) {
                toast.error("You haven't selected any admin email");
                return;
              }

              if (selectedMessages.length < 1) {
                toast.error("Select the email to send");
                return;
              }

              const subjects = selectedMessages.map((item) => item.subject);
              const bodies = selectedMessages.map((item) => item.body);
              const emails = selectedEmails?.map((item) => ({
                Emails: item.Emails,
              }));
              const senders = selectedEmailSenders;

              await sendSelectedBulkEmails(subjects, bodies, emails, senders);
            }}
          >
            Send To Selected Emails
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailTable;
