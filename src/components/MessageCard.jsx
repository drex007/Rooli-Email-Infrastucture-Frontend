import { useContext } from "react";
import { FiCheck, FiMail, FiTrash2 } from "react-icons/fi";
import { AppContext } from "../ContextAPI";

const MessageCard = ({ message, included, onSelect }) => {
  const { deleteEmailMessage } = useContext(AppContext);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={included}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect();
      }}
      className={`group relative flex min-h-[220px] cursor-pointer flex-col rounded-2xl border p-5 outline-none transition-all duration-200 ${
        included
          ? "border-[#6d5dfc] bg-[#f8f7ff] shadow-[0_0_0_3px_rgba(109,93,252,0.08)]"
          : "border-black/[0.08] bg-white hover:-translate-y-0.5 hover:border-black/20 hover:shadow-lg hover:shadow-black/[0.04]"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className={`grid h-10 w-10 place-items-center rounded-xl text-lg ${included ? "bg-[#6d5dfc] text-white" : "bg-[#f1f1f3] text-[#71717a]"}`}>
          {included ? <FiCheck /> : <FiMail />}
        </span>
        <button
          type="button"
          aria-label="Delete message"
          onClick={async (event) => {
            event.stopPropagation();
            await deleteEmailMessage(message.message_id);
          }}
          className="grid h-9 w-9 place-items-center rounded-lg text-[#a1a1aa] opacity-70 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
        >
          <FiTrash2 />
        </button>
      </div>

      <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-[#27272a]">
        {message.subject || "Untitled message"}
      </h3>
      <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-[#7c7c85]">
        {message.body}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-black/[0.06] pt-4 text-[11px] font-semibold uppercase tracking-[0.1em]">
        <span className={included ? "text-[#6557e8]" : "text-[#a1a1aa]"}>
          {included ? "Selected" : "Click to select"}
        </span>
        <span className="text-[#c0c0c5]">Template</span>
      </div>
    </article>
  );
};

export default MessageCard;
