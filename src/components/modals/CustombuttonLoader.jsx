import { ThreeDots } from "react-loader-spinner";

const CustomButtonLoader = () => {
  return (
    <ThreeDots
      height="20"
      width="100"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: "2px" }}
      wrapperClass="custom-loader"
      visible={true}
      
    />
  );
};

export default CustomButtonLoader;
