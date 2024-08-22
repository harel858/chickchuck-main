"use client";
import React, { useState, useEffect } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Button } from "@ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const urlToFile = async (
  url: string,
  fileName: string
): Promise<UploadFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });

  const uploadFile: UploadFile = {
    uid: fileName,
    name: fileName,
    status: "done",
    url,
    originFileObj: file as RcFile, // Explicitly type file as RcFile
  };

  return uploadFile;
};

const UploadGallery = ({
  setGalleryOrUpload,
  urls,
  adminUserId,
}: {
  setGalleryOrUpload: React.Dispatch<React.SetStateAction<boolean>>;
  urls: {
    profileUrls: string;
    backgroundUrls: string;
    galleryImgUrls: { url: string; fileName: string }[];
  } | null;
  adminUserId: string | false;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [galleryList, setGalleryList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    const initializeGalleryList = async () => {
      if (urls?.galleryImgUrls) {
        const initialGalleryList: UploadFile<RcFile>[] = await Promise.all(
          urls.galleryImgUrls.map(async (item, index) => {
            const file = await urlToFile(item.url, item.fileName);
            return {
              uid: `-1_${index}`,
              name: item.fileName,
              status: "done",
              url: item.url,
              originFileObj: file.originFileObj, // Correctly typed as RcFile
            };
          })
        );
        setGalleryList(initialGalleryList);
      }
    };
    initializeGalleryList();
  }, [urls]);

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
        {"Upload Your Gallery"}
      </p>
    </div>
  );

  const handlebeforeUpload = (file: RcFile) => {
    const isPNG = file.type === "image/png" || file.type === "image/jpeg";

    if (!isPNG) {
      message.error(`${file.name} is not a png or jpeg file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  };

  const onDone = async () => {
    setIsLoading(true);

    if (adminUserId === false) {
      message.error("המשתמש לא מורשה לבצע שינויים");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("userId", adminUserId);
    formData.append("type", "GALLERY");

    galleryList.forEach((file, index) => {
      formData.append(`galleryList[${index}]`, file.originFileObj as File);
    });
    formData.append("galleryLength", galleryList.length.toString());

    console.log("formData", formData);

    try {
      const result = await axios.post("/api/user/image-route", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("result", result);

      setIsLoading(false);
      setGalleryOrUpload(false);
      router.refresh();
      message.success("התמונות נשמרו בהצלחה");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 w-11/12">
        <div className="flex justify-center items-center gap-2">
          {urls?.galleryImgUrls && urls.galleryImgUrls.length > 0 ? (
            <Button variant={"ghost"} onClick={() => setGalleryOrUpload(false)}>
              בטל
            </Button>
          ) : null}
          <Button
            type="button"
            variant={"default"}
            disabled={galleryList.length === 0}
            isLoading={isLoading}
            onClick={onDone}
          >
            שמור בגלריה
          </Button>
        </div>{" "}
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
