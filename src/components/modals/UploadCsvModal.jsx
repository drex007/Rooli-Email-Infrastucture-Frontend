import React, { useContext } from "react";
import { AppContext } from "../../ContextAPI";
import { MdCancel } from "react-icons/md";

const UploadCsvModal = () => {
    const { currentModal, setCurrentModal } = useContext(AppContext);
    const handleFileSelect = (e) => {
  const selectedFiles = Array.from(e.target.files);
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  const validFiles = selectedFiles.filter(file => {
    if (file.size > maxSize) {
      alert(`${file.name} is too large`);
      return false;
    }
    return true;
  });
  // ... rest of the code
};
  return (
    <div className="fixed grid h-screen z-20 bg-[#11111190] place-items-center w-full backdrop-blur-sm">
      <div className="w-1/2 bg-white p-8 ">
     <div className="flex justify-between w-full my-3">
        <p></p>
           <MdCancel  color='red' size={30} className='cursor-pointer flex justify-end'    onClick={() => {
            setCurrentModal(null);
          }}/>
      
     </div>
     <p className="my-2">Upload Email Csv</p>
        <input
          type="file"
          name=""
          id=""
          className="w-full border p-4 outline-none"
          placeholder="Email subject"
          onClick={(e)=> handleFileSelect(e)}
        />
        <button
          className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2 w-full justify-center"
       
        >
            Upload
        </button>
      </div>
    </div>
  );
};

export default UploadCsvModal;
