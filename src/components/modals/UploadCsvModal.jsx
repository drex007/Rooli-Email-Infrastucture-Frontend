import React, { useContext, useState } from "react";
import { AppContext } from "../../ContextAPI";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import CustomButtonLoader from "./CustombuttonLoader";

const UploadCsvModal = () => {
  const {
    currentModal,
    setCurrentModal,
    extractEmailsFromCsv,
    extractEmailFromCsvLoadingState,
  } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);


const handleFileSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const maxSize = 50 * 1024 * 1024; // 10MB

  if (
    file.type !== "text/csv" &&
    !file.name.toLowerCase().endsWith(".csv")
  ) {
    toast.error("Only CSV files are allowed");
    e.target.value = "";
    return;
  }

  if (file.size > maxSize) {
    toast.error("File size must be under 50MB");
    e.target.value = "";
    return;
  }
  console.log(file,"FILE")
  setSelectedFile(file); // 👈 store file
};

const handleUpload = async () => {
  if (!selectedFile) {
    toast.error("Please select a CSV file first");
    return;
  }

  await extractEmailsFromCsv(selectedFile);
};
  return (
    <div className="fixed grid h-screen z-20 bg-[#11111190] place-items-center w-full backdrop-blur-sm">
      <div className="w-1/2 bg-white p-8 ">
        <div className="flex justify-between w-full my-3">
          <p></p>
          <MdCancel
            color="red"
            size={30}
            className="cursor-pointer flex justify-end"
            onClick={() => {
              setCurrentModal(null);
            }}
          />
        </div>
        <p className="my-2">Upload Email Csv</p>
        <input
          type="file"
          name="file"
          id=""
          className="w-full border p-4 outline-none"
          placeholder="Email subject"
         onChange={handleFileSelect}
        />

        {!extractEmailFromCsvLoadingState ? (
          <button
            className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2 w-full justify-center"
            onClick={handleUpload}
          >
            Upload
          </button>
        ) : (
          <button className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2 w-full justify-center">
            <CustomButtonLoader />
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadCsvModal;
