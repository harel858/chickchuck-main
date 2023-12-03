import React from "react";
import ThemePicker from "./ThemePicker";
import UploadGallery from "./uploadGallery";
import UploadLogo from "./UploadLogo";
function OnlinePage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <UploadLogo />
      <UploadGallery />
      <ThemePicker />
    </div>
  );
}

export default OnlinePage;
