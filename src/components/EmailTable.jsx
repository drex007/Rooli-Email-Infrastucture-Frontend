import { useContext } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiSend,
  FiUsers,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { AppContext } from "../ContextAPI";
import StepBadge from "./StepBadge";

const EmailTable = ({ emailListModel }) => {
  const {
    selectedEmails,
    setSelectedEmails,
    selectedMessages,
    getEmailList,
    currentPage,
    setCurrentPage,
    sendSelectedBulkEmails,
    selectedEmailSenders,
  } = useContext(AppContext);

  const recipients = emailListModel?.extracted_records || [];
  const selectedOnPage = recipients.filter((recipient) =>
    selectedEmails.some((selected) => selected.Emails === recipient.Emails),
  );
  const allOnPageSelected =
    recipients.length > 0 && selectedOnPage.length === recipients.length;

  const toggleSelectedEmail = (recipient) => {
    setSelectedEmails((current) =>
      current.some((item) => item.Emails === recipient.Emails)
        ? current.filter((item) => item.Emails !== recipient.Emails)
        : [...current, recipient],
    );
  };

  const toggleSelectAll = () => {
    setSelectedEmails((current) => {
      if (allOnPageSelected) {
        const visibleEmails = new Set(recipients.map((item) => item.Emails));
        return current.filter((item) => !visibleEmails.has(item.Emails));
      }

      const currentEmails = new Set(current.map((item) => item.Emails));
      return [
        ...current,
        ...recipients.filter((item) => !currentEmails.has(item.Emails)),
      ];
    });
  };

  const goToPage = async (page) => {
    setCurrentPage(page);
    await getEmailList(page);
  };

  const sendSelected = async () => {
    if (!selectedEmailSenders.length) {
      toast.error("Choose a sender account");
      return;
    }
    if (!selectedMessages.length) {
      toast.error("Choose at least one message");
      return;
    }
    if (!selectedEmails.length) {
      toast.error("Choose at least one recipient");
      return;
    }

    await sendSelectedBulkEmails(
      selectedMessages.map((item) => item.subject),
      selectedMessages.map((item) => item.body),
      selectedEmails.map((item) => ({ Emails: item.Emails })),
      selectedEmailSenders,
    );
  };

  return (
    <section className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_rgba(24,24,27,0.04)]">
      <div className="flex flex-col gap-4 border-b border-black/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-3">
            <StepBadge number="03" />
            <h2 className="text-base font-semibold tracking-[-0.01em]">Choose recipients</h2>
          </div>
          <p className="ml-[52px] mt-1 text-sm text-[#85858e]">
            Review your imported contacts and select your audience.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#f4f1ff] px-3 py-1.5 text-xs font-semibold text-[#5d4ee5]">
            {selectedEmails.length} selected
          </span>
          {selectedEmails.length > 0 && !allOnPageSelected && (
            <button
              type="button"
              onClick={sendSelected}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#6d5dfc] px-3.5 text-xs font-semibold text-white transition hover:bg-[#5d4ee5]"
            >
              <FiSend /> Send selected
            </button>
          )}
        </div>
      </div>

      {recipients.length ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#fafafa] text-[11px] font-bold uppercase tracking-[0.11em] text-[#92929b]">
                  <th className="w-16 px-6 py-4">
                    <input
                      type="checkbox"
                      aria-label="Select all recipients on this page"
                      checked={allOnPageSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 cursor-pointer rounded border-black/20 accent-[#6d5dfc]"
                    />
                  </th>
                  <th className="w-20 px-3 py-4">No.</th>
                  <th className="px-3 py-4">Contact</th>
                  <th className="px-3 py-4">Role</th>
                  <th className="px-3 py-4">Company</th>
                  <th className="px-3 py-4">GP</th>
                  <th className="px-6 py-4">Region</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => {
                  const selected = selectedEmails.some(
                    (item) => item.Emails === recipient.Emails,
                  );
                  return (
                    <tr
                      key={`${recipient.Emails}-${index}`}
                      onClick={() => toggleSelectedEmail(recipient)}
                      className={`cursor-pointer border-b border-black/[0.055] text-sm transition last:border-0 ${selected ? "bg-[#faf9ff]" : "hover:bg-[#fafafa]"}`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          aria-label={`Select ${recipient.Emails}`}
                          checked={selected}
                          onClick={(event) => event.stopPropagation()}
                          onChange={() => toggleSelectedEmail(recipient)}
                          className="h-4 w-4 cursor-pointer rounded border-black/20 accent-[#6d5dfc]"
                        />
                      </td>
                      <td className="px-3 py-4 text-xs font-medium text-[#a1a1aa]">
                        {String((emailListModel?.page - 1 || 0) * recipients.length + index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eeeeF1] text-xs font-bold text-[#62626b]">
                            {(recipient.Name || recipient.Emails || "C").charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="max-w-[220px] truncate font-semibold text-[#34343a]">{recipient.Name || "Unnamed contact"}</p>
                            <p className="mt-0.5 max-w-[220px] truncate text-xs text-[#8b8b94]">{recipient.Emails}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-[#66666f]">{recipient.Role || "—"}</td>
                      <td className="px-3 py-4 font-medium text-[#4b4b53]">{recipient.Company || "—"}</td>
                      <td className="px-3 py-4 text-[#66666f]">{recipient["Name of Gp"] || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full border border-black/[0.07] bg-white px-2.5 py-1 text-xs text-[#6e6e76]">{recipient.Region || "Unknown"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/[0.06] px-5 py-4 text-xs text-[#7c7c85] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              Showing page <span className="font-semibold text-[#3f3f46]">{emailListModel?.page || currentPage}</span> of <span className="font-semibold text-[#3f3f46]">{emailListModel?.total_pages || 1}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={(emailListModel?.page || currentPage) <= 1}
                onClick={() => goToPage((emailListModel?.page || currentPage) - 1)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 px-3 font-semibold text-[#52525b] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <FiArrowLeft /> Previous
              </button>
              <button
                type="button"
                disabled={(emailListModel?.page || currentPage) >= (emailListModel?.total_pages || 1)}
                onClick={() => goToPage((emailListModel?.page || currentPage) + 1)}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 px-3 font-semibold text-[#52525b] transition hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Next <FiArrowRight />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="grid min-h-[270px] place-items-center px-5 text-center">
          <div>
            <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#f1efff] text-xl text-[#6d5dfc]"><FiUsers /></span>
            <h3 className="text-sm font-semibold text-[#3f3f46]">No recipients imported</h3>
            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-[#85858e]">
              Upload a CSV file to populate your campaign audience. Your contacts will appear here.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#fafafa] px-3 py-2 text-[11px] text-[#a1a1aa]">
              <FiSearch /> Waiting for contact data
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmailTable;
