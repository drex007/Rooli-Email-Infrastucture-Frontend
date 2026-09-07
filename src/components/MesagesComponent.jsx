import { useContext } from "react";
import { FiFilePlus, FiPlus, FiUploadCloud } from "react-icons/fi";
import { AppContext } from "../ContextAPI";
import { showAddEmailMessageModal, showUploadCsvModal } from "../constants";
import MessageCard from "./MessageCard";
import StepBadge from "./StepBadge";

const MesagesComponent = ({ messages }) => {
  const { setCurrentModal, selectedMessages, setSelectedMessages } =
    useContext(AppContext);

  const toggleMessage = (message) => {
    const exists = selectedMessages.some(
      (item) => item.message_id === message.message_id,
    );
    setSelectedMessages(
      exists
        ? selectedMessages.filter(
            (item) => item.message_id !== message.message_id,
          )
        : [...selectedMessages, message],
    );
  };

  const isAdded = (message) =>
    selectedMessages.some((item) => item.message_id === message.message_id);

  return (
    <section className="mb-6 overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_rgba(24,24,27,0.04)]">
      <div className="flex flex-col gap-4 border-b border-black/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-3">
            <StepBadge number="02" />
            <h2 className="text-base font-semibold tracking-[-0.01em]">Choose your message</h2>
          </div>
          <p className="ml-[52px] mt-1 text-sm text-[#85858e]">
            Select one or more templates to rotate through your campaign.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCurrentModal(showUploadCsvModal)}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 bg-white px-3.5 text-xs font-semibold text-[#3f3f46] transition hover:border-black/20 hover:bg-[#fafafa]"
          >
            <FiUploadCloud className="text-base" /> Upload CSV
          </button>
          <button
            type="button"
            onClick={() => setCurrentModal(showAddEmailMessageModal)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1e1e24] px-3.5 text-xs font-semibold text-white transition hover:bg-black"
          >
            <FiPlus className="text-base" /> New message
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {messages?.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {messages.map((message) => (
              <MessageCard
                key={message.message_id}
                message={message}
                included={isAdded(message)}
                onSelect={() => toggleMessage(message)}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[210px] place-items-center rounded-2xl border border-dashed border-black/10 bg-[#fafafa] px-5 text-center">
            <div>
              <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-white text-xl text-[#6d5dfc] shadow-sm"><FiFilePlus /></span>
              <p className="text-sm font-semibold text-[#3f3f46]">No messages yet</p>
              <p className="mt-1 text-xs text-[#85858e]">Create your first reusable email message.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MesagesComponent;
