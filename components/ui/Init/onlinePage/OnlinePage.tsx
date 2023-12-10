import React from "react";
import { UploadFile } from "antd";
import ThemePicker from "./ThemePicker";
import UploadGallery from "./uploadGallery";
import UploadLogo from "./UploadLogo";

function OnlinePage({
  setFileList,
  setLogo,
  fileList,
  logo,
}: {
  setLogo: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  fileList: UploadFile<any>[];
  logo: UploadFile<any>[];
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <UploadLogo logo={logo} setLogo={setLogo} />
      <UploadGallery fileList={fileList} setFileList={setFileList} />
      <ThemePicker />
    </div>
  );
}

export default OnlinePage;
