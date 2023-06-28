import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
// import { ethers } from "../constants/ethers-5.1.esm.min";
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [createCampaignForm, setCreateCampaignForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (FieldName, e) => {
    setCreateCampaignForm({
      ...createCampaignForm,
      [FieldName]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(createCampaignForm.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign(createCampaignForm);
        setIsLoading(false);
        setCreateCampaignForm({});
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setCreateCampaignForm({ ...createCampaignForm, image: "" });
      }
    });

    console.log(createCampaignForm);
  };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="justify-center flex items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={createCampaignForm.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.5"
            inputType="number"
            value={createCampaignForm.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write a compelling Story"
          inputType="text"
          value={createCampaignForm.description}
          isTextArea={true}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="flex w-full justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={createCampaignForm.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
          <FormField
            labelName="Campaign Image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={createCampaignForm.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
          <div className="flex justify-center items-center mt-[30px]">
            <CustomButton
              btnType="submit"
              title="Create Campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateCampaign;
