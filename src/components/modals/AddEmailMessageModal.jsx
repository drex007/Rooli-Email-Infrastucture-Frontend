import React, { useContext, useState } from "react";
import { AppContext } from "../../ContextAPI";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import CustomButtonLoader from "./CustombuttonLoader";

const AddEmailMessageModal = () => {
  const {
    currentModal,
    setCurrentModal,
    postEmailMessage,
    postMessageLoadingState,
  } = useContext(AppContext);

  const [formdata, setFormdata] = useState({
    subject: "",
    body: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <input
          type="text"
          name="subject"
          id=""
          className="w-full border p-4 outline-none"
          placeholder="Email subject"
          onChange={handleOnChange}
        />

        <textarea
          name="body"
          id=""
          className="w-full border my-4   outline-none p-2"
          placeholder="Email body"
          onChange={handleOnChange}
          rows={10}
        ></textarea>
        {!postMessageLoadingState ? (
          <button
            className="bg-blue-500 text-white h-[50px] p-4 flex text-center my-2 w-full justify-center"
            onClick={async () => {
           
              if (
                formdata.subject.trim() === "" ||
                formdata.body.trim() === ""
              ) {
                toast.error("Please fill in all fields.");
                return;
              }

       
              const response = await postEmailMessage(formdata);
            }}
          >
            Add Message
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

export default AddEmailMessageModal;
