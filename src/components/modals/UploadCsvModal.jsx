import { useContext, useRef, useState } from "react";
import { FiFileText, FiUploadCloud, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { AppContext } from "../../ContextAPI";
import CustomButtonLoader from "./CustombuttonLoader";

const UploadCsvModal = () => {
  const {
    setCurrentModal,
    extractEmailsFromCsv,
    extractEmailFromCsvLoadingState,
  } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Only CSV files are allowed");
      event.target.value = "";
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be under 50MB");
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Select a CSV file first");
      return;
    }
    await extractEmailsFromCsv(selectedFile);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#18181b]/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setCurrentModal(null);
      }}
    >
      <div className="modal-enter my-8 w-full max-w-[560px] overflow-hidden rounded-[24px] border border-white/50 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0edff] text-lg text-[#6557e8]"><FiUploadCloud /></span>
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#27272a]">Import recipients</h2>
              <p className="mt-0.5 text-xs text-[#8b8b94]">Upload your contact list as a CSV file.</p>
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

        <div className="px-6 py-6 sm:px-7">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`group grid min-h-[210px] w-full place-items-center rounded-2xl border border-dashed px-5 text-center transition ${selectedFile ? "border-[#6d5dfc] bg-[#faf9ff]" : "border-black/15 bg-[#fafafa] hover:border-[#6d5dfc]/60 hover:bg-[#faf9ff]"}`}
          >
            <div>
              <span className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl text-xl transition ${selectedFile ? "bg-[#6d5dfc] text-white" : "bg-white text-[#6d5dfc] shadow-sm group-hover:-translate-y-0.5"}`}>
                {selectedFile ? <FiFileText /> : <FiUploadCloud />}
              </span>
              <p className="text-sm font-semibold text-[#3f3f46]">
                {selectedFile ? selectedFile.name : "Choose a CSV file"}
              </p>
              <p className="mt-1 text-xs text-[#92929b]">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB · Ready to import`
                  : "Click to browse · Maximum file size 50MB"}
              </p>
            </div>
          </button>
          <p className="mt-3 text-center text-[11px] leading-5 text-[#a1a1aa]">
            Include an <span className="font-semibold text-[#71717a]">Emails</span> column. Name, Role, Company, GP and Region are optional.
          </p>
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
            type="button"
            disabled={!selectedFile || extractEmailFromCsvLoadingState}
            onClick={handleUpload}
            className="inline-flex h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#6d5dfc] px-5 text-sm font-semibold text-white transition hover:bg-[#5d4ee5] disabled:cursor-not-allowed disabled:bg-[#dedde3] disabled:text-[#9999a1]"
          >
            {extractEmailFromCsvLoadingState ? <CustomButtonLoader /> : <><FiUploadCloud /> Import contacts</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadCsvModal;
