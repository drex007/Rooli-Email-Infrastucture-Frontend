import { useContext, useEffect } from "react";
import { FiCheck, FiMail, FiSend, FiUsers, FiZap } from "react-icons/fi";
import toast from "react-hot-toast";
import MesagesComponent from "../components/MesagesComponent";
import EmailTable from "../components/EmailTable";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";
import AddEmailMessageModal from "../components/modals/AddEmailMessageModal";
import UploadCsvModal from "../components/modals/UploadCsvModal";
import CustomButtonLoader from "../components/modals/CustombuttonLoader";
import StepBadge from "../components/StepBadge";
import roolLogo from "../assets/rool_logo.png";

const getSenderLabel = (sender) => {
  if (typeof sender === "string") return sender;
  return sender?.Emails || sender?.email || sender?.name || "Unknown sender";
};

const LandingPage = () => {
  const {
    emailSenders,
    selectedEmails,
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getEmailMessage();
  }, [postMessageLoadingState, deleteEmailMessageLoadingState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getEmailList();
  }, [extractEmailFromCsvLoadingState]); // eslint-disable-line react-hooks/exhaustive-deps

  const recipients = emailListModel?.extracted_records || [];
  const allRecipientsSelected =
    recipients.length > 0 &&
    recipients.every((recipient) =>
      selectedEmails.some((selected) => selected.Emails === recipient.Emails),
    );

  const toggleAdminEmail = (sender) => {
    setSelectedEmailSenders((current) =>
      current.includes(sender)
        ? current.filter((item) => item !== sender)
        : [...current, sender],
    );
  };

  const sendToAll = async () => {
    if (!selectedMessages.length) {
      toast.error("Choose at least one message");
      return;
    }
    if (!selectedEmailSenders.length) {
      toast.error("Choose a sender account");
      return;
    }
    if (!allRecipientsSelected) {
      toast.error("Select all recipients to send to everyone");
      return;
    }

    await sendBulkEmails(
      selectedMessages.map((item) => item.subject),
      selectedMessages.map((item) => item.body),
      recipients.map((item) => ({ Emails: item.Emails })),
      selectedEmailSenders,
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#18181b]">
      {currentModal === showAddEmailMessageModal && <AddEmailMessageModal />}
      {currentModal === showUploadCsvModal && <UploadCsvModal />}

      <header className="border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <img src={roolLogo} alt="Rooli" className="h-9 w-auto" />
            <div className="hidden h-6 w-px bg-black/10 sm:block" />
            <p className="hidden text-sm font-medium text-[#71717a] sm:block">
              Campaign Studio
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
            System ready
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6d5dfc]">
              <FiZap /> Outreach dashboard
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#18181b] sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
              Build your next email campaign.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71717a] sm:text-base">
              Select a sender, pair it with your message, then choose exactly who
              should receive it.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Metric icon={<FiMail />} label="Messages" value={emailMessages?.length || 0} />
            <Metric icon={<FiUsers />} label="Contacts" value={emailListModel?.total_records || recipients.length} />
            <Metric icon={<FiCheck />} label="Selected" value={selectedEmails.length} accent />
          </div>
        </section>

        <section className="mb-6 overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_rgba(24,24,27,0.04)]">
          <div className="flex flex-col gap-4 border-b border-black/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-3">
                <StepBadge number="01" />
                <h2 className="text-base font-semibold tracking-[-0.01em]">Choose sender</h2>
              </div>
              <p className="ml-[52px] mt-1 text-sm text-[#85858e]">
                Messages will be distributed from the selected accounts.
              </p>
            </div>
            <div className="rounded-full bg-[#f4f1ff] px-3 py-1.5 text-xs font-semibold text-[#5d4ee5]">
              {selectedEmailSenders.length} selected
            </div>
          </div>

          <div className="flex flex-wrap gap-3 px-5 py-5 sm:px-6">
            {emailSenders?.length ? (
              emailSenders.map((sender, index) => {
                const selected = selectedEmailSenders.includes(sender);
                return (
                  <button
                    type="button"
                    key={`${getSenderLabel(sender)}-${index}`}
                    aria-pressed={selected}
                    onClick={() => toggleAdminEmail(sender)}
                    className={`group flex min-w-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      selected
                        ? "border-[#6d5dfc] bg-[#f7f5ff] shadow-[0_0_0_3px_rgba(109,93,252,0.09)]"
                        : "border-black/[0.08] bg-white hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm"
                    }`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-bold ${selected ? "bg-[#6d5dfc] text-white" : "bg-[#f1f1f3] text-[#52525b]"}`}>
                      {selected ? <FiCheck /> : getSenderLabel(sender).charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa]">Sender</span>
                      <span className="block max-w-[260px] truncate text-sm font-medium text-[#27272a]">{getSenderLabel(sender)}</span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-black/10 bg-[#fafafa] px-4 py-5 text-sm text-[#85858e]">
                <FiMail className="text-lg" /> No sender accounts are available yet.
              </div>
            )}
          </div>
        </section>

        <MesagesComponent messages={emailMessages} />
        <EmailTable emailListModel={emailListModel} />

        <div className="sticky bottom-3 z-10 mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#1e1e24]/95 p-3 text-white shadow-[0_20px_50px_rgba(24,24,27,0.24)] backdrop-blur-xl sm:bottom-4 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-lg sm:grid">
              <FiSend />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">Campaign ready check</p>
              <p className="mt-0.5 truncate text-[10px] text-white/55 sm:text-xs">
                {selectedEmailSenders.length} sender · {selectedMessages.length} message · {selectedEmails.length} recipient{selectedEmails.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={!allRecipientsSelected || !selectedMessages.length || !selectedEmailSenders.length || sendBulkEmailLoadingState}
            onClick={sendToAll}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-4 text-xs font-semibold text-white transition hover:bg-[#5d4ee5] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35 sm:px-5 sm:text-sm"
          >
            {sendBulkEmailLoadingState ? <CustomButtonLoader /> : <><FiSend /> <span className="sm:hidden">Send all</span><span className="hidden sm:inline">Send to all {recipients.length || ""}</span></>}
          </button>
        </div>
      </main>
    </div>
  );
};

const Metric = ({ icon, label, value, accent = false }) => (
  <div className={`min-w-[92px] rounded-2xl border px-3 py-3 sm:min-w-[112px] sm:px-4 ${accent ? "border-[#ded8ff] bg-[#f4f1ff]" : "border-black/[0.07] bg-white"}`}>
    <div className={`mb-2 text-sm ${accent ? "text-[#6d5dfc]" : "text-[#a1a1aa]"}`}>{icon}</div>
    <p className="text-xl font-semibold tracking-[-0.03em] text-[#27272a]">{value}</p>
    <p className="text-[11px] font-medium text-[#85858e]">{label}</p>
  </div>
);

export default LandingPage;
