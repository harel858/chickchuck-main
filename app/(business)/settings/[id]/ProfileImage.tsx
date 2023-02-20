"useClient";
import React from "react";

function ProfileImage({ img }: { img: string }) {
  return (
    <div className="flex justify-center align-center p-3">
      <img
        className="w-1/4 h-auto rounded-full"
        src={img}
        alt="business profile"
      />
    </div>
  );
}

export default ProfileImage;
