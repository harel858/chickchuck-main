import React, { useState } from "react";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
const { Dragger } = Upload;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const App = ({
  logo,
  setLogo,
}: {
  setLogo: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  logo: UploadFile<any>[];
}) => {
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
  const handlebeforeUpload = (file: RcFile) => {
    const isPNG = file.type === "image/png" || "image/jpeg";

    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setLogo(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusCircleOutlined className="text-3xl" />
      <p style={{ marginTop: 8 }} className="text-xl">
        {logo.length >= 1 ? "Replace Your Logo" : "Upload Logo"}
      </p>
    </div>
  );
  return (
    <>
      <Dragger
        action="/api/progress"
        fileList={logo}
        onPreview={handlePreview}
        beforeUpload={handlebeforeUpload}
        onChange={handleChange}
        listType="picture"
        accept="image/png, image/jpeg"
        maxCount={1}
        className={`w-10/12`}
      >
        {uploadButton}
      </Dragger>
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

export default App;
