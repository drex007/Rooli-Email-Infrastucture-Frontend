import { useContext, useState } from "react";
import { FiEdit3, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { AppContext } from "../../ContextAPI";
import CustomButtonLoader from "./CustombuttonLoader";

const AddEmailMessageModal = () => {
  const { setCurrentModal, postEmailMessage, postMessageLoadingState } =
    useContext(AppContext);
  const [formdata, setFormdata] = useState({ subject: "", body: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formdata.subject.trim() || !formdata.body.trim()) {
      toast.error("Please complete the subject and message body");
      return;
    }
    await postEmailMessage(formdata);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#18181b]/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setCurrentModal(null);
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="modal-enter my-8 w-full max-w-[620px] overflow-hidden rounded-[24px] border border-white/50 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
      >
        <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0edff] text-lg text-[#6557e8]"><FiEdit3 /></span>
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#27272a]">Create a message</h2>
              <p className="mt-0.5 text-xs text-[#8b8b94]">Add a reusable template to your campaign.</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setCurrentModal(null)}
            className="grid h-9 w-9 place-items-center rounded-lg text-lg text-[#85858e] transition hover:bg-[#f3f3f4] hover:text-[#27272a]"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6 sm:px-7">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold text-[#52525b]">Subject line</span>
            <input
              autoFocus
              type="text"
              name="subject"
              value={formdata.subject}
              onChange={(event) => setFormdata((current) => ({ ...current, subject: event.target.value }))}
              className="h-12 w-full rounded-xl border border-black/10 bg-[#fcfcfc] px-4 text-sm text-[#27272a] outline-none transition placeholder:text-[#b4b4bb] focus:border-[#6d5dfc] focus:bg-white focus:ring-4 focus:ring-[#6d5dfc]/10"
              placeholder="e.g. A quick introduction from Rooli"
            />
          </label>

          <label className="block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#52525b]">Message body</span>
              <span className="text-[11px] text-[#a1a1aa]">{formdata.body.length} characters</span>
            </div>
            <textarea
              name="body"
              value={formdata.body}
              onChange={(event) => setFormdata((current) => ({ ...current, body: event.target.value }))}
              rows={9}
              className="w-full resize-none rounded-xl border border-black/10 bg-[#fcfcfc] p-4 text-sm leading-6 text-[#27272a] outline-none transition placeholder:text-[#b4b4bb] focus:border-[#6d5dfc] focus:bg-white focus:ring-4 focus:ring-[#6d5dfc]/10"
              placeholder="Write the message your recipients will receive..."
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-black/[0.06] bg-[#fafafa] px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={() => setCurrentModal(null)}
            className="h-11 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-[#52525b] transition hover:bg-[#f5f5f5]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={postMessageLoadingState}
            className="inline-flex h-11 min-w-[150px] items-center justify-center rounded-xl bg-[#6d5dfc] px-5 text-sm font-semibold text-white transition hover:bg-[#5d4ee5] disabled:cursor-wait disabled:opacity-70"
          >
            {postMessageLoadingState ? <CustomButtonLoader /> : "Save message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmailMessageModal;
