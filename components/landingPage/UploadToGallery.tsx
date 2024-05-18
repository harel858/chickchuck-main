"use client";
import React, { useState } from "react";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Button } from "@ui/Button";
import axios from "axios";
const { Dragger } = Upload;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadGallery = ({
  setGalleryOrUpload,
  urls,
  adminUserId,
}: {
  setGalleryOrUpload: React.Dispatch<React.SetStateAction<boolean>>;
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: string[];
  } | null;
  adminUserId: string | false;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [galleryList, setGalleryList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setGalleryList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusCircleOutlined className="text-3xl" />
      <p style={{ marginTop: 8 }} className="text-xl">
        {"Upload Your Gallary"}
      </p>
    </div>
  );

  const handlebeforeUpload = (file: RcFile) => {
    const isPNG = file.type === "image/png" || "image/jpeg";

    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  };
  const onDone = async () => {
    setIsLoading(true);
    if (adminUserId === false)
      return message.error("המשתמש לא מורשה לבצע שינויים");
    const formData = new FormData();
    formData.append("userId", adminUserId);
    formData.append("type", "GALLERY");
    formData.append("galleryList", JSON.stringify(galleryList));
    // Append each file in galleryList individually
    galleryList.forEach((file, index) => {
      formData.append(`galleryList[${index}]`, file.originFileObj as File);
    });
    formData.append(`galleryLength`, JSON.stringify(galleryList.length));

    try {
      const result = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("result", result);

      /* if (result.status === 200) {
        return router.push("/schedule");
      } */
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 w-11/12">
        <Dragger
          action="/api/progress"
          beforeUpload={handlebeforeUpload}
          fileList={galleryList}
          onPreview={handlePreview}
          onChange={handleChange}
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={8}
          multiple
          className="w-10/12"
        >
          {uploadButton}
        </Dragger>
        <div className="flex justify-center items-center gap-2">
          {urls?.galleryImgUrls && urls?.galleryImgUrls.length > 0 ? (
            <Button variant={"ghost"} onClick={() => setGalleryOrUpload(false)}>
              בטל
            </Button>
          ) : (
            <></>
          )}
          <Button
            type="button"
            variant={"default"}
            disabled={galleryList.length === 0}
            isLoading={isLoading}
            onClick={onDone}
          >
            שמור בגלריה
          </Button>
        </div>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadGallery;
